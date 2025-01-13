import React, {useState} from 'react';
import {
  SafeAreaView,
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
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {LogIn, LoginBody, LoginResponse} from '../../services/config/API';
import {AppDispatch} from '../../store';
import {setAuthToken} from '../../store/authSlice';
import {setUserData} from '../../store/userSlice';
import OrangeButtonLoader from '../../components/OrangeButtonLoader';

type NavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;

const Login: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const [secure, setSecure] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const handlNavigation = () => {
    navigation.navigate('ForgotPassword');
  };

  // const handleLogin = () => {
  // navigation.navigate('BottomTabNavigator');
  // };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password.');
      return;
    }
    setLoader(true);

    try {
      const body: LoginBody = {
        email: email,
        password: password,
      };

      const response = await LogIn(body);
      console.log(response);

      if (response?.success) {
        setLoader(false);
        dispatch(setUserData(response?.userData));
        dispatch(setAuthToken(response?.token));
      } else {
        // Handle errors returned from the API
        setLoader(false);

        Alert.alert('Error', response?.message || 'Login failed');
      }
    } catch (error) {
      setLoader(false);

      console.error('Error during login:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Image source={images.bg} style={styles.bg} />

        <View style={styles.sectionContainer}>
          <Text style={styles.textLargeBold}>Log In</Text>
          <Text style={styles.disabledText}>
            Welcome back! Please enter your details.
          </Text>

          <Text
            style={[styles.inputLabel, {marginTop: sizes.screenHeight * 0.03}]}>
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

          <TouchableOpacity
            onPress={handlNavigation}
            style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Text style={styles.errMsg}>{errMsg}</Text>
          {loader ? (
            <OrangeButtonLoader />
          ) : (
            <OrangeButton title="Log In" onPress={handleLogin} />
          )}

          <View style={styles.hrContainer}>
            <View style={styles.hr}></View>
            <Text style={styles.disabledText}>or log in with</Text>
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

export default Login;
