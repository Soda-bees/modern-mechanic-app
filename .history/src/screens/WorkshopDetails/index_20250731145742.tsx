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
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {useSelector} from 'react-redux';
import {selectWorkshops} from '../../store/workshopSlice';
type NavigationProp = StackNavigationProp<RootStackParamList, 'Scann'>;
type RouteProps = RouteProp<RootStackParamList, 'WorkshopDetails'>;

const WorkshopDetails: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const {id} = route.params;
  const allWorkshops = useSelector(selectWorkshops);
  const workshop = allWorkshops.find(shop => shop.id === id);

  const [email, setEmail] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

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

              <View style={styles.workshopImageContainer}>
                <Image
                  style={styles.workshopImage}
                  source={{uri: workshop?.image}}
                />
              </View>
              <Text style={styles.nameHeading}>{workshop?.name}</Text>
              <View style={styles.container}>
                <Text style={styles.disabledText}>Contact Info:</Text>
                <Text style={styles.textWhite}>{workshop?.website_link}</Text>
                <Text style={styles.textWhite}>{workshop?.phone_number}</Text>
              </View>
              <View style={styles.container}>
                <Text style={styles.disabledText}>Address:</Text>
                <Text style={styles.textWhite}>{workshop?.address}</Text>
              </View>

              <View style={styles.descriptionContainer}>
                <Text style={styles.disabledText}>About:</Text>
                <Text style={styles.textWhite}>{workshop?.description}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WorkshopDetails;
