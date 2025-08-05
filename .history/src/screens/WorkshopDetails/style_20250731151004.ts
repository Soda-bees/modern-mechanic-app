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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  lowerBody: {
    flex: 1,
    backgroundColor: colors.bodyGrey,
    borderTopRightRadius: 26,
    borderTopLeftRadius: 26,
    paddingTop: sizes.screenHeight * 0.02,
    paddingHorizontal: sizes.screenWidth * 0.05,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: sizes.screenWidth * 0.9,
    alignSelf: 'center',
  },

  backIconContainer: {
    bottom: 5,
    marginRight: sizes.screenWidth * 0.02,
  },

  backIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
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
    marginBottom: sizes.screenHeight * 0.1,
    gap: sizes.screenHeight * 0.02,
  },

  workshopImageContainer: {
    height: sizes.screenHeight * 0.2,
    borderRadius: 20,
    width: sizes.screenWidth * 0.9,
    marginBottom: sizes.screenHeight * 0.02,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },

  workshopImage: {
    height: sizes.screenHeight * 0.2,
    borderRadius: 20,
    width: sizes.screenWidth * 0.9,
  },

  nameHeading: {
    fontFamily: 'Medium',
    fontSize: fontSize.h5,
    color: colors.white,
  },

  textWhite: {
    fontFamily: 'Medium',
    fontSize: fontSize.smallM,
    color: colors.white,
  },

  disabledText: {
    fontFamily: 'Medium',
    fontSize: fontSize.smallM,
    color: '#FFFFFF77',
  },

  container: {
    marginVertical: sizes.screenHeight * 0.01,
  },

  descriptionContainer: {
    backgroundColor: '#444444',
    padding: 10,
    borderRadius: 12,
    marginVertical: sizes.screenHeight * 0.01,
  },

  orangeButtonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
  },
});

export default styles;
