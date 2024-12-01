import { AuthContext } from '@/context/auth';
import { User } from '@/models/user';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useState, useEffect } from 'react';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          phoneNumber: firebaseUser.phoneNumber,
          name: firebaseUser.displayName,
          profileImage: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

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
    }
  };

  const signOut = async () => {
    await auth().signOut();
  };

  return (
    <AuthContext.Provider value={{ user, signInWithPhone, verifyCode, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
