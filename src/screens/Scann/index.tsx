import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {colors} from '../../services/utilities';
import OrangeButton from '../../components/OrangeButton';
import {RootStackParamList} from '../../services/config/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import BleManager from 'react-native-ble-manager';
interface Device {
  id: string;
  name: string;
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'ScanResult'>;

const Scann: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState<string>('');
  const [make, setMake] = useState<string>('Honda');
  const [model, setModel] = useState<string>('Civic');
  const [year, setYear] = useState<string>('2005');
  const [imageUri, setImageUri] = useState<any>(images.carImg);
  const [index, setIndex] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');
  const [devices, setDevices] = useState<Device[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const seenDevices = new Set<string>(); // To avoid duplicate devices

  useEffect(() => {
    BleManager.start({showAlert: false}); // Initialize BLE Manager
    const bleManagerEmitter = new NativeEventEmitter(NativeModules.BleManager);
    const handleDiscoverPeripheral = (peripheral: any) => {
      if (!seenDevices.has(peripheral.id)) {
        seenDevices.add(peripheral.id);
        setDevices(prevDevices => [
          ...prevDevices,
          {id: peripheral.id, name: peripheral.name || 'Unknown Device'},
        ]);
      }
    };

    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );

    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
    };
  }, []);

  const handleScanDevices = async () => {
    try {
      setIsScanning(true);
      setDevices([]); // Clear previous devices
      seenDevices.clear();

      console.log('Scanning for devices...');
      await BleManager.scan([], 5, true); // Start scanning for 5 seconds

      // Stop the scan after 5 seconds
      setTimeout(() => {
        BleManager.stopScan()
          .then(() => {
            setIsScanning(false);
            console.log('Scanning stopped.');
          })
          .catch(err => {
            setIsScanning(false);
            console.error('Error stopping scan:', err);
          });
      }, 5000);
    } catch (error) {
      setIsScanning(false);
      console.error('Error during scan:', error);
      Alert.alert('Error', 'Unable to scan for devices.');
    }
  };

  const handleScan = () => {
    navigation.navigate('ScanResult');
  };

  return (
    <SafeAreaView>
      <View>
        <Image source={images.bg} style={styles.bg} />
        <View>
          <View style={styles.screen}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backIconContainer}
                onPress={() => {
                  navigation.goBack();
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
                  <Image style={styles.uploadImgPreview} source={imageUri} />
                </View>
              </View>

              <View style={styles.waveRow}>
                <View style={styles.row}>
                  <Text style={styles.textWhite}>
                    {make} {model}
                  </Text>
                  <View style={styles.orangeContainer}>
                    <Text style={styles.textWhite}>{year}</Text>
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
                    <OrangeButton
                      title={isScanning ? 'Scanning...' : 'Scan For OBDII'}
                      onPress={() => {}}
                    />
                  ) : (
                    <OrangeButton
                      title={isScanning ? 'Scanning...' : 'Scan For OBDII'}
                      onPress={handleScanDevices}
                    />
                  )}

                  <FlatList
                    data={devices}
                    keyExtractor={item => item?.id}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={styles.deviceItem}
                        onPress={() => {}}>
                        <Text style={styles.textWhite}>{item?.name}</Text>
                        <Text style={styles.textWhiteSmall}>
                          ID: {item?.id}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
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
                    <TextInput
                      multiline={true}
                      placeholder="Notes + better info for more accurate results"
                      placeholderTextColor={colors.disabledText}
                      style={styles.textAreaInput}
                      value={notes}
                      onChangeText={setNotes}
                    />
                  </View>
                </View>
                <View style={styles.bottomRow}>
                  <View style={styles.bottomRow2}>
                    <OrangeButton title="Scan Now" onPress={handleScan} />
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Scann;
