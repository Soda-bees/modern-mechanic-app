import React, {useState} from 'react';
import {SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {RootStackParamList} from '../../services/config/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import UserHeader from '../../components/UserHeader';

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'Scann' | 'ScanHistory'
>;

const Home: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [make, setMake] = useState<string>('Honda');
  const [model, setModel] = useState<string>('Civic');
  const [year, setYear] = useState<string>('2005');
  const [imageUri, setImageUri] = useState<any>(images.carImg);

  const handleScan = () => {
    navigation.navigate('Scann');
    console.log('working');
  };

  const handleScanHistory = () => {
    navigation.navigate('ScanHistory');
  };

  return (
    <SafeAreaView>
      <View>
        <Image source={images.bg} style={styles.bg} />
        <View>
          <View style={styles.screen}>
            <UserHeader />
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
            <View style={styles.lowerBody}>
              <Text style={styles.title}>Scan</Text>
              <TouchableOpacity style={styles.orangeBtn} onPress={handleScan}>
                <Image source={images.scanIcon} style={styles.scanIcon} />
                <Text style={styles.orangeBtnLabel}>Scan</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.inputContainer}
                onPress={handleScanHistory}>
                <Text style={styles.orangeBtnLabel}>Scan History</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
