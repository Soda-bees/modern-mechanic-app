// src/components/OrangeButton.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import {colors, fontSize, sizes} from '../../services/utilities';

const OrangeButtonLoader: React.FC = () => {
  return (
    <View style={styles.orangeBtn}>
      <ActivityIndicator color={colors.white} size={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  orangeBtn: {
    height: sizes.screenHeight * 0.07,
    width: sizes.screenWidth * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.appOrange,
    borderRadius: sizes.screenHeight * 0.1,
    alignSelf: 'center',
  },

  orangeBtnLabel: {
    fontFamily: 'Medium',
    fontSize: fontSize.large,
    color: colors.white,
    bottom: 2,
  },
});

export default OrangeButtonLoader;
