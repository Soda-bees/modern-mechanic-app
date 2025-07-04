import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Linking,
} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {RootStackParamList} from '../../services/config/navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import UserHeader from '../../components/UserHeader';
import {colors, sizes} from '../../services/utilities';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {useSelector} from 'react-redux';
import {selectUserData} from '../../store/userSlice';
import {selectScans} from '../../store/scanSlice';
import OrangeButton from '../../components/OrangeButton';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Scann'>;

type RouteProps = RouteProp<RootStackParamList, 'DetailedHistory'>;

const DetailedHistory: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const {id} = route.params;

  const userData = useSelector(selectUserData);
  const allScans = useSelector(selectScans);
  const car = useMemo(() => {
    return userData?.cars?.find(car => car.selected);
  }, [userData]);
  const scan = useMemo(() => {
    return allScans?.find(scan => scan.id === id);
  }, [allScans]);

  console.log(scan?.createdAt);

  function formatCreatedAt(createdAt: string): string {
    const dateObj = new Date(createdAt);

    const formattedTime = dateObj.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const month = dateObj.getMonth() + 1; // Months are 0-indexed
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;

    return `${formattedTime}  -  ${formattedDate}`;
  }

  const getUrgencyImage = (color: string | undefined) => {
    switch (color?.toLowerCase()) {
      case 'green':
        return images.urgencyG;
      case 'orange':
        return images.urgencyO;
      case 'red':
        return images.urgencyR;
      case 'yellow':
        return images.urgencyY;
      default:
        return images.urgencyG; // default fallback
    }
  };

  const getDifficultyImage = (color: string | undefined) => {
    switch (color?.toLowerCase()) {
      case 'blue':
        return images.difficultyB;
      case 'green':
        return images.difficultyG;
      case 'orange':
        return images.difficultyO;
      case 'red':
        return images.difficultyR;
      case 'yellow':
        return images.difficultyY;
      default:
        return images.difficultyG; // default fallback
    }
  };

  const handleComplain = (id: number) => {
    navigation.navigate('Complain', {id});
  };

  return (
    <SafeAreaView>
      <View>
        <Image source={images.bg} style={styles.bg} />
        <View>
          <View style={styles.screen}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backIconContainer}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image source={images.backIcon} style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>
                Modern
                <Text style={styles.headerTitleOrange}> Mechanic</Text>
              </Text>
            </View>

            <View style={styles.lowerBody}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.row2}>
                  <Image
                    source={{uri: scan?.vehicleImage}}
                    style={styles.historyCarImg}
                  />
                  <View style={{alignItems: 'flex-start', gap: 4}}>
                    <Text style={styles.historyTitle}>{scan?.vehicleInfo}</Text>
                    {/* <View style={styles.row}>
                      <View style={styles.codeContainerMain}>
                        <View style={styles.codeContainer}>
                          <Text style={styles.textWhiteSmall}>
                            {scanHistory.codes} Code
                          </Text>
                        </View>
                      </View>

                      <View
                        style={
                          scanHistory.status === 'red'
                            ? styles.red
                            : scanHistory.status === 'green'
                            ? styles.green
                            : null
                        }></View>
                    </View> */}
                    <View style={styles.codeContainerOrange}>
                      <Text style={styles.codeText}>{scan?.dtcCode}</Text>
                    </View>
                    <Text style={styles.disabledTextSmall}>
                      {scan?.createdAt ? formatCreatedAt(scan.createdAt) : ''}
                    </Text>
                  </View>
                </View>

                <View style={styles.codeRow}>
                  {/* {codes.map((item, index) => {
                    return (
                      <TouchableOpacity
                        style={
                          codeIndex === index
                            ? styles.codeContainerOrange
                            : styles.codeContainer2
                        }
                        key={index}
                        onPress={() => {
                          setCodeIndex(index);
                        }}>
                        <Text style={styles.codeText}>{item.code}</Text>
                      </TouchableOpacity>
                    );
                  })} */}

                  {/* <View style={styles.codeContainerOrange}>
                    <Text style={styles.codeText}>{scan?.dtcCode}</Text>
                  </View> */}
                </View>

                <View style={styles.hr}></View>

                <View style={{paddingBottom: sizes.screenHeight * 0.05}}>
                  {/* <Text style={styles.title}>DTC Code:</Text>
                  <Text style={styles.textWhiteSmall}>{scan?.dtcCode}</Text> */}

                  <Text style={styles.title}>Description:</Text>
                  <Text style={styles.textWhiteSmall}>{scan?.description}</Text>
                  <View style={styles.hr}></View>

                  <Text style={styles.title}>Analysis:</Text>
                  <Text style={styles.textWhiteSmall}>{scan?.analysis}</Text>
                  <View style={styles.hr}></View>

                  <Text style={styles.title}>Repair Instructions:</Text>
                  {scan?.repairInstructions?.map((item, index) => (
                    <Text key={index} style={styles.textWhiteSmall}>
                      • {item}
                    </Text>
                  ))}
                  <View style={styles.hr}></View>

                  <Text style={styles.title}>Urgency Level:</Text>
                  <Image
                    source={getUrgencyImage(scan?.urgencyColor)}
                    style={styles.urgencyO}
                  />

                  <Text
                    style={[
                      styles.textWhiteSmall,
                      {color: scan?.urgencyColor?.toLowerCase()},
                    ]}>
                    {scan?.urgencyLevel}
                  </Text>
                  <Text style={styles.textWhiteSmall}>
                    {scan?.urgencyExplanation}
                  </Text>
                  <View style={styles.hr}></View>

                  <Text style={styles.title}>Repair Difficulty:</Text>
                  <Image
                    source={getDifficultyImage(scan?.difficultyColor)}
                    style={styles.urgencyO}
                  />

                  <Text
                    style={[
                      styles.textWhiteSmall,
                      {color: scan?.difficultyColor?.toLowerCase()},
                    ]}>
                    {scan?.repairDifficulty}
                  </Text>
                  <Text style={styles.textWhiteSmall}>
                    {scan?.difficultyExplanation}
                  </Text>

                  <View style={styles.hr}></View>

                  <Text style={styles.title}>Cost Estimate:</Text>
                  <Text style={styles.textWhiteSmall}>
                    {scan?.costEstimate}
                  </Text>
                  <View style={styles.hr}></View>

                  <Text style={styles.title}>Required Parts:</Text>
                  {scan?.requiredParts?.map((part, index) => (
                    <Text key={index} style={styles.textWhiteSmall}>
                      • {part}
                    </Text>
                  ))}
                  <View style={styles.hr}></View>

                  <Text style={styles.title}>Required Tools:</Text>
                  {scan?.requiredTools?.map((tool, index) => (
                    <Text key={index} style={styles.textWhiteSmall}>
                      • {tool}
                    </Text>
                  ))}
                  <View style={styles.hr}></View>

                  <Text style={styles.title}>YouTube Videos:</Text>
                  {scan?.youtubeVideos?.map((url, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => Linking.openURL(url)}
                      activeOpacity={0.7}>
                      <Text
                        style={[
                          styles.textWhiteSmall,
                          {color: 'lightblue', textDecorationLine: 'underline'},
                        ]}>
                        {url}
                      </Text>
                    </TouchableOpacity>
                  ))}

                  {/* <Text style={styles.title}>User Notes:</Text>
                  <Text style={styles.textWhiteSmall}>{scan?.userNotes}</Text>

                  <Text style={styles.title}>Vehicle Info:</Text>
                  <Text style={styles.textWhiteSmall}>{scan?.vehicleInfo}</Text>

                  <Text style={styles.title}>Scan Date:</Text>
                  <Text style={styles.textWhiteSmall}>
                    {scan?.createdAt ? formatCreatedAt(scan.createdAt) : ''}
                  </Text> */}

                  <View style={styles.hr}></View>

                  <Text style={styles.title}>Unsatisfied?</Text>
                  <Text style={styles.textWhiteSmall}>
                    Feel free to submit your complain or any issues regarding
                    the scan result.
                  </Text>
                  <View style={{marginTop: sizes.screenHeight * 0.04}}>
                    <OrangeButton
                      title="Complain Form"
                      onPress={() => {
                        if (scan?.id) {
                          handleComplain(scan?.id);
                        }
                      }}
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailedHistory;
