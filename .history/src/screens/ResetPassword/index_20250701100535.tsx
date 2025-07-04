import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {colors, sizes} from '../../services/utilities';
import OrangeButton from '../../components/OrangeButton';
import Header from '../../components/Header';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../services/config/navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {resetPassword} from '../../services/config/API';
import OrangeButtonLoader from '../../components/OrangeButtonLoader';
import {SafeAreaView} from 'react-native-safe-area-context';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type RouteProps = RouteProp<RootStackParamList, 'ResetPassword'>;

const ResetPassword: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const {email} = route.params;

  const [secure, setSecure] = useState<boolean>(true);
  const [secureConfirm, setSecureConfirm] = useState<boolean>(true);

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);

  const handleSave = async () => {
    setLoader(true);
    if (!password || !confirmPassword) {
      setErrorMsg('Please fill all the required fields.');
      setLoader(false);
      return;
    }
    if (password.length < 8) {
      setErrorMsg('Password must contain at least 8 characters.');
      setLoader(false);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Your new password doesn't match.");
      setLoader(false);
      return;
    }
    try {
      const body = {
        email,
        newPassword: password,
      };
      const response = await resetPassword(body);
      if (response?.success) {
        setErrorMsg('');
        Alert.alert('Success', 'Your password has been reset successfully!', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ]);
      } else {
        console.log(response?.message);
        Alert.alert('Error', 'Could not reset your password!', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ]);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      Alert.alert('Error', 'Could not reset your password!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Login');
          },
        },
      ]);
    } finally {
      // Stop loader
      setLoader(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['top', 'bottom']}>
      <View style={styles.main}>
        <Image source={images.bg} style={styles.bg} />
        <Header goBack={false} title="Reset Password" />

        <View style={styles.sectionContainer}>
          <Text style={styles.disabledText}>
            Must be at least 8 characters.
          </Text>

          <Text
            style={[styles.inputLabel, {marginTop: sizes.screenHeight * 0.05}]}>
            Password
          </Text>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={images.passwordIcon} />
            <TextInput
              onChangeText={text => {
                setPassword(text);
              }}
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={colors.disabledText}
              secureTextEntry={secure}
            />
            <TouchableOpacity
              onPress={() => {
                setSecure(!secure);
              }}
              style={styles.showHideContainer}>
              <Image
                style={styles.inputIcon}
                source={secure ? images.hide : images.show}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={images.passwordIcon} />
            <TextInput
              onChangeText={text => {
                setConfirmPassword(text);
              }}
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={colors.disabledText}
              secureTextEntry={secureConfirm}
            />
            <TouchableOpacity
              onPress={() => {
                setSecureConfirm(!secureConfirm);
              }}
              style={styles.showHideContainer}>
              <Image
                style={styles.inputIcon}
                source={secureConfirm ? images.hide : images.show}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.orangeButtonContainer}>
            <Text style={styles.errMsg}>{errorMsg}</Text>

            {loader ? (
              <OrangeButtonLoader />
            ) : (
              <OrangeButton title="Save" onPress={handleSave} />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;
