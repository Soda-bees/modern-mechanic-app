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
    fontSize: fontSize.small,
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

  flexWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: sizes.screenWidth * 0.9,
    justifyContent: 'space-between',
    marginBottom: sizes.screenHeight * 0.02,
  },

  lightContainer: {
    alignItems: 'center',
    backgroundColor: colors.dashGrey,
    borderRadius: 16,
    paddingVertical: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.43,
    overflow: 'hidden',
    marginBottom: sizes.screenHeight * 0.02,
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
});

export default styles;
