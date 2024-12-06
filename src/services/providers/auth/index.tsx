import { AuthContext } from '@/context/auth';
import { User } from '@/models/user';
import { AuthState } from '@/types';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useState, useEffect, PropsWithChildren, useCallback } from 'react';
import SecureStore from 'expo-secure-store';

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [authState, setAuthState] = useState<AuthState>({
    phoneNumber: undefined,
    verificationCode: undefined,
    verificationId: undefined,
    isValidPhoneNumber: false,
    rememberMe: false,
  });

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => onAuthStateChanged(user));

    return () => unsubscribe();
  }, []);

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      const userCredential = await auth().signInWithCustomToken(token);
      if (userCredential.user) {
        const userRef = await firestore().collection('users').doc(userCredential.user.uid).get();
        if (userRef.exists) {
          setUser(userRef.data() as User);
        }
      }
    }

    if (user) {
      const userDoc = await firestore().collection('users').doc(user?.uid).get();

      if (userDoc.exists) {
        setUser(userDoc.data() as User);
      }
    } else {
      setUser(null);
    }
  };

  const signInWithPhone = async (phoneNumber: string) => {
    const confirmationResult = await auth().signInWithPhoneNumber(phoneNumber);
    return confirmationResult;
  };

  const verifyCode = async (
    verificationId: string,
    code: string,
    name?: string,
    profileImage?: string
  ) => {
    const credential = auth.PhoneAuthProvider.credential(verificationId, code);
    const userCredential = await auth().signInWithCredential(credential);

    if (userCredential.user && name) {
      await firestore().collection('users').doc(userCredential.user.uid).set({
        uid: userCredential.user.uid,
        phoneNumber: userCredential.user.phoneNumber,
        name,
        profileImage,
      });

      if (authState.rememberMe) {
        const token = await userCredential.user.getIdToken(true);
        await SecureStore.setItemAsync('userToken', token);
      }
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('userToken');
    await auth().signOut();
  };

  const setAuthStateValue = useCallback((newState: AuthState) => {
    setAuthState((prevState) => ({ ...prevState, ...newState }));
  }, []);

  const contextValue = {
    user,
    signInWithPhone,
    verifyCode,
    signOut,
    authState,
    setAuthState: setAuthStateValue,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
