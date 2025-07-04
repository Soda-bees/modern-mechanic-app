import React, {useState, useRef, useMemo, useEffect} from 'react';
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
  Keyboard,
} from 'react-native';
import axios from 'axios';
import styles from './style'; // Make sure to adjust this to fit the new layout
import images from '../../services/utilities/images';
import {colors} from '../../services/utilities';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../services/config/navigation';
import TypingDots from '../../components/TypingDots';
import {useSelector} from 'react-redux';
import {selectUserData} from '../../store/userSlice';
import {selectScans} from '../../store/scanSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const AiAssistantChat = () => {
  const navigation = useNavigation<NavigationProp>();

  const userData = useSelector(selectUserData);
  const car = useMemo(() => {
    return userData?.cars?.find(car => car.selected);
  }, [userData]);

  const [messages, setMessages] = useState<
    {role: 'user' | 'assistant'; content: string}[]
  >([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Load chat from storage or send initial prompt
  useEffect(() => {
    const loadChat = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem('@ai_assistant_chat');
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        } else {
          sendInitialPrompt();
        }
      } catch (error) {
        console.error('Error loading chat:', error);
      }
    };

    loadChat();
  }, []);

  // Persist chat when messages change
  useEffect(() => {
    const saveChat = async () => {
      try {
        await AsyncStorage.setItem(
          '@ai_assistant_chat',
          JSON.stringify(messages),
        );
      } catch (error) {
        console.error('Error saving chat:', error);
      }
    };

    if (messages.length > 0) {
      saveChat();
    }
  }, [messages]);

  const sendInitialPrompt = async () => {
    const initialPrompt = `
You are a senior expert mechanic AI assistant. Your job is to help users troubleshoot, understand, and fix car issues in a clear, friendly, and expert manner.

Greet the user with:
"hey ${
      userData?.name || 'there'
    }, it’s modern mechanic ai assistant here. tell me what issue you are having with your ${
      car?.make || 'car'
    } ${car?.model || ''} so I can help you."

Only send this greeting and wait for the user to respond with their issue.
`;

    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: 'claude-3-opus-20240229',
          max_tokens: 500,
          messages: [{role: 'user', content: initialPrompt}],
        },
        {
          headers: {
            'x-api-key': 'YOUR_ANTHROPIC_API_KEY',
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json',
          },
        },
      );

      const assistantMessage = {
        role: 'assistant' as const,
        content: response.data.content[0]?.text || 'No response',
      };

      setMessages([assistantMessage]);
    } catch (error) {
      console.error('Error sending initial prompt:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {role: 'user' as const, content: input};
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
          messages: updatedMessages.slice(-10).map(m => ({
            role: m.role,
            content: m.content,
          })),
        },
        {
          headers: {
            'x-api-key': 'YOUR_ANTHROPIC_API_KEY',
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
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = async () => {
    try {
      await AsyncStorage.removeItem('@ai_assistant_chat');
      setMessages([]);
      sendInitialPrompt();
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Image source={images.bg} style={styles.bg} />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
        <View style={{flex: 1}}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backIconContainer}
              onPress={() => {
                Keyboard.dismiss();
                setTimeout(() => {
                  navigation.goBack();
                }, 50);
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
            contentContainerStyle={{padding: 16}} // still needed
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
                <Text
                  style={{
                    color: msg.role === 'user' ? 'white' : 'black',
                    fontFamily: 'Regular',
                  }}>
                  {msg.content}
                </Text>
              </View>
            ))}

            {/* {loading && (
              <View
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: '#F0F0F0',
                  padding: 10,
                  marginVertical: 4,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontStyle: 'italic',
                    fontFamily: 'Regular',
                  }}>
                  Typing...
                </Text>
              </View>
            )} */}

            {loading && <TypingDots />}
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
              placeholderTextColor={'#A1A1A1'}
              multiline
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: '#6A6A6A',
                borderRadius: 25,
                paddingHorizontal: 15,
                paddingVertical: 8,
                color: 'white',
                fontFamily: 'Regular',
              }}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
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
