import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services/utilities';

const styles = StyleSheet.create({
  bg: {
    height: sizes.screenHeight,
    width: sizes.screenWidth,
    position: 'absolute',
  },

  sectionContainer: {
    height: sizes.screenHeight,
    width: sizes.screenWidth * 0.9,
    paddingTop: sizes.screenHeight * 0.06,
    alignSelf: 'center',
  },

  disabledText: {
    fontFamily: 'Medium',
    fontSize: fontSize.regular,
    color: colors.disabledText,
  },

  textWhite: {
    fontFamily: 'Medium',
    fontSize: fontSize.regular,
    color: colors.white,
  },

  errMsg: {
    fontFamily: 'Medium',
    fontSize: fontSize.regular,
    color: colors.appOrange,
    marginBottom: sizes.screenHeight * 0.01,
  },

  codeFieldContainer: {
    marginVertical: sizes.screenHeight * 0.105,
  },

  codeFieldRoot: {
    width: sizes.screenWidth * 0.7,
    alignSelf: 'center',
  },

  cell: {
    fontFamily: 'SemiBold',
    width: sizes.screenWidth * 0.15,
    height: sizes.screenHeight * 0.08,
    lineHeight: sizes.screenHeight * 0.08,
    fontSize: fontSize.h4,
    textAlign: 'center',
    color: colors.black,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.disabledText,
  },

  cellIOS: {
    fontFamily: 'Satoshi-Bold',
    width: sizes.screenWidth * 0.15,
    height: sizes.screenHeight * 0.08,
    lineHeight: sizes.screenHeight * 0.08,
    fontSize: fontSize.h4,
    backgroundColor: colors.bgLight,
    textAlign: 'center',
    color: colors.black,
    borderRadius: 10,
    overflow: 'hidden',
  },

  focusCell: {
    fontFamily: 'Satoshi-Bold',
    width: sizes.screenWidth * 0.15,
    height: sizes.screenHeight * 0.08,
    lineHeight: sizes.screenHeight * 0.08,
    fontSize: fontSize.h4,
    borderWidth: 1,
    borderColor: colors.appOrange,
    textAlign: 'center',
    color: colors.black,
    borderRadius: 10,
  },
});

export default styles;
