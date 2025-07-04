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
import {sizes} from '../../services/utilities';

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
  // const data = useSelector(selectDtcReport);
  const data = [
    {
      description:
        'P0025 - Exhaust Variable Camshaft Timing Circuit/Bank 2 Performance',
      analysis:
        "Imagine your Bugatti Chiron's engine as a world-class orchestra, where timing is absolutely everything. The variable camshaft timing system is like the conductor, precisely controlling when the exhaust valves open and close to create the perfect symphony of power and efficiency. What code P0025 is telling us is that the conductor for the exhaust side of Bank 2 (one half of your W16 engine) is slightly off-beat, and that's likely causing the knocking noise you're hearing.\n\nThis knocking sound makes perfect sense with this code. When the camshaft timing is off, the valves might be opening or closing at slightly wrong moments. It's like dancers who are just a half-step behind the music - they're still dancing, but the timing is noticeably off. In a precision machine like your Bugatti, even tiny timing discrepancies can create that telltale knocking sound as mechanical components aren't moving in their perfect choreography.\n\nThe variable timing system uses oil pressure controlled by solenoids (think of them as electronic valves) to adjust the camshaft position. The issue could be with the solenoid itself, low oil pressure, contaminated oil, or even the camshaft actuator. Given the Chiron's sophisticated engineering, even small issues in this system can affect performance, though the car's safety systems will prevent any catastrophic damage.",
      repair_instructions: [
        '1. Connect an advanced diagnostic scanner to verify the P0025 code and check for any additional codes',
        "2. Check engine oil level and condition - ensure it's at the proper level and not contaminated",
        '3. Inspect the variable camshaft timing solenoid connector for Bank 2 exhaust side for damage or loose connections',
        '4. Test the camshaft timing solenoid electrical circuit for proper resistance and voltage',
        '5. Remove and inspect the camshaft timing solenoid for debris or damage',
        '6. If solenoid appears clean and undamaged, replace the camshaft timing solenoid',
        '7. If problem persists, perform camshaft timing verification using manufacturer-specific procedures',
        '8. In rare cases, the camshaft actuator itself may need replacement',
        '9. Clear the trouble codes and perform a test drive to verify the repair',
        '10. If the issue persists, the vehicle will need advanced diagnostics at a Bugatti service center',
      ],
      urgency_level: 'Soon',
      urgency_color: 'Orange',
      urgency_explanation:
        'While your Bugatti will continue to run, this issue should be addressed relatively soon. The knocking sound indicates timing discrepancies that can lead to reduced performance, decreased fuel economy, and potentially increased emissions. If left unaddressed for an extended period, it could eventually lead to more significant engine damage, particularly to valves or pistons. Given the value and engineering precision of your Chiron, addressing this issue promptly is strongly recommended to prevent more costly repairs down the line.',
      repair_difficulty: 'Specialist',
      difficulty_color: 'Red',
      difficulty_explanation:
        'The Bugatti Chiron is an ultra-high-performance hypercar with a complex W16 engine featuring sophisticated timing systems. Working on this vehicle requires specialized knowledge, tools, and diagnostic equipment specific to Bugatti. Additionally, accessing components in the tightly packaged engine bay is extremely challenging. This repair should only be performed by Bugatti-certified technicians who have the proper training, documentation, and equipment to service this exclusive vehicle properly.',
      cost_estimate:
        "For a Bugatti Chiron, this repair will be expensive due to the vehicle's exclusivity and complexity. Diagnostic fees at a Bugatti service center typically start at $1,500-$2,500. If only the camshaft timing solenoid needs replacement, parts may cost $800-$1,200 with labor around $2,000-$3,000. If the camshaft actuator needs replacement, expect parts to cost $3,000-$5,000 with labor around $4,000-$6,000. In a worst-case scenario requiring more extensive repairs, costs could exceed $15,000.",
      required_parts: [
        'Camshaft timing solenoid for Bank 2 exhaust side',
        'Camshaft actuator (if necessary)',
        'High-performance engine oil (Bugatti-approved grade)',
        'Oil filter',
        'Various gaskets and seals',
      ],
      required_tools: [
        'Bugatti-specific diagnostic scanner',
        'Specialized Bugatti service tools',
        'Torque wrench with Bugatti specifications',
        'Digital multimeter',
        'Oil pressure testing equipment',
        'Camshaft timing verification tools',
        'Socket set with Bugatti-specific sizes',
        'Oil drain pan',
      ],
      youtube_videos: [],
      user_notes: 'Car has slight knocking noise',
      code: 'P0025',
    },
  ];
  const car = userData?.cars[0];

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
                {data?.map((scan, index) => (
                  <View
                    key={index}
                    style={[
                      styles.card,
                      {paddingBottom: sizes.screenHeight * 0.05},
                    ]}>
                    <Text style={styles.heading}>DTC Code: {scan?.code}</Text>

                    <Text style={styles.title}>Description:</Text>
                    <Text style={styles.textWhiteSmall}>
                      {scan?.description}
                    </Text>
                    <View style={styles.hr}></View>

                    <Text style={styles.title}>Analysis:</Text>
                    <Text style={styles.textWhiteSmall}>{scan?.analysis}</Text>
                    <View style={styles.hr}></View>

                    <Text style={styles.title}>Repair Instructions:</Text>
                    {scan?.repair_instructions?.map((item, index) => (
                      <Text key={index} style={styles.textWhiteSmall}>
                        • {item}
                      </Text>
                    ))}
                    <View style={styles.hr}></View>

                    <Text style={styles.title}>Urgency Level:</Text>
                    <Image
                      source={getUrgencyImage(scan?.urgency_color)}
                      style={styles.urgencyO}
                    />

                    <Text
                      style={[
                        styles.textWhiteSmall,
                        {color: scan?.urgency_color?.toLowerCase()},
                      ]}>
                      {scan?.urgency_level}
                    </Text>
                    <Text style={styles.textWhiteSmall}>
                      {scan?.urgency_explanation}
                    </Text>
                    <View style={styles.hr}></View>

                    <Text style={styles.title}>Repair Difficulty:</Text>
                    <Image
                      source={getDifficultyImage(scan?.difficulty_color)}
                      style={styles.urgencyO}
                    />

                    <Text
                      style={[
                        styles.textWhiteSmall,
                        {color: scan?.difficulty_color?.toLowerCase()},
                      ]}>
                      {scan?.repair_difficulty}
                    </Text>
                    <Text style={styles.textWhiteSmall}>
                      {scan?.difficulty_explanation}
                    </Text>

                    <View style={styles.hr}></View>

                    <Text style={styles.title}>Cost Estimate:</Text>
                    <Text style={styles.textWhiteSmall}>
                      {scan?.cost_estimate}
                    </Text>
                    <View style={styles.hr}></View>

                    <Text style={styles.title}>Required Parts:</Text>
                    {scan?.required_parts?.map((part, index) => (
                      <Text key={index} style={styles.textWhiteSmall}>
                        • {part}
                      </Text>
                    ))}
                    <View style={styles.hr}></View>

                    <Text style={styles.title}>Required Tools:</Text>
                    {scan?.required_tools?.map((tool, index) => (
                      <Text key={index} style={styles.textWhiteSmall}>
                        • {tool}
                      </Text>
                    ))}
                    <View style={styles.hr}></View>

                    <Text style={styles.title}>YouTube Videos:</Text>
                    {scan?.youtube_videos?.map((url, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => Linking.openURL(url)}
                        activeOpacity={0.7}>
                        <Text
                          style={[
                            styles.textWhiteSmall,
                            {
                              color: 'lightblue',
                              textDecorationLine: 'underline',
                            },
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
                    {/* <View style={{marginTop: sizes.screenHeight * 0.04}}>
                      <OrangeButton
                        title="Complain Form"
                        onPress={() => {
                          if (scan?.id) {
                            handleComplain(scan?.id);
                          }
                        }}
                      />
                    </View> */}
                  </View>

                  // <View key={index} style={styles.card}>

                  //   <View style={[{height: 5}]}></View>

                  //   <Text style={styles.text}>
                  //     <Text style={styles.bold}>Description:</Text>{' '}
                  //     {dtc?.description}
                  //   </Text>

                  //   <View style={[{height: 5}]}></View>

                  //   <Text style={styles.text}>
                  //     <Text style={styles.bold}>Analysis:</Text> {dtc?.analysis}
                  //   </Text>

                  //   <View style={[{height: 5}]}></View>

                  //   {/* Repair Instructions */}
                  //   <Text style={[styles.text, styles.bold]}>
                  //     Repair Instructions:
                  //   </Text>
                  //   {dtc?.repair_instructions?.map((item, idx) => (
                  //     <Text key={idx} style={styles.listItem}>
                  //       • {item}
                  //     </Text>
                  //   ))}

                  //   <View style={[{height: 5}]}></View>

                  //   {/* Urgency & Difficulty */}
                  //   <Text style={styles.text}>
                  //     <Text style={styles.bold}>Urgency:</Text>{' '}
                  //     {dtc?.urgency_level} ({dtc?.urgency_explanation})
                  //   </Text>

                  //   <View style={[{height: 5}]}></View>

                  //   <Text style={styles.text}>
                  //     <Text style={styles.bold}>Repair Difficulty:</Text>{' '}
                  //     {dtc?.repair_difficulty} ({dtc?.difficulty_explanation})
                  //   </Text>

                  //   <View style={[{height: 5}]}></View>

                  //   <Text style={styles.text}>
                  //     <Text style={styles.bold}>Cost Estimate:</Text>{' '}
                  //     {dtc?.cost_estimate}
                  //   </Text>

                  //   <View style={[{height: 5}]}></View>

                  //   {/* Required Parts & Tools */}
                  //   <Text style={[styles.text, styles.bold]}>
                  //     Required Parts:
                  //   </Text>
                  //   {dtc?.required_parts?.map((item, idx) => (
                  //     <Text key={idx} style={styles.listItem}>
                  //       • {item}
                  //     </Text>
                  //   ))}

                  //   <View style={[{height: 5}]}></View>

                  //   <Text style={[styles.text, styles.bold]}>
                  //     Required Tools:
                  //   </Text>
                  //   {dtc?.required_tools?.map((item, idx) => (
                  //     <Text key={idx} style={styles.listItem}>
                  //       • {item}
                  //     </Text>
                  //   ))}

                  //   <View style={[{height: 5}]}></View>

                  //   {/* YouTube Videos */}
                  //   {dtc?.youtube_videos?.length > 0 ? (
                  //     <Text style={[styles.text, styles.bold]}>
                  //       YouTube Videos:
                  //     </Text>
                  //   ) : null}

                  //   {dtc?.youtube_videos?.map((video, idx) => (
                  //     <TouchableOpacity
                  //       key={idx}
                  //       onPress={() => Linking.openURL(video)}>
                  //       <Text style={styles.link}>{video}</Text>
                  //     </TouchableOpacity>
                  //   ))}

                  //   <View style={[{height: 5}]}></View>

                  //   {/* User Notes */}
                  //   {dtc?.user_notes && (
                  //     <Text style={styles.text}>
                  //       <Text style={styles.bold}>User Notes:</Text>{' '}
                  //       {dtc?.user_notes}
                  //     </Text>
                  //   )}
                  // </View>
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
