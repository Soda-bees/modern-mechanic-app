import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/services/config/navigation';
import {SafeAreaView, StyleSheet} from 'react-native';
// import SplashScreen from 'react-native-splash-screen';
const App: React.FC = () => {
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);

  return <MainNavigator />;
};

export default App;
