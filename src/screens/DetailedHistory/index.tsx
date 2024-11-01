import React, {useState} from 'react';
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
import {StarRatingDisplay} from 'react-native-star-rating-widget';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Scann'>;

const DetailedHistory: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

  const [search, setSearch] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [make, setMake] = useState<string>('Honda');
  const [model, setModel] = useState<string>('Civic');
  const [year, setYear] = useState<string>('2005');
  const [imageUri, setImageUri] = useState<any>(images.carImg);

  type ScanHistory = {
    carName: string;
    image: any;
    codes: number;
    status: string;
    dateAndTime: string;
  };

  const [scanHistory, setScanHistory] = useState<ScanHistory>({
    carName: '1999 Honda Civic',
    image: images.carImg,
    codes: 10,
    status: 'red',
    dateAndTime: '12:00 PM  -  9/20/2024',
  });

  type Codes = {
    code: string;
  };
  const [codeIndex, setCodeIndex] = useState<number>(0);
  const [codes, setCodes] = useState<Codes[]>([
    {
      code: '1234',
    },
    {
      code: '2345',
    },
    {
      code: '3456',
    },
    {
      code: '4567',
    },
  ]);

  type DashLight = {
    name: string;
    image: any;
    webLink: string;
    number: string;
    address: string;
    rating: number;
    description: string;
  };

  const [workshopDetails, setWorkshopDetails] = useState<DashLight[]>([
    {
      name: 'Auto Parts Hub',
      image: images.workShopImg,
      webLink: 'www.autopartshub.com',
      number: '(123)456-7890',
      address: '1234 Elm Street, Springfield, USA',
      rating: 5,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: 'Auto Parts Hub',
      image: images.workShopImg,
      webLink: 'www.autopartshub.com',
      number: '(123)456-7890',
      address: '1234 Elm Street, Springfield, USA',
      rating: 5,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: 'Auto Parts Hub',
      image: images.workShopImg,
      webLink: 'www.autopartshub.com',
      number: '(123)456-7890',
      address: '1234 Elm Street, Springfield, USA',
      rating: 5,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ]);

  type Parts = {
    name: string;
    image: any;
  };
  const [parts, setParts] = useState<Parts[]>([
    {
      name: 'Brake Pads',
      image: images.brakePads,
    },
    {
      name: 'Air Filter',
      image: images.filter,
    },
    {
      name: 'Socket Wrench Set',
      image: images.socket,
    },
    {
      name: 'OBD-II',
      image: images.obd,
    },
  ]);

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
                    source={scanHistory.image}
                    style={styles.historyCarImg}
                  />
                  <View>
                    <Text style={styles.historyTitle}>
                      {scanHistory.carName}
                    </Text>
                    <View style={styles.row}>
                      <View style={styles.codeContainerMain}>
                        <View style={styles.codeContainer}>
                          <Text style={styles.textWhiteSmall}>
                            {scanHistory.codes} Codes
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
                    </View>
                    <Text style={styles.disabledTextSmall}>
                      {scanHistory.dateAndTime}
                    </Text>
                  </View>
                </View>

                <View style={styles.codeRow}>
                  {codes.map((item, index) => {
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
                  })}
                </View>

                <View style={styles.hr}></View>

                <View>
                  <Text style={styles.title}>Analysis</Text>
                  <Text style={styles.heading}>Result Tilte:</Text>
                  <Text style={styles.textWhiteSmall}>
                    Help identifying misfire conditon on 1998 Honda Civic DX -
                    Motor ...
                  </Text>
                  <Text style={styles.heading}>Result URL:</Text>
                  <Text style={styles.textWhiteSmall}>
                    https://mechanics.stackexchange.com/questions/51822/help-identifying-misfire-conditon-on-1998-honda-civic-dx
                  </Text>
                  <Text style={styles.heading}>Content Preview:</Text>
                  <Text style={styles.textWhiteSmall}>
                    Stack Exchange network consists of 183 Q&A communities
                    including Stack Overflow, the largest, most trusted online
                    community for developers to learn, share their knowledge,
                    and build their careers.
                  </Text>
                </View>

                <View style={styles.hr}></View>

                <Text style={styles.title}>Urgency</Text>

                <View style={styles.colourSection}>
                  <Image source={images.urgencyO} style={styles.urgencyO} />
                  <View style={styles.hrSmall}></View>
                  <View style={styles.colourRow}>
                    <View style={styles.colourColumn}>
                      <View style={styles.row}>
                        <View style={styles.colourG}></View>
                        <Text style={styles.colourText}>Green</Text>
                      </View>
                      <Text style={styles.colourDetail}>
                        No critical issues
                      </Text>
                    </View>
                    <View style={styles.colourColumn}>
                      <View style={styles.row}>
                        <View style={styles.colourY}></View>
                        <Text style={styles.colourText}>Yellow</Text>
                      </View>
                      <Text style={styles.colourDetail}>
                        Effects perfomance isuses no immediate
                      </Text>
                    </View>
                    <View style={styles.colourColumn}>
                      <View style={styles.row}>
                        <View style={styles.colourO}></View>
                        <Text style={styles.colourText}>Orange</Text>
                      </View>
                      <Text style={styles.colourDetail}>
                        Add very soon danger
                      </Text>
                    </View>
                    <View style={styles.colourColumn}>
                      <View style={styles.row}>
                        <View style={styles.colourR}></View>
                        <Text style={styles.colourText}>Red</Text>
                      </View>
                      <Text style={styles.colourDetail}>
                        Major issues, needs immediate attention
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.hr}></View>

                <Text style={styles.title}>Difficulty</Text>

                <View style={styles.colourSection}>
                  <Image source={images.difficultyO} style={styles.urgencyO} />
                  <View style={styles.hrSmall}></View>
                  <View style={styles.colourContainer}>
                    <View style={styles.colourRow2}>
                      <View style={styles.rowWidth}>
                        <View style={styles.colourB}></View>
                        <Text style={styles.colourText}>Blue</Text>
                      </View>
                      <Text style={styles.colourDetail}>Easy diy repair</Text>
                    </View>
                    <View style={styles.colourRow2}>
                      <View style={styles.rowWidth}>
                        <View style={styles.colourG}></View>
                        <Text style={styles.colourText}>Green</Text>
                      </View>
                      <Text style={styles.colourDetail}>
                        Experience required
                      </Text>
                    </View>
                    <View style={styles.colourRow2}>
                      <View style={styles.rowWidth}>
                        <View style={styles.colourY}></View>
                        <Text style={styles.colourText}>Yellow</Text>
                      </View>
                      <Text style={styles.colourDetail}>
                        Advanced special tools
                      </Text>
                    </View>
                    <View style={styles.colourRow2}>
                      <View style={styles.rowWidth}>
                        <View style={styles.colourO}></View>
                        <Text style={styles.colourText}>Orange</Text>
                      </View>
                      <Text style={styles.colourDetail}>
                        Extremely challenging, urgent
                      </Text>
                    </View>
                    <View style={styles.colourRow2}>
                      <View style={styles.rowWidth}>
                        <View style={styles.colourR}></View>
                        <Text style={styles.colourText}>Red</Text>
                      </View>
                      <Text style={styles.colourDetail}>
                        Skilled, complex, high-risk
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.hr}></View>

                <Text style={styles.title}>Estimated Cost</Text>
                <View>
                  <View>
                    <View style={styles.rowBetween}>
                      <View>
                        <Text style={styles.textWhiteLarge}>Labour</Text>
                        <View style={styles.hrSmaller}></View>
                      </View>
                      <View style={styles.costContainer}>
                        <Text style={styles.textWhiteLarge}>$30</Text>
                      </View>
                    </View>

                    <View style={styles.rowBetween}>
                      <View>
                        <Text style={styles.textWhiteLarge}>Parts</Text>
                        <View style={styles.hrSmaller}></View>
                      </View>
                      <View style={styles.costContainer}>
                        <Text style={styles.textWhiteLarge}>$100</Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.rowBetween,
                      {marginTop: sizes.screenHeight * 0.03},
                    ]}>
                    <Text style={styles.textWhiteLargeBold}>$130</Text>
                    <Text style={styles.textWhiteLargeBold}>Estimated</Text>
                  </View>
                </View>

                <View style={styles.hr}></View>

                <Text style={styles.title}>Youtube Video</Text>

                <View>
                  <Image
                    source={images.youtubeImg}
                    style={[
                      styles.youtubeImg,

                      {marginBottom: sizes.screenHeight * 0.03},
                    ]}
                  />

                  <View style={styles.width}>
                    <Text style={styles.textWhiteLarge}>
                      Link to Toutube video
                    </Text>

                    <Text style={styles.textWhiteLargeBold}>
                      www.youtube.com/xyz
                    </Text>
                  </View>
                </View>

                <View style={styles.hr}></View>

                <Text style={styles.title}>Certified Repair Shops</Text>

                <View style={styles.flexWrapper}>
                  {workshopDetails.map((item, index) => {
                    return (
                      <TouchableOpacity
                        style={styles.workshopCardContainer}
                        key={index}>
                        <Image
                          source={item.image}
                          style={styles.workshopImageContainer}
                        />
                        <View>
                          <Text style={styles.nameHeading}>{item.name}</Text>
                          <Text style={styles.disabledText2}>
                            Contact Info:
                          </Text>
                          <Text style={styles.textWhite2}>
                            {item.webLink.length > 26
                              ? `${item.webLink.substring(0, 26)}...`
                              : item.webLink}
                          </Text>
                          <Text style={styles.textWhite2}>{item.number}</Text>
                          <Text style={styles.disabledText2}>Address:</Text>
                          <Text style={styles.textWhite2}>
                            {item.address.length > 26
                              ? `${item.address.substring(0, 26)}...`
                              : item.address}
                          </Text>
                          <Text style={styles.disabledText2}>Rating:</Text>
                          <StarRatingDisplay
                            rating={item.rating}
                            color="#FFC200"
                            emptyColor={colors.lightGrey}
                            maxStars={5}
                            starSize={16}
                            starStyle={{marginHorizontal: 0}}
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <View style={styles.hr}></View>

                <Text style={styles.title}>Parts & Tools</Text>

                <View>
                  {parts.map((item, index) => {
                    return (
                      <View style={styles.partsRow} key={index}>
                        <View style={styles.row}>
                          <Image source={item.image} style={styles.partsImg} />
                          <Text style={styles.textWhiteWorkshop}>
                            {item.name}
                          </Text>
                        </View>
                        <TouchableOpacity style={styles.orderBtn}>
                          <Text style={styles.tabText}>Order</Text>
                        </TouchableOpacity>
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

export default DetailedHistory;
