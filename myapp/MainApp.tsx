import React from 'react';
import { AuthProvider, useAuth } from './src/hooks/useAuth';
import { AuthScreen, InventoryManagementApp } from './src/components';
import { LoadingScreen, CyberPunkBackground } from './src/components';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { CyberPunkTheme } from './src/constants';
import { layoutStyles } from './src/styles';

const AppContent = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: CyberPunkTheme.colors.background }}>
        <SafeAreaView style={[layoutStyles.container, { backgroundColor: CyberPunkTheme.colors.background }]}>
          <CyberPunkBackground />
          <StatusBar barStyle="dark-content" backgroundColor={CyberPunkTheme.colors.background} />
          <LoadingScreen />
        </SafeAreaView>
      </View>
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
