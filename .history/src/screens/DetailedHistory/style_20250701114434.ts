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

  body: {
    height: sizes.screenHeight * 0.84,
    width: sizes.screenWidth,
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

  hrFull: {
    height: 1,
    width: sizes.screenWidth,
    backgroundColor: colors.disabledText,
    marginVertical: sizes.screenHeight * 0.03,
  },

  sectionContainer: {
    width: sizes.screenWidth * 0.9,
    alignSelf: 'center',
  },

  vehicleContainer: {
    width: sizes.screenWidth * 0.9,
    height: sizes.screenHeight * 0.2,
    backgroundColor: colors.grey,
    borderRadius: 16,
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  uploadImgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    overflow: 'hidden',
  },

  uploadImgPreview: {
    height: sizes.screenHeight * 0.2,
    width: sizes.screenWidth * 0.9,
    // resizeMode: 'contain',
  },

  uploadImgIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },

  uploadImgText: {
    fontFamily: 'Medium',
    fontSize: fontSize.smallM,
    color: colors.lightGrey,
  },

  disabledText: {
    fontFamily: 'Medium',
    fontSize: fontSize.regular,
    color: colors.disabledText,
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
    justifyContent: 'center',
    marginTop: sizes.screenHeight * 0.03,
  },

  errMsg: {
    fontFamily: 'Medium',
    fontSize: fontSize.regular,
    color: colors.appOrange,
    marginBottom: sizes.screenHeight * 0.01,
  },

  waveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: sizes.screenHeight * 0.02,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textWhite: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.regular,
    color: colors.white,
    fontWeight: '500',
  },

  orangeContainer: {
    backgroundColor: colors.appOrange,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
    paddingHorizontal: sizes.screenWidth * 0.04,
    marginLeft: sizes.screenWidth * 0.07,
    borderRadius: 4,
  },

  waveIcon: {
    height: sizes.screenHeight * 0.045,
    width: sizes.screenWidth * 0.22,
    resizeMode: 'contain',
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
    marginVertical: sizes.screenHeight * 0.01,
  },

  searchContainer: {
    borderColor: colors.disabledText,
    borderWidth: 1,
    borderRadius: sizes.screenHeight * 0.1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: sizes.screenWidth * 0.03,
    marginVertical: sizes.screenHeight * 0.02,
  },

  searchIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },

  input: {
    fontFamily: 'Medium',
    fontSize: fontSize.medium,
    color: colors.disabledText,
    width: sizes.screenWidth * 0.68,
    marginLeft: 4,
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
    marginTop: sizes.screenHeight * 0.1,
  },

  scanIcon: {
    height: 28,
    width: 28,
    marginRight: sizes.screenWidth * 0.02,
  },

  orangeBtnLabel: {
    fontFamily: 'Medium',
    fontSize: fontSize.large,
    color: colors.white,
    bottom: 4,
  },

  row2: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: sizes.screenHeight * 0.02,
    padding: 8,
    borderRadius: 16,
  },

  historyCarImg: {
    height: sizes.screenHeight * 0.16,
    width: sizes.screenWidth * 0.4,
    borderRadius: 12,
    marginRight: sizes.screenWidth * 0.02,
  },

  historyTitle: {
    fontFamily: 'Medium',
    fontSize: fontSize.large,
    color: colors.white,
  },

  codeContainerMain: {
    width: sizes.screenWidth * 0.2,
    alignItems: 'flex-start',
  },

  codeContainer: {
    backgroundColor: colors.bgDark,
    paddingHorizontal: 8,
    paddingBottom: 4,
    paddingTop: 2,
    marginVertical: 4,
    borderRadius: 4,
  },

  textWhiteSmall: {
    fontFamily: 'Regular',
    fontSize: fontSize.smallM,
    color: colors.white,
  },

  disabledTextSmall: {
    fontFamily: 'Regular',
    fontSize: fontSize.small,
    color: colors.disabledText,
  },

  red: {
    height: 14,
    width: 14,
    borderRadius: 20,
    backgroundColor: colors.red,
  },

  green: {
    height: 14,
    width: 14,
    borderRadius: 20,
    backgroundColor: '#3CE861',
  },

  rightArrow: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    margin: 6,
  },

  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: sizes.screenHeight * 0.005,
  },

  codeContainer2: {
    backgroundColor: '#404040',
    paddingVertical: 2,
    paddingBottom: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },

  codeContainerOrange: {
    backgroundColor: colors.appOrange,
    paddingVertical: 2,
    paddingBottom: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
  },

  codeText: {
    fontFamily: 'Regular',
    fontSize: fontSize.smallM,
    color: colors.white,
  },

  heading: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.regular,
    color: colors.white,
    marginVertical: 4,
  },

  hr: {
    height: 1,
    width: sizes.screenWidth * 0.9,
    backgroundColor: colors.disabledText,
    marginVertical: sizes.screenHeight * 0.01,
  },

  hrSmall: {
    height: 1,
    width: sizes.screenWidth * 0.8,
    backgroundColor: colors.disabledText,
    marginVertical: sizes.screenHeight * 0.01,
  },

  colourSection: {
    width: sizes.screenWidth * 0.9,
    alignItems: 'center',
    backgroundColor: '#444444',
    paddingVertical: sizes.screenHeight * 0.03,
    borderRadius: 16,
    marginVertical: sizes.screenHeight * 0.02,
  },

  urgencyO: {
    height: sizes.screenHeight * 0.2,
    width: sizes.screenWidth * 0.8,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  colourRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: sizes.screenWidth * 0.82,
    justifyContent: 'space-between',
  },

  colourColumn: {
    // backgroundColor: 'red',
    width: sizes.screenWidth * 0.2,
    gap: 3,
  },

  colourB: {
    height: 8,
    width: 8,
    backgroundColor: '#4689FD',
    marginRight: 6,
  },

  colourG: {
    height: 8,
    width: 8,
    backgroundColor: '#3CE861',
    marginRight: 6,
  },

  colourY: {
    height: 8,
    width: 8,
    backgroundColor: '#FFE100',
    marginRight: 6,
  },

  colourO: {
    height: 8,
    width: 8,
    backgroundColor: colors.appOrange,
    marginRight: 6,
  },

  colourR: {
    height: 8,
    width: 8,
    backgroundColor: 'red',
    marginRight: 6,
  },

  colourText: {
    fontFamily: 'Bold',
    fontSize: fontSize.small,
    color: colors.white,
    fontWeight: '600',
  },

  colourDetail: {
    fontFamily: 'Regular',
    fontSize: fontSize.small,
    color: colors.white,
  },

  colourContainer: {
    width: sizes.screenWidth * 0.82,
  },

  colourRow2: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowWidth: {
    flexDirection: 'row',
    alignItems: 'center',
    width: sizes.screenWidth * 0.2,
    marginBottom: 4,
  },

  rowBetween: {
    width: sizes.screenWidth * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginVertical: sizes.screenHeight * 0.01,
  },

  textWhiteLarge: {
    fontFamily: 'Medium',
    fontSize: fontSize.medium,
    color: colors.white,
  },

  hrSmaller: {
    height: 1,
    width: sizes.screenWidth * 0.46,
    backgroundColor: colors.disabledText,
    marginTop: sizes.screenHeight * 0.01,
  },

  costContainer: {
    borderWidth: 1,
    borderColor: colors.disabledText,
    alignItems: 'center',
    justifyContent: 'center',
    width: sizes.screenWidth * 0.36,
    height: sizes.screenHeight * 0.05,
  },

  textWhiteLargeBold: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.extraLarge,
    color: colors.white,
    fontWeight: '500',
  },

  youtubeImg: {
    height: sizes.screenHeight * 0.22,
    width: sizes.screenWidth * 0.9,
    borderRadius: 16,
  },

  width: {
    width: sizes.screenWidth * 0.82,
    marginBottom: sizes.screenHeight * 0.06,
  },

  flexWrapper: {
    maxWidth: sizes.screenWidth * 0.9,
    marginBottom: sizes.screenHeight * 0.01,
    gap: sizes.screenHeight * 0.02,
  },

  workshopCardContainer: {
    height: sizes.screenHeight * 0.2,
    backgroundColor: colors.appOrange,
    borderRadius: 20,
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },

  workshopImageContainer: {
    height: sizes.screenHeight * 0.18,
    width: sizes.screenWidth * 0.42,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: sizes.screenWidth * 0.02,
  },

  nameHeading: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.regular,
    color: colors.white,
  },

  disabledText2: {
    fontFamily: 'Medium',
    fontSize: fontSize.small,
    color: '#FFFFFF77',
  },

  textWhite2: {
    fontFamily: 'Medium',
    fontSize: fontSize.small,
    color: colors.white,
  },

  textWhiteWorkshop: {
    fontFamily: 'Medium',
    fontSize: fontSize.small,
    color: colors.white,
  },

  partsRow: {
    width: sizes.screenWidth * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: sizes.screenHeight * 0.02,
  },

  partsImg: {
    height: 46,
    width: 46,
    borderRadius: 8,
    marginRight: 8,
  },

  orderBtn: {
    backgroundColor: colors.appOrange,
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingTop: 1,
    paddingBottom: 5,
    borderRadius: 50,
  },

  tabText: {
    fontFamily: 'Regular',
    fontSize: fontSize.small,
    color: colors.white,
  },
});

export default styles;
