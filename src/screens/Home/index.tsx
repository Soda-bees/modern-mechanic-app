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
import {getAllReviews, getUserDetails} from '../../services/config/API';
import {AppDispatch} from '../../store';
import {selectAuthToken} from '../../store/authSlice';
import {selectAllReviews, setAllReviews} from '../../store/reviewSlice';
import {selectDtcReport} from '../../store/dtcReportSlice';

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'Scann' | 'ScanHistory' | 'BLEScanScreen' | 'Profile' | 'ScanResultDemo'
>;

const Home: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const authToken = useSelector(selectAuthToken);
  const allReviews = useSelector(selectAllReviews);
  const dtcReport = useSelector(selectDtcReport);
  // console.log(
  //   'Home Logggggggggggggg',
  //   userData,
  //   authToken,
  //   allReviews,
  //   dtcReport,
  // );

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
      console.log('Response: userData', response);
      if (response?.success) {
        dispatch(setUserData(response.userData));
      }
    } catch (error) {
      console.error('Error in retrieving userData:', error);
    }
  };

  const handleGetAllReviews = async () => {
    if (!authToken) return;
    try {
      const response = await getAllReviews(authToken); // Call checkEmail API
      console.log('Response: allReviews', response);
      if (response?.success) {
        dispatch(setAllReviews(response?.reviews));
      }
    } catch (error) {
      console.error('Error in retrieving all reviews:', error);
    }
  };

  useEffect(() => {
    handleGetUserDetails();
    handleGetAllReviews();
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

  const data = [
    {
      description:
        'The OBD-II trouble code P0505 is related to the Idle Control System. This code means that the engine control module (ECM) has detected a problem with the idle speed. This could be due to a malfunction in the idle air control (IAC) valve, throttle body, or the ECM itself.',
      analysis:
        'When this code is triggered, it means the ECM cannot regulate the idle speed properly. This can result in an engine that runs too fast or too slow at idle. This could cause the engine to stall, especially when the vehicle is at a stop or operating at low speeds.',
      repair_instructions: [
        'Step 1: Use an OBD-II scanner to confirm the P0505 code.',
        'Step 2: Inspect the IAC valve for any signs of damage or wear.',
        'Step 3: Check the throttle body for any buildup or clogs.',
        'Step 4: If the IAC valve and throttle body are in good condition, the ECM may be the problem and should be inspected by a professional.',
        'Step 5: If any issues were found during inspection, replace the faulty parts.',
        'Step 6: Clear the P0505 code with the OBD-II scanner.',
        'Step 7: Test drive the vehicle to see if the code returns.',
      ],
      urgency_level: 'Moderate',
      urgency_color: 'Yellow',
      urgency_explanation:
        "While the vehicle can still operate with a P0505 code, it may not run efficiently and could stall, especially at low speeds. It's best to get this repaired as soon as possible to avoid any potential safety risks.",
      repair_difficulty: 'Intermediate',
      difficulty_color: 'Orange',
      difficulty_explanation:
        "This repair requires a good understanding of the vehicle's idle control system and may involve replacing parts. It's best attempted by those with some automotive repair experience.",
      cost_estimate: '$200 - $500',
      required_parts: [
        'Idle Air Control Valve (if faulty)',
        'Throttle Body (if clogged or damaged)',
        'Engine Control Module (if faulty)',
      ],
      required_tools: ['OBD-II Scanner', 'Basic hand tools'],
      youtube_videos: [
        'https://www.youtube.com/watch?v=_5uTZodloWo',
        'https://www.youtube.com/watch?v=iojkke4qPMM',
      ],
      user_notes: 'Engine misfire detected',
      code: 'P0505',
    },
  ];
  const handleGoToScan = () => {
    navigation.navigate('Scann');
  };

  // const handleGoToScan = () => {
  //   navigation.navigate('ScanResultDemo');
  // };

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
                onPress={handleGoToScan}>
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
