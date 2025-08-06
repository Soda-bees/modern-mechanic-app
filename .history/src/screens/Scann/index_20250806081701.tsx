import React, {useEffect, useMemo, useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  NativeEventEmitter,
  NativeModules,
  Button,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {colors} from '../../services/utilities';
import OrangeButton from '../../components/OrangeButton';
import {RootStackParamList} from '../../services/config/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import BleManager from 'react-native-ble-manager';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import {Buffer} from 'buffer';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../../store/userSlice';
import {processDtcs} from '../../services/config/API';
import {selectAuthToken} from '../../store/authSlice';
import {AppDispatch} from '../../store';
import {selectDtcReport, setDtcReport} from '../../store/dtcReportSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
interface Device {
  id: string;
  name: string;
}

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'ScanResult',
  'ScanResultDemo'
>;
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const Scann: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const authToken = useSelector(selectAuthToken);
  const userData = useSelector(selectUserData);
  const dtcReport = useSelector(selectDtcReport);
  const dispatch: AppDispatch = useDispatch();
  const [index, setIndex] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');
  const [devices, setDevices] = useState<Device[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [connectedDevice, setConnectedDevice] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [dtcs, setDtcs] = useState<string[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<boolean>(false);
  const car = useMemo(() => {
    return userData?.cars?.find(car => car.selected);
  }, [userData]);
  const seenDevices = new Set<string>(); // To avoid duplicate devices

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

  const handleScan = () => {
    navigation.navigate('ScanResult');
  };

  useEffect(() => {
    const disconnectConnectedDevices = async () => {
      try {
        const connectedDevices = await BleManager.getConnectedPeripherals([]);

        if (connectedDevices.length === 0) {
          console.log('No connected devices found.');
          return;
        }

        for (const device of connectedDevices) {
          await BleManager.disconnect(device.id);
          console.log(
            `Disconnected device: ${device.name || 'Unknown'} (${device.id})`,
          );
        }

        // Alert.alert(
        //   'Disconnected',
        //   'All connected Bluetooth devices have been disconnected.',
        // );
      } catch (error) {
        console.error('Error disconnecting devices:', error);
        Alert.alert('Error', 'Failed to disconnect devices.');
      }
    };

    disconnectConnectedDevices();
  }, []);

  const handleScanDevices = async () => {
    if (!isScanning) {
      try {
        setIsScanning(true);
        setDevices([]); // Clear previous devices

        if (!(await requestPermissions())) {
          Alert.alert(
            'Permission Denied',
            'Bluetooth and Location permissions are required.',
          );
          setIsScanning(false);
          return;
        }

        const state = await BluetoothStateManager.getState();
        if (state === 'PoweredOff') {
          Alert.alert('Bluetooth Required', 'Turn on Bluetooth?', [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Turn On',
              onPress: async () => {
                await BluetoothStateManager.requestToEnable();
                await initializeBleManager();
                scanForDevices();
              },
            },
          ]);
        } else {
          await initializeBleManager();
          scanForDevices();
        }
      } catch (error) {
        setIsScanning(false);
        console.error('Error during scan:', error);
        Alert.alert('Error', 'Unable to scan for devices.');
      }
    }
  };

  const initializeBleManager = async () => {
    await BleManager.start({showAlert: false});
    console.log('BLE Manager initialized');

    bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
    bleManagerEmitter.removeAllListeners('BleManagerStopScan');

    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
  };

  const handleDiscoverPeripheral = (peripheral: any) => {
    if (peripheral.name === 'OBDII') {
      setDevices([{id: peripheral.id, name: peripheral.name}]);
      stopScanning();
    }
  };

  const scanForDevices = () => {
    setIsScanning(true);
    BleManager.scan([], 3, true)
      .then(() => console.log('Scanning started for 3 seconds'))
      .catch(error => {
        console.error('Error starting scan:', error);
        Alert.alert('Error', 'Failed to start scanning.');
        setIsScanning(false);
      });

    setTimeout(() => {
      stopScanning();
    }, 3000); // Automatically stop scanning after 3 seconds
  };

  const stopScanning = () => {
    BleManager.stopScan()
      .then(() => {
        console.log('Scan stopped');
        setIsScanning(false);
      })
      .catch(error => {
        console.error('Error stopping scan:', error);
        setIsScanning(false);
      });
  };

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

  const connectToDevice = async (deviceId: string) => {
    try {
      setConnecting(true);
      await BleManager.connect(deviceId);
      console.log('Connected to:', deviceId);
      setConnectedDevice(deviceId);
      setIsConnected(true);
      setConnecting(false);

      Alert.alert('Success', `Connected to ${deviceId}`);
    } catch (error) {
      setConnecting(true);

      console.error('Error connecting:', error);
      Alert.alert('Error', 'Failed to connect.');
    }
  };

  const readDTCs = async () => {
    if (!connectedDevice) {
      Alert.alert('Error', 'No device connected.');
      return;
    }
    setIsScanning(true);

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
    } finally {
      setIsScanning(false);
    }
  };

  const parseDTCs = (asciiCodes: number[]): string[] => {
    console.log('Provided ASCII codes:', asciiCodes);

    // Build a cleaned, space‑split array
    const raw = String.fromCharCode(...asciiCodes)
      .replace(/\s+/g, ' ')
      .trim();
    console.log('Converted String:', raw);
    const parts = raw.split(' ');
    console.log('Converted Parts:', parts);

    // Look for the "43" (Mode 03 response)
    const svcIdx = parts.indexOf('43');
    if (svcIdx < 0 || parts.length < 1) return [];

    // Read the ISO‑TP length (first element)
    const totalLen = parseInt(parts[0], 10);
    if (isNaN(totalLen) || totalLen < 3) return [];

    // Number of data bytes after svc+pid
    const payloadLen = totalLen - 2;

    // Rip out all 2‑char hex parts, skipping markers and '>'
    const hexBytes: string[] = [];
    for (const p of parts) {
      if (p === '>' || p.endsWith(':')) continue;
      if (/^[0-9A-Fa-f]{2}$/.test(p)) {
        hexBytes.push(p);
      }
    }
    // hexBytes[0] = svc+0x40, [1] = PID, so payload starts at index 2
    if (hexBytes.length < 2 + payloadLen) {
      console.warn(
        `Expected ${payloadLen} data bytes, got ${hexBytes.length - 2}`,
      );
    }
    const payloadBytes = hexBytes.slice(2, 2 + payloadLen);
    console.log('Payload Bytes:', payloadBytes);

    // Chunk into DTC pairs
    const dtcs: string[] = [];
    for (let i = 0; i + 1 < payloadBytes.length; i += 2) {
      const hi = payloadBytes[i];
      const lo = payloadBytes[i + 1];
      if (hi === '00' && lo === '00') continue;

      // determine letter (top 2 bits of first nibble)
      const typeCode = (parseInt(hi[0], 16) & 0xc) >> 2;
      const typeLetter = ['P', 'C', 'B', 'U'][typeCode] || 'P';

      // assemble numeric part
      const num = `${hi[1]}${lo[0]}${lo[1]}`;
      if (/^\d{3}$/.test(num)) {
        dtcs.push(`${typeLetter}0${num}`);
      }
    }

    console.log('Returning DTCs:', dtcs);
    return dtcs;
  };

  const handleProcessDtcs = async () => {
    const vehicleInfo = `${car?.make} ${car?.model} ${car?.year}`;
    const vehicleImage = car?.image;
    const vehicleId = car?.id;

    if (!dtcs?.length || !notes) {
      Alert.alert(
        'Error',
        'Please provide additional info regarding issues in your car!',
      );
      return;
    }

    setLoader(true);
    try {
      let allResponses = [];

      // let example = ['P0555', 'P0201'];

      for (const dtc of dtcs) {
        const body = {
          dtcs: [dtc], // Sending only one DTC at a time
          userDescription: notes,
          vehicleInfo,
          vehicleImage,
          vehicleId,
        };

        try {
          const response = await processDtcs(body, authToken);
          if (response?.success) {
            allResponses.push(...response.data);
          }
        } catch (error) {
          console.error(`Error processing DTC ${dtc}:`, error);
        }
      }

      console.log(allResponses);

      if (allResponses.length > 0) {
        dispatch(setDtcReport(allResponses));
        navigation.navigate('ScanResultDemo');
      }
    } catch (error) {
      console.error('Error processing DTCs:', error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1}}
      edges={Platform.OS == 'ios' ? ['top'] : ['top', 'bottom']}>
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1}}>
          <Image source={images.bg} style={styles.bg} />
          <View style={{flex: 1}}>
            <View style={styles.screen}>
              <View style={styles.header}>
                <TouchableOpacity
                  style={styles.backIconContainer}
                  onPress={() => {
                    if (index === 0) {
                      navigation.goBack();
                    }
                  }}>
                  <Image source={images.backIcon} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                  Modern
                  <Text style={styles.headerTitleOrange}> Mechanic</Text>
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <View style={styles.vehicleContainer}>
                  <View style={styles.uploadImgContainer}>
                    <Image
                      style={styles.uploadImgPreview}
                      source={{uri: car?.image}}
                    />
                  </View>
                </View>

                <View style={styles.waveRow}>
                  <View style={styles.row}>
                    <Text style={styles.textWhite}>
                      {car?.make} {car?.model}
                    </Text>
                    <View style={styles.orangeContainer}>
                      <Text style={styles.textWhite}>{car?.year}</Text>
                    </View>
                  </View>
                  <Image style={styles.waveIcon} source={images.waveIcon} />
                </View>
              </View>

              {index === 0 ? (
                <View style={styles.lowerBody}>
                  <View>
                    <View style={styles.backRow}>
                      {index > 0 ? (
                        <TouchableOpacity
                          style={styles.backIconContainer}
                          onPress={() => {
                            setIndex(index - 1);
                          }}>
                          <Image
                            source={images.backIcon}
                            style={styles.backIcon}
                          />
                        </TouchableOpacity>
                      ) : null}
                      <Text style={styles.title}>Plug in</Text>
                    </View>
                    <Text style={styles.textWhiteSmall}>
                      Plug your OBD II into your car
                    </Text>
                  </View>
                  <View style={styles.bottomRow}>
                    <Image
                      source={images.bottomMeter}
                      style={styles.bottomMeter}
                    />
                    <TouchableOpacity
                      style={styles.nextButton}
                      onPress={() => {
                        setIndex(index + 1);
                      }}>
                      <Text style={styles.textWhite2}>Next</Text>
                      <Image source={images.nextIcon} style={styles.nextIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : index === 1 ? (
                <View style={styles.lowerBody}>
                  <View>
                    <View style={styles.backRow}>
                      {index > 0 ? (
                        <TouchableOpacity
                          style={styles.backIconContainer}
                          onPress={() => {
                            setIndex(index - 1);
                          }}>
                          <Image
                            source={images.backIcon}
                            style={styles.backIcon}
                          />
                        </TouchableOpacity>
                      ) : null}
                      <Text style={styles.title}>Connect</Text>
                    </View>
                    <Text style={styles.textWhiteSmall}>
                      Connect Modern Mechanic to your OBD II
                    </Text>

                    {isScanning ? (
                      <OrangeButton title={'Scanning...'} onPress={() => {}} />
                    ) : isConnected ? (
                      <OrangeButton
                        title={'Scan For DTCs'}
                        onPress={readDTCs}
                      />
                    ) : (
                      <OrangeButton
                        title={'Search For OBDII'}
                        onPress={handleScanDevices}
                      />
                    )}
                    {/* {!isConnected ? ( */}
                    <FlatList
                      data={devices}
                      keyExtractor={item => item?.id}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          style={styles.deviceItem}
                          onPress={() => {
                            connectToDevice(item?.id);
                          }}>
                          <View>
                            <Text style={styles.textWhite}>{item?.name}</Text>
                            <Text style={styles.textWhiteSmall2}>
                              ID: {item?.id}
                            </Text>
                          </View>
                          {connecting && !isConnected ? (
                            <ActivityIndicator
                              color={colors.disabledText}
                              size={30}
                            />
                          ) : null}

                          {isConnected ? (
                            <View style={styles.orangeContainer2}>
                              <Text style={styles.textWhite}>Connected</Text>
                            </View>
                          ) : null}
                        </TouchableOpacity>
                      )}
                      scrollEnabled={devices?.length > 2}
                    />
                    {/* ) : null} */}

                    <View style={styles.codeRow}>
                      {dtcs?.map((item, index) => {
                        return (
                          <View style={styles.codeContainerOrange} key={index}>
                            <Text style={styles.codeText}>{item}</Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                  <View style={styles.bottomRow}>
                    <Image
                      source={images.bottomMeter}
                      style={styles.bottomMeter}
                    />
                    {dtcs?.length > 0 ? (
                      <TouchableOpacity
                        style={styles.nextButton}
                        onPress={() => {
                          setIndex(index + 1);
                        }}>
                        <Text style={styles.textWhite2}>Next</Text>
                        <Image
                          source={images.nextIcon}
                          style={styles.nextIcon}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </View>
              ) : index === 2 ? (
                <View style={styles.lowerBody}>
                  <View>
                    <View style={styles.backRow}>
                      {index > 0 ? (
                        <TouchableOpacity
                          style={styles.backIconContainer}
                          onPress={() => {
                            setIndex(index - 1);
                          }}>
                          <Image
                            source={images.backIcon}
                            style={styles.backIcon}
                          />
                        </TouchableOpacity>
                      ) : null}
                      <Text style={styles.title}>More info</Text>
                    </View>
                    <View style={styles.textArea}>
                      {loader ? (
                        <View style={styles.loaderContainer}>
                          <ActivityIndicator
                            color={colors.disabledText}
                            size={40}
                          />
                          <Text style={styles.disabledTextSmall}>
                            Please be patient while your information is being
                            processed!
                          </Text>
                        </View>
                      ) : (
                        <TextInput
                          multiline={true}
                          placeholder="Notes + better info for more accurate results"
                          placeholderTextColor={colors.disabledText}
                          style={styles.textAreaInput}
                          value={notes}
                          onChangeText={setNotes}
                        />
                      )}
                    </View>
                  </View>
                  <View style={styles.bottomRow}>
                    <View style={styles.bottomRow2}>
                      {!loader ? (
                        <OrangeButton
                          title="Get DTC Report"
                          onPress={() => {
                            if (!loader) {
                              handleProcessDtcs();
                            }
                            // handleScan(); // Is this supposed to be commented out? It seems to take the user to the scan report.
                          }}
                        />
                      ) : null}
                    </View>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Scann;
