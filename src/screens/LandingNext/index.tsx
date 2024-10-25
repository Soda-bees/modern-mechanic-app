import React from 'react';
import {SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../services/config/navigation/index';
import OrangeButton from '../../components/OrangeButton';

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login' | 'SignUp'
>;

const LandingNext: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

  const goToLogIn = () => {
    navigation.navigate('Login');
  };

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView>
      <View>
        <Image source={images.bg} style={styles.bg} />
        <View style={styles.sectionContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textLargeBold}>
              OBD{'\n'}
              <Text style={styles.textLargeBoldOrange}>Reader.</Text>
            </Text>
          </View>
          <Image source={images.landingBgNext} style={styles.landngBg} />
          <View style={styles.textContainer}>
            <OrangeButton title="Log In" onPress={goToLogIn} />
            <View style={styles.hrContainer}>
              <View style={styles.hr}></View>
              <Text style={styles.disabledText}>Dont have an account?</Text>
              <View style={styles.hr}></View>
            </View>
            <OrangeButton title="Sign Up" onPress={goToSignUp} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LandingNext;
