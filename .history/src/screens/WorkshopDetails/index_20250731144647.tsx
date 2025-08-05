import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {RootStackParamList} from '../../services/config/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import UserHeader from '../../components/UserHeader';
import Modal from 'react-native-modal';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {colors} from '../../services/utilities';
type NavigationProp = StackNavigationProp<RootStackParamList, 'Scann'>;

const WorkshopDetails: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

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

  const [workshopDetails, setWorkshopDetails] = useState<DashLight>({
    name: 'Auto Parts Hub',
    image: images.workShopImg,
    webLink: 'www.autopartshub.com',
    number: '(123)456-7890',
    address: '1234 Elm Street, Springfield, USA',
    rating: 5,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  });

  return (
    <SafeAreaView>
      <View>
        <Image source={images.bg} style={styles.bg} />
        <View>
          <View style={styles.screen}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>
                Modern
                <Text style={styles.headerTitleOrange}> Mechanic</Text>
              </Text>
            </View>
            <View style={styles.lowerBody}>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.backIconContainer}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Image source={images.backIcon} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Workshop Info</Text>
              </View>

              <Image
                style={styles.workshopImage}
                source={workshopDetails.image}
              />
              <Text style={styles.nameHeading}>{workshopDetails.name}</Text>
              <View style={styles.container}>
                <Text style={styles.disabledText}>Contact Info:</Text>
                <Text style={styles.textWhite}>{workshopDetails.webLink}</Text>
                <Text style={styles.textWhite}>{workshopDetails.number}</Text>
              </View>
              <View style={styles.container}>
                <Text style={styles.disabledText}>Address:</Text>
                <Text style={styles.textWhite}>{workshopDetails.address}</Text>
              </View>

              <View style={styles.descriptionContainer}>
                <Text style={styles.disabledText}>Address:</Text>
                <Text style={styles.textWhite}>
                  {workshopDetails.description}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WorkshopDetails;
