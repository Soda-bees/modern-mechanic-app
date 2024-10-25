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

type NavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;

const Login: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const [secure, setSecure] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handlNavigation = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleLogin = () => {
    console.log('hey', email, password);
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

          <OrangeButton title="Log In" onPress={handleLogin} />

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
