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

  textWhite: {
    fontFamily: 'Medium',
    fontSize: fontSize.smallM,
    color: colors.white,
  },

  textWhite2: {
    fontFamily: 'Medium',
    fontSize: fontSize.h6,
    color: colors.white,
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

  name: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.large,
    color: colors.white,
    fontWeight: '500',
  },

  flexWrapper: {
    maxWidth: sizes.screenWidth * 0.9,
    marginBottom: sizes.screenHeight * 0.1,
    marginTop: sizes.screenHeight * 0.03,
  },

  lightContainer: {
    backgroundColor: colors.dashGrey,
    borderRadius: 16,
    paddingVertical: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.9,
    overflow: 'hidden',
    marginBottom: sizes.screenHeight * 0.02,
    paddingHorizontal: sizes.screenWidth * 0.04,
  },

  lightIcon: {
    height: 56,
    width: 56,
    marginBottom: sizes.screenHeight * 0.03,
    marginTop: sizes.screenHeight * 0.01,
  },

  modalBody: {
    backgroundColor: colors.bodyGrey,
    borderRadius: 26,
    paddingVertical: sizes.screenHeight * 0.04,
    paddingHorizontal: sizes.screenWidth * 0.05,
    width: sizes.screenWidth * 0.84,
    alignItems: 'center',
    alignSelf: 'center',
  },

  modalIconContainer: {
    backgroundColor: colors.dashGrey,
    paddingVertical: sizes.screenHeight * 0.025,
    paddingHorizontal: sizes.screenWidth * 0.06,
    borderRadius: 16,
  },

  modalIcon: {
    height: sizes.screenWidth * 0.2,
    width: sizes.screenWidth * 0.2,
  },

  modalTextWhite: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.medium,
    color: colors.white,
    fontWeight: '500',
    marginVertical: sizes.screenHeight * 0.01,
  },

  modalTextDisabled: {
    fontFamily: 'Regular',
    fontSize: fontSize.regular,
    color: colors.disabledText,
    textAlign: 'center',
  },

  orangeContainer: {
    width: sizes.screenWidth * 0.9,
    paddingHorizontal: sizes.screenWidth * 0.04,
    backgroundColor: colors.appOrange,
    paddingVertical: sizes.screenHeight * 0.02,
    borderRadius: 16,
  },

  totalRatingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingContainer: {},

  writeAReviewBtn: {
    backgroundColor: colors.white,
    paddingVertical: 2,
    paddingHorizontal: sizes.screenWidth * 0.02,
    borderRadius: 4,
  },

  orangeText: {
    fontFamily: 'Medium',
    fontSize: fontSize.regular,
    color: colors.appOrange,
    bottom: 2,
  },

  comment: {
    fontFamily: 'Regular',
    fontSize: fontSize.smallM,
    color: colors.white,
    marginTop: 5,
  },
});

export default styles;
