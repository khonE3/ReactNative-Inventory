import React from 'react';
import { AuthProvider, useAuth } from './src/hooks/useAuth';
import { AuthScreen, InventoryManagementApp } from './src/components';
import { LoadingScreen, CyberPunkBackground } from './src/components';
import { SafeAreaView, StatusBar } from 'react-native';
import { CyberPunkTheme } from './src/constants';
import { layoutStyles } from './src/styles';

const AppContent = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <SafeAreaView style={[layoutStyles.container, { backgroundColor: CyberPunkTheme.colors.background }]}>
        <CyberPunkBackground />
        <StatusBar barStyle="light-content" backgroundColor={CyberPunkTheme.colors.background} />
        <LoadingScreen />
      </SafeAreaView>
    );
  }

  return user ? <InventoryManagementApp /> : <AuthScreen />;
};

const MainApp = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default MainApp;
