import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {RootStackParamList} from '../../services/config/navigation';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import UserHeader from '../../components/UserHeader';
import Modal from 'react-native-modal';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {colors} from '../../services/utilities';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthToken} from '../../store/authSlice';
import {getAllWorkshops} from '../../services/config/API';
import {AppDispatch} from '../../store';
import {selectWorkshops, setWorkshops} from '../../store/workshopSlice';
type NavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

const Workshops: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch: AppDispatch = useDispatch();
  const authToken = useSelector(selectAuthToken);

  const allWorkshops = useSelector(selectWorkshops);

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

  const handleGetAllWorkshops = async () => {
    try {
      console.log('running');

      const response = await getAllWorkshops(authToken);
      console.log(response);

      if (response?.success) {
        console.log(response);
        dispatch(setWorkshops(response.workshops));
      } else {
        Alert.alert(
          'Error',
          response?.message || 'Something went wrong. Please try again later.',
        );
      }
    } catch (error) {
      console.error('Error while fetching workshops:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleGetAllWorkshops();
    }, [authToken]), // add dependencies here
  );

  const handleGoToProfile = () => {
    navigation.navigate('Profile');
  };
  return (
    <SafeAreaView
      style={{flex: 1}}
      edges={Platform.OS == 'ios' ? ['top'] : ['top', 'bottom']}>
      <Image source={images.bg} style={styles.bg} />

      <View style={styles.screen}>
        <UserHeader onPress={handleGoToProfile} />
        <View style={styles.lowerBody}>
          <Text style={styles.title}>Workshops</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.flexWrapper}>
              {allWorkshops.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={styles.workshopCardContainer}
                    key={index}
                    onPress={() => {
                      navigation.navigate('WorkshopDetails', {id: item?.id});
                    }}>
                    <View style={styles.workshopImageContainer}>
                      <Image
                        source={{uri: item?.image}}
                        style={styles.workshopImage}
                      />
                    </View>
                    <View>
                      <Text style={styles.nameHeading}>{item.name}</Text>
                      <Text style={styles.disabledText}>Contact Info:</Text>
                      <Text style={styles.textWhite}>
                        {item.website_link.length > 26
                          ? `${item.website_link.substring(0, 26)}...`
                          : item.website_link}
                      </Text>
                      <Text style={styles.textWhite}>{item.phone_number}</Text>
                      <Text style={styles.disabledText}>Address:</Text>
                      <Text style={styles.textWhite}>
                        {item.address.length > 26
                          ? `${item.address.substring(0, 26)}...`
                          : item.address}
                      </Text>
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
