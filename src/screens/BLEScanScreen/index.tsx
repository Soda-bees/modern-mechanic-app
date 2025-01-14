import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
  TouchableOpacity,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {NativeEventEmitter, NativeModules} from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import {Buffer} from 'buffer'; // For parsing binary data.

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const BLEScanScreen = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<any[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<string | null>(null);
  const [dtcs, setDtcs] = useState<string[]>([]);
  const [serviceUUID, setServiceUUID] = useState<any>(null);
  const [characteristicUUID, setCharacteristicUUID] = useState<any>(null);

  useEffect(() => {
    // Initialize BLE Manager
    BleManager.start({showAlert: false}).then(() => {
      console.log('BLE Manager initialized');
    });

    const handleDiscoverPeripheral = (peripheral: any) => {
      console.log('Discovered peripheral:', peripheral);

      setDevices(prevDevices => {
        if (prevDevices.find(device => device.id === peripheral.id)) {
          return prevDevices;
        }
        return [
          ...prevDevices,
          {id: peripheral.id, name: peripheral.name || 'Unknown Device'},
        ];
      });
    };

    const handleStopScan = () => {
      console.log('Scan stopped');
      setIsScanning(false);
    };

    // Add event listeners
    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);

    // Cleanup on unmount
    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
      bleManagerEmitter.removeAllListeners('BleManagerStopScan');
    };
  }, [devices]);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      const allGranted = Object.values(granted).every(
        result => result === PermissionsAndroid.RESULTS.GRANTED,
      );

      if (!allGranted) {
        Alert.alert(
          'Permission Denied',
          'Bluetooth and Location permissions are required to scan for devices.',
        );
        return false;
      }
    }
    return true;
  };

  const startScanning = async () => {
    const permissionsGranted = await requestPermissions();
    if (!permissionsGranted) return;

    // Check if Bluetooth is on
    BluetoothStateManager.getState().then(bluetoothState => {
      if (bluetoothState === 'PoweredOff') {
        Alert.alert(
          'Bluetooth Required',
          'Bluetooth is turned off. Would you like to turn it on?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Turn On',
              onPress: () => {
                BluetoothStateManager.requestToEnable().then(() => {
                  scanForDevices();
                });
              },
            },
          ],
        );
      } else if (bluetoothState === 'PoweredOn') {
        scanForDevices();
      } else {
        Alert.alert('Error', 'Unable to determine Bluetooth state.');
      }
    });
  };

  const scanForDevices = () => {
    setDevices([]); // Clear previously discovered devices
    setIsScanning(true);

    BleManager.scan([], 5, true)
      .then(() => {
        console.log('Scanning started');
      })
      .catch(error => {
        console.error('Error starting scan:', error);
        Alert.alert('Error', 'Failed to start scanning.');
      });
  };

  const stopScanning = () => {
    BleManager.stopScan()
      .then(() => {
        console.log('Scanning stopped');
        setIsScanning(false);
      })
      .catch(error => {
        console.error('Error stopping scan:', error);
      });
  };

  const connectToDevice = async (deviceId: string) => {
    try {
      await BleManager.connect(deviceId);
      console.log('Connected to device:', deviceId);
      setConnectedDevice(deviceId);
      Alert.alert('Success', `Connected to ${deviceId}`);

      // Discover services and characteristics
      const deviceInfo = await getDeviceServices(deviceId);
      if (deviceInfo) {
        const {serviceUUID, characteristicUUID} = deviceInfo;
        console.log(
          'Discovered Service and Characteristic UUIDs:',
          serviceUUID,
          characteristicUUID,
        );

        // Save these UUIDs for later use
        setServiceUUID(serviceUUID);
        setCharacteristicUUID(characteristicUUID);
      } else {
        Alert.alert('Error', 'Failed to discover services or characteristics.');
      }
    } catch (error) {
      console.error('Error connecting to device:', error);
      Alert.alert('Error', 'Failed to connect to device.');
    }
  };

  const getDeviceServices = async (deviceId: string) => {
    try {
      const services = await BleManager.retrieveServices(deviceId);
      console.log('Retrieved services:', services);

      if (!services?.services && !services?.characteristics) {
        console.warn('No services or characteristics found:', services);
        Alert.alert(
          'Error',
          'No services or characteristics available for this device.',
        );
        return undefined;
      }

      // Log all services and characteristics
      const validServices = services?.services || [];
      const validCharacteristics = services?.characteristics || [];

      console.log('Available Services:', JSON.stringify(validServices));
      console.log(
        'Available Characteristics:',
        JSON.stringify(validCharacteristics),
      );

      // Update these UUIDs based on your device’s services and characteristics
      const targetService = validServices[0]?.uuid; // Assuming the first service
      const targetCharacteristic = validCharacteristics[0]?.characteristic; // Assuming the first characteristic

      if (targetService && targetCharacteristic) {
        console.log('Found Service UUID:', targetService);
        console.log('Found Characteristic UUID:', targetCharacteristic);

        return {
          serviceUUID: targetService,
          characteristicUUID: targetCharacteristic,
        };
      }

      console.warn('No matching service or characteristic found.');
      Alert.alert('Error', 'No matching service or characteristic found.');
      return undefined;
    } catch (error) {
      console.error('Error retrieving services:', error);
      Alert.alert('Error', 'Failed to retrieve services and characteristics.');
      return undefined;
    }
  };

  // const readDTCs = async () => {
  //   if (!connectedDevice) {
  //     Alert.alert('Error', 'No device connected.');
  //     return;
  //   }

  //   const serviceUUID = 'fff0'; // OBD-II service UUID
  //   const writeCharacteristicUUID = 'fff2'; // Writing commands
  //   const notifyCharacteristicUUID = 'fff1'; // Notifications for responses

  //   try {
  //     // Enable notifications for responses
  //     await BleManager.startNotification(
  //       connectedDevice,
  //       serviceUUID,
  //       notifyCharacteristicUUID,
  //     );
  //     console.log(
  //       'Notifications enabled for',
  //       serviceUUID,
  //       notifyCharacteristicUUID,
  //     );

  //     // Step 1: Initialize the ELM327 Adapter
  //     const initCommands = ['ATZ', 'ATE0', 'ATL0', 'ATSP0']; // Basic init commands
  //     for (const command of initCommands) {
  //       const commandBuffer = Buffer.from(`${command}\r`, 'utf-8'); // Add '\r' (carriage return)
  //       await BleManager.write(
  //         connectedDevice,
  //         serviceUUID,
  //         writeCharacteristicUUID,
  //         [...commandBuffer],
  //       );
  //       console.log(`Initialization command sent: ${command}`);
  //       await new Promise(resolve => setTimeout(resolve, 200)); // Delay between commands
  //     }

  //     console.log('ELM327 Adapter initialized.');

  //     // Step 2: Send the "Request DTCs" command (03 in hex)
  //     const dtcCommand = Buffer.from('03\r', 'utf-8'); // Add '\r' for carriage return
  //     await BleManager.write(
  //       connectedDevice,
  //       serviceUUID,
  //       writeCharacteristicUUID,
  //       [...dtcCommand],
  //     );
  //     console.log('DTC Request command sent.');

  //     // Step 3: Listen for responses
  //     bleManagerEmitter.addListener(
  //       'BleManagerDidUpdateValueForCharacteristic',
  //       ({value, characteristic}) => {
  //         console.log(value, characteristic);

  //         // if (characteristic === notifyCharacteristicUUID) {
  //         // console.log('Notification received:', value);

  //         // Parse the response
  //         const parsedDTCs = parseDTCs(value);
  //         setDtcs(parsedDTCs);

  //         if (parsedDTCs.length === 0) {
  //           Alert.alert('No DTCs', 'No Diagnostic Trouble Codes found.');
  //         } else {
  //           console.log('Parsed DTCs:', parsedDTCs);
  //         }
  //         // }
  //       },
  //     );
  //   } catch (error) {
  //     console.error('Error reading DTCs:', error);
  //     Alert.alert('Error', 'Failed to read DTCs.');
  //   }
  // };

  // Function to parse raw DTC response

  // const readDTCs = async (): Promise<void> => {
  //   // Ensure connectedDevice has the correct type
  //   const connectedDevice: Peripheral | null = connectToDevice(); // Replace with your logic
  //   if (!connectedDevice) {
  //     Alert.alert('Error', 'No device connected.');
  //     return;
  //   }

  //   const serviceUUID = 'fff0'; // OBD-II service UUID
  //   const writeCharacteristicUUID = 'fff2'; // Writing commands
  //   const notifyCharacteristicUUID = 'fff1'; // Notifications for responses

  //   try {
  //     await BleManager.startNotification(
  //       connectedDevice.id, // Ensure `connectedDevice.id` is a string
  //       serviceUUID,
  //       notifyCharacteristicUUID
  //     );

  //     const sendCommand = (command: string): Promise<string> => {
  //       return new Promise(async (resolve, reject) => {
  //         const commandBuffer = Buffer.from(`${command}\r`, 'utf-8'); // Ensure this is valid

  //         let responseReceived = false;
  //         let subscription: EmitterSubscription | null = null;

  //         subscription = bleManagerEmitter.addListener(
  //           'BleManagerDidUpdateValueForCharacteristic',
  //           ({
  //             value,
  //             characteristic,
  //           }: {
  //             value: number[];
  //             characteristic: string;
  //           }) => {
  //             if (characteristic === notifyCharacteristicUUID) {
  //               const response = Buffer.from(value).toString('utf-8');
  //               console.log(`Response for command ${command}:`, response);

  //               if (response.trim()) {
  //                 responseReceived = true;
  //                 subscription?.remove();
  //                 resolve(response.trim());
  //               }
  //             }
  //           }
  //         );

  //         await BleManager.write(
  //           connectedDevice.id,
  //           serviceUUID,
  //           writeCharacteristicUUID,
  //           [...commandBuffer]
  //         );

  //         setTimeout(() => {
  //           if (!responseReceived) {
  //             subscription?.remove();
  //             reject(new Error(`Timeout waiting for response to command: ${command}`));
  //           }
  //         }, 2000);
  //       });
  //     };

  //     const initCommands = ['ATZ', 'ATE0', 'ATL0', 'ATSP0'];
  //     for (const command of initCommands) {
  //       const response = await sendCommand(command);
  //       console.log(`Response for ${command}: ${response}`);
  //     }

  //     const dtcResponse = await sendCommand('03');
  //     console.log('DTC Response:', dtcResponse);

  //     // const parsedDTCs = parseDTCs(dtcResponse);
  //     // setDtcs(parsedDTCs);

  //     // if (parsedDTCs.length === 0) {
  //     //   Alert.alert('No DTCs', 'No Diagnostic Trouble Codes found.');
  //     // } else {
  //     //   console.log('Parsed DTCs:', parsedDTCs);
  //     // }
  //   } catch (error) {
  //     console.error('Error reading DTCs:', error);
  //     Alert.alert('Error', 'Failed to read DTCs.');
  //   }
  // };

  // const readDTCs = async () => {
  //   if (!connectedDevice) {
  //     Alert.alert('Error', 'No device connected.');
  //     return;
  //   }

  //   const serviceUUID = 'fff0'; // OBD-II service UUID
  //   const writeCharacteristicUUID = 'fff2'; // Writing commands
  //   const notifyCharacteristicUUID = 'fff1'; // Notifications for responses

  //   try {
  //     // Enable notifications for responses
  //     await BleManager.startNotification(
  //       connectedDevice,
  //       serviceUUID,
  //       notifyCharacteristicUUID,
  //     );
  //     console.log(
  //       'Notifications enabled for',
  //       serviceUUID,
  //       notifyCharacteristicUUID,
  //     );

  //     // Function to send a command and wait for its response
  //     const sendCommand = (command: string) => {
  //       return new Promise(async (resolve, reject) => {
  //         const commandBuffer = Buffer.from(`${command}\r`, 'utf-8');
  //         let responseReceived = false;

  //         // Listener for the response
  //         const subscription = bleManagerEmitter.addListener(
  //           'BleManagerDidUpdateValueForCharacteristic',
  //           ({ value, characteristic }) => {
  //             if (characteristic === notifyCharacteristicUUID) {
  //               const response = Buffer.from(value).toString('utf-8');
  //               console.log(`Response for command ${command}:`, response);

  //               if (response.trim()) {
  //                 responseReceived = true;
  //                 subscription.remove(); // Remove the listener
  //                 resolve(response.trim());
  //               }
  //             }
  //           },
  //         );

  //         // Send the command
  //         await BleManager.write(
  //           connectedDevice,
  //           serviceUUID,
  //           writeCharacteristicUUID,
  //           [...commandBuffer],
  //         );
  //         console.log(`Command sent: ${command}`);

  //         // Timeout in case no response is received
  //         setTimeout(() => {
  //           if (!responseReceived) {
  //             subscription.remove(); // Clean up listener
  //             reject(new Error(`Timeout waiting for response to command: ${command}`));
  //           }
  //         }, 2000); // Adjust timeout as needed
  //       });
  //     };

  //     // Step 1: Initialize the ELM327 Adapter
  //     const initCommands = ['ATZ', 'ATE0', 'ATL0', 'ATSP0']; // Basic init commands
  //     for (const command of initCommands) {
  //       const response = await sendCommand(command);
  //       console.log(`Response for ${command}: ${response}`);
  //     }

  //     console.log('ELM327 Adapter initialized.');

  //     // Step 2: Send the "Request DTCs" command (03 in hex)
  //     const dtcResponse = await sendCommand('03');
  //     console.log('DTC Response:', dtcResponse);

  //     // Step 3: Parse the DTC response
  //     const parsedDTCs = parseDTCs(dtcResponse);
  //     setDtcs(parsedDTCs);

  //     if (parsedDTCs.length === 0) {
  //       Alert.alert('No DTCs', 'No Diagnostic Trouble Codes found.');
  //     } else {
  //       console.log('Parsed DTCs:', parsedDTCs);
  //     }
  //   } catch (error) {
  //     console.error('Error reading DTCs:', error);
  //     Alert.alert('Error', 'Failed to read DTCs.');
  //   }
  // };

  const readDTCs = async () => {
    if (!connectedDevice) {
      Alert.alert('Error', 'No device connected.');
      return;
    }

    const serviceUUID = 'fff0'; // OBD-II service UUID
    const writeCharacteristicUUID = 'fff2'; // Writing commands
    const notifyCharacteristicUUID = 'fff1'; // Notifications for responses

    try {
      // Enable notifications for responses
      await BleManager.startNotification(
        connectedDevice,
        serviceUUID,
        notifyCharacteristicUUID,
      );
      console.log(
        'Notifications enabled for',
        serviceUUID,
        notifyCharacteristicUUID,
      );

      // Function to send a command and wait for its response
      const sendCommand = (command: string): Promise<string> => {
        return new Promise(async (resolve, reject) => {
          const commandBuffer = Buffer.from(`${command}\r`, 'utf-8');
          let responseReceived = false;

          // Listener for the response
          const subscription = bleManagerEmitter.addListener(
            'BleManagerDidUpdateValueForCharacteristic',
            ({
              value,
              characteristic,
            }: {
              value: number[]; // Explicitly typing `value` as a number array
              characteristic: string;
            }) => {
              if (characteristic === notifyCharacteristicUUID) {
                const response = Buffer.from(value).toString('utf-8'); // Convert `number[]` to string
                console.log(`Response for command ${command}:`, response);

                if (response.trim()) {
                  responseReceived = true;
                  subscription.remove(); // Remove the listener
                  resolve(response.trim());
                }
              }
            },
          );

          // Send the command
          await BleManager.write(
            connectedDevice,
            serviceUUID,
            writeCharacteristicUUID,
            [...commandBuffer],
          );
          console.log(`Command sent: ${command}`);

          // Timeout in case no response is received
          setTimeout(() => {
            if (!responseReceived) {
              subscription.remove(); // Clean up listener
              reject(
                new Error(
                  `Timeout waiting for response to command: ${command}`,
                ),
              );
            }
          }, 2000); // Adjust timeout as needed
        });
      };

      // Step 1: Initialize the ELM327 Adapter
      const initCommands = ['ATZ', 'ATE0', 'ATL0', 'ATSP0']; // Basic init commands
      for (const command of initCommands) {
        const response = await sendCommand(command);
        console.log(`Response for ${command}: ${response}`);
      }

      console.log('ELM327 Adapter initialized.');

      // Step 2: Send the "Request DTCs" command (03 in hex)
      const dtcResponse = await sendCommand('03');
      console.log('DTC Response:', dtcResponse);

      // Step 3: Parse the DTC response
      const parsedDTCs = parseDTCs(dtcResponse); // Ensure `parseDTCs` accepts a string
      setDtcs(parsedDTCs);

      if (parsedDTCs.length === 0) {
        Alert.alert('No DTCs', 'No Diagnostic Trouble Codes found.');
      } else {
        console.log('Parsed DTCs:', parsedDTCs);
      }
    } catch (error) {
      console.error('Error reading DTCs:', error);
      Alert.alert('Error', 'Failed to read DTCs.');
    }
  };

  const parseDTCs = (data: ArrayBuffer | string): string[] => {
    let buffer: Uint8Array;

    // Check if input is an ArrayBuffer or a string
    if (typeof data === 'string') {
      // Convert string to Uint8Array
      buffer = new Uint8Array(data.split('').map(char => char.charCodeAt(0)));
    } else if (data instanceof ArrayBuffer) {
      // Convert ArrayBuffer to Uint8Array
      buffer = new Uint8Array(data);
    } else {
      console.error('Unsupported data type');
      return [];
    }

    console.log('Parsed buffer:', buffer);

    // Check if the response starts with 0x43 (indicates DTC data)
    if (buffer[0] !== 0x43) {
      console.warn('Unexpected response type:', buffer[0]);
      return [];
    }

    // Parse DTCs from the response
    const dtcs: string[] = [];
    for (let i = 1; i < buffer.length; i += 2) {
      // Check for end of DTC list (0x00 0x00 indicates no more codes)
      if (buffer[i] === 0x00 && buffer[i + 1] === 0x00) {
        break;
      }

      // Construct the DTC code using hexadecimal values
      const dtc =
        String.fromCharCode(65 + ((buffer[i] >> 4) & 0x0f)) + // First character (A-P)
        (buffer[i] & 0x0f).toString() + // Second character (0-9)
        ((buffer[i + 1] >> 4) & 0x0f).toString() + // Third character (0-9)
        (buffer[i + 1] & 0x0f).toString(); // Fourth character (0-9)

      dtcs.push(dtc);
    }

    return dtcs;
  };

  // const readDTCs = async () => {
  //   if (!connectedDevice) {
  //     Alert.alert('Error', 'No device connected.');
  //     return;
  //   }

  //   const serviceUUID = 'fff0'; // OBD-II service UUID
  //   const writeCharacteristicUUID = 'fff2'; // Writing commands
  //   const notifyCharacteristicUUID = 'fff1'; // Notifications for responses

  //   try {
  //     // Enable notifications for responses
  //     await BleManager.startNotification(
  //       connectedDevice,
  //       serviceUUID,
  //       notifyCharacteristicUUID,
  //     );
  //     console.log(
  //       'Notifications enabled for',
  //       serviceUUID,
  //       notifyCharacteristicUUID,
  //     );

  //     // Step 1: Initialize the ELM327 Adapter
  //     const initCommands = ['ATZ', 'ATE0', 'ATL0', 'ATSP0']; // Basic init commands
  //     for (const command of initCommands) {
  //       const commandBuffer = Buffer.from(`${command}\r`, 'utf-8'); // Add '\r' (carriage return)
  //       await BleManager.write(
  //         connectedDevice,
  //         serviceUUID,
  //         writeCharacteristicUUID,
  //         [...commandBuffer],
  //       );
  //       console.log(`Initialization command sent: ${command}`);
  //       await new Promise(resolve => setTimeout(resolve, 200)); // Delay between commands
  //     }

  //     console.log('ELM327 Adapter initialized.');

  //     // Step 2: Send the "Request DTCs" command (03 in hex)
  //     const dtcCommand = Buffer.from('03\r', 'utf-8'); // Add '\r' for carriage return
  //     await BleManager.write(
  //       connectedDevice,
  //       serviceUUID,
  //       writeCharacteristicUUID,
  //       [...dtcCommand],
  //     );
  //     console.log('DTC Request command sent.');

  //     // Step 3: Listen for responses
  //     bleManagerEmitter.addListener(
  //       'BleManagerDidUpdateValueForCharacteristic',
  //       ({value, characteristic}) => {
  //         console.log(value, characteristic);

  //         // if (characteristic === notifyCharacteristicUUID) {
  //         // console.log('Notification received:', value);

  //         // Parse the response
  //         const parsedDTCs = parseDTCs(value);
  //         setDtcs(parsedDTCs);

  //         if (parsedDTCs.length === 0) {
  //           Alert.alert('No DTCs', 'No Diagnostic Trouble Codes found.');
  //         } else {
  //           console.log('Parsed DTCs:', parsedDTCs);
  //         }
  //         // }
  //       },
  //     );
  //   } catch (error) {
  //     console.error('Error reading DTCs:', error);
  //     Alert.alert('Error', 'Failed to read DTCs.');
  //   }
  // };

  // // Function to parse raw DTC response
  // const parseDTCs = (data: ArrayBuffer): string[] => {
  //   // Convert ArrayBuffer to Uint8Array for easier manipulation
  //   const buffer = new Uint8Array(data);
  //   console.log('bufferrrrrrrr', buffer);

  //   // Ensure the response starts with 0x43 (indicates DTCs)
  //   // if (buffer[0] !== 0x43) {
  //   //   console.warn('Unexpected response type:', buffer[0]);
  //   //   return [];
  //   // }

  //   // Parse DTCs from the response
  //   const dtcs: string[] = [];
  //   for (let i = 1; i < buffer.length; i += 2) {
  //     if (buffer[i] === 0x00 && buffer[i + 1] === 0x00) {
  //       break; // End of DTC list
  //     }
  //     const dtc =
  //       String.fromCharCode(65 + ((buffer[i] >> 4) & 0x0f)) + // First character
  //       (buffer[i] & 0x0f).toString() + // Second character
  //       ((buffer[i + 1] >> 4) & 0x0f).toString() + // Third character
  //       (buffer[i + 1] & 0x0f).toString(); // Fourth character
  //     dtcs.push(dtc);
  //   }

  //   return dtcs;
  // };

  const openBluetoothSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('App-Prefs:Bluetooth').catch(() => {
        console.log('Could not open Bluetooth settings on iOS');
      });
    } else {
      AndroidOpenSettings.bluetoothSettings();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BLE Scanner</Text>
      <View style={styles.buttonContainer}>
        <Button
          title={isScanning ? 'Scanning...' : 'Start Scanning'}
          onPress={startScanning}
          disabled={isScanning}
        />
        <Button
          title="Stop Scanning"
          onPress={stopScanning}
          disabled={!isScanning}
        />
      </View>
      <FlatList
        data={devices}
        keyExtractor={(item, index) => item.id || `device-${index}`}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.deviceContainer}
            onPress={() => connectToDevice(item.id)}>
            <Text style={styles.deviceName}>{item.name}</Text>
            <Text style={styles.deviceId}>{item.id}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No devices found</Text>}
      />
      {connectedDevice && (
        <>
          <Text style={styles.connectedDevice}>
            Connected to: {connectedDevice}
          </Text>
          <Button title="Read DTCs" onPress={readDTCs} />
          <FlatList
            data={dtcs}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({item}) => <Text style={styles.dtcItem}>{item}</Text>}
            ListEmptyComponent={<Text>No DTCs found</Text>}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  deviceContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deviceId: {
    fontSize: 14,
    color: '#555',
  },
  connectedDevice: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  dtcItem: {
    fontSize: 16,
    color: 'red',
    marginVertical: 4,
    textAlign: 'center',
  },
});

