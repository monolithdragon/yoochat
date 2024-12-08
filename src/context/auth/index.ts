import { User } from '@/models/user';
import { AuthState } from '@/types';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React from 'react';

export interface AuthContextType {
  user: User | null;
  signInWithPhone: (phoneNumber: string) => Promise<FirebaseAuthTypes.ConfirmationResult>;
  verifyCode: (verificationId: string, code: string) => Promise<void>;
  createUser: (name: string, profileImage?: string) => Promise<void>;

  signOut: () => Promise<void>;
  authState: AuthState;
  setAuthState: (value: AuthState) => void;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);
