import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services/utilities';

const styles = StyleSheet.create({
  main: {
    height: sizes.screenHeight * 0.7,
    width: sizes.screenWidth,
  },

  bg: {
    height: sizes.screenHeight,
    width: sizes.screenWidth,
    position: 'absolute',
  },

  sectionContainer: {
    flex: 1,
    width: sizes.screenWidth * 0.9,
    paddingTop: sizes.screenHeight * 0.06,
    alignSelf: 'center',
  },

  textContainer: {
    marginLeft: sizes.screenWidth * 0.05,
    width: sizes.screenWidth * 0.9,
  },

  landngBg: {
    maxHeight: sizes.screenHeight * 0.65,
    width: sizes.screenWidth * 0.8,
    resizeMode: 'contain',
    position: 'absolute',
    top: sizes.screenHeight * 0.14,
    alignSelf: 'flex-end',
  },

  textLargeBold: {
    fontFamily: 'Bold',
    fontSize: fontSize.h3,
    fontWeight: '600',
    color: colors.white,
  },

  disabledText: {
    fontFamily: 'Medium',
    fontSize: fontSize.regular,
    color: colors.disabledText,
  },

  inputLabel: {
    fontFamily: 'Medium',
    fontSize: fontSize.medium,
    color: colors.white,
    marginTop: sizes.screenHeight * 0.01,
  },

  inputContainer: {
    width: sizes.screenWidth * 0.9,
    paddingHorizontal: sizes.screenWidth * 0.04,
    borderWidth: 1,
    borderColor: colors.disabledText,
    borderRadius: sizes.screenHeight * 0.1,
    height: sizes.screenHeight * 0.075,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },

  inputIcon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },

  input: {
    fontFamily: 'Medium',
    fontSize: fontSize.medium,
    color: colors.disabledText,
    width: sizes.screenWidth * 0.68,
    marginLeft: 4,
  },

  showHideContainer: {
    position: 'absolute',
    right: sizes.screenWidth * 0.04,
  },

  forgotContainer: {
    alignSelf: 'flex-end',
    marginVertical: sizes.screenHeight * 0.01,
  },

  forgotText: {
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

  orangeBtn: {
    height: sizes.screenHeight * 0.07,
    width: sizes.screenWidth * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.appOrange,
    borderRadius: sizes.screenHeight * 0.1,
  },

  orangeBtnLabel: {
    fontFamily: 'Medium',
    fontSize: fontSize.large,
    color: colors.white,
  },

  hrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: sizes.screenHeight * 0.02,
  },

  hr: {
    height: 1,
    width: sizes.screenWidth * 0.3,
    backgroundColor: colors.disabledText,
  },

  loginWithBtn: {
    width: sizes.screenWidth * 0.9,
    borderWidth: 1,
    borderColor: colors.disabledText,
    borderRadius: sizes.screenHeight * 0.1,
    height: sizes.screenHeight * 0.07,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'center',
  },

  loginWithBtnLabel: {
    fontFamily: 'Medium',
    fontSize: fontSize.large,
    color: colors.white,
    marginLeft: 8,
    bottom: 2,
  },

  orangeButtonContainer: {
    position: 'absolute',
    bottom: sizes.screenHeight * 0.05,
  },
});

export default styles;
