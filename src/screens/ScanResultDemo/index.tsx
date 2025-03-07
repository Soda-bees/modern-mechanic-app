import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  NativeEventEmitter,
  NativeModules,
  ScrollView,
  Linking,
} from 'react-native';
import styles from './style';
import images from '../../services/utilities/images';
import {RootStackParamList} from '../../services/config/navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {selectUserData} from '../../store/userSlice';
import {selectAuthToken} from '../../store/authSlice';
import {selectDtcReport} from '../../store/dtcReportSlice';

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'ScanResult',
  'BottomTabNavigator'
>;
type RouteProps = RouteProp<RootStackParamList, 'ScanResultDemo'>;

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const ScanResultDemo: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  // const {data} = route.params;

  const authToken = useSelector(selectAuthToken);
  const userData = useSelector(selectUserData);
  const data = useSelector(selectDtcReport);
  const car = userData?.cars[0];

  // console.log(JSON.stringify(data, null, 2));

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
                  navigation.navigate('BottomTabNavigator');
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
                <Image style={styles.waveIcon} source={images.waveIcon} />
              </View>
            </View>
            <View style={styles.lowerBody}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {data?.map((dtc, index) => (
                  <View key={index} style={styles.card}>
                    <Text style={styles.heading}>DTC Code: {dtc?.code}</Text>

                    <View style={[{height: 5}]}></View>

                    <Text style={styles.text}>
                      <Text style={styles.bold}>Description:</Text>{' '}
                      {dtc?.description}
                    </Text>

                    <View style={[{height: 5}]}></View>

                    <Text style={styles.text}>
                      <Text style={styles.bold}>Analysis:</Text> {dtc?.analysis}
                    </Text>

                    <View style={[{height: 5}]}></View>

                    {/* Repair Instructions */}
                    <Text style={[styles.text, styles.bold]}>
                      Repair Instructions:
                    </Text>
                    {dtc?.repair_instructions?.map((item, idx) => (
                      <Text key={idx} style={styles.listItem}>
                        • {item}
                      </Text>
                    ))}

                    <View style={[{height: 5}]}></View>

                    {/* Urgency & Difficulty */}
                    <Text style={styles.text}>
                      <Text style={styles.bold}>Urgency:</Text>{' '}
                      {dtc?.urgency_level} ({dtc?.urgency_explanation})
                    </Text>

                    <View style={[{height: 5}]}></View>

                    <Text style={styles.text}>
                      <Text style={styles.bold}>Repair Difficulty:</Text>{' '}
                      {dtc?.repair_difficulty} ({dtc?.difficulty_explanation})
                    </Text>

                    <View style={[{height: 5}]}></View>

                    <Text style={styles.text}>
                      <Text style={styles.bold}>Cost Estimate:</Text>{' '}
                      {dtc?.cost_estimate}
                    </Text>

                    <View style={[{height: 5}]}></View>

                    {/* Required Parts & Tools */}
                    <Text style={[styles.text, styles.bold]}>
                      Required Parts:
                    </Text>
                    {dtc?.required_parts?.map((item, idx) => (
                      <Text key={idx} style={styles.listItem}>
                        • {item}
                      </Text>
                    ))}

                    <View style={[{height: 5}]}></View>

                    <Text style={[styles.text, styles.bold]}>
                      Required Tools:
                    </Text>
                    {dtc?.required_tools?.map((item, idx) => (
                      <Text key={idx} style={styles.listItem}>
                        • {item}
                      </Text>
                    ))}

                    <View style={[{height: 5}]}></View>

                    {/* YouTube Videos */}
                    {dtc?.youtube_videos?.length > 0 ? (
                      <Text style={[styles.text, styles.bold]}>
                        YouTube Videos:
                      </Text>
                    ) : null}

                    {dtc?.youtube_videos?.map((video, idx) => (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => Linking.openURL(video)}>
                        <Text style={styles.link}>{video}</Text>
                      </TouchableOpacity>
                    ))}

                    <View style={[{height: 5}]}></View>

                    {/* User Notes */}
                    {dtc?.user_notes && (
                      <Text style={styles.text}>
                        <Text style={styles.bold}>User Notes:</Text>{' '}
                        {dtc?.user_notes}
                      </Text>
                    )}
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScanResultDemo;
{
  /* <View style={styles.lowerBody}>
                <ScrollView style={styles.container}>
                  {data?.map((dtc, index) => (
                    <View key={index} style={styles.card}>
                      <Text style={styles.heading}>DTC Code: {dtc?.code}</Text>
                      <Text style={styles.text}>
                        <Text style={styles.bold}>Description:</Text>{' '}
                        {dtc?.description}
                      </Text>
                      <Text style={styles.text}>
                        <Text style={styles.bold}>Analysis:</Text>{' '}
                        {dtc?.analysis}
                      </Text>

                      Repair Instructions
                      <Text style={styles.bold}>Repair Instructions:</Text>
                      <FlatList
                        data={dtc?.repair_instructions}
                        keyExtractor={(item, idx) => idx.toString()}
                        renderItem={({item}) => (
                          <Text style={styles.listItem}>• {item}</Text>
                        )}
                      />

                      Urgency & Difficulty
                      <Text style={styles.text}>
                        <Text style={styles.bold}>Urgency:</Text>{' '}
                        {dtc?.urgency_level} ({dtc?.urgency_explanation})
                      </Text>
                      <Text style={styles.text}>
                        <Text style={styles.bold}>Repair Difficulty:</Text>{' '}
                        {dtc?.repair_difficulty} ({dtc?.difficulty_explanation})
                      </Text>
                      <Text style={styles.text}>
                        <Text style={styles.bold}>Cost Estimate:</Text>{' '}
                        {dtc?.cost_estimate}
                      </Text>

                      Required Parts & Tools
                      <Text style={styles.bold}>Required Parts:</Text>
                      <FlatList
                        data={dtc?.required_parts}
                        keyExtractor={(item, idx) => idx.toString()}
                        renderItem={({item}) => (
                          <Text style={styles.listItem}>• {item}</Text>
                        )}
                      />

                      <Text style={styles.bold}>Required Tools:</Text>
                      <FlatList
                        data={dtc?.required_tools}
                        keyExtractor={(item, idx) => idx.toString()}
                        renderItem={({item}) => (
                          <Text style={styles.listItem}>• {item}</Text>
                        )}
                      />

                      YouTube Videos
                      <Text style={styles.bold}>YouTube Videos:</Text>
                      {dtc?.youtube_videos?.map((video, idx) => (
                        <TouchableOpacity
                          key={idx}
                          onPress={() => Linking.openURL(video)}>
                          <Text style={styles.link}>{video}</Text>
                        </TouchableOpacity>
                      ))}

                      User Notes
                      {dtc?.user_notes && (
                        <Text style={styles.text}>
                          <Text style={styles.bold}>User Notes:</Text>{' '}
                          {dtc?.user_notes}
                        </Text>
                      )}
                    </View>
                  ))}
                </ScrollView>
              </View> */
}

// <View style={styles.lowerBody}>
//   <FlatList
//     data={data}
//     keyExtractor={(dtc, index) => index.toString()}
//     renderItem={({ item: dtc }) => (
//       <View style={styles.card}>
//         <Text style={styles.heading}>DTC Code: {dtc?.code}</Text>
//         <Text style={styles.text}>
//           <Text style={styles.bold}>Description:</Text> {dtc?.description}
//         </Text>
//         <Text style={styles.text}>
//           <Text style={styles.bold}>Analysis:</Text> {dtc?.analysis}
//         </Text>

//         {/* Repair Instructions */}
//         <Text style={styles.bold}>Repair Instructions:</Text>
//         <FlatList
//           data={dtc?.repair_instructions}
//           keyExtractor={(item, idx) => idx.toString()}
//           renderItem={({ item }) => <Text style={styles.listItem}>• {item}</Text>}
//         />

//         {/* Urgency & Difficulty */}
//         <Text style={styles.text}>
//           <Text style={styles.bold}>Urgency:</Text> {dtc?.urgency_level} ({dtc?.urgency_explanation})
//         </Text>
//         <Text style={styles.text}>
//           <Text style={styles.bold}>Repair Difficulty:</Text> {dtc?.repair_difficulty} ({dtc?.difficulty_explanation})
//         </Text>
//         <Text style={styles.text}>
//           <Text style={styles.bold}>Cost Estimate:</Text> {dtc?.cost_estimate}
//         </Text>

//         {/* Required Parts & Tools */}
//         <Text style={styles.bold}>Required Parts:</Text>
//         <FlatList
//           data={dtc?.required_parts}
//           keyExtractor={(item, idx) => idx.toString()}
//           renderItem={({ item }) => <Text style={styles.listItem}>• {item}</Text>}
//         />

//         <Text style={styles.bold}>Required Tools:</Text>
//         <FlatList
//           data={dtc?.required_tools}
//           keyExtractor={(item, idx) => idx.toString()}
//           renderItem={({ item }) => <Text style={styles.listItem}>• {item}</Text>}
//         />

//         {/* YouTube Videos */}
//         <Text style={styles.bold}>YouTube Videos:</Text>
//         {dtc?.youtube_videos?.map((video, idx) => (
//           <TouchableOpacity key={idx} onPress={() => Linking.openURL(video)}>
//             <Text style={styles.link}>{video}</Text>
//           </TouchableOpacity>
//         ))}

//         {/* User Notes */}
//         {dtc?.user_notes && (
//           <Text style={styles.text}>
//             <Text style={styles.bold}>User Notes:</Text> {dtc?.user_notes}
//           </Text>
//         )}
//       </View>
//     )}
//   />
// </View>
