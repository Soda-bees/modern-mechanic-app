import React, {useEffect, useRef} from 'react';
import {Animated, View, Text, StyleSheet} from 'react-native';

const TypingDots = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      );
    };

    animateDot(dot1, 0).start();
    animateDot(dot2, 150).start();
    animateDot(dot3, 300).start();
  }, [dot1, dot2, dot3]);

  const styleForDot = (dot: Animated.Value) => ({
    opacity: dot,
    transform: [
      {
        scale: dot.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1.2],
        }),
      },
    ],
  });

  return (
    <View style={styles.typingContainer}>
      <Animated.Text style={[styles.dot, styleForDot(dot1)]}>.</Animated.Text>
      <Animated.Text style={[styles.dot, styleForDot(dot2)]}>.</Animated.Text>
      <Animated.Text style={[styles.dot, styleForDot(dot3)]}>.</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  typingContainer: {
    flexDirection: 'row',
    // padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginVertical: 4,
  },
  dot: {
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold',
    marginHorizontal: 2,
  },
});

export default TypingDots;
