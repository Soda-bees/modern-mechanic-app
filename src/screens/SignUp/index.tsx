import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {colors, sizes} from '../../services/utilities';
import OrangeButton from '../../components/OrangeButton';
import Header from '../../components/Header';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../services/config/navigation';
import {useNavigation} from '@react-navigation/native';
import {checkEmail} from '../../services/config/API';

type NavigationProp = StackNavigationProp<RootStackParamList, 'AddVehicle'>;

const SignUp: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const [secure, setSecure] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [zipCode, setZipCode] = useState<number>(0);
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignUp = async () => {
    try {
      setIsLoading(true); // Show loader
      console.log('Running handleSignUp');

      const response = await checkEmail({email}); // Call checkEmail API
      console.log('Response:', response);

      if (response?.success) {
        // Email is available, proceed with navigation
        setErrMsg('');
        navigation.navigate('AddVehicle', {
          userData: {
            name,
            email,
            zipCode,
            password,
          },
        });
      } else {
        // Email is already taken, show an error message
        setErrMsg(response?.message || 'This email is already taken.'); // Default error message if no message in response
      }
    } catch (error) {
      console.error('Error in email validation:', error);
      setErrMsg('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Image source={images.bg} style={styles.bg} />

        <View style={styles.sectionContainer}>
          <Text style={styles.textLargeBold}>Create an account</Text>
          <Text style={styles.disabledText}>
            Welcome! Please enter your details.
          </Text>

          <Text
            style={[styles.inputLabel, {marginTop: sizes.screenHeight * 0.03}]}>
            Name
          </Text>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={images.nameIcon} />
            <TextInput
              onChangeText={text => {
                setName(text);
              }}
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor={colors.disabledText}
            />
          </View>

          <Text style={styles.inputLabel}>Email</Text>
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

          <Text style={styles.inputLabel}>Zip Code</Text>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={images.zipCodeIcon} />
            <TextInput
              onChangeText={text => {
                setZipCode(Number(text));
              }}
              style={styles.input}
              placeholder="Enter your Zip Code"
              placeholderTextColor={colors.disabledText}
              inputMode="numeric"
            />
          </View>

          <Text style={styles.inputLabel}>Password</Text>
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

          <View style={styles.tickRow}>
            <Image
              source={password.length >= 8 ? images.tick : images.untick}
              style={styles.tick}
            />
            <Text style={styles.disabledText}>
              Must be at least 8 characters.
            </Text>
          </View>

          <Text style={styles.errMsg}>{errMsg}</Text>

          <OrangeButton title="Sign Up" onPress={handleSignUp} />

          <View style={styles.hrContainer}>
            <View style={styles.hr}></View>
            <Text style={styles.disabledText}>Continue with</Text>
            <View style={styles.hr}></View>
          </View>

          <TouchableOpacity style={styles.loginWithBtn}>
            <Image style={styles.inputIcon} source={images.googleIcon} />
            <Text style={styles.loginWithBtnLabel}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
