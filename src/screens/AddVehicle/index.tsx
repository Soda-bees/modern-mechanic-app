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

type NavigationProp = StackNavigationProp<RootStackParamList, 'Garage'>;

const AddVehicle: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [transmission, setTransmission] = useState<string>('Automatic');
  const [imageUri, setImageUri] = useState<any>(null); // To store the image URI
  console.log(imageUri);

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

    if (result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri); // Set the captured image URI
    }
  };

  // Function to open the gallery
  const openGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri); // Set the selected image URI
    }
  };

  const handleSave = () => {
    navigation.navigate('Garage');
  };

  return (
    <SafeAreaView>
      <View>
        <Image source={images.bg} style={styles.bg} />
        <View>
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
              </View>
            </View>

            <Text style={styles.errMsg}>{errMsg}</Text>
            <OrangeButton title="Save Vehicle" onPress={handleSave} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddVehicle;
