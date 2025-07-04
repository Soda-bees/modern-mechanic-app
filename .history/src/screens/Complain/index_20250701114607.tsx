import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {RootStackParamList} from '../../services/config/navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {colors, sizes} from '../../services/utilities';
import OrangeButton from '../../components/OrangeButton';
import {selectUserData, setUserData} from '../../store/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthToken} from '../../store/authSlice';
import {AppDispatch} from '../../store';
import OrangeButtonLoader from '../../components/OrangeButtonLoader';
import {ScrollView} from 'react-native-gesture-handler';
import {submitComplaint, submitComplaintBody} from '../../services/config/API';
type NavigationProp = StackNavigationProp<RootStackParamList, 'Scann'>;

type RouteProps = RouteProp<RootStackParamList, 'Complain'>;

const Complain: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const {id} = route.params;
  const userData = useSelector(selectUserData);
  const authToken = useSelector(selectAuthToken);
  const dispatch: AppDispatch = useDispatch();

  const [loader, setLoader] = useState<Boolean>(false);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmitComplain = async () => {
    try {
      setLoader(true);

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!id || !fullName || !email || !phoneNumber || !description) {
        Alert.alert('Validation Error', 'Please provide all required fields.');
        setLoader(false);
        return;
      }

      if (!emailRegex.test(email)) {
        Alert.alert('Validation Error', 'Please enter a valid email address.');
        setLoader(false);
        return;
      }
      const body: submitComplaintBody = {
        scanId: id,
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        description: description,
      };

      const response = await submitComplaint(body, authToken);

      if (response?.success) {
        setLoader(false);

        Alert.alert('Success', 'Complaint submitted successfully!', [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      } else {
        setLoader(false);

        Alert.alert(
          'Error',
          response?.message ||
            'Failed to submit complaint. Please try again later.',
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
      console.error('Error while submitting complaint:', error);
      setLoader(false);

      Alert.alert(
        'Error',
        'An unexpected error occurred. Please try again later.',
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
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Image source={images.bg} style={styles.bg} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Modern
            <Text style={styles.headerTitleOrange}> Mechanic</Text>
          </Text>
        </View>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.screen}>
            <View style={styles.lowerBody}>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.backIconContainer}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Image source={images.backIcon} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Complain Form</Text>
              </View>

              <Text style={styles.disabledText}>
                Tell us about your experience of scan result.
              </Text>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor={colors.disabledText}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor={colors.disabledText}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor={colors.disabledText}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="johndoe@example.com"
                  placeholderTextColor={colors.disabledText}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123-456-7890"
                  placeholderTextColor={colors.disabledText}
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>

              <Text style={styles.inputLabel}>Complain</Text>
              <View style={styles.textArea}>
                <TextInput
                  multiline={true}
                  numberOfLines={6}
                  placeholder="Let us know about your complaint so we can enhance our model..."
                  placeholderTextColor={colors.disabledText}
                  style={styles.textAreaInput}
                  onChangeText={setDescription}
                  value={description}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.bottomBtnContainer}>
                {loader ? (
                  <OrangeButtonLoader />
                ) : (
                  <OrangeButton
                    title="Submit"
                    onPress={() => {
                      handleSubmitComplain();
                    }}
                  />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Complain;
