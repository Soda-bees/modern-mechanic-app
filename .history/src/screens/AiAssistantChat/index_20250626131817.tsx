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

const AiAssistantChat = () => {
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
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Image source={images.bg} style={styles.bg} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView
          style={{padding: 16}}
          ref={scrollViewRef}
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
          {loading && <ActivityIndicator size="small" color="#FF6F61" />}
        </ScrollView>

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
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#6A6A6A',
              borderRadius: 25,
              paddingHorizontal: 15,
              paddingVertical: 8,
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
              borderRadius: 25,
              padding: 12,
            }}>
            <Text style={{color: 'white'}}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AiAssistantChat;
