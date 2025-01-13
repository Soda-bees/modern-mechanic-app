import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
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
import {updateUserData} from '../../services/config/API';
import {selectAuthToken} from '../../store/authSlice';
import OrangeButtonLoader from '../../components/OrangeButtonLoader';
import {AppDispatch} from '../../store';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Otp'>;

const EditProfile: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const userData = useSelector(selectUserData);
  const authToken = useSelector(selectAuthToken);
  const dispatch: AppDispatch = useDispatch();

  const [name, setName] = useState<string | undefined>(userData?.name);
  const [zipCode, setZipCode] = useState<string | undefined>(
    userData?.zipCode.toString(),
  );
  const [errMsg, setErrMsg] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);

  const handleSave = async () => {
    setLoader(true);

    try {
      if (!name) {
        return;
      }
      const body = {
        name,
        zipCode: Number(zipCode),
      };

      const response = await updateUserData(body, authToken);
      console.log(response?.userData);
      if (response?.success) {
        dispatch(setUserData(response?.userData));
        setLoader(false);
        Alert.alert('Success', 'Your info has been updated successfully!', [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      }
    } catch (error) {
      setLoader(false);
      console.error('Error changing password:', error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.main}>
        <Image source={images.bg} style={styles.bg} />
        <Header goBack={true} title="Edit Profile" />

        <View style={styles.hrFull}></View>

        <View style={styles.sectionContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={images.nameIcon} />
            <TextInput
              onChangeText={text => {
                setName(text);
              }}
              style={styles.input}
              value={name}
              placeholderTextColor={colors.disabledText}
            />
          </View>

          <Text style={styles.inputLabel}>Zip Code</Text>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={images.zipCodeIcon} />
            <TextInput
              onChangeText={text => {
                setZipCode(text);
              }}
              style={styles.input}
              value={zipCode}
              placeholderTextColor={colors.disabledText}
              inputMode="numeric"
            />
          </View>

          <Text style={styles.errMsg}>{errMsg}</Text>
          <View style={styles.orangeButtonContainer}>
            {loader ? (
              <OrangeButtonLoader />
            ) : (
              <OrangeButton title="Save" onPress={handleSave} />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
