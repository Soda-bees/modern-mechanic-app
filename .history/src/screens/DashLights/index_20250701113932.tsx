import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {RootStackParamList} from '../../services/config/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import UserHeader from '../../components/UserHeader';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'Scann' | 'Profile'
>;

const DashLights: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  type DashLight = {
    name: string;
    icon: any;
    info: string;
  };

  const [dashLights, setDashLights] = useState<DashLight[]>([
    {
      name: 'Engine Check Light',
      icon: images.engineLight,
      info: 'Indicates an issue with the engine or emissions system. Could be related to sensors, spark plugs, or other engine components. Solution: Check the gas cap for tightness; if the light persists, visit a mechanic.',
    },
    {
      name: 'Battery Warning Light',
      icon: images.batteryLight,
      info: 'Signals an issue with the charging system. Could indicate a failing battery, alternator, or other electrical component. Solution: Check battery connections and consider a replacement if the issue continues.',
    },
    {
      name: 'Oil Pressure Light',
      icon: images.oilPressureLight,
      info: 'Low oil pressure detected, which can lead to engine damage. Solution: Stop and check oil levels immediately. Add oil if low or consult a mechanic if the issue persists.',
    },
    {
      name: 'ABS Warning',
      icon: images.absLight,
      info: 'Shows an issue with the Anti-lock Braking System (ABS), which prevents wheels from locking up. Solution: Drive carefully and visit a mechanic to have the ABS inspected.',
    },
    {
      name: 'Seatbelt Reminder',
      icon: images.seatBeltLight,
      info: 'Indicates that a seatbelt is unfastened. Solution: Buckle all seatbelts before driving.',
    },
    {
      name: 'Temperature Warning',
      icon: images.temperatureLight,
      info: 'Warns of high engine temperature, which can cause overheating. Solution: Stop and allow the engine to cool, check coolant levels, and visit a mechanic if the problem continues.',
    },
    {
      name: 'Low Fuel Indicator',
      icon: images.lowFuelLight,
      info: 'Signals that fuel is low. Solution: Refill the fuel tank at the nearest gas station.',
    },
    {
      name: 'Traction Warning',
      icon: images.tractionLight,
      info: 'Indicates a problem with the traction control system, which may reduce stability in slippery conditions. Solution: Drive cautiously in adverse weather and visit a mechanic to inspect the system.',
    },
  ]);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>();

  const handleModal = () => {};

  const handleGoToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['top', 'bottom']}>
      <Image source={images.bg} style={styles.bg} />

      <View style={styles.screen}>
        <UserHeader onPress={handleGoToProfile} />
        <View style={styles.lowerBody}>
          <Text style={styles.title}>Dash Lights</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.flexWrapper}>
              {dashLights.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={styles.lightContainer}
                    key={index}
                    onPress={() => {
                      setModalData(item);
                      setShowModal(true);
                    }}>
                    <Image source={item.icon} style={styles.lightIcon} />
                    <Text style={styles.textWhite}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>

      <Modal
        isVisible={showModal}
        backdropOpacity={0.4}
        onBackButtonPress={() => {
          setShowModal(false);
        }}
        onBackdropPress={() => {
          setShowModal(false);
        }}>
        <View style={styles.modalBody}>
          <View style={styles.modalIconContainer}>
            <Image style={styles.modalIcon} source={modalData?.icon} />
          </View>
          <Text style={styles.modalTextWhite}>{modalData?.name}</Text>
          <Text style={styles.modalTextDisabled}>{modalData?.info}</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DashLights;