export default BLEScanScreen;

// old code complete

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   Button,
//   FlatList,
//   StyleSheet,
//   PermissionsAndroid,
//   Platform,
//   Alert,
//   Linking,
//   TouchableOpacity,
// } from 'react-native';
// import BleManager from 'react-native-ble-manager';
// import {NativeEventEmitter, NativeModules} from 'react-native';
// import AndroidOpenSettings from 'react-native-android-open-settings';
// import BluetoothStateManager from 'react-native-bluetooth-state-manager';
// import {Buffer} from 'buffer'; // For parsing binary data.

// const BleManagerModule = NativeModules.BleManager;
// const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// const BLEScanScreen = () => {
//   const [isScanning, setIsScanning] = useState(false);
//   const [devices, setDevices] = useState<any[]>([]);
//   const [connectedDevice, setConnectedDevice] = useState<string | null>(null);
//   const [dtcs, setDtcs] = useState<string[]>([]);
//   const [serviceUUID, setServiceUUID] = useState<any>(null);
//   const [characteristicUUID, setCharacteristicUUID] = useState<any>(null);

//   useEffect(() => {
//     // Initialize BLE Manager
//     BleManager.start({showAlert: false}).then(() => {
//       console.log('BLE Manager initialized');
//     });

//     const handleDiscoverPeripheral = (peripheral: any) => {
//       console.log('Discovered peripheral:', peripheral);

