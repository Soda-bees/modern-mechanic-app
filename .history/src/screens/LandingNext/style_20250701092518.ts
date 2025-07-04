import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services/utilities';

const styles = StyleSheet.create({
  bg: {
    height: sizes.screenHeight,
    width: sizes.screenWidth,
    position: 'absolute',
  },

  sectionContainer: {
    flex: 1,
    paddingTop: sizes.screenHeight * 0.06,
    justifyContent: 'space-between',
    paddingBottom: sizes.screenHeight * 0.05,
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
    fontFamily: 'SemiBold',
    fontSize: 50,
    fontWeight: '500',
    color: colors.white,
  },

  textLargeBoldOrange: {
    fontFamily: 'SemiBold',
    fontSize: 50,
    fontWeight: '500',
    color: colors.appOrange,
  },

  textLarge: {
    fontFamily: 'Regular',
    fontSize: 52,
    color: colors.white,
    fontWeight: '300',
  },

  nextIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.disabledBg,
    marginTop: sizes.screenHeight * 0.02,
    alignSelf: 'flex-end',
    height: sizes.screenHeight * 0.055,
    width: sizes.screenWidth * 0.3,
    borderRadius: 100,
    justifyContent: 'center',
  },

  nextIconText: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.regular,
    color: colors.white,
  },

  nextIcon: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
    top: 1,
    marginLeft: 4,
  },

  hrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: sizes.screenHeight * 0.02,
  },

  hr: {
    height: 1,
    width: sizes.screenWidth * 0.22,
    backgroundColor: colors.disabledText,
  },

  disabledText: {
    fontFamily: 'Medium',
    fontSize: fontSize.regular,
    color: colors.disabledText,
  },
});

export default styles;
