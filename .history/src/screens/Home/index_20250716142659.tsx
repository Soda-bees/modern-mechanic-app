import React, {useEffect, useMemo} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {RootStackParamList} from '../../services/config/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import UserHeader from '../../components/UserHeader';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData, setUserData} from '../../store/userSlice';
import {
  getAllReviews,
  getAllScans,
  getUserDetails,
} from '../../services/config/API';
import {AppDispatch} from '../../store';
import {selectAuthToken} from '../../store/authSlice';
import {setAllReviews} from '../../store/reviewSlice';
import {setScans} from '../../store/scanSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import OrangeButton from '../../components/OrangeButton';

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  | 'Scann'
  | 'ScanHistory'
  | 'BLEScanScreen'
  | 'Profile'
  | 'ScanResultDemo'
  | 'AiAssistantChat'
>;

const Home: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const authToken = useSelector(selectAuthToken);

  const selectedCar = useMemo(() => {
    return userData?.cars?.find(car => car.selected);
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      if (!authToken) return;
      try {
        const [userRes, reviewRes, scanRes] = await Promise.all([
          getUserDetails(authToken),
          getAllReviews(authToken),
          getAllScans(authToken),
        ]);

        if (userRes?.success) {
          console.log('Response: userData', userRes);
          dispatch(setUserData(userRes.userData));
        }

        if (reviewRes?.success) {
          console.log('Response: allReviews', reviewRes);
          dispatch(setAllReviews(reviewRes.reviews));
        }
        if (scanRes?.success) {
          console.log('Response: allScans', scanRes);
          dispatch(setScans(scanRes.scans));
        }
      } catch (error) {
        console.error('Error fetching home screen data:', error);
      }
    };

    fetchData();
  }, []);

  const handleScanHistory = () => {
    navigation.navigate('ScanHistory');
  };

  const handleGoToProfile = () => {
    navigation.navigate('Profile');
  };

  const handleGoToScan = () => {
    navigation.navigate('Scann');
  };

  const handleGoToChatBot = () => {
    navigation.navigate('AiAssistantChat');
  };

  const handleGoToLiveData = () => {
    navigation.navigate('AiAssistantChat');
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['top', 'bottom']}>
      <View style={{flex: 1}}>
        <Image source={images.bg} style={styles.bg} />

        <View style={styles.screen}>
          <UserHeader onPress={handleGoToProfile} />
          <View style={styles.sectionContainer}>
            <View style={styles.vehicleContainer}>
              <View style={styles.uploadImgContainer}>
                <Image
                  style={styles.uploadImgPreview}
                  source={{uri: selectedCar?.image}}
                />
              </View>
            </View>

            <View style={styles.waveRow}>
              <View style={styles.row}>
                <Text style={styles.textWhite}>
                  {selectedCar?.make} {selectedCar?.model}
                </Text>
                <View style={styles.orangeContainer}>
                  <Text style={styles.textWhite}>{selectedCar?.year}</Text>
                </View>
              </View>
              <Image style={styles.waveIcon} source={images.waveIcon} />
            </View>
          </View>
          <View style={styles.lowerBody}>
            <Text style={styles.title}>Scan</Text>
            <TouchableOpacity style={styles.orangeBtn} onPress={handleGoToScan}>
              <Image source={images.scanIcon} style={styles.scanIcon} />
              <Text style={styles.orangeBtnLabel}>Scan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.inputContainer}
              onPress={handleScanHistory}>
              <Text style={styles.orangeBtnLabel}>Scan History</Text>
            </TouchableOpacity>

            <OrangeButton title="Live Data" onPress={} />
            <TouchableOpacity
              style={styles.chatBotContainer}
              onPress={handleGoToChatBot}>
              <Image source={images.chatBot} style={styles.chatBot} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

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
