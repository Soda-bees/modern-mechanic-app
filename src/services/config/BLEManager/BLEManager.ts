import {
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export const initializeBLE = async () => {
  try {
    await BleManager.start({showAlert: false});
    console.log('BLE Manager initialized');
  } catch (error) {
    console.error('Error initializing BLE Manager:', error);
  }
};

export const requestPermissions = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'ios') {
      const bluetoothPermission = await request(PERMISSIONS.IOS.BLUETOOTH);

      if (bluetoothPermission === RESULTS.GRANTED) {
        console.log('Bluetooth permission granted (iOS)');
        return true;
      } else if (bluetoothPermission === RESULTS.DENIED) {
        console.log('Bluetooth permission denied (iOS)');
        Alert.alert(
          'Permission Denied',
          'Bluetooth permission is required to scan and connect to devices.',
        );
        return false;
      } else {
        console.log('Permission is null or unavailable (iOS)');
        return false;
      }
    } else if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      const allGranted = Object.values(granted).every(
        result => result === PermissionsAndroid.RESULTS.GRANTED,
      );

      if (allGranted) {
        console.log('Bluetooth permissions granted (Android)');
        return true;
      } else {
        console.log('Bluetooth permissions denied (Android)');
        Alert.alert(
          'Permission Denied',
          'Bluetooth and Location permissions are required to scan and connect to devices.',
        );
        return false;
      }
    }

    return false;
  } catch (error) {
    console.error('Error while requesting permissions:', error);
    Alert.alert('Error', 'Failed to request permissions.');
    return false;
  }
};

export const startScan = () => {
  return BleManager.scan([], 5, true)
    .then(() => console.log('Scanning started'))
    .catch(error => console.error('Error starting scan:', error));
};

export const connectToDevice = (deviceId: string) => {
  return BleManager.connect(deviceId)
    .then(() => console.log(`Connected to device: ${deviceId}`))
    .catch(error => console.error('Error connecting to device:', error));
};

export const disconnectFromDevice = (deviceId: string) => {
  return BleManager.disconnect(deviceId)
    .then(() => console.log(`Disconnected from device: ${deviceId}`))
    .catch(error => console.error('Error disconnecting from device:', error));
};

export const listenToEvents = (onDeviceDiscovered: (device: any) => void) => {
  const discoverListener = bleManagerEmitter.addListener(
    'BleManagerDiscoverPeripheral',
    onDeviceDiscovered,
  );

  const stopScanListener = bleManagerEmitter.addListener(
    'BleManagerStopScan',
    () => {
      console.log('Scan stopped');
    },
  );

  return () => {
    discoverListener.remove();
    stopScanListener.remove();
  };
};

let discoveredDevices: Array<{id: string; name: string | null}> = [];

export const initializeEventListeners = () => {
  const handleDiscoverPeripheral = (peripheral: any) => {
    if (!discoveredDevices.find(device => device.id === peripheral.id)) {
      discoveredDevices.push({
        id: peripheral.id,
        name: peripheral.name || 'Unknown Device',
      });
      console.log(`Discovered device: ${peripheral.name} (${peripheral.id})`);
    }
  };

  bleManagerEmitter.addListener(
    'BleManagerDiscoverPeripheral',
    handleDiscoverPeripheral,
  );

  bleManagerEmitter.addListener('BleManagerStopScan', () => {
    console.log('Scan stopped');
    Alert.alert('Scan Complete', 'Scanning for devices has finished.');
  });

  return () => {
    bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
    bleManagerEmitter.removeAllListeners('BleManagerStopScan');
  };
};

export const startScanning = async () => {
  try {
    console.log('Starting scan...');
    await BleManager.scan([], 5, true); // Scans for 5 seconds
    console.log('Scanning in progress...');
  } catch (error) {
    console.error('Error during scanning:', error);
    Alert.alert('Error', 'Failed to start scanning.');
  }
};

export const stopScanning = () => {
  BleManager.stopScan()
    .then(() => console.log('Scanning stopped'))
    .catch(error => console.error('Error stopping scan:', error));
};

// import {BleManager, Device} from 'react-native-ble-plx';
// import {Platform, PermissionsAndroid, Alert, Linking} from 'react-native';
// import NetInfo from '@react-native-community/netinfo';

// export const bleManager = new BleManager();

