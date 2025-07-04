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
} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {colors, sizes} from '../../services/utilities';
import OrangeButton from '../../components/OrangeButton';
import Header from '../../components/Header';
import {RootStackParamList} from '../../services/config/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {RouteProp, useRoute} from '@react-navigation/native';
import {signUp, uploadImage} from '../../services/config/API';
import OrangeButtonLoader from '../../components/OrangeButtonLoader';
import {SignupBody} from '../../services/config/API';
import {AppDispatch} from '../../store';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthToken, setAuthToken} from '../../store/authSlice';
import {selectUserData, setUserData} from '../../store/userSlice';
import {SafeAreaView} from 'react-native-safe-area-context';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Garage'>;
type RouteProps = RouteProp<RootStackParamList, 'AddVehicle'>;

const AddVehicle: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const {userData} = route.params;
  // console.log(userData);
  const dispatch: AppDispatch = useDispatch();
  const authToken = useSelector(selectAuthToken);
  const userDataRedux = useSelector(selectUserData);
  console.log('token and user info:', authToken, userDataRedux);

  const [email, setEmail] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [transmission, setTransmission] = useState<string>('Automatic');
  const [imageUri, setImageUri] = useState<any>(null); // To store the image URI
  const [isUploading, setIsUploading] = useState<boolean>(false); // For loading indicator
  const [loader, setLoader] = useState<boolean>(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | undefined>(
    undefined,
  );

  // Function to check for camera permission
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
    // Validate input fields
    if (!make || !model || !year || !imageUri) {
      Alert.alert(
        'Validation Error',
        'Please fill all required fields, including uploading an image.',
      );
      return;
    }

    if (
      !userData?.name ||
      !userData?.email ||
      !userData?.zipCode ||
      !userData?.password
    ) {
      Alert.alert(
        'Validation Error',
        'User details are incomplete. Please provide all required information.',
      );
      return;
    }

    setLoader(true); // Start loader
    try {
      // Prepare the body for the API call
      const body: SignupBody = {
        name: userData?.name, // from state or form
        email: userData?.email, // from state or form
        zipCode: userData?.zipCode, // from state or form
        password: userData?.password, // from state or form
        cars: [
          {
            image: imageUri, // from image picker
            make, // from form input
            model, // from form input
            year: Number(year), // Convert year to number if it's a string
            transmission, // from form input
          },
        ],
      };

      console.log(body);

      // Call the signup API
      const response = await signUp(body);
      console.log('Sign Up Response:', response);
      if (response?.success) {
        // Alert.alert('Success', 'Vehicle added successfully!');
        // Optionally navigate to another screen or clear inputs
        dispatch(setUserData(response.userDeta));
        dispatch(setAuthToken(response.token));
      } else {
        Alert.alert('Error', response?.message || 'Sign Up Failed.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while signing up.');
      console.error('Error:', error);
    } finally {
      setLoader(false); // Stop loader
    }
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['top', 'bottom']}>
      <View style={{flex: 1}}>
        <Image source={images.bg} style={styles.bg} />

        <View style={styles.screen}>
          <View style={styles.body}>
            <Header goBack={false} title="Add Vehicle" />
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
                    <ActivityIndicator color={colors.disabledText} size={40} />
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
                {/* <TouchableOpacity style={styles.uploadImgContainer}>
                    <Image
                      style={styles.uploadImgIcon}
                      source={images.uploadImgIcon}
                    />
                    <Text style={styles.uploadImgText}>
                      Upload Vehicle Image
                    </Text>
                  </TouchableOpacity> */}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={text => {
                    setMake(text);
                  }}
                  style={styles.input}
                  placeholder="Make"
                  placeholderTextColor={colors.disabledText}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={text => {
                    setModel(text);
                  }}
                  style={styles.input}
                  placeholder="Model"
                  placeholderTextColor={colors.disabledText}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={text => {
                    setYear(text);
                  }}
                  style={styles.input}
                  placeholder="Year"
                  placeholderTextColor={colors.disabledText}
                  inputMode="numeric"
                />
              </View>

              <View style={styles.transmissionRow}>
                <TouchableOpacity
                  style={styles.selector}
                  onPress={() => {
                    setTransmission('Automatic');
                  }}>
                  <Image
                    source={
                      transmission === 'Automatic'
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
                    setTransmission('Manual');
                  }}>
                  <Image
                    source={
                      transmission === 'Manual'
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
              <Text style={styles.errMsg}>{errMsg}</Text>
            </View>
          </View>
          <View style={styles.orangeButtonContainer}>
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

export default AddVehicle;
