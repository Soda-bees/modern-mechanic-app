import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {RootStackParamList} from '../../services/config/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import UserHeader from '../../components/UserHeader';
import AndroidOpenSettings from 'react-native-android-open-settings';
import {requestPermissions} from '../../services/config/BLEManager/BLEManager';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData, setUserData} from '../../store/userSlice';
import {getUserDetails} from '../../services/config/API';
import {AppDispatch} from '../../store';
import {selectAuthToken} from '../../store/authSlice';

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'Scann' | 'ScanHistory' | 'BLEScanScreen' | 'Profile'
>;

const Home: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const authToken = useSelector(selectAuthToken);
  console.log(userData);

  const [email, setEmail] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [make, setMake] = useState<string | undefined>(userData?.cars[0].make);
  const [model, setModel] = useState<string | undefined>(
    userData?.cars[0].model,
  );
  const [year, setYear] = useState<number | undefined>(userData?.cars[0].year);
  const [imageUri, setImageUri] = useState<any>(userData?.cars[0].image);
  const [loader, setLoader] = useState<Boolean>(false);

  const handleGetUserDetails = async () => {
    if (!authToken) return;
    try {
      const response = await getUserDetails(authToken); // Call checkEmail API
      console.log('Response:', response);
      if (response?.success) {
        dispatch(setUserData(response.userData));
      }
    } catch (error) {
      console.error('Error in retrieving userData:', error);
    }
  };

  useEffect(() => {
    handleGetUserDetails();
  }, []);

  const handleRequestPermission = async () => {
    try {
      const isPermissionGranted = await requestPermissions(); // Await permission result
      if (isPermissionGranted) {
        navigation.navigate('BLEScanScreen'); // Navigate only if permission is granted
      } else {
        Alert.alert(
          'Permission Denied',
          'Bluetooth permissions are required to proceed with scanning.',
        );
      }
    } catch (error) {
      Alert.alert(
        'Permission Error',
        'Unable to request Bluetooth permissions. Please try again.',
      );
      console.error(error);
    }
  };

  const openBluetoothSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('App-Prefs:Bluetooth').catch(() => {
        console.log('Could not open Bluetooth settings on iOS');
      });
    } else {
      AndroidOpenSettings.bluetoothSettings();
    }
  };

  const handleScanHistory = () => {
    navigation.navigate('ScanHistory');
  };

  const handleGoToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView>
      <View>
        <Image source={images.bg} style={styles.bg} />
        <View>
          <View style={styles.screen}>
            <UserHeader onPress={handleGoToProfile} />
            <View style={styles.sectionContainer}>
              <View style={styles.vehicleContainer}>
                <View style={styles.uploadImgContainer}>
                  <Image
                    style={styles.uploadImgPreview}
                    source={{uri: imageUri}}
                  />
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
            <View style={styles.lowerBody}>
              <Text style={styles.title}>Scan</Text>
              <TouchableOpacity
                style={styles.orangeBtn}
                onPress={handleRequestPermission}>
                <Image source={images.scanIcon} style={styles.scanIcon} />
                <Text style={styles.orangeBtnLabel}>Scan</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.inputContainer}
                onPress={handleScanHistory}>
                <Text style={styles.orangeBtnLabel}>Scan History</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
