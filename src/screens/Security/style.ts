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

  hrFull: {
    height: 1,
    width: sizes.screenWidth,
    backgroundColor: colors.disabledText,
    marginVertical: sizes.screenHeight * 0.03,
  },

  sectionContainer: {
    flex: 1,
    width: sizes.screenWidth * 0.9,
    paddingTop: sizes.screenHeight * 0.05,
    alignSelf: 'center',
  },

  navigateBtn: {
    width: sizes.screenWidth * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: 12,
    backgroundColor: colors.bodyGrey,
    borderRadius: 8,
    marginBottom: 15,
  },

  navigateBtnText: {
    fontFamily: 'Medium',
    fontSize: fontSize.medium,
    color: colors.white,
  },

  rightIcon: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
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
    marginBottom: sizes.screenHeight * 0.02,
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

  errMsg: {
    fontFamily: 'Medium',
    fontSize: fontSize.regular,
    color: colors.appOrange,
    marginBottom: sizes.screenHeight * 0.01,
  },

  orangeButtonContainer: {
    position: 'absolute',
    bottom: sizes.screenHeight * 0.05,
  },

  orangeBtn: {
    height: sizes.screenHeight * 0.07,
    width: sizes.screenWidth * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.appOrange,
    borderRadius: sizes.screenHeight * 0.1,
    alignSelf: 'center',
    flexDirection: 'row',
  },

  orangeBtnLabel: {
    fontFamily: 'Medium',
    fontSize: fontSize.large,
    color: colors.white,
    bottom: 2,
  },

  logOutIcon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginRight: 8,
  },
});

export default styles;
