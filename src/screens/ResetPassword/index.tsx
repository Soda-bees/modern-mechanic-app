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
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type RouteProps = RouteProp<RootStackParamList, 'ResetPassword'>;

const ResetPassword: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const {email} = route.params;

  const [secure, setSecure] = useState<boolean>(true);
  const [secureConfirm, setSecureConfirm] = useState<boolean>(true);

  const [errMsg, setErrMsg] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSave = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView>
      <View>
        <Image source={images.bg} style={styles.bg} />
        <Header goBack={false} title="Reset Password" />

        <View style={styles.sectionContainer}>
          <Text style={styles.disabledText}>
            Must be at least 8 characters.
          </Text>

          <Text
            style={[styles.inputLabel, {marginTop: sizes.screenHeight * 0.03}]}>
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
              secureTextEntry={secure}
            />
            <TouchableOpacity
              onPress={() => {
                setSecureConfirm(!secure);
              }}
              style={styles.showHideContainer}>
              <Image
                style={styles.inputIcon}
                source={secureConfirm ? images.hide : images.show}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.orangeButtonContainer}>
            <OrangeButton title="Save" onPress={handleSave} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;
