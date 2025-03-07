import React from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {ProcessDtcsResponse} from '../../services/config/API';

// interface DTCResponse {
//   description: string;
//   analysis: string;
//   repair_instructions: string[];
//   urgency_level: string;
//   urgency_color: string;
//   urgency_explanation: string;
//   repair_difficulty: string;
//   difficulty_color: string;
//   difficulty_explanation: string;
//   cost_estimate: string;
//   required_parts: string[];
//   required_tools: string[];
//   youtube_videos: string[];
//   user_notes: string;
//   code: string;
// }

// interface APIResponse {
//   message: string;
//   data: DTCResponse[];
//   success: boolean;
// }

const DTCResult = ({apiResponse}: {apiResponse?: ProcessDtcsResponse}) => {
  if (!apiResponse || !apiResponse?.success || !apiResponse?.data?.length) {
    return <Text style={styles.errorText}>No data available</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {apiResponse?.data?.map((dtc, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.heading}>DTC Code: {dtc?.code}</Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Description:</Text> {dtc?.description}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Analysis:</Text> {dtc?.analysis}
          </Text>

          {/* Repair Instructions */}
          <Text style={styles.bold}>Repair Instructions:</Text>
          <FlatList
            data={dtc?.repair_instructions}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({item}) => (
              <Text style={styles.listItem}>• {item}</Text>
            )}
          />

          {/* Urgency & Difficulty */}
          <Text style={styles.text}>
            <Text style={styles.bold}>Urgency:</Text> {dtc?.urgency_level} (
            {dtc?.urgency_explanation})
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Repair Difficulty:</Text>{' '}
            {dtc?.repair_difficulty} ({dtc?.difficulty_explanation})
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Cost Estimate:</Text> {dtc?.cost_estimate}
          </Text>

          {/* Required Parts & Tools */}
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

          {/* YouTube Videos */}
          <Text style={styles.bold}>YouTube Videos:</Text>
          {dtc?.youtube_videos?.map((video, idx) => (
            <TouchableOpacity key={idx} onPress={() => Linking.openURL(video)}>
              <Text style={styles.link}>{video}</Text>
            </TouchableOpacity>
          ))}

          {/* User Notes */}
          {dtc?.user_notes && (
            <Text style={styles.text}>
              <Text style={styles.bold}>User Notes:</Text> {dtc?.user_notes}
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default DTCResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 10,
    elevation: 3,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  listItem: {
    fontSize: 14,
    marginLeft: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
