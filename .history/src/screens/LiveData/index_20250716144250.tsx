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
  const handleLiveData = () => {};

  const handleWorkshopDetails = () => {
    navigation.navigate('WorkshopDetails');
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['top', 'bottom']}>
      <Image source={images.bg} style={styles.bg} />

      <View style={styles.screen}>
        <UserHeader onPress={handleGoToProfile} />
        <View style={styles.lowerBody}>
          <Text style={styles.title}>Workshops</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.flexWrapper}>
              {workshopDetails.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={styles.workshopCardContainer}
                    key={index}
                    onPress={() => {
                      handleWorkshopDetails();
                    }}>
                    <Image
                      source={item.image}
                      style={styles.workshopImageContainer}
                    />
                    <View>
                      <Text style={styles.nameHeading}>{item.name}</Text>
                      <Text style={styles.disabledText}>Contact Info:</Text>
                      <Text style={styles.textWhite}>
                        {item.webLink.length > 26
                          ? `${item.webLink.substring(0, 26)}...`
                          : item.webLink}
                      </Text>
                      <Text style={styles.textWhite}>{item.number}</Text>
                      <Text style={styles.disabledText}>Address:</Text>
                      <Text style={styles.textWhite}>
                        {item.address.length > 26
                          ? `${item.address.substring(0, 26)}...`
                          : item.address}
                      </Text>
                      <Text style={styles.disabledText}>Rating:</Text>
                      <StarRatingDisplay
                        rating={item.rating}
                        color="#FFC200"
                        emptyColor={colors.lightGrey}
                        maxStars={5}
                        starSize={16}
                        starStyle={{marginHorizontal: 0}}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LiveData;
