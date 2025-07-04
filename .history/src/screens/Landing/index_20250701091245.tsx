import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../services/utilities/images';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../services/config/navigation/index';
import {AppDispatch} from '../../store';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthToken, setAuthToken} from '../../store/authSlice';
import {selectUserData} from '../../store/userSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../services/utilities';

type NavigationProp = StackNavigationProp<RootStackParamList, 'LandingNext'>;

const Landing: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const authToken = useSelector(selectAuthToken);
  const userDataRedux = useSelector(selectUserData);
  console.log('token and user info:', authToken, userDataRedux);

  const handleContinue = () => {
    navigation.navigate('LandingNext');
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: colors.black}}
      edges={['top', 'bottom']}>
      <View>
        <Image source={images.bg} style={styles.bg} />
        <View style={styles.sectionContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textLargeBold}>
              Modern{'\n'}
              <Text style={styles.textLargeBoldOrange}>Mechanic</Text>
            </Text>
          </View>
          <Image source={images.landingBg} style={styles.landngBg} />
          <View style={styles.textContainer}>
            <Text style={styles.textLarge}>
              Turning Car{'\n'}
              Problems Into{'\n'}
              Simple Solutions
            </Text>
            <TouchableOpacity
              style={styles.nextIconContainer}
              onPress={handleContinue}>
              <Text style={styles.nextIconText}>Continue</Text>
              <Image source={images.nextIcon} style={styles.nextIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Landing;
