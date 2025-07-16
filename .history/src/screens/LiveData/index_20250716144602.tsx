import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {RootStackParamList} from '../../services/config/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import UserHeader from '../../components/UserHeader';
import Modal from 'react-native-modal';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {colors} from '../../services/utilities';
import {SafeAreaView} from 'react-native-safe-area-context';
type NavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

const LiveData: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState<any>();

  const handleGoToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['top', 'bottom']}>
      <Image source={images.bg} style={styles.bg} />

      <View style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backIconContainer}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={images.backIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Modern
            <Text style={styles.headerTitleOrange}> Mechanic</Text>
          </Text>
        </View>
        <View style={styles.lowerBody}>
          <Text style={styles.title}>Live Data</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.flexWrapper}></View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LiveData;
