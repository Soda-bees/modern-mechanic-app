import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
  ActivityIndicator,
  ScrollView,
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
import {removeVehicle, selectCar} from '../../services/config/API';
import {AppDispatch} from '../../store';
import {SafeAreaView} from 'react-native-safe-area-context';

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
  const [loader, setLoader] = useState<boolean>(false);
  const [loader2, setLoader2] = useState<boolean>(false);
  const [deletingCarId, setDeletingCarId] = useState<number | null>(null);
  const [selectingCarId, setSelectingCarId] = useState<number | null>(null);

  console.log(userData?.cars);

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

  const handleSelectCar = async (carId: number) => {
    // Show confirmation alert
    Alert.alert(
      'Confirm Select',
      'Are you sure you want to select this Car for the Scan?',
      [
        {
          text: 'Cancel',
          style: 'cancel', // Different style for Cancel
        },
        {
          text: 'Select',
          style: 'destructive', // Red text to indicate a destructive action
          onPress: async () => {
            // Proceed with deletion
            setSelectingCarId(carId);

            setLoader2(true);
            try {
              console.log('Selecting Car with carId:', carId);

              const response = await selectCar(authToken, carId);
              console.log('Select Car Response:', response);

              if (response?.success) {
                setLoader2(false);
                setSelectingCarId(null);
                dispatch(setUserData(response?.userData));
                Alert.alert('Success', 'Your Car is selected successfully!', [
                  {
                    text: 'OK',
                  },
                ]);
              } else {
                setLoader2(false);
                setSelectingCarId(null);

                Alert.alert(
                  'Error',
                  response?.message ||
                    'Your Car could not be selected, try again later!',
                  [
                    {
                      text: 'OK',
                    },
                  ],
                );
              }
            } catch (error) {
              setLoader2(false);
              setSelectingCarId(null);

              Alert.alert(
                'Error',
                'An error occurred while selecting your Car.',
                [
                  {
                    text: 'OK',
                  },
                ],
              );
              console.error('Error:', error);
            } finally {
              setLoader2(false);
              setSelectingCarId(null);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['top', 'bottom']}>
      <View style={{flex: 1}}>
        <Image source={images.bg} style={styles.bg} />
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

            <ScrollView>
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
                        <View style={styles.selectRow}>
                          <Text style={styles.disabledText}>{car?.year}</Text>
                          <TouchableOpacity
                            style={
                              car.selected
                                ? styles.setSelectedBtn
                                : styles.setSelectBtn
                            }
                            onPress={() => {
                              if (!loader2 && !car.selected) {
                                handleSelectCar(car?.id);
                              }
                            }}>
                            {loader2 ? (
                              <View style={{bottom: 1}}>
                                <ActivityIndicator size={20} color={'white'} />
                              </View>
                            ) : (
                              <Text style={styles.textWhiteSmall}>
                                {car.selected ? 'Selected' : 'Select'}
                              </Text>
                            )}
                          </TouchableOpacity>
                        </View>
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
                        <View style={styles.selectRow}>
                          <Text style={styles.disabledText}>{car?.year}</Text>
                          <TouchableOpacity
                            style={
                              car.selected
                                ? styles.setSelectedBtn
                                : styles.setSelectBtn
                            }
                            onPress={() => {
                              if (!loader2 && !car.selected) {
                                handleSelectCar(car?.id);
                              }
                            }}>
                            {loader2 ? (
                              <View style={{bottom: 1}}>
                                <ActivityIndicator size={20} color={'white'} />
                              </View>
                            ) : (
                              <Text style={styles.textWhiteSmall}>
                                {car.selected ? 'Selected' : 'Select'}
                              </Text>
                            )}
                          </TouchableOpacity>
                        </View>
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
                        <View style={styles.selectRow}>
                          <Text style={styles.disabledText}>{car?.year}</Text>
                          <TouchableOpacity
                            style={
                              car.selected
                                ? styles.setSelectedBtn
                                : styles.setSelectBtn
                            }
                            onPress={() => {
                              if (!loader2 && !car.selected) {
                                handleSelectCar(car?.id);
                              }
                            }}>
                            {loader2 ? (
                              <View style={{bottom: 1}}>
                                <ActivityIndicator size={20} color={'white'} />
                              </View>
                            ) : (
                              <Text style={styles.textWhiteSmall}>
                                {car.selected ? 'Selected' : 'Select'}
                              </Text>
                            )}
                          </TouchableOpacity>
                        </View>
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
                        <View style={styles.selectRow}>
                          <Text style={styles.disabledText}>{car?.year}</Text>
                          <TouchableOpacity
                            style={
                              car.selected
                                ? styles.setSelectedBtn
                                : styles.setSelectBtn
                            }
                            onPress={() => {
                              if (!loader2 && !car.selected) {
                                handleSelectCar(car?.id);
                              }
                            }}>
                            {loader2 ? (
                              <View style={{bottom: 1}}>
                                <ActivityIndicator size={20} color={'white'} />
                              </View>
                            ) : (
                              <Text style={styles.textWhiteSmall}>
                                {car.selected ? 'Selected' : 'Select'}
                              </Text>
                            )}
                          </TouchableOpacity>
                        </View>
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
                        <View style={styles.selectRow}>
                          <Text style={styles.disabledText}>{car?.year}</Text>
                          <TouchableOpacity
                            style={
                              car.selected
                                ? styles.setSelectedBtn
                                : styles.setSelectBtn
                            }
                            onPress={() => {
                              if (!loader2 && !car.selected) {
                                handleSelectCar(car?.id);
                              }
                            }}>
                            {loader2 ? (
                              <View style={{bottom: 1}}>
                                <ActivityIndicator size={20} color={'white'} />
                              </View>
                            ) : (
                              <Text style={styles.textWhiteSmall}>
                                {car.selected ? 'Selected' : 'Select'}
                              </Text>
                            )}
                          </TouchableOpacity>
                        </View>
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
            </ScrollView>
          </View>
          <View
            style={{
              position: 'absolute',
              alignSelf: 'center',
              bottom: sizes.screenHeight * 0.04,
            }}>
            <OrangeButton title="Back to home" onPress={handleContinue} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Garage;
