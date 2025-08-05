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
          <Text style={styles.title}>Queries</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.flexWrapper}>
              {allQueries.length > 0 ? (
                allQueries.map((item, index) => (
                  <View style={styles.workshopCardContainer} key={index}>
                    <View>
                      <Text style={styles.disabledText}>Name:</Text>
                      <Text style={styles.nameHeading}>{item.full_name}</Text>

                      <Text style={styles.disabledText}>Email:</Text>
                      <Text style={styles.textWhite}>{item.email}</Text>

                      <Text style={styles.disabledText}>Phone:</Text>
                      <Text style={styles.textWhite}>{item.phone_number}</Text>

                      <Text style={styles.disabledText}>Description:</Text>
                      <Text style={styles.textWhite}>{item.description}</Text>

                      <Text style={styles.disabledText}>Status:</Text>
                      <Text style={styles.textWhite}>{item.status}</Text>

                      <Text style={styles.disabledText}>Submitted On:</Text>
                      <Text style={styles.textWhite}>
                        {new Date(item.created_at).toLocaleString()}
                      </Text>

                      {item.scans?.length > 0 && (
                        <>
                          <Text style={styles.disabledText}>DTC Codes:</Text>
                          {item.scans.map((scan, i) => (
                            <Text key={i} style={styles.textWhite}>
                              {scan.dtc_codes} — {scan.vehicle_info}
                            </Text>
                          ))}
                        </>
                      )}
                    </View>
                  </View>
                ))
              ) : (
                <Text
                  style={[
                    styles.textWhite,
                    {textAlign: 'center', marginTop: 20},
                  ]}>
                  There are no queries.
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AllQueries;
