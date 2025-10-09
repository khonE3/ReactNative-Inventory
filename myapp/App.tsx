import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import MainApp from './MainApp';
import CafeTheme from './src/constants/cafeTheme';

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: CafeTheme.colors.background }}>
      <MainApp />
    </View>
  );
};

export default App;