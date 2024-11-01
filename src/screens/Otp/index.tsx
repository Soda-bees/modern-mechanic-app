import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
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
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

type NavigationProp = StackNavigationProp<RootStackParamList, 'ResetPassword'>;
type RouteProps = RouteProp<RootStackParamList, 'Otp'>;

const Otp: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const {email} = route.params;

  const [errMsg, setErrMsg] = useState<string>('');
  const [value, setValue] = useState('');

  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleVerify = () => {
    navigation.navigate('ResetPassword', {email});
  };

  return (
    <SafeAreaView>
      <View style={styles.main}>
        <Image source={images.bg} style={styles.bg} />
        <Header goBack={false} title="Email Verification" />

        <View style={styles.sectionContainer}>
          <Text style={styles.disabledText}>
            We sent a code to:
            <Text style={styles.textWhite}> {email}</Text>
          </Text>
          <View style={styles.codeFieldContainer}>
            <CodeField
              ref={ref}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[
                    Platform.OS == 'android' ? styles.cell : styles.cellIOS,
                    isFocused && styles.focusCell,
                  ]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
          <Text style={styles.errMsg}>{errMsg}</Text>
          <View style={styles.orangeButtonContainer}>
            <OrangeButton title="Verify" onPress={handleVerify} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Otp;
