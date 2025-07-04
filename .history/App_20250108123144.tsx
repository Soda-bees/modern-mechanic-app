import React, {useEffect} from 'react';
import MainNavigator from './src/services/config/navigation';
import {Buffer} from 'buffer';
import {
  initializeBLE,
  requestPermissions,
} from './src/services/config/BLEManager/BLEManager';
import {Alert} from 'react-native';
import {persistor, store} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

global.Buffer = Buffer;

const App: React.FC = () => {
  useEffect(() => {
    const setupBLE = async () => {
      await initializeBLE();
      const permissionsGranted = await requestPermissions();

      if (!permissionsGranted) {
        Alert.alert(
          'Permissions Required',
          'Bluetooth and location permissions are necessary to use this app.',
        );
      }
    };

    setupBLE();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;

// import React, {useEffect} from 'react';
// import MainNavigator from './src/services/config/navigation';
// import {Buffer} from 'buffer';
// import BleManager from 'react-native-ble-manager';

// global.Buffer = Buffer;
// // import SplashScreen from 'react-native-splash-screen';
// const App: React.FC = () => {
//   // useEffect(() => {
//   //   SplashScreen.hide();
//   // }, []);

//   return <MainNavigator />;
// };

// export default App;
