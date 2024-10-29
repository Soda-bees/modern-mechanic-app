import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {colors, sizes} from '../../services/utilities';
import OrangeButton from '../../components/OrangeButton';
import Header from '../../components/Header';
import {RootStackParamList} from '../../services/config/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import UserHeader from '../../components/UserHeader';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Garage'>;

const Scann: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [make, setMake] = useState<string>('Honda');
  const [model, setModel] = useState<string>('Civic');
  const [year, setYear] = useState<string>('2005');
  const [imageUri, setImageUri] = useState<any>(images.carImg);
  const [index, setIndex] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');

  const handleConnect = () => {};

  const handleScan = () => {};

  console.log(index);

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
            </View>
            {index === 0 ? (
              <View style={styles.lowerBody}>
                <View>
                  <View style={styles.backRow}>
                    {index > 0 ? (
                      <TouchableOpacity style={styles.backIconContainer}>
                        <Image
                          source={images.backIcon}
                          style={styles.backIcon}
                        />
                      </TouchableOpacity>
                    ) : null}
                    <Text style={styles.title}>Plug in</Text>
                  </View>
                  <Text style={styles.textWhiteSmall}>
                    Plug your OBD II into your car
                  </Text>
                  <View style={styles.gifContainer}></View>
                </View>
                <View style={styles.bottomRow}>
                  <Image
                    source={images.bottomMeter}
                    style={styles.bottomMeter}
                  />
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => {
                      setIndex(index + 1);
                    }}>
                    <Text style={styles.textWhite2}>Next</Text>
                    <Image source={images.nextIcon} style={styles.nextIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : index === 1 ? (
              <View style={styles.lowerBody}>
                <View>
                  <View style={styles.backRow}>
                    {index > 0 ? (
                      <TouchableOpacity
                        style={styles.backIconContainer}
                        onPress={() => {
                          setIndex(index - 1);
                        }}>
                        <Image
                          source={images.backIcon}
                          style={styles.backIcon}
                        />
                      </TouchableOpacity>
                    ) : null}
                    <Text style={styles.title}>Connect</Text>
                  </View>
                  <Text style={styles.textWhiteSmall}>
                    Connect Modern Mechanic to your OBD II
                  </Text>
                  <OrangeButton title="Connect" onPress={handleConnect} />
                </View>
                <View style={styles.bottomRow}>
                  <Image
                    source={images.bottomMeter}
                    style={styles.bottomMeter}
                  />
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => {
                      setIndex(index + 1);
                    }}>
                    <Text style={styles.textWhite2}>Next</Text>
                    <Image source={images.nextIcon} style={styles.nextIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : index === 2 ? (
              <View style={styles.lowerBody}>
                <View>
                  <View style={styles.backRow}>
                    {index > 0 ? (
                      <TouchableOpacity
                        style={styles.backIconContainer}
                        onPress={() => {
                          setIndex(index - 1);
                        }}>
                        <Image
                          source={images.backIcon}
                          style={styles.backIcon}
                        />
                      </TouchableOpacity>
                    ) : null}
                    <Text style={styles.title}>More info</Text>
                  </View>
                  <View style={styles.textArea}>
                    <TextInput
                      multiline={true}
                      placeholder="Notes + better info for more acurate results"
                      placeholderTextColor={colors.disabledText}
                      style={styles.textAreaInput}
                    />
                  </View>
                </View>
                <View style={styles.bottomRow}>
                  <Image
                    source={images.bottomMeter}
                    style={styles.bottomMeter}
                  />
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => {
                      setIndex(index + 1);
                    }}>
                    <Text style={styles.textWhite2}>Next</Text>
                    <Image source={images.nextIcon} style={styles.nextIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : index === 3 ? (
              <View style={styles.lowerBody}>
                <View>
                  <View style={styles.backRow}>
                    {index > 0 ? (
                      <TouchableOpacity
                        style={styles.backIconContainer}
                        onPress={() => {
                          setIndex(index - 1);
                        }}>
                        <Image
                          source={images.backIcon}
                          style={styles.backIcon}
                        />
                      </TouchableOpacity>
                    ) : null}
                    <Text style={styles.title}>Scan</Text>
                  </View>
                </View>
                <View style={styles.bottomRow2}>
                  <OrangeButton title="Scan Now" onPress={handleScan} />
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Scann;