//       setDevices(prevDevices => {
//         if (prevDevices.find(device => device.id === peripheral.id)) {
//           return prevDevices;
//         }
//         return [
//           ...prevDevices,
//           {id: peripheral.id, name: peripheral.name || 'Unknown Device'},
//         ];
//       });
//     };

//     const handleStopScan = () => {
//       console.log('Scan stopped');
//       setIsScanning(false);
//     };

//     // Add event listeners
//     bleManagerEmitter.addListener(
//       'BleManagerDiscoverPeripheral',
//       handleDiscoverPeripheral,
//     );
//     bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);

//     // Cleanup on unmount
//     return () => {
//       bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
//       bleManagerEmitter.removeAllListeners('BleManagerStopScan');
//     };
//   }, [devices]);

//   const requestPermissions = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       ]);

//       const allGranted = Object.values(granted).every(
//         result => result === PermissionsAndroid.RESULTS.GRANTED,
//       );

//       if (!allGranted) {
//         Alert.alert(
//           'Permission Denied',
//           'Bluetooth and Location permissions are required to scan for devices.',
//         );
//         return false;
//       }
//     }
//     return true;
//   };

//   const startScanning = async () => {
//     const permissionsGranted = await requestPermissions();
//     if (!permissionsGranted) return;

//     // Check if Bluetooth is on
//     BluetoothStateManager.getState().then(bluetoothState => {
//       if (bluetoothState === 'PoweredOff') {
//         Alert.alert(
//           'Bluetooth Required',
//           'Bluetooth is turned off. Would you like to turn it on?',
//           [
//             {
//               text: 'Cancel',
//               style: 'cancel',
//             },
//             {
//               text: 'Turn On',
//               onPress: () => {
//                 BluetoothStateManager.requestToEnable().then(() => {
//                   scanForDevices();
//                 });
//               },
//             },
//           ],
//         );
//       } else if (bluetoothState === 'PoweredOn') {
//         scanForDevices();
//       } else {
//         Alert.alert('Error', 'Unable to determine Bluetooth state.');
//       }
//     });
//   };

