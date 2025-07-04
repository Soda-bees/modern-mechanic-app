import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services/utilities';

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    position: 'absolute',
  },

  sectionContainer: {
    height: sizes.screenHeight * 0.96,
    width: sizes.screenWidth,
    paddingTop: sizes.screenHeight * 0.06,
    justifyContent: 'space-between',
    paddingBottom: sizes.screenHeight * 0.05,
    backgroundColor: 'red',
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
    fontFamily: 'Medium',
    fontSize: fontSize.h2,
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
});

export default styles;
