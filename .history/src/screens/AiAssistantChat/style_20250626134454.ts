import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services/utilities';

const styles = StyleSheet.create({
  main: {
    height: sizes.screenHeight,
    width: sizes.screenWidth,
  },

  bg: {
    height: sizes.screenHeight,
    width: sizes.screenWidth,
    position: 'absolute',
  },

  sendIcon: {
    height: 25,
    width: 25,
  },

  sectionContainer: {
    flex: 1,
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
    marginTop: sizes.screenHeight * 0.2,
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
    color: colors.disabledText,
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
    color: colors.disabledText,
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
    color: colors.disabledText,
    borderRadius: 10,
  },

  orangeButtonContainer: {
    position: 'absolute',
    bottom: sizes.screenHeight * 0.05,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: sizes.screenWidth * 0.9,
    alignSelf: 'center',
    marginVertical: sizes.screenHeight * 0.03,
  },

  headerTitle: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.extraLarge,
    color: colors.white,
    fontWeight: '500',
  },

  headerTitleOrange: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.extraLarge,
    color: colors.appOrange,
    fontWeight: '500',
  },

  backIconContainer: {
    top: 3,
    marginRight: sizes.screenWidth * 0.02,
  },

  backIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
});

export default styles;