//   const scanForDevices = () => {
//     setDevices([]); // Clear previously discovered devices
//     setIsScanning(true);

//     BleManager.scan([], 5, true)
//       .then(() => {
//         console.log('Scanning started');
//       })
//       .catch(error => {
//         console.error('Error starting scan:', error);
//         Alert.alert('Error', 'Failed to start scanning.');
//       });
//   };

//   const stopScanning = () => {
//     BleManager.stopScan()
//       .then(() => {
//         console.log('Scanning stopped');
//         setIsScanning(false);
//       })
//       .catch(error => {
//         console.error('Error stopping scan:', error);
//       });
//   };

//   const connectToDevice = async (deviceId: string) => {
//     try {
//       await BleManager.connect(deviceId);
//       console.log('Connected to device:', deviceId);
//       setConnectedDevice(deviceId);
//       Alert.alert('Success', `Connected to ${deviceId}`);

//       // Discover services and characteristics
//       const deviceInfo = await getDeviceServices(deviceId);
//       if (deviceInfo) {
//         const {serviceUUID, characteristicUUID} = deviceInfo;
//         console.log(
//           'Discovered Service and Characteristic UUIDs:',
//           serviceUUID,
//           characteristicUUID,
//         );

//         // Save these UUIDs for later use
//         setServiceUUID(serviceUUID);
//         setCharacteristicUUID(characteristicUUID);
//       } else {
//         Alert.alert('Error', 'Failed to discover services or characteristics.');
//       }
//     } catch (error) {
//       console.error('Error connecting to device:', error);
//       Alert.alert('Error', 'Failed to connect to device.');
//     }
//   };

