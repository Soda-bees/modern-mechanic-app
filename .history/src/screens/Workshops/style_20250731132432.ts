import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services/utilities';

const styles = StyleSheet.create({
  bg: {
    height: sizes.screenHeight,
    width: sizes.screenWidth,
    position: 'absolute',
  },

  screen: {
    flex: 1,
  },

  lowerBody: {
    flex: 1,
    backgroundColor: colors.bodyGrey,
    borderTopRightRadius: 26,
    borderTopLeftRadius: 26,
    paddingTop: sizes.screenHeight * 0.02,
    paddingHorizontal: sizes.screenWidth * 0.05,
  },

  title: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.large,
    color: colors.white,
    fontWeight: '500',
    marginBottom: sizes.screenHeight * 0.02,
  },

  flexWrapper: {
    maxWidth: sizes.screenWidth * 0.9,
    marginBottom: sizes.screenHeight * 0.02,
    gap: sizes.screenHeight * 0.02,
  },

  workshopCardContainer: {
    height: sizes.screenHeight * 0.2,
    backgroundColor: colors.appOrange,
    borderRadius: 20,
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },

  workshopImageContainer: {
    height: sizes.screenHeight * 0.18,
    width: sizes.screenWidth * 0.42,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: sizes.screenWidth * 0.02,
    backgroundColor: colors.backgroundColor,
  },
  workshopImage: {
    height: sizes.screenHeight * 0.18,
    width: sizes.screenWidth * 0.42,
    borderRadius: 12,
    marginRight: sizes.screenWidth * 0.02,
  },

  nameHeading: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.regular,
    color: colors.white,
  },

  textWhite: {
    fontFamily: 'Medium',
    fontSize: fontSize.small,
    color: colors.white,
  },

  disabledText: {
    fontFamily: 'Medium',
    fontSize: fontSize.small,
    color: '#FFFFFF77',
  },
});

export default styles;
