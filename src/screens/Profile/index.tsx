import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {colors, sizes} from '../../services/utilities';
import OrangeButton from '../../components/OrangeButton';
import Header from '../../components/Header';
import {RootStackParamList} from '../../services/config/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import {removeAuthToken} from '../../store/authSlice';
import {removeUserData} from '../../store/userSlice';

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditProfile' | 'Garage' | 'Security'
>;

const Profile: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch: AppDispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  const handleSend = () => {
    // if (email) {
    navigation.navigate('Otp', {email});
    // } else {
    //   setErrMsg('*Please enter a valid email.');
    // }
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleGarage = () => {
    navigation.navigate('Garage');
  };

  const handleSecurity = () => {
    navigation.navigate('Security');
  };

  const handleLogout = () => {
    // Clear the authToken and userData in Redux
    dispatch(removeAuthToken());
    dispatch(removeUserData());

    // Optionally, navigate to the login or landing screen
    // navigation.replace('Login'); // Uncomment if using navigation
  };

  return (
    <SafeAreaView>
      <View style={styles.main}>
        <Image source={images.bg} style={styles.bg} />
        <Header goBack={true} title="Profile" />

        <View style={styles.hrFull}></View>

        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.navigateBtn}
            onPress={handleEditProfile}>
            <Text style={styles.navigateBtnText}>Edit Profile</Text>
            <Image style={styles.rightIcon} source={images.rightIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigateBtn} onPress={handleGarage}>
            <Text style={styles.navigateBtnText}>Garage</Text>
            <Image style={styles.rightIcon} source={images.rightIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigateBtn} onPress={handleSecurity}>
            <Text style={styles.navigateBtnText}>Security</Text>
            <Image style={styles.rightIcon} source={images.rightIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navigateBtn}
            onPress={handleEditProfile}>
            <Text style={styles.navigateBtnText}>Privacy Policy</Text>
            <Image style={styles.rightIcon} source={images.rightIcon} />
          </TouchableOpacity>

          {/* <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={images.emailIcon} />
            <TextInput
              onChangeText={text => {
                setEmail(text);
              }}
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={colors.disabledText}
            />
          </View> */}

          <Text style={styles.errMsg}>{errMsg}</Text>
          <View style={styles.orangeButtonContainer}>
            <TouchableOpacity
              style={styles.orangeBtn}
              onPress={() => {
                Alert.alert(
                  'Logout Confirmation',
                  'Are you sure you want to logout?',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: () => handleLogout(), // Call a logout handler
                    },
                  ],
                  {cancelable: true},
                );
              }}>
              <Image source={images.logOutIcon} style={styles.logOutIcon} />
              <Text style={styles.orangeBtnLabel}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
