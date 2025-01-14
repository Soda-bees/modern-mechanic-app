import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {colors, sizes} from '../../services/utilities';
import OrangeButton from '../../components/OrangeButton';
import Header from '../../components/Header';
import {RootStackParamList} from '../../services/config/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData, setUserData} from '../../store/userSlice';
import {selectAuthToken} from '../../store/authSlice';
import {removeVehicle} from '../../services/config/API';
import {AppDispatch} from '../../store';

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditVehicle' | 'AddUserVehicle' | 'Landing'
>;

const Garage: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const userData = useSelector(selectUserData);
  const authToken = useSelector(selectAuthToken);
  const dispatch: AppDispatch = useDispatch();

  const [errMsg, setErrMsg] = useState<string>('');
  // const [make, setMake] = useState<string>('Honda');
  // const [model, setModel] = useState<string>('Civic');
  // const [year, setYear] = useState<string>('1998');
  // const [transmission, setTransmission] = useState<string>('Automatic');
  // const [imageUri, setImageUri] = useState<any>(images.carImg); // To store the image URI
  const [loader, setLoader] = useState<boolean>(false);
  const [deletingCarId, setDeletingCarId] = useState<number | null>(null);

  const handleGoToEdit = (
    image: string,
    make: string,
    model: string,
    year: number,
    transmission: string,
    id: number,
  ) => {
    navigation.navigate('EditVehicle', {
      vehicleData: {
        make,
        model,
        year,
        image,
        transmission,
        id,
      },
    });
  };

  const handleGoToAdd = () => {
    navigation.navigate('AddUserVehicle');
  };

  const handleContinue = () => {
    navigation.navigate('BottomTabNavigator');
  };
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleDelete = async (carId: number) => {
    // Show confirmation alert
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this vehicle?',
      [
        {
          text: 'Cancel',
          style: 'cancel', // Different style for Cancel
        },
        {
          text: 'Delete',
          style: 'destructive', // Red text to indicate a destructive action
          onPress: async () => {
            // Proceed with deletion
            setDeletingCarId(carId);

            setLoader(true);
            try {
              console.log('Deleting Vehicle with carId:', carId);

              const response = await removeVehicle(authToken, carId);
              console.log('Remove Vehicle Response:', response);

              if (response?.success) {
                setLoader(false);
                setDeletingCarId(null);
                dispatch(setUserData(response?.userData));
                Alert.alert(
                  'Success',
                  'Your vehicle is deleted successfully!',
                  [
                    {
                      text: 'OK',
                    },
                  ],
                );
              } else {
                setLoader(false);
                setDeletingCarId(null);

                Alert.alert(
                  'Error',
                  response?.message ||
                    'Your vehicle could not be deleted, try again later!',
                  [
                    {
                      text: 'OK',
                    },
                  ],
                );
              }
            } catch (error) {
              setLoader(false);
              setDeletingCarId(null);

              Alert.alert(
                'Error',
                'An error occurred while deleting your vehicle.',
                [
                  {
                    text: 'OK',
                  },
                ],
              );
              console.error('Error:', error);
            } finally {
              setLoader(false);
              setDeletingCarId(null);
            }
          },
        },
      ],
      {cancelable: true}, // Allows the user to dismiss the dialog by tapping outside
    );
  };

  return (
    <SafeAreaView>
      <View>
        <Image source={images.bg} style={styles.bg} />
        <View>
          <View style={styles.screen}>
            <View style={styles.body}>
              <View style={styles.header}>
                <View style={styles.backTitleContainer}>
                  <TouchableOpacity
                    onPress={handleGoBack}
                    style={styles.backIconContainer}>
                    <Image style={styles.backIcon} source={images.backIcon} />
                  </TouchableOpacity>
                  <Text style={styles.headerTitle}>Garage</Text>
                </View>

                <TouchableOpacity
                  style={styles.addVehicleBtn}
                  onPress={handleGoToAdd}>
                  <Text style={styles.textWhite}>+ Add Vehicle</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.hrFull}></View>
              <View style={styles.sectionContainer}>
                <View style={styles.vehicleCardContainer}>
                  {userData?.cars?.map((car, index) => {
                    return (
                      <View style={styles.vehicleContainer} key={index}>
                        <View style={styles.carImgContainer}>
                          <Image
                            source={{uri: car?.image}}
                            style={styles.carImg}
                          />
                          <TouchableOpacity
                            style={styles.deleteIconContainer}
                            onPress={() => {
                              if (!loader) {
                                handleDelete(car?.id);
                              }
                            }}>
                            {deletingCarId == car.id ? (
                              <ActivityIndicator size={20} color={'black'} />
                            ) : (
                              <Image
                                source={images.deleteIcon}
                                style={styles.deleteIcon}
                              />
                            )}
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.textWhite2}>
                          {car?.make} {car?.model}
                        </Text>
                        <Text style={styles.disabledText}>{car?.year}</Text>
                        <TouchableOpacity
                          style={styles.addVehicleBtn}
                          onPress={() => {
                            handleGoToEdit(
                              car?.image,
                              car?.make,
                              car?.model,
                              car?.year,
                              car?.transmission,
                              car?.id,
                            );
                          }}>
                          <Text style={styles.textWhite}>Edit</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                  {/* <View style={styles.vehicleContainer}>
                    <View style={styles.carImgContainer}>
                      <Image source={images.carImg} style={styles.carImg} />
                    </View>
                    <Text style={styles.textWhite2}>
                      {make} {model}
                    </Text>
                    <Text style={styles.disabledText}>{year}</Text>
                    <TouchableOpacity
                      style={styles.addVehicleBtn}
                      onPress={handleGoToEdit}>
                      <Text style={styles.textWhite}>Edit</Text>
                    </TouchableOpacity>
                  </View> */}
                </View>
              </View>
            </View>

            <Text style={styles.errMsg}>{errMsg}</Text>
            <OrangeButton title="Back to home" onPress={handleContinue} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Garage;
