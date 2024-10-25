import React from 'react';
import {SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../services/utilities/images';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../services/config/navigation/index';

type NavigationProp = StackNavigationProp<RootStackParamList, 'LandingNext'>;

const Landing: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

  const handleContinue = () => {
    navigation.navigate('LandingNext');
  };

  return (
    <SafeAreaView>
      {/* <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#171717', '#3A3A3A']}
        style={styles.sectionContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textLargeBold}>
            OBD{'\n'}
            <Text style={styles.textLargeBoldOrange}>Reader.</Text>
          </Text>
        </View>
        <Image source={images.landingBg} style={styles.landngBg} />
        <View style={styles.textContainer}>
          <Text style={styles.textLarge}>
            Your Car's{'\n'}
            Diagnostics{'\n'}
            Made Simple
          </Text>
          <TouchableOpacity style={styles.nextIconContainer}>
            <Text style={styles.nextIconText}>Continue</Text>
            <Image source={images.nextIcon} style={styles.nextIcon} />
          </TouchableOpacity>
        </View>
      </LinearGradient> */}

      <View>
        <Image source={images.bg} style={styles.bg} />
        <View style={styles.sectionContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textLargeBold}>
              OBD{'\n'}
              <Text style={styles.textLargeBoldOrange}>Reader.</Text>
            </Text>
          </View>
          <Image source={images.landingBg} style={styles.landngBg} />
          <View style={styles.textContainer}>
            <Text style={styles.textLarge}>
              Your Car's{'\n'}
              Diagnostics{'\n'}
              Made Simple
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
