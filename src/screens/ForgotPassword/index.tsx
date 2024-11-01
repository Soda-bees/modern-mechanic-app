import React, {useState} from 'react';
import {SafeAreaView, Text, View, Image, TextInput} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {colors, sizes} from '../../services/utilities';
import OrangeButton from '../../components/OrangeButton';
import Header from '../../components/Header';
import {RootStackParamList} from '../../services/config/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Otp'>;

const ForgotPassword: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  const handleSend = () => {
    // if (email) {
    navigation.navigate('Otp', {email});
    // } else {
    //   setErrMsg('*Please enter a valid email.');
    // }
  };

  return (
    <SafeAreaView>
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

          <Text style={styles.errMsg}>{errMsg}</Text>
          <View style={styles.orangeButtonContainer}>
            <OrangeButton title="Send" onPress={handleSend} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
