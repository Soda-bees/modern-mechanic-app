import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {RootStackParamList} from '../../services/config/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import UserHeader from '../../components/UserHeader';
import Modal from 'react-native-modal';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {colors} from '../../services/utilities';
type NavigationProp = StackNavigationProp<RootStackParamList, 'Review'>;

const Feedback: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

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

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>();

  const handleModal = () => {};

  const handleNavigate = () => {
    navigation.navigate('Review');
  };

  return (
    <SafeAreaView>
      <View>
        <Image source={images.bg} style={styles.bg} />
        <View>
          <View style={styles.screen}>
            <UserHeader />
            <View style={styles.lowerBody}>
              <Text style={styles.title}>Feedback</Text>

              <View style={styles.orangeContainer}>
                <Text style={styles.textWhite}>Total Reviews</Text>
                <View style={styles.totalRatingsRow}>
                  <View style={styles.row}>
                    <Text style={styles.textWhite2}>4.5</Text>
                    <View style={styles.ratingContainer}>
                      <StarRatingDisplay
                        rating={5}
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
                    <Text style={styles.orangeText}>Write a review</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.flexWrapper}>
                  {feedbacks.map((item, index) => {
                    return (
                      <View style={styles.lightContainer} key={index}>
                        <View style={styles.totalRatingsRow}>
                          <Text style={styles.name}>{item.name}</Text>
                          <StarRatingDisplay
                            rating={item.rating}
                            color="#FFC200"
                            emptyColor={colors.lightGrey}
                            maxStars={5}
                            starSize={26}
                            starStyle={{marginHorizontal: 0}}
                          />
                        </View>
                        <Text style={styles.comment}>{item.comment}</Text>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Feedback;
