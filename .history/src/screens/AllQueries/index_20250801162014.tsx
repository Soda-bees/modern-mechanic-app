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
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthToken} from '../../store/authSlice';
import {getAllWorkshops} from '../../services/config/API';
import {AppDispatch} from '../../store';
import {selectWorkshops, setWorkshops} from '../../store/workshopSlice';
import {selectQueries} from '../../store/querySlice';
type NavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

const AllQueries: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch: AppDispatch = useDispatch();
  const authToken = useSelector(selectAuthToken);

  const allQueries = useSelector(selectQueries);

  const [email, setEmail] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>();

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
              {allQueries.map((item, index) => {
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

export default AllQueries;