//   const getDeviceServices = async (deviceId: string) => {
//     try {
//       const services = await BleManager.retrieveServices(deviceId);
//       console.log('Retrieved services:', services);

//       if (!services?.services && !services?.characteristics) {
//         console.warn('No services or characteristics found:', services);
//         Alert.alert(
//           'Error',
//           'No services or characteristics available for this device.',
//         );
//         return undefined;
//       }

//       // Log all services and characteristics
//       const validServices = services?.services || [];
//       const validCharacteristics = services?.characteristics || [];

//       console.log('Available Services:', JSON.stringify(validServices));
//       console.log(
//         'Available Characteristics:',
//         JSON.stringify(validCharacteristics),
//       );

//       // Update these UUIDs based on your device’s services and characteristics
//       // const targetService = validServices[0]?.uuid; // Assuming the first service
//       // const targetCharacteristic = validCharacteristics[0]?.characteristic; // Assuming the first characteristic

//       const targetService = validServices.find(
//         service => service.uuid === 'fff0',
//       );
//       const targetCharacteristic = validCharacteristics.find(
//         char => char.characteristic === 'fff2',
//       );

//       if (targetService && targetCharacteristic) {
//         console.log('Found Service UUID:', targetService);
//         console.log('Found Characteristic UUID:', targetCharacteristic);

