import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {colors, sizes} from '../../services/utilities';
import OrangeButton from '../../components/OrangeButton';
import {RootStackParamList} from '../../services/config/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StarRatingDisplay} from 'react-native-star-rating-widget';

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'BottomTabNavigator'
>;

const ScanResult: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [make, setMake] = useState<string>('Honda');
  const [model, setModel] = useState<string>('Civic');
  const [year, setYear] = useState<string>('2005');
  const [imageUri, setImageUri] = useState<any>(images.carImg);
  const [index, setIndex] = useState<number>(0);
  const [tabIndex, setTabIndex] = useState<number>(0);

  const [notes, setNotes] = useState<string>('');

  type Codes = {
    code: string;
  };

  type Tabs = {
    name: string;
  };

  type DashLight = {
    name: string;
    image: any;
    webLink: string;
    number: string;
    address: string;
    rating: number;
    description: string;
  };

  type Parts = {
    name: string;
    image: any;
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
    // {
    //   name: 'Auto Parts Hub',
    //   image: images.workShopImg,
    //   webLink: 'www.autopartshub.com',
    //   number: '(123)456-7890',
    //   address: '1234 Elm Street, Springfield, USA',
    //   rating: 5,
    //   description:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    // },
  ]);

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

  const [tabs, setTabs] = useState<Tabs[]>([
    {
      name: 'Analysis',
    },
    {
      name: 'Urgency',
    },
    {
      name: 'Difficulty',
    },
    {
      name: 'Cost',
    },
    {
      name: 'Youtube',
    },
    {
      name: 'Repair Shops',
    },
    {
      name: 'Parts & Tools',
    },
  ]);
  const [codeIndex, setCodeIndex] = useState<number>(0);

  const handleConnect = () => {};

  const handleScan = () => {};

  const handleBackToHome = () => {
    navigation.navigate('BottomTabNavigator');
  };

  return (
    <SafeAreaView>
      <View>
        <Image source={images.bg} style={styles.bg} />
        <View>
          <View style={styles.screen}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>
                Modern
                <Text style={styles.headerTitleOrange}> Mechanic</Text>
              </Text>
              <TouchableOpacity
                onPress={handleBackToHome}
                style={styles.orangeBtnSmall}>
                <Text style={styles.orangeBtnText}>Back to home</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sectionContainer}>
              <View style={styles.vehicleContainer}>
                <View style={styles.uploadImgContainer}>
                  <Image style={styles.uploadImgPreview} source={imageUri} />
                </View>
              </View>

              <View style={styles.waveRow}>
                <View style={styles.row}>
                  <Text style={styles.textWhite}>
                    {make} {model}
                  </Text>
                  <View style={styles.orangeContainer}>
                    <Text style={styles.textWhite}>{year}</Text>
                  </View>
                </View>
                <Image style={styles.waveIcon} source={images.waveIcon} />
              </View>

              <View style={styles.codeRow}>
                {codes.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={
                        codeIndex === index
                          ? styles.codeContainerOrange
                          : styles.codeContainer
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

              <Text style={styles.aboutCode}>
                Lorem ipsum is a placeholder text
              </Text>
            </View>
            {tabIndex === 0 ? (
              <View style={styles.lowerBody}>
                <View style={styles.backRow}>
                  <Text style={styles.title}>Analysis</Text>
                  <TouchableOpacity style={styles.downloadIconContainer}>
                    <Image
                      source={images.downloadIcon}
                      style={styles.downloadIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.bg1}></View>
                <View style={styles.bg2}></View>

                <View style={styles.body}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                      <Text style={styles.heading}>Result Tilte:</Text>
                      <Text style={styles.textWhiteSmall}>
                        Help identifying misfire conditon on 1998 Honda Civic DX
                        - Motor ...
                      </Text>
                      <Text style={styles.heading}>Result URL:</Text>
                      <Text style={styles.textWhiteSmall}>
                        https://mechanics.stackexchange.com/questions/51822/help-identifying-misfire-conditon-on-1998-honda-civic-dx
                      </Text>
                      <Text style={styles.heading}>Content Preview:</Text>
                      <Text style={styles.textWhiteSmall}>
                        Stack Exchange network consists of 183 Q&A communities
                        including Stack Overflow, the largest, most trusted
                        online community for developers to learn, share their
                        knowledge, and build their careers.
                      </Text>
                    </View>
                  </ScrollView>
                  <View style={styles.bottomRow}>
                    <View style={styles.tabsContainer}>
                      {tabs.map((item, index) => {
                        return (
                          <TouchableOpacity
                            style={
                              tabIndex === index
                                ? styles.tabContainerOrange
                                : styles.tabContainer
                            }
                            key={index}
                            onPress={() => {
                              setTabIndex(index);
                            }}>
                            <Text style={styles.tabText}>{item.name}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    <TouchableOpacity
                      style={styles.nextButton}
                      onPress={() => {
                        setTabIndex(tabIndex + 1);
                      }}>
                      <Text style={styles.textWhite2}>Next</Text>
                      <Image source={images.nextIcon} style={styles.nextIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : tabIndex === 1 ? (
              <View style={styles.lowerBody}>
                <View style={styles.backRow}>
                  <View style={styles.row}>
                    {tabIndex > 0 ? (
                      <TouchableOpacity
                        style={styles.backIconContainer}
                        onPress={() => {
                          setTabIndex(tabIndex - 1);
                        }}>
                        <Image
                          source={images.backIcon}
                          style={styles.backIcon}
                        />
                      </TouchableOpacity>
                    ) : null}
                    <Text style={styles.title}>Urgency</Text>
                  </View>
                  <TouchableOpacity style={styles.downloadIconContainer}>
                    <Image
                      source={images.downloadIcon}
                      style={styles.downloadIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.bg1}></View>
                <View style={styles.bg2}></View>

                <View style={styles.body}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.upperBody}>
                      <Image source={images.urgencyO} style={styles.urgencyO} />
                      <View style={styles.hr}></View>
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
                  </ScrollView>

                  <View style={styles.bottomRow}>
                    <View style={styles.tabsContainer}>
                      {tabs.map((item, index) => {
                        return (
                          <TouchableOpacity
                            style={
                              tabIndex === index
                                ? styles.tabContainerOrange
                                : styles.tabContainer
                            }
                            key={index}
                            onPress={() => {
                              setTabIndex(index);
                            }}>
                            <Text style={styles.tabText}>{item.name}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    <TouchableOpacity
                      style={styles.nextButton}
                      onPress={() => {
                        setTabIndex(tabIndex + 1);
                      }}>
                      <Text style={styles.textWhite2}>Next</Text>
                      <Image source={images.nextIcon} style={styles.nextIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : tabIndex === 2 ? (
              <View style={styles.lowerBody}>
                <View style={styles.backRow}>
                  <View style={styles.row}>
                    {tabIndex > 0 ? (
                      <TouchableOpacity
                        style={styles.backIconContainer}
                        onPress={() => {
                          setTabIndex(tabIndex - 1);
                        }}>
                        <Image
                          source={images.backIcon}
                          style={styles.backIcon}
                        />
                      </TouchableOpacity>
                    ) : null}
                    <Text style={styles.title}>Difficulty</Text>
                  </View>
                  <TouchableOpacity style={styles.downloadIconContainer}>
                    <Image
                      source={images.downloadIcon}
                      style={styles.downloadIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.bg1}></View>
                <View style={styles.bg2}></View>

                <View style={styles.body}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.upperBody}>
                      <Image
                        source={images.difficultyO}
                        style={styles.urgencyO}
                      />
                      <View style={styles.hr}></View>
                      <View style={styles.colourContainer}>
                        <View style={styles.colourRow2}>
                          <View style={styles.rowWidth}>
                            <View style={styles.colourB}></View>
                            <Text style={styles.colourText}>Blue</Text>
                          </View>
                          <Text style={styles.colourDetail}>
                            Easy diy repair
                          </Text>
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
                  </ScrollView>
                  <View style={styles.bottomRow}>
                    <View style={styles.tabsContainer}>
                      {tabs.map((item, index) => {
                        return (
                          <TouchableOpacity
                            style={
                              tabIndex === index
                                ? styles.tabContainerOrange
                                : styles.tabContainer
                            }
                            key={index}
                            onPress={() => {
                              setTabIndex(index);
                            }}>
                            <Text style={styles.tabText}>{item.name}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    <TouchableOpacity
                      style={styles.nextButton}
                      onPress={() => {
                        setTabIndex(tabIndex + 1);
                      }}>
                      <Text style={styles.textWhite2}>Next</Text>
                      <Image source={images.nextIcon} style={styles.nextIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : tabIndex === 3 ? (
              <View style={styles.lowerBody}>
                <View style={styles.backRow}>
                  <View style={styles.row}>
                    {tabIndex > 0 ? (
                      <TouchableOpacity
                        style={styles.backIconContainer}
                        onPress={() => {
                          setTabIndex(tabIndex - 1);
                        }}>
                        <Image
                          source={images.backIcon}
                          style={styles.backIcon}
                        />
                      </TouchableOpacity>
                    ) : null}
                    <Text style={styles.title}>Estimated Cost</Text>
                  </View>
                  <TouchableOpacity style={styles.downloadIconContainer}>
                    <Image
                      source={images.downloadIcon}
                      style={styles.downloadIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.bg1}></View>
                <View style={styles.bg2}></View>

                <View style={styles.body}>
                  <View style={styles.upperBody}>
                    <View>
                      <View style={styles.rowBetween}>
                        <View style={styles.rowLeft}>
                          <Text style={styles.textWhiteLarge}>Labour</Text>
                          <View style={styles.hrSmall}></View>
                        </View>
                        <View style={styles.costContainer}>
                          <Text style={styles.textWhiteLarge}>$30</Text>
                        </View>
                      </View>

                      <View style={styles.rowBetween}>
                        <View style={styles.rowLeft}>
                          <Text style={styles.textWhiteLarge}>Parts</Text>
                          <View style={styles.hrSmall}></View>
                        </View>
                        <View style={styles.costContainer}>
                          <Text style={styles.textWhiteLarge}>$100</Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.rowBetween,
                        {marginTop: sizes.screenHeight * 0.1},
                      ]}>
                      <Text style={styles.textWhiteLargeBold}>$130</Text>
                      <Text style={styles.textWhiteLargeBold}>Estimated</Text>
                    </View>
                  </View>
                  <View style={styles.bottomRow}>
                    <View style={styles.tabsContainer}>
                      {tabs.map((item, index) => {
                        return (
                          <TouchableOpacity
                            style={
                              tabIndex === index
                                ? styles.tabContainerOrange
                                : styles.tabContainer
                            }
                            key={index}
                            onPress={() => {
                              setTabIndex(index);
                            }}>
                            <Text style={styles.tabText}>{item.name}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    <TouchableOpacity
                      style={styles.nextButton}
                      onPress={() => {
                        setTabIndex(tabIndex + 1);
                      }}>
                      <Text style={styles.textWhite2}>Next</Text>
                      <Image source={images.nextIcon} style={styles.nextIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : tabIndex === 4 ? (
              <View style={styles.lowerBody}>
                <View style={styles.backRow}>
                  <View style={styles.row}>
                    {tabIndex > 0 ? (
                      <TouchableOpacity
                        style={styles.backIconContainer}
                        onPress={() => {
                          setTabIndex(tabIndex - 1);
                        }}>
                        <Image
                          source={images.backIcon}
                          style={styles.backIcon}
                        />
                      </TouchableOpacity>
                    ) : null}
                    <Text style={styles.title}>Youtube Video</Text>
                  </View>
                  <TouchableOpacity style={styles.downloadIconContainer}>
                    <Image
                      source={images.downloadIcon}
                      style={styles.downloadIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.bg1}></View>
                <View style={styles.bg2}></View>

                <View style={styles.body}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.upperBody}>
                      <Image
                        source={images.youtubeImg}
                        style={[
                          styles.youtubeImg,

                          {marginBottom: sizes.screenHeight * 0.01},
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
                  </ScrollView>
                  <View style={styles.bottomRow}>
                    <View style={styles.tabsContainer}>
                      {tabs.map((item, index) => {
                        return (
                          <TouchableOpacity
                            style={
                              tabIndex === index
                                ? styles.tabContainerOrange
                                : styles.tabContainer
                            }
                            key={index}
                            onPress={() => {
                              setTabIndex(index);
                            }}>
                            <Text style={styles.tabText}>{item.name}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    <TouchableOpacity
                      style={styles.nextButton}
                      onPress={() => {
                        setTabIndex(tabIndex + 1);
                      }}>
                      <Text style={styles.textWhite2}>Next</Text>
                      <Image source={images.nextIcon} style={styles.nextIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : tabIndex === 5 ? (
              <View style={styles.lowerBody}>
                <View style={styles.backRow}>
                  <View style={styles.row}>
                    {tabIndex > 0 ? (
                      <TouchableOpacity
                        style={styles.backIconContainer}
                        onPress={() => {
                          setTabIndex(tabIndex - 1);
                        }}>
                        <Image
                          source={images.backIcon}
                          style={styles.backIcon}
                        />
                      </TouchableOpacity>
                    ) : null}
                    <Text style={styles.title}>Certified Repair Shops</Text>
                  </View>
                  <TouchableOpacity style={styles.downloadIconContainer}>
                    <Image
                      source={images.downloadIcon}
                      style={styles.downloadIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.bg1}></View>
                <View style={styles.bg2}></View>

                <View style={styles.body}>
                  <View style={styles.upperBody}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {workshopDetails.map((item, index) => {
                        return (
                          <View
                            style={styles.workshopCardContainer}
                            key={index}>
                            <Image
                              source={item.image}
                              style={styles.workshopImageContainer}
                            />
                            <View>
                              <Text style={styles.nameHeading}>
                                {item.name}
                              </Text>
                              <Text style={styles.disabledTextWorkshop}>
                                Contact Info:
                              </Text>
                              <Text style={styles.textWhiteWorkshop}>
                                {item.webLink.length > 26
                                  ? `${item.webLink.substring(0, 26)}...`
                                  : item.webLink}
                              </Text>
                              <Text style={styles.textWhiteWorkshop}>
                                {item.number}
                              </Text>
                              <Text style={styles.disabledTextWorkshop}>
                                Address:
                              </Text>
                              <Text style={styles.textWhiteWorkshop}>
                                {item.address.length > 26
                                  ? `${item.address.substring(0, 26)}...`
                                  : item.address}
                              </Text>
                              <Text style={styles.disabledTextWorkshop}>
                                Rating:
                              </Text>
                              <StarRatingDisplay
                                rating={item.rating}
                                color="#FFC200"
                                emptyColor={colors.lightGrey}
                                maxStars={5}
                                starSize={16}
                                starStyle={{marginHorizontal: 0}}
                              />
                            </View>
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>
                  <View style={styles.bottomRow}>
                    <View style={styles.tabsContainer}>
                      {tabs.map((item, index) => {
                        return (
                          <TouchableOpacity
                            style={
                              tabIndex === index
                                ? styles.tabContainerOrange
                                : styles.tabContainer
                            }
                            key={index}
                            onPress={() => {
                              setTabIndex(index);
                            }}>
                            <Text style={styles.tabText}>{item.name}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    <TouchableOpacity
                      style={styles.nextButton}
                      onPress={() => {
                        setTabIndex(tabIndex + 1);
                      }}>
                      <Text style={styles.textWhite2}>Next</Text>
                      <Image source={images.nextIcon} style={styles.nextIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : tabIndex === 6 ? (
              <View style={styles.lowerBody}>
                <View style={styles.backRow}>
                  <View style={styles.row}>
                    {tabIndex > 0 ? (
                      <TouchableOpacity
                        style={styles.backIconContainer}
                        onPress={() => {
                          setTabIndex(tabIndex - 1);
                        }}>
                        <Image
                          source={images.backIcon}
                          style={styles.backIcon}
                        />
                      </TouchableOpacity>
                    ) : null}
                    <Text style={styles.title}>Parts & Tools</Text>
                  </View>
                  <TouchableOpacity style={styles.downloadIconContainer}>
                    <Image
                      source={images.downloadIcon}
                      style={styles.downloadIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.bg1}></View>
                <View style={styles.bg2}></View>

                <View style={styles.body}>
                  <View style={styles.upperBody}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {parts.map((item, index) => {
                        return (
                          <View style={styles.partsRow} key={index}>
                            <View style={styles.row}>
                              <Image
                                source={item.image}
                                style={styles.partsImg}
                              />
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
                    </ScrollView>
                  </View>
                  <View style={styles.bottomRow}>
                    <View style={styles.tabsContainer}>
                      {tabs.map((item, index) => {
                        return (
                          <TouchableOpacity
                            style={
                              tabIndex === index
                                ? styles.tabContainerOrange
                                : styles.tabContainer
                            }
                            key={index}
                            onPress={() => {
                              setTabIndex(index);
                            }}>
                            <Text style={styles.tabText}>{item.name}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScanResult;
