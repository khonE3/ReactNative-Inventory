import React, { useState } from 'react';
import { LoginScreen } from './LoginScreen';
import { RegisterScreen } from './RegisterScreen';

export const AuthScreen = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleSwitchToRegister = () => {
    setIsLoginMode(false);
  };

  const handleSwitchToLogin = () => {
    setIsLoginMode(true);
  };

  const handleRegisterSuccess = () => {
    setIsLoginMode(true);
  };

  if (isLoginMode) {
    return <LoginScreen onSwitchToRegister={handleSwitchToRegister} />;
  }

  return (
    <RegisterScreen 
      onSwitchToLogin={handleSwitchToLogin}
      onRegisterSuccess={handleRegisterSuccess}
    />
  );
};
