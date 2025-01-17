import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
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
import {selectUserData, setUserData} from '../../store/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthToken} from '../../store/authSlice';
import {
  addReview,
  AddReviewBody,
  editReview,
  EditReviewBody,
} from '../../services/config/API';
import {AppDispatch} from '../../store';
import {addReviewRedux, editReviewRedux} from '../../store/reviewSlice';
import OrangeButtonLoader from '../../components/OrangeButtonLoader';
type NavigationProp = StackNavigationProp<RootStackParamList, 'Scann'>;

const Review: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const userData = useSelector(selectUserData);
  const authToken = useSelector(selectAuthToken);
  const dispatch: AppDispatch = useDispatch();

  const [loader, setLoader] = useState<Boolean>(false);
  const [rating, setRating] = useState<number>(
    userData?.review ? userData?.review.rating : 0,
  );
  const [comment, setComment] = useState<string>(
    userData?.review ? userData?.review.reviewText : '',
  );

  const handleEditReview = async () => {
    try {
      setLoader(true);
      if (!rating || !comment) {
        Alert.alert('Please provide a rating and comment.');
        return;
      }

      if (
        rating === userData?.review?.rating &&
        comment === userData?.review?.reviewText
      ) {
        navigation.goBack();
        return;
      }

      const body: EditReviewBody = {
        reviewText: comment,
        rating,
      };
      const response = await editReview(body, authToken);

      if (response?.success) {
        setLoader(false);

        dispatch(setUserData(response?.userData));
        dispatch(editReviewRedux(response?.review));
        Alert.alert('Success', 'Review updated successfully!', [
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
          'Success',
          response?.message || 'Failed to update review.',
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
      setLoader(false);

      console.error('Error updating review:', error);
      Alert.alert('Error', 'An error occurred while updating the review.', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };

  const handleAddReview = async () => {
    try {
      setLoader(true);

      if (!userData?.name || !comment || !rating) {
        Alert.alert('Validation Error', 'Please provide all required fields.');
        return;
      }

      const body: AddReviewBody = {
        reviewerName: userData?.name,
        reviewText: comment,
        rating,
      };

      const response = await addReview(body, authToken);

      if (response?.success) {
        setLoader(false);

        dispatch(setUserData(response?.userData));
        dispatch(addReviewRedux(response?.review));

        Alert.alert('Success', 'Review added successfully!', [
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
          response?.message || 'Failed to add review. Please try again later.',
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
      console.error('Error while adding review:', error);
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
              {loader ? (
                <OrangeButtonLoader />
              ) : (
                <OrangeButton
                  title="Submit"
                  onPress={() => {
                    userData?.review ? handleEditReview() : handleAddReview();
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Review;
