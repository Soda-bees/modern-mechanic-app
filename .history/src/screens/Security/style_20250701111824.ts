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
    alignSelf: 'center',
  },
});

export default styles;
