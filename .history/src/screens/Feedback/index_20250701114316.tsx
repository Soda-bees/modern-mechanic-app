import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {RootStackParamList} from '../../services/config/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import UserHeader from '../../components/UserHeader';
import Modal from 'react-native-modal';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {colors} from '../../services/utilities';
import {useSelector} from 'react-redux';
import {selectAllReviews} from '../../store/reviewSlice';
import {selectUserData} from '../../store/userSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'Review' | 'Profile'
>;

const Feedback: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const allReviews = useSelector(selectAllReviews);
  const userData = useSelector(selectUserData);

  const averageRating =
    allReviews.length > 0
      ? Number(
          (
            allReviews.reduce((sum, review) => sum + review.rating, 0) /
            allReviews.length
          ).toFixed(1),
        )
      : 0;

  const isReviewed = allReviews.some(review => review.userId === userData?.id);

  const [email, setEmail] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>();

  const handleNavigate = () => {
    navigation.navigate('Review');
  };

  const handleGoToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['top', 'bottom']}>
      <Image source={images.bg} style={styles.bg} />
      <View style={styles.screen}>
        <UserHeader onPress={handleGoToProfile} />
        <View style={styles.lowerBody}>
          <Text style={styles.title}>Feedback</Text>

          <View style={styles.orangeContainer}>
            <Text style={styles.textWhite}>Reviews & Ratings</Text>
            <View style={styles.totalRatingsRow}>
              <View style={styles.row}>
                <Text style={styles.textWhite2}>{averageRating}</Text>
                <View style={styles.ratingContainer}>
                  <StarRatingDisplay
                    rating={averageRating}
                    color="#FFC200"
                    emptyColor={colors.lightGrey}
                    maxStars={5}
                    starSize={26}
                    starStyle={{marginHorizontal: 0}}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.writeAReviewBtn}
                onPress={handleNavigate}>
                <Text style={styles.orangeText}>
                  {isReviewed ? `Edit review` : `Write a review`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.flexWrapper}>
              {/* {allReviews?.map((item, index) => {
                return (
                  <View style={styles.lightContainer} key={index}>
                    <View style={styles.totalRatingsRow}>
                      <Text style={styles.name}>{item?.reviewerName}</Text>
                      <StarRatingDisplay
                        rating={item?.rating}
                        color="#FFC200"
                        emptyColor={colors.lightGrey}
                        maxStars={5}
                        starSize={26}
                        starStyle={{marginHorizontal: 0}}
                      />
                    </View>
                    <Text style={styles.comment}>{item?.reviewText}</Text>
                  </View>
                );
              })} */}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Feedback;