//         return {
//           serviceUUID: targetService,
//           characteristicUUID: targetCharacteristic,
//         };
//       }

//       console.warn('No matching service or characteristic found.');
//       Alert.alert('Error', 'No matching service or characteristic found.');
//       return undefined;
//     } catch (error) {
//       console.error('Error retrieving services:', error);
//       Alert.alert('Error', 'Failed to retrieve services and characteristics.');
//       return undefined;
//     }
//   };

//   const readDTCs = async () => {
//     if (!connectedDevice) {
//       Alert.alert('Error', 'No device connected.');
//       return;
//     }

//     const serviceUUID = 'fff0'; // OBD-II service UUID
//     const writeCharacteristicUUID = 'fff2'; // Writing commands
//     const notifyCharacteristicUUID = 'fff1'; // Notifications for responses

//     try {
//       // Enable notifications for responses
//       await BleManager.startNotification(
//         connectedDevice,
//         serviceUUID,
//         notifyCharacteristicUUID,
//       );
//       console.log(
//         'Notifications enabled for',
//         serviceUUID,
//         notifyCharacteristicUUID,
//       );

//       // Step 1: Initialize the ELM327 Adapter
//       const initCommands = ['ATZ', 'ATE0', 'ATL0', 'ATSP0']; // Basic init commands
//       for (const command of initCommands) {
//         const commandBuffer = Buffer.from(`${command}\r`, 'utf-8'); // Add '\r' (carriage return)
//         await BleManager.write(
//           connectedDevice,
//           serviceUUID,
//           writeCharacteristicUUID,
//           [...commandBuffer],
//         );
//         console.log(`Initialization command sent: ${command}`);
//         await new Promise(resolve => setTimeout(resolve, 200)); // Delay between commands
//       }

