import React, {useState} from 'react';
import {Text, View, Image, TextInput, Alert} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {colors, sizes} from '../../services/utilities';
import OrangeButton from '../../components/OrangeButton';
import Header from '../../components/Header';
import {RootStackParamList} from '../../services/config/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {sendOtp, SendOtpBody} from '../../services/config/API';
import OrangeButtonLoader from '../../components/OrangeButtonLoader';
import {SafeAreaView} from 'react-native-safe-area-context';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Otp'>;

const ForgotPassword: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);

  const handleSend = async () => {
    // if (!email) {
    //   Alert.alert('Error', 'Please enter your email to continue.');
    //   return;
    // }
    setLoader(true);

    try {
      const body: SendOtpBody = {
        email: email,
      };

      const response = await sendOtp(body);
      console.log(response);

      if (response?.success) {
        console.log(response.otp);
        setLoader(false);
        navigation.navigate('Otp', {email});
      } else {
        setLoader(false);
        Alert.alert(
          'Error',
          response?.message || 'Something went wrong. Please try again later.',
        );
      }
    } catch (error) {
      setLoader(false);
      console.error('Error during login:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['top', 'bottom']}>
      <View style={styles.main}>
        <Image source={images.bg} style={styles.bg} />
        <Header goBack={true} title="Forgot Password" />

        <View style={styles.sectionContainer}>
          <Text style={styles.disabledText}>
            Don't worry, it happens to the best of us!{'\n'}Enter you registered
            email.
          </Text>

          <Text
            style={[styles.inputLabel, {marginTop: sizes.screenHeight * 0.15}]}>
            Email
          </Text>

          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={images.emailIcon} />
            <TextInput
              onChangeText={text => {
                setEmail(text);
              }}
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={colors.disabledText}
            />
          </View>
        </View>

        <View style={styles.orangeButtonContainer}>
          <Text style={styles.errMsg}>{errMsg}asdas</Text>
          {loader ? (
            <OrangeButtonLoader />
          ) : (
            <OrangeButton title="Send" onPress={handleSend} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
