import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {RootStackParamList} from '../../services/config/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import UserHeader from '../../components/UserHeader';
import {colors, sizes} from '../../services/utilities';
import {useSelector} from 'react-redux';
import {selectUserData} from '../../store/userSlice';
import {selectScans} from '../../store/scanSlice';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Scann'>;

const ScanHistory: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

  const userData = useSelector(selectUserData);
  const allScans = useSelector(selectScans);
  const car = useMemo(() => {
    return userData?.cars?.find(car => car.selected);
  }, [userData]);

  const filteredScans = useMemo(() => {
    return allScans.filter(scan => scan.vehicleId === car?.id);
  }, [allScans, car?.id]);

  const [search, setSearch] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  console.log(car, allScans);

  type ScanHistory = {
    carName: string;
    image: any;
    codes: number;
    status: string;
    dateAndTime: string;
  };

  type Parts = {
    name: string;
    image: any;
  };

  const [scanHistory, setScanHistory] = useState<ScanHistory[]>([
    {
      carName: '1999 Honda Civic',
      image: images.carImg,
      codes: 10,
      status: 'red',
      dateAndTime: '12:00 PM  -  9/20/2024',
    },
    {
      carName: '1999 Honda Civic',
      image: images.carImg,
      codes: 8,
      status: 'red',
      dateAndTime: '12:00 PM  -  9/20/2024',
    },
    {
      carName: '1999 Honda Civic',
      image: images.carImg,
      codes: 2,
      status: 'green',
      dateAndTime: '12:00 PM  -  9/20/2024',
    },
    {
      carName: '1999 Honda Civic',
      image: images.carImg,
      codes: 1,
      status: 'green',
      dateAndTime: '12:00 PM  -  9/20/2024',
    },
  ]);

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

  const handleHistory = (id: number) => {
    navigation.navigate('DetailedHistory', {id});
  };

  const handleScanHistory = () => {};

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

            <View style={styles.sectionContainer}>
              <View style={styles.vehicleContainer}>
                <View style={styles.uploadImgContainer}>
                  <Image
                    style={styles.uploadImgPreview}
                    source={{uri: car?.image}}
                  />
                </View>
              </View>

              <View style={styles.waveRow}>
                <View style={styles.row}>
                  <Text style={styles.textWhite}>
                    {car?.make} {car?.model}
                  </Text>
                  <View style={styles.orangeContainer}>
                    <Text style={styles.textWhite}>{car?.year}</Text>
                  </View>
                </View>
                {/* <Image style={styles.waveIcon} source={images.waveIcon} /> */}
              </View>
            </View>
            <View style={styles.lowerBody}>
              <Text style={styles.title}>Scan History</Text>
              <View style={styles.searchContainer}>
                <Image style={styles.searchIcon} source={images.searchIcon} />
                <TextInput
                  onChangeText={text => {
                    setSearch(text);
                  }}
                  style={styles.input}
                  placeholder="Search here"
                  placeholderTextColor={colors.disabledText}
                />
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {filteredScans.map((item, index) => {
                  return (
                    <View key={index} style={styles.row2}>
                      <View style={styles.row}>
                        <Image
                          source={{uri: item.vehicleImage}}
                          style={styles.historyCarImg}
                        />
                        <View>
                          <Text style={styles.historyTitle}>
                            {item.vehicleInfo}
                          </Text>
                          <View style={styles.row}>
                            <View style={styles.codeContainerMain}>
                              <View style={styles.codeContainer}>
                                <Text style={styles.textWhiteSmall}>
                                  {item.dtcCode}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <Text style={styles.disabledTextSmall}>
                            {formatCreatedAt(item.createdAt)}
                          </Text>
                        </View>
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          handleHistory(item?.id);
                        }}>
                        <Image
                          source={images.rightArrow}
                          style={styles.rightArrow}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScanHistory;
