import { AuthContextType, AuthContext } from '@/context/auth';
import React from 'react';

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