//       console.log('ELM327 Adapter initialized.');

//       // Step 2: Send the "Request DTCs" command (03 in hex)
//       const dtcCommand = Buffer.from('03\r', 'utf-8'); // Add '\r' for carriage return
//       await BleManager.write(
//         connectedDevice,
//         serviceUUID,
//         writeCharacteristicUUID,
//         [...dtcCommand],
//       );
//       console.log('DTC Request command sent.');

//       // Step 3: Listen for responses
//       bleManagerEmitter.addListener(
//         'BleManagerDidUpdateValueForCharacteristic',
//         ({value, characteristic}) => {
//           console.log(value, characteristic);

//           // if (characteristic === notifyCharacteristicUUID) {
//           // console.log('Notification received:', value);

//           // Parse the response
//           const parsedDTCs = parseDTCs(value);
//           setDtcs(parsedDTCs);

//           if (parsedDTCs.length === 0) {
//             Alert.alert('No DTCs', 'No Diagnostic Trouble Codes found.');
//           } else {
//             console.log('Parsed DTCs:', parsedDTCs);
//           }
//           // }
//         },
//       );
//     } catch (error) {
//       console.error('Error reading DTCs:', error);
//       Alert.alert('Error', 'Failed to read DTCs.');
//     }
//   };

//   // Function to parse raw DTC response
//   const parseDTCs = (data: ArrayBuffer): string[] => {
//     // Convert ArrayBuffer to Uint8Array for easier manipulation
//     const buffer = new Uint8Array(data);
//     console.log('bufferrrrrrrr', buffer);

