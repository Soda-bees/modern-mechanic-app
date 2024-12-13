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

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditVehicle' | 'AddUserVehicle' | 'Landing'
>;

const Garage: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

  const [errMsg, setErrMsg] = useState<string>('');
  const [make, setMake] = useState<string>('Honda');
  const [model, setModel] = useState<string>('Civic');
  const [year, setYear] = useState<string>('1998');
  const [transmission, setTransmission] = useState<string>('Automatic');
  const [imageUri, setImageUri] = useState<any>(images.carImg); // To store the image URI

  const handleGoToEdit = () => {
    navigation.navigate('EditVehicle', {
      vehicleData: {
        make,
        model,
        year,
        image: imageUri,
        transmission,
      },
    });
  };

  const handleSendGoToAdd = () => {
    navigation.navigate('AddUserVehicle');
  };

  const handleContinue = () => {
    navigation.navigate('BottomTabNavigator');
  };

  return (
    <SafeAreaView>
      <View>
        <Image source={images.bg} style={styles.bg} />
        <View>
          <View style={styles.screen}>
            <View style={styles.body}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Garage</Text>

                <TouchableOpacity
                  style={styles.addVehicleBtn}
                  onPress={handleSendGoToAdd}>
                  <Text style={styles.textWhite}>+ Add Vehicle</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.hrFull}></View>
              <View style={styles.sectionContainer}>
                <View style={styles.vehicleCardContainer}>
                  <View style={styles.vehicleContainer}>
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
                  </View>

                  <View style={styles.vehicleContainer}>
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
                  </View>

                  <View style={styles.vehicleContainer}>
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
                  </View>
                </View>
              </View>
            </View>

            <Text style={styles.errMsg}>{errMsg}</Text>
            <OrangeButton title="Continue" onPress={handleContinue} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Garage;