// // Request Bluetooth and location permissions (Android)
// export const requestPermissions = async (): Promise<boolean> => {
//   if (Platform.OS === 'android') {
//     const granted = await PermissionsAndroid.requestMultiple([
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//       PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//     ]);
//     console.log(granted);

//     const locationGranted =
//       granted['android.permission.ACCESS_FINE_LOCATION'] ===
//       PermissionsAndroid.RESULTS.GRANTED;
//     const bluetoothScanGranted =
//       granted['android.permission.BLUETOOTH_SCAN'] ===
//       PermissionsAndroid.RESULTS.GRANTED;
//     const bluetoothConnectGranted =
//       granted['android.permission.BLUETOOTH_CONNECT'] ===
//       PermissionsAndroid.RESULTS.GRANTED;

//     // Handle "Never ask again" scenario
//     if (granted['android.permission.BLUETOOTH_SCAN'] === 'never_ask_again') {
//       Alert.alert(
//         'Permission Required',
//         'Bluetooth Scan permission is required for the app to function. Please enable it from your app settings.',
//         [
//           {text: 'Go to Settings', onPress: () => Linking.openSettings()},
//           {text: 'Cancel', style: 'cancel'},
//         ],
//       );
//     }

//     const allGranted =
//       locationGranted && bluetoothScanGranted && bluetoothConnectGranted;

//     if (!allGranted) {
//       Alert.alert(
//         'Permission Denied',
//         'Bluetooth permissions are required for the app to function.',
//       );
//     }

//     return allGranted;
//   }

//   return true; // iOS permissions handled in Info.plist
// };

// // Listen for Bluetooth state changes (Android & iOS)
// export const setupBluetoothStateListener = (
//   setBluetoothState: React.Dispatch<React.SetStateAction<string>>,
// ) => {
//   bleManager.onStateChange(state => {
//     setBluetoothState(state);
//   }, true); // 'true' means this will start immediately when the listener is added
// };

// // Check if Bluetooth is enabled
// export const isBluetoothEnabled = async (): Promise<boolean> => {
//   const state = await bleManager.state();
//   return state === 'PoweredOn';
// };

// // Scan for nearby devices with timeout
// export const scanDevices = async (
//   onDeviceFound: (device: Device) => void,
//   timeout: number = 10000, // Default timeout of 10 seconds
// ) => {
//   let scanTimeout: NodeJS.Timeout;

//   // Start scanning for devices
//   const stopScanAfterTimeout = () => {
//     scanTimeout = setTimeout(() => {
//       stopScan();
//       console.log('Scan timed out');
//     }, timeout);
//   };

//   bleManager.startDeviceScan(null, null, (error, device) => {
//     if (error) {
//       console.error('Error scanning devices:', error);
//       clearTimeout(scanTimeout); // Stop timeout if scanning failed
//       return;
//     }
//     if (device) {
//       onDeviceFound(device); // Callback with found device
//     }
//   });

//   stopScanAfterTimeout(); // Start timeout to stop scan after defined period
// };

// // Connect to a Bluetooth device
// export const connectToDevice = async (
//   deviceId: string,
// ): Promise<Device | null> => {
//   try {
//     const device = await bleManager.connectToDevice(deviceId);
//     await device.discoverAllServicesAndCharacteristics();
//     return device;
//   } catch (error) {
//     console.error('Error connecting to device:', error);
//     return null;
//   }
// };

// // Stop scanning for devices
// export const stopScan = () => {
//   bleManager.stopDeviceScan();
// };

//////////////////////////
/////////////////////////

// export const requestPermissions = async () => {
//   if (Platform.OS === 'android') {
//     const scanPermission = await request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
//     const connectPermission = await request(
//       PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
//     );
//     const locationPermission = await request(
//       PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//     );

//     if (
//       scanPermission !== 'granted' ||
//       connectPermission !== 'granted' ||
//       locationPermission !== 'granted'
//     ) {
//       Alert.alert(
//         'Permission Error',
//         'Please enable Bluetooth and location permissions',
//       );
//     }
//   } else if (Platform.OS === 'ios') {
//     const bluetoothPermission = await request(PERMISSIONS.IOS.BLUETOOTH);
//     if (bluetoothPermission !== 'granted') {
//       Alert.alert(
//         'Permission Error',
//         'Please enable Bluetooth permissions in Settings.',
//       );
//     }
//   }
// };
