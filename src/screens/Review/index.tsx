import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {RootStackParamList} from '../../services/config/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import UserHeader from '../../components/UserHeader';
import Modal from 'react-native-modal';
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';
import {colors, sizes} from '../../services/utilities';
import OrangeButton from '../../components/OrangeButton';
type NavigationProp = StackNavigationProp<RootStackParamList, 'Scann'>;

const Review: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  type DashLight = {
    name: string;
    rating: any;
    comment: string;
  };

  const [feedbacks, setFeedbacks] = useState<DashLight[]>([
    {
      name: 'John D',
      rating: 4,
      comment:
        'This app saved me time and money by diagnosing my car’s problem quickly. A must-have for car owners!',
    },
    {
      name: 'Sarah K',
      rating: 5,
      comment:
        'Great tool for car diagnostics. The real-time tracking is impressive, though more detailed guides would be helpful',
    },
    {
      name: 'Mark K',
      rating: 4,
      comment:
        'Seamless experience! The app identified the issue and directed me to the nearest repair shop. Highly recommend!',
    },
  ]);

  const handleSubmit = () => {};

  return (
    <SafeAreaView>
      <View>
        <Image source={images.bg} style={styles.bg} />
        <View style={styles.screen}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              Modern
              <Text style={styles.headerTitleOrange}> Mechanic</Text>
            </Text>
          </View>
          <View style={styles.lowerBody}>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.backIconContainer}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image source={images.backIcon} style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.title}>Feedback</Text>
            </View>

            <Text style={styles.disabledText}>
              Tell us about your experience of using OBD Reader App
            </Text>

            <View style={styles.textArea}>
              <TextInput
                multiline={true}
                placeholder="Notes + better info for more acurate results"
                placeholderTextColor={colors.disabledText}
                style={styles.textAreaInput}
                onChangeText={text => {
                  setComment(text);
                }}
                value={comment}
              />
            </View>

            <Text style={styles.disabledText}>Give your rating</Text>

            <StarRating
              rating={rating}
              color="#FFC200"
              emptyColor={colors.lightGrey}
              maxStars={5}
              starSize={36}
              starStyle={{
                marginLeft: 0,
                marginRight: sizes.screenWidth * 0.02,
              }}
              onChange={rating => setRating(rating)}
              enableHalfStar={false}
              style={{marginTop: sizes.screenHeight * 0.01}}
            />
            <View style={styles.bottomBtnContainer}>
              <OrangeButton title="Submit" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Review;
