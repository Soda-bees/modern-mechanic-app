// src/components/OrangeButton.tsx
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services/utilities';

interface OrangeButtonProps {
  title: string;
  onPress: () => void;
}

const OrangeButton: React.FC<OrangeButtonProps> = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.orangeBtn} onPress={onPress}>
      <Text style={styles.orangeBtnLabel}>{title}</Text>
    </TouchableOpacity>
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

export default OrangeButton;
