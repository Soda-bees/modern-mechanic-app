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
import {changePassword} from '../../services/config/API';
import {useSelector} from 'react-redux';
import {selectAuthToken} from '../../store/authSlice';
import OrangeButtonLoader from '../../components/OrangeButtonLoader';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Otp'>;

const Security: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

  const authToken = useSelector(selectAuthToken);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [zipCode, setZipCode] = useState<number>(0);
  const [errMsg, setErrMsg] = useState<string>('');
  const [secure, setSecure] = useState<boolean>(true);
  const [secure2, setSecure2] = useState<boolean>(true);
  const [secure3, setSecure3] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);

  const handleSave = async () => {
    setLoader(true);

    if (!password || !newPassword || !confirmNewPassword) {
      setErrorMsg('Please fill all the required fields.');
      setLoader(false);
      return;
    }

    if (newPassword.length < 8) {
      setErrorMsg('Password must contain at least 8 characters.');
      setLoader(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMsg("Your new password doesn't match.");
      setLoader(false);
      return;
    }

    try {
      const body = {
        oldPassword: password,
        newPassword,
      };

      const response = await changePassword(body, authToken);

      if (response?.success) {
        setErrorMsg('');
        Alert.alert('Success', 'Your password has been changed successfully!', [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      } else {
        Alert.alert(
          'Error',
          response?.message ||
            'Could not update your password, try again later!',
          [
            {
              text: 'OK',
            },
          ],
        );
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setErrorMsg('An error occurred. Please try again later.');
    } finally {
      // Stop loader
      setLoader(false);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.main}>
        <Image source={images.bg} style={styles.bg} />
        <Header goBack={true} title="Security" />

        <View style={styles.hrFull}></View>

        <View style={styles.sectionContainer}>
          <Text style={styles.inputLabel}>Current Password</Text>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={images.passwordIcon} />
            <TextInput
              onChangeText={text => {
                setPassword(text);
              }}
              style={styles.input}
              placeholder="Current password"
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
          <Text style={styles.inputLabel}>New Password</Text>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={images.passwordIcon} />
            <TextInput
              onChangeText={text => {
                setNewPassword(text);
              }}
              style={styles.input}
              placeholder="New password"
              placeholderTextColor={colors.disabledText}
              secureTextEntry={secure2}
            />
            <TouchableOpacity
              onPress={() => {
                setSecure2(!secure2);
              }}
              style={styles.showHideContainer}>
              <Image
                style={styles.inputIcon}
                source={secure2 ? images.hide : images.show}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={images.passwordIcon} />
            <TextInput
              onChangeText={text => {
                setConfirmNewPassword(text);
              }}
              style={styles.input}
              placeholder="Confirm password"
              placeholderTextColor={colors.disabledText}
              secureTextEntry={secure3}
            />
            <TouchableOpacity
              onPress={() => {
                setSecure3(!secure3);
              }}
              style={styles.showHideContainer}>
              <Image
                style={styles.inputIcon}
                source={secure3 ? images.hide : images.show}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.inputLabel}>Must be at least 8 characters.</Text>

          <Text style={styles.errMsg}>{errMsg}</Text>
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

export default Security;
