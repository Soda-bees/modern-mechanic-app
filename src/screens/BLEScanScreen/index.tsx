// doesnt deal with chunks
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
  TouchableOpacity,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {NativeEventEmitter, NativeModules} from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import {Buffer} from 'buffer';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const BLEScanScreen = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<any[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<string | null>(null);
  const [dtcs, setDtcs] = useState<string[]>([]);

  useEffect(() => {
    BleManager.start({showAlert: false}).then(() =>
      console.log('BLE Manager initialized'),
    );

    const handleDiscoverPeripheral = (peripheral: any) => {
      setDevices(prevDevices => {
        let updatedDevices = [...prevDevices];

        // Ensure "OBD2" stays in the list
        if (!updatedDevices.some(device => device.id === '66:1E:32:FA:19:FF')) {
          updatedDevices.push({id: '66:1E:32:FA:19:FF', name: 'OBD2'});
        }

        // Add newly discovered devices (avoid duplicates)
        if (!updatedDevices.some(device => device.id === peripheral.id)) {
          updatedDevices.push({
            id: peripheral.id,
            name: peripheral.name || 'Unknown Device',
          });
        }

        return updatedDevices;
      });
    };

    const handleStopScan = () => {
      console.log('Scan stopped');
      setIsScanning(false);
    };

    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);

    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
      bleManagerEmitter.removeAllListeners('BleManagerStopScan');
    };
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      return Object.values(granted).every(
        result => result === PermissionsAndroid.RESULTS.GRANTED,
      );
    }
    return true;
  };

  const startScanning = async () => {
    if (!(await requestPermissions())) {
      Alert.alert(
        'Permission Denied',
        'Bluetooth and Location permissions are required.',
      );
      return;
    }

    BluetoothStateManager.getState().then(state => {
      if (state === 'PoweredOff') {
        Alert.alert('Bluetooth Required', 'Turn on Bluetooth?', [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Turn On',
            onPress: () =>
              BluetoothStateManager.requestToEnable().then(scanForDevices),
          },
        ]);
      } else {
        scanForDevices();
      }
    });
  };

  const scanForDevices = () => {
    setIsScanning(true);
    BleManager.scan([], 5, true)
      .then(() => console.log('Scanning started'))
      .catch(error => {
        console.error('Error starting scan:', error);
        Alert.alert('Error', 'Failed to start scanning.');
      });
  };

  const connectToDevice = async (deviceId: string) => {
    try {
      await BleManager.connect(deviceId);
      console.log('Connected to:', deviceId);
      setConnectedDevice(deviceId);
      Alert.alert('Success', `Connected to ${deviceId}`);

      // **Ensure connected device stays in the list**
      setDevices(prevDevices => {
        let updatedDevices = [...prevDevices];

        // Ensure "OBD2" is always in the list
        if (!updatedDevices.some(device => device.id === '66:1E:32:FA:19:FF')) {
          updatedDevices.push({id: '66:1E:32:FA:19:FF', name: 'OBD2'});
        }

        // Ensure the connected device is added (even if it's already in the list)
        if (!updatedDevices.some(device => device.id === deviceId)) {
          updatedDevices.push({id: deviceId, name: 'Connected Device'});
        }

        return updatedDevices;
      });
    } catch (error) {
      console.error('Error connecting:', error);
      Alert.alert('Error', 'Failed to connect.');
    }
  };

  const readDTCs = async () => {
    if (!connectedDevice) {
      Alert.alert('Error', 'No device connected.');
      return;
    }

    // ✅ **First Try Using fff0 Service**
    let serviceUUID = 'fff0';
    let writeCharacteristicUUID = 'fff2';
    let notifyCharacteristicUUID = 'fff1';

    try {
      // ✅ **Enable Notifications**
      await BleManager.startNotification(
        connectedDevice,
        serviceUUID,
        notifyCharacteristicUUID,
      );
      // console.log("✅ Notifications enabled for:", notifyCharacteristicUUID);

      // **Give the Adapter Time to Prepare**
      await new Promise(resolve => setTimeout(resolve, 1000));

      ////LETS COMMENT THIS TOO
      const sendCommandString = async (command: string): Promise<string> => {
        return new Promise(async (resolve, reject) => {
          const commandBuffer = Buffer.from(`${command}\r`, 'utf-8'); // Add \r for carriage return
          let responseReceived = false;
          let dtcResStart = false;
          let responseBuffer: number[] = []; // Accumulate responses as byte array

          const subscription = bleManagerEmitter.addListener(
            'BleManagerDidUpdateValueForCharacteristic',
            ({value, characteristic}) => {
              console.log('Received value for characteristic:', characteristic);
              console.log('Raw value:', value);

              const responseString = Buffer.from(value)
                .toString('utf-8')
                .replace(/\s/g, '')
                .trim();

              // Remove invalid characters like '>', line breaks, etc.
              const cleanedResponse = responseString.replace(/[>\r\n]/g, '');
              console.log('response string is', responseString);
              console.log('Cleaned response:', cleanedResponse);
              console.log('----------------------------');

              // Check if response contains ':43' (indicating DTC codes)
              if (
                cleanedResponse.includes(':43') ||
                (cleanedResponse.startsWith('43') && dtcResStart == false)
              ) {
                dtcResStart = true;
              }

              // If we're in a DTC response, accumulate bytes
              if (dtcResStart) {
                responseBuffer.push(...value);
              }

              // Detect end of response with '>'
              if (responseString.includes('>')) {
                dtcResStart = false;

                let asciiString = '';
                let cleanedBuffer = '';
                responseBuffer.forEach(number => {
                  // Convert the number to its ASCII character
                  const char = String.fromCharCode(number);

                  // Append the character to the result string
                  if (!(char === '\r')) asciiString += char;
                  // cleanedBuffer+=char;
                });

                // Convert accumulated byte array to ASCII string
                const fullResponse = Buffer.from(
                  responseBuffer.filter(number => number !== 13),
                )
                  .toString('utf-8')
                  .trim();

                // Ensure it logs only once
                console.log('Full response received:');
                console.log(fullResponse);

                // Resolve only once and clear buffer
                if (!responseReceived) {
                  responseReceived = true;
                  subscription.remove();
                  resolve(fullResponse);
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
          console.log(`📤 Sent Command:`, command);

          // Set timeout for response handling
          setTimeout(() => {
            if (!responseReceived) {
              subscription.remove();
              reject(new Error(`⏳ Timeout waiting for response: ${command}`));
            }
          }, 8000); // 8-second timeout
        });
      };
      const sendCommand = async (command: string): Promise<number[]> => {
        return new Promise(async (resolve, reject) => {
          const commandBuffer = Buffer.from(`${command}\r`, 'utf-8'); // Add \r for carriage return
          let responseReceived = false;
          let dtcResStart = false;
          let responseBuffer: number[] = []; // Accumulate responses as byte array

          const subscription = bleManagerEmitter.addListener(
            'BleManagerDidUpdateValueForCharacteristic',
            ({value, characteristic}) => {
              console.log('Received value for characteristic:', characteristic);
              console.log('Raw value:', value);

              const responseString = Buffer.from(value)
                .toString('utf-8')
                .replace(/\s/g, '')
                .trim();

              // Remove invalid characters like '>', line breaks, etc.
              const cleanedResponse = responseString.replace(/[>\r\n]/g, '');
              console.log('response string is', responseString);
              console.log('Cleaned response:', cleanedResponse);
              console.log('----------------------------');

              // Check if response contains ':43' (indicating DTC codes)
              if (
                cleanedResponse.includes(':43') ||
                (cleanedResponse.startsWith('43') && dtcResStart == false)
              ) {
                dtcResStart = true;
              }

              // If we're in a DTC response, accumulate bytes
              if (dtcResStart) {
                responseBuffer.push(...value);
              }

              // Detect end of response with '>'
              if (responseString.includes('>')) {
                dtcResStart = false;

                let asciiString = '';
                let cleanedBuffer = '';
                responseBuffer.forEach(number => {
                  // Convert the number to its ASCII character
                  const char = String.fromCharCode(number);

                  // Append the character to the result string
                  if (!(char === '\r')) asciiString += char;
                  // cleanedBuffer+=char;
                });

                // Convert accumulated byte array to ASCII string
                const fullResponse = Buffer.from(
                  responseBuffer.filter(number => number !== 13),
                )
                  .toString('utf-8')
                  .trim();

                // Ensure it logs only once
                console.log('Full response received:');
                console.log(fullResponse);

                // Resolve only once and clear buffer
                if (!responseReceived) {
                  responseReceived = true;
                  subscription.remove();
                  resolve(responseBuffer);
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
          console.log(`📤 Sent Command:`, command);

          // Set timeout for response handling
          setTimeout(() => {
            if (!responseReceived) {
              subscription.remove();
              reject(new Error(`⏳ Timeout waiting for response: ${command}`));
            }
          }, 8000); // 8-second timeout
        });
      };

      console.log('🚀 Sending Wake-Up Command...');
      try {
        const wakeupResponse = await sendCommand('AT WS');
      } catch {
        console.warn('⚠️ AT WS command timed out (might not be needed).');
      }

      // ✅ **STEP 2: Test Adapter Info**
      try {
        const adapterInfo = await sendCommand('ATI');
        console.log('🚀 Adapter Info:', adapterInfo);
      } catch {
        console.warn('⚠️ ATI command timed out.');
      }

      // ✅ **STEP 3: Initialize the Adapter**
      const initCommands = ['ATZ', 'ATE0', 'ATL0', 'ATSP0'];
      for (const command of initCommands) {
        try {
          const response = await sendCommand(command);
          console.log(`✅ Response for ${command}: ${response}`);
        } catch {
          console.warn(`⚠️ Command ${command} timed out.`);
        }
      }

      console.log('🚀 ELM327 Initialized.');

      // ✅ **STEP 4: Send "Read DTCs" Command**
      const dtcResponse = await sendCommand('03');

      const parsedDTCs = parseDTCs(dtcResponse);
      setDtcs(parsedDTCs ?? []);
      console.log('now parsed dtcs are', parsedDTCs);

      if (parsedDTCs?.length === 0) {
        Alert.alert('No DTCs', 'No trouble codes found.');
      }
    } catch (error) {
      console.error('❌ Error reading DTCs:', error);
      Alert.alert('Error', 'Failed to read DTCs.');
    }
  };

  useEffect(() => {
    console.log('dtcs found:', JSON.stringify(dtcs));
  }, [dtcs]);

  const parseDTCs = (asciiCodes: number[]): string[] => {
    console.log('Provided ASCII codes:', asciiCodes);

    const dtcs: string[] = [];

    // Convert ASCII codes to a string
    const responseString = String.fromCharCode(...asciiCodes);

    // Clean the string by replacing unwanted characters (spaces, newlines, etc.)
    const cleanedString = responseString.replace(/\s+/g, ' ').trim();

    console.log('Converted String:', cleanedString);

    // Split the cleaned string into parts

    const testValues = [
      '00A',
      '0:',
      '43',
      '04',
      '01',
      '95',
      '01',
      '96',
      '1:',
      '01',
      '97',
      '01',
      '98',
      '00',
      '01',
      '00',
      '00',
      '>',
    ];

    const parts = cleanedString.split(' ');
    console.log('Converted Parts:', parts);

    // Find the index of "43" (DTC response indicator)
    const dtcIndex = parts.indexOf('43');

    if (dtcIndex !== -1 && dtcIndex + 1 < parts.length) {
      let i = dtcIndex + 2; // Skip the next value after "43"

      while (i + 1 < parts.length) {
        const firstByte = parts[i];
        const secondByte = parts[i + 1];

        // Stop processing if ">" is found
        if (firstByte === '>' || secondByte === '>') break;

        // Ensure valid numeric values (skip if containing special characters)
        if (/^\d{2}$/.test(firstByte) && /^\d{2}$/.test(secondByte)) {
          // Skip "00" values
          if (firstByte !== '00' || secondByte !== '00') {
            // Combine them into a DTC number
            const dtcTypeCode = parseInt(firstByte[0], 16);
            const dtcType = ['P', 'C', 'B', 'U'][(dtcTypeCode & 0xc0) >> 6];

            // Extract the last three digits of the DTC
            const dtcNumber = `${firstByte[1]}${secondByte[0]}${secondByte[1]}`;

            // Ensure the DTC number is valid (3 digits)
            if (/^\d{3}$/.test(dtcNumber)) {
              dtcs.push(`${dtcType}0${dtcNumber}`);
            }
          }
          i += 2; // Move to the next pair
        } else {
          i += 1; // Move to the next value
        }
      }
    }

    console.log('Returning DTCs:', dtcs);
    return dtcs;
  };

  const parseDTCsDepr = (response: string) => {
    console.log('parseDTCs called with: ', response);
    const dtcs = [];

    // Split the response into parts
    const parts = response.split(' ');

    // Look for the "43" prefix (DTC response)
    const dtcIndex = parts.indexOf('43');
    console.log('parts are: ', parts);

    if (dtcIndex !== -1) {
      // Extract the DTC codes after the "43" prefix
      for (let i = dtcIndex + 1; i + 1 < parts.length; i += 2) {
        const firstByte = parts[i];
        const secondByte = parts[i + 1];

        // Ensure we have valid bytes (each byte must be 2 characters long)
        if (
          firstByte &&
          secondByte &&
          firstByte.length === 2 &&
          secondByte.length === 2
        ) {
          // Extract the DTC type (P, C, B, U)
          const dtcTypeCode = parseInt(firstByte[0], 16);
          const dtcType = ['P', 'C', 'B', 'U'][(dtcTypeCode & 0xc0) >> 6]; // Corrected DTC type extraction

          // Extract the DTC number (last 3 digits)
          const dtcNumber = `${firstByte[1]}${secondByte[0]}${secondByte[1]}`;

          // Ensure the DTC number is valid (3 digits)
          if (/^\d{3}$/.test(dtcNumber)) {
            const dtcCode = `${dtcType}0${dtcNumber}`;
            dtcs.push(dtcCode);
          }
        }
      }
    }

    return dtcs;
  };

  // const parseDTCs = (asciiCodes: number[]) => {
  //   console.log('provided array: ', asciiCodes);
  //   // Convert ASCII codes to a string
  //   const responseString = String.fromCharCode(...asciiCodes);

  //   // Clean up the string by removing unwanted characters (spaces, newlines, etc.)
  //   const cleanedString = responseString.replace(/\s+/g, ' ').trim();

  //   console.log('parseDTCs called with cleaned string: ', cleanedString);

  //   const dtcs = [];

  //   // Split the cleaned string into parts
  //   const parts = cleanedString.split(' ');

  //   // Look for the "43" prefix (DTC response)
  //   const dtcIndex = parts.indexOf('43');
  //   console.log('parts are: ', parts);

  //   if (dtcIndex !== -1) {
  //     // Extract the DTC codes after the "43" prefix
  //     for (let i = dtcIndex + 1; i + 1 < parts.length; i += 2) {
  //       const firstByte = parts[i];
  //       const secondByte = parts[i + 1];

  //       // Ensure we have valid bytes (each byte must be 2 characters long)
  //       if (
  //         firstByte &&
  //         secondByte &&
  //         firstByte.length === 2 &&
  //         secondByte.length === 2
  //       ) {
  //         // Extract the DTC type (P, C, B, U)
  //         const dtcTypeCode = parseInt(firstByte[0], 16);
  //         const dtcType = ['P', 'C', 'B', 'U'][(dtcTypeCode & 0xc0) >> 6]; // Corrected DTC type extraction

  //         // Extract the DTC number (last 3 digits)
  //         const dtcNumber = `${firstByte[1]}${secondByte[0]}${secondByte[1]}`;

  //         // Ensure the DTC number is valid (3 digits)
  //         if (/^\d{3}$/.test(dtcNumber)) {
  //           const dtcCode = `${dtcType}0${dtcNumber}`;
  //           dtcs.push(dtcCode);
  //         }
  //       }
  //     }
  //   }
  //   console.log('returning dtcs: ', dtcs);
  //   return dtcs;
  // };

  // function parseDTCs(array: number[]): string[] {
  //   console.log(array);

  //   const result: string[] = [];
  //   let currentCode: string[] = [];
  //   let isParsingCode = false;

  //   for (let i = 0; i < array.length; i++) {
  //     const char = array[i];

  //     if (char === 13) {
  //       // Check for carriage return (ASCII 13)
  //       if (currentCode.length > 0) {
  //         // If there's a code being built, add it to the result
  //         result.push('P' + currentCode.join(''));
  //         currentCode = [];
  //         isParsingCode = false;
  //       }
  //     } else if (char >= 48 && char <= 57) {
  //       // Check for digits (ASCII 0-9)
  //       currentCode.push(String.fromCharCode(char));
  //       isParsingCode = true;
  //     } else if (char === 32 && isParsingCode) {
  //       // Space indicates separation between parts of a code
  //       continue;
  //     } else {
  //       isParsingCode = false;
  //     }
  //   }
  //   console.log('gpt function', result);

  //   return result;
  // }

  // function parseDTCs(array: number[]): string[] {
  //   const codes: string[] = [];
  //   let i = 0;

  //   while (i < array.length) {
  //     // Look for the sequence 48, 49, 32 (which corresponds to '0', '1', ' ')
  //     if (array[i] === 48 && array[i + 1] === 49 && array[i + 2] === 32) {
  //       // Extract the next two numbers which represent the code
  //       const codePart1 = array[i + 3];
  //       const codePart2 = array[i + 4];

  //       // Convert the numbers to characters and form the code
  //       const code = `P01${String.fromCharCode(codePart1)}${String.fromCharCode(
  //         codePart2,
  //       )}`;
  //       codes.push(code);

  //       // Move the index forward
  //       i += 5;
  //     } else {
  //       i++;
  //     }
  //   }

  //   return codes;
  // }

  const convertDTC = (hexCode: string): string => {
    // First hex digit determines the type of code
    const firstChar = ['P', 'C', 'B', 'U'][parseInt(hexCode[0], 16) >> 2];

    return `${firstChar}${hexCode[0]}${hexCode[1]}${hexCode[2]}${hexCode[3]}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BLE Scanner</Text>
      <Button
        title={isScanning ? 'Scanning...' : 'Start Scan'}
        onPress={startScanning}
        disabled={isScanning}
      />
      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.deviceContainer}
            onPress={() => connectToDevice(item.id)}>
            <Text style={styles.deviceName}>{item.name}</Text>
            <Text style={styles.deviceId}>{item.id}</Text>
          </TouchableOpacity>
        )}
      />
      {connectedDevice && <Button title="Read DTCs" onPress={readDTCs} />}
      <FlatList
        data={dtcs}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item}) => <Text style={styles.dtcItem}>{item}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#f5f5f5'},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  deviceContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deviceName: {fontSize: 18, fontWeight: 'bold'},
  deviceId: {fontSize: 14, color: '#555'},
  dtcItem: {fontSize: 16, color: 'red', marginVertical: 4, textAlign: 'center'},
});

export default BLEScanScreen;
