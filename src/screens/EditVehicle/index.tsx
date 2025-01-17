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
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {
  editVehicle,
  EditVehicleBody,
  uploadImage,
} from '../../services/config/API';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthToken} from '../../store/authSlice';
import {AppDispatch} from '../../store';
import {setUserData} from '../../store/userSlice';
import OrangeButtonLoader from '../../components/OrangeButtonLoader';

type RouteProps = RouteProp<RootStackParamList, 'EditVehicle'>;

const EditVehicle: React.FC = (): JSX.Element => {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const {vehicleData} = route.params;
  const authToken = useSelector(selectAuthToken);
  const dispatch: AppDispatch = useDispatch();
  const [errMsg, setErrMsg] = useState<string>('');
  const [makeNew, setMakeNew] = useState<string>(vehicleData?.make);
  const [modelNew, setModelNew] = useState<string>(vehicleData?.model);
  const [yearNew, setYearNew] = useState<number>(vehicleData?.year);
  const [transmissionNew, setTransmissionNew] = useState<string>(
    vehicleData?.transmission,
  );
  const [imageUri, setImageUri] = useState<any>(vehicleData?.image);
  const [isUploading, setIsUploading] = useState<boolean>(false); // For loading indicator
  const [loader, setLoader] = useState<boolean>(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | undefined>(
    undefined,
  );

  const requestCameraPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.CAMERA); // For Android
    if (result === RESULTS.GRANTED) {
      openCamera();
    } else {
      Alert.alert(
        'Permission Denied',
        'Camera access is needed to take photos.',
      );
    }
  };

  // Function to check for gallery permission
  const requestGalleryPermission = async () => {
    let result;

    if (Platform.OS === 'android' && Platform.Version >= 33) {
      // For Android 13+ (API level 33 and higher)
      result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
    } else {
      // For Android 12 and below
      result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    }
    if (result === RESULTS.GRANTED) {
      openGallery();
    } else if (result === RESULTS.BLOCKED) {
      Alert.alert(
        'Permission Blocked',
        'You have blocked the permission for gallery access. Please go to settings and enable it manually.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: () => Linking.openSettings()},
        ],
      );
    } else {
      Alert.alert(
        'Permission Denied',
        'Gallery access is needed to upload photos.',
      );
    }
  };

  // Function to open the camera
  const openCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 1,
    });

    const imageUri = result?.assets?.[0]?.uri;

    if (imageUri) {
      handleUploadImage(imageUri); // Call only if imageUri is a valid string
    } else {
      Alert.alert('Error', 'No image selected.');
    }
  };

  // Function to open the gallery
  const openGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    const imageUri = result?.assets?.[0]?.uri;

    if (imageUri) {
      handleUploadImage(imageUri); // Call only if imageUri is a valid string
    } else {
      Alert.alert('Error', 'No image selected.');
    }
  };

  const handleUploadImage = async (imageUri: string) => {
    setIsUploading(true);
    try {
      const response = await uploadImage({imageUri});
      if (response?.success) {
        setImageUri(response.url);
        setUploadedImageUrl(response.url); // Store the uploaded image URL
      } else {
        Alert.alert('Error', response?.message || 'Image upload failed.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while uploading the image.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (isUploading) {
      return;
    }

    if (
      makeNew === vehicleData?.make &&
      modelNew === vehicleData?.model &&
      yearNew === vehicleData?.year &&
      imageUri === vehicleData?.image
    ) {
      navigation.goBack();
      return;
    }
    // Validate input fields
    if (!makeNew || !modelNew || !yearNew || !imageUri) {
      Alert.alert(
        'Validation Error',
        'Please fill all required fields, including uploading an image.',
      );
      return;
    }

    setLoader(true); // Start loader
    try {
      // Prepare the body for the API call
      const body: EditVehicleBody = {
        image: imageUri, // from image picker
        make: makeNew, // from form input
        model: modelNew, // from form input
        year: Number(yearNew), // Convert year to number if it's a string
        transmission: transmissionNew, // from form input
      };

      console.log(body);
      // Call the signup API
      const carId = vehicleData?.id;
      console.log('cardIddddddddddddd', carId);

      const response = await editVehicle(body, authToken, carId);
      console.log('Edit Vehicle Response:', response);
      if (response?.success) {
        dispatch(setUserData(response?.userData));
        Alert.alert('Success', 'Your vehicle is updated successfully!', [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      } else {
        Alert.alert(
          'Error',
          response?.message ||
            'Your vehicle could not be updated, try again later!',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.goBack();
              },
            },
          ],
        );
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while updating your vehicle.', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
      console.error('Error:', error);
    } finally {
      setLoader(false); // Stop loader
    }
  };

  // const handleSave = () => {
  //   navigation.goBack();
  // };

  return (
    <SafeAreaView>
      <View>
        <Image source={images.bg} style={styles.bg} />
        <View>
          <View style={styles.screen}>
            <View style={styles.body}>
              <Header goBack={true} title="Edit Vehicle" />
              <View style={styles.hrFull}></View>
              <View style={styles.sectionContainer}>
                <View style={styles.vehicleContainer}>
                  <TouchableOpacity
                    style={styles.uploadImgContainer}
                    onPress={() =>
                      Alert.alert('Upload Image', 'Choose an option', [
                        {text: 'Camera', onPress: requestCameraPermission},
                        {text: 'Gallery', onPress: requestGalleryPermission},
                        {text: 'Cancel', style: 'cancel'},
                      ])
                    }>
                    {isUploading ? (
                      <ActivityIndicator
                        color={colors.disabledText}
                        size={40}
                      />
                    ) : (
                      <>
                        {imageUri ? (
                          <Image
                            style={styles.uploadImgPreview}
                            source={{uri: imageUri}}
                          />
                        ) : (
                          <>
                            <Image
                              style={styles.uploadImgIcon}
                              source={images.uploadImgIcon}
                            />
                            <Text style={styles.uploadImgText}>
                              Upload Vehicle Image
                            </Text>
                          </>
                        )}
                      </>
                    )}
                  </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    onChangeText={text => {
                      setMakeNew(text);
                    }}
                    style={styles.input}
                    placeholder="Make"
                    placeholderTextColor={colors.disabledText}
                    value={makeNew}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    onChangeText={text => {
                      setModelNew(text);
                    }}
                    style={styles.input}
                    placeholder="Model"
                    placeholderTextColor={colors.disabledText}
                    value={modelNew}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    onChangeText={text => {
                      setYearNew(Number(text));
                    }}
                    style={styles.input}
                    placeholder="Year"
                    placeholderTextColor={colors.disabledText}
                    value={yearNew.toString()}
                  />
                </View>

                <View style={styles.transmissionRow}>
                  <TouchableOpacity
                    style={styles.selector}
                    onPress={() => {
                      setTransmissionNew('Automatic');
                    }}>
                    <Image
                      source={
                        transmissionNew === 'Automatic'
                          ? images.selected
                          : images.select
                      }
                      style={styles.selectIcon}
                    />
                    <Text style={styles.selectorText}>Automatic</Text>
                  </TouchableOpacity>
                  <View style={styles.separator}></View>
                  <TouchableOpacity
                    style={styles.selector}
                    onPress={() => {
                      setTransmissionNew('Manual');
                    }}>
                    <Image
                      source={
                        transmissionNew === 'Manual'
                          ? images.selected
                          : images.select
                      }
                      style={styles.selectIcon}
                    />
                    <Text
                      style={[
                        styles.selectorText,
                        {marginRight: sizes.screenWidth * 0.06},
                      ]}>
                      Manual
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Text style={styles.errMsg}>{errMsg}</Text>
            {loader ? (
              <OrangeButtonLoader />
            ) : (
              <OrangeButton title="Save Vehicle" onPress={handleSave} />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditVehicle;
