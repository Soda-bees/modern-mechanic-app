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

const Workshops: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const handleGoToProfile = () => {
    navigation.navigate('Profile');
  };

  const [email, setEmail] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  type DashLight = {
    name: string;
    image: any;
    webLink: string;
    number: string;
    address: string;
    rating: number;
    description: string;
  };

  const [workshopDetails, setWorkshopDetails] = useState<DashLight[]>([
    {
      name: 'Auto Parts Hub',
      image: images.workShopImg,
      webLink: 'www.autopartshub.com',
      number: '(123)456-7890',
      address: '1234 Elm Street, Springfield, USA',
      rating: 5,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: 'Auto Parts Hub',
      image: images.workShopImg,
      webLink: 'www.autopartshub.com',
      number: '(123)456-7890',
      address: '1234 Elm Street, Springfield, USA',
      rating: 5,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: 'Auto Parts Hub',
      image: images.workShopImg,
      webLink: 'www.autopartshub.com',
      number: '(123)456-7890',
      address: '1234 Elm Street, Springfield, USA',
      rating: 5,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },

    {
      name: 'Auto Parts Hub',
      image: images.workShopImg,
      webLink: 'www.autopartshub.com',
      number: '(123)456-7890',
      address: '1234 Elm Street, Springfield, USA',
      rating: 5,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: 'Auto Parts Hub',
      image: images.workShopImg,
      webLink: 'www.autopartshub.com',
      number: '(123)456-7890',
      address: '1234 Elm Street, Springfield, USA',
      rating: 5,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ]);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>();

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

export default Workshops;