//     // Ensure the response starts with 0x43 (indicates DTCs)
//     if (buffer[0] !== 0x43) {
//       console.warn('Unexpected response type:', buffer[0]);
//       return [];
//     }

//     // Parse DTCs from the response
//     const dtcs: string[] = [];
//     for (let i = 1; i < buffer.length; i += 2) {
//       if (buffer[i] === 0x00 && buffer[i + 1] === 0x00) {
//         break; // End of DTC list
//       }
//       const dtc =
//         String.fromCharCode(65 + ((buffer[i] >> 4) & 0x0f)) + // First character
//         (buffer[i] & 0x0f).toString() + // Second character
//         ((buffer[i + 1] >> 4) & 0x0f).toString() + // Third character
//         (buffer[i + 1] & 0x0f).toString(); // Fourth character
//       dtcs.push(dtc);
//     }

//     return dtcs;
//   };

//   const openBluetoothSettings = () => {
//     if (Platform.OS === 'ios') {
//       Linking.openURL('App-Prefs:Bluetooth').catch(() => {
//         console.log('Could not open Bluetooth settings on iOS');
//       });
//     } else {
//       AndroidOpenSettings.bluetoothSettings();
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>BLE Scanner</Text>
//       <View style={styles.buttonContainer}>
//         <Button
//           title={isScanning ? 'Scanning...' : 'Start Scanning'}
//           onPress={startScanning}
//           disabled={isScanning}
//         />
//         <Button
//           title="Stop Scanning"
//           onPress={stopScanning}
//           disabled={!isScanning}
//         />
//       </View>
//       <FlatList
//         data={devices}
//         keyExtractor={(item, index) => item.id || `device-${index}`}
//         renderItem={({item}) => (
//           <TouchableOpacity
//             style={styles.deviceContainer}
//             onPress={() => connectToDevice(item.id)}>
//             <Text style={styles.deviceName}>{item.name}</Text>
//             <Text style={styles.deviceId}>{item.id}</Text>
//           </TouchableOpacity>
//         )}
//         ListEmptyComponent={<Text>No devices found</Text>}
//       />
//       {connectedDevice && (
//         <>
//           <Text style={styles.connectedDevice}>
//             Connected to: {connectedDevice}
//           </Text>
//           <Button title="Read DTCs" onPress={readDTCs} />
//           <FlatList
//             data={dtcs}
//             keyExtractor={(item, index) => `${item}-${index}`}
//             renderItem={({item}) => <Text style={styles.dtcItem}>{item}</Text>}
//             ListEmptyComponent={<Text>No DTCs found</Text>}
//           />
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 20,
//   },
//   deviceContainer: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   deviceName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   deviceId: {
//     fontSize: 14,
//     color: '#555',
//   },
//   connectedDevice: {
//     marginTop: 20,
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'green',
//   },
//   dtcItem: {
//     fontSize: 16,
//     color: 'red',
//     marginVertical: 4,
//     textAlign: 'center',
//   },
// });

// export default BLEScanScreen;
