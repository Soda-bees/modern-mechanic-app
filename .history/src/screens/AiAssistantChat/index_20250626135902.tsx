import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import axios from 'axios';
import styles from './style'; // Make sure to adjust this to fit the new layout
import images from '../../services/utilities/images';
import {colors} from '../../services/utilities';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../services/config/navigation';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const AiAssistantChat = () => {
  const navigation = useNavigation<NavigationProp>();

  const [messages, setMessages] = useState<
    {role: 'user' | 'assistant'; content: string}[]
  >([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: {role: 'user'; content: string} = {
      role: 'user',
      content: input,
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: 'claude-3-opus-20240229',
          max_tokens: 1000,
          messages: updatedMessages.map(m => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
          })),
        },
        {
          headers: {
            'x-api-key':
              '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',
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json',
          },
        },
      );

      const assistantMessage = {
        role: 'assistant' as const,
        content: response.data.content[0]?.text || 'No response',
      };

      setMessages([...updatedMessages, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Image source={images.bg} style={styles.bg} />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // adjust if needed
      >
        <View style={{flex: 1}}>
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
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{padding: 16, paddingBottom: 100}} // still needed
            ref={scrollViewRef}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({animated: true})
            }>
            {messages.map((msg, index) => (
              <View
                key={index}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor:
                    msg.role === 'user' ? colors.appOrange : '#F0F0F0',
                  padding: 10,
                  marginVertical: 4,
                  borderRadius: 10,
                  maxWidth: '80%',
                }}>
                <Text style={{color: msg.role === 'user' ? 'white' : 'black'}}>
                  {msg.content}
                </Text>
              </View>
            ))}

            {loading && (
              <View
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: '#F0F0F0',
                  padding: 10,
                  marginVertical: 4,
                  borderRadius: 10,
                }}>
                <Text style={{color: 'black', fontStyle: 'italic'}}>
                  Typing...
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Input bar */}
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              borderTopWidth: 1,
              borderColor: '#6A6A6A',
              backgroundColor: '#3E3E3E',
            }}>
            <TextInput
              placeholder="Ask something..."
              multiline
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: '#6A6A6A',
                borderRadius: 25,
                paddingHorizontal: 15,
                paddingVertical: 8,
                color: 'white',
              }}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity
              onPress={sendMessage}
              style={{
                marginLeft: 10,
                backgroundColor: colors.appOrange,
                borderRadius: 50,
                padding: 10,
                alignSelf: 'flex-end',
              }}>
              <Image source={images.sendIcon} style={styles.sendIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AiAssistantChat;
