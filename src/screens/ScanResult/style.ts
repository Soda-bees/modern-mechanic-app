import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services/utilities';

const styles = StyleSheet.create({
  bg: {
    height: sizes.screenHeight,
    width: sizes.screenWidth,
    position: 'absolute',
  },

  screen: {
    height: sizes.screenHeight,
    width: sizes.screenWidth,
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

  orangeBtnSmall: {
    backgroundColor: colors.appOrange,
    paddingBottom: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
  },

  orangeBtnText: {
    fontFamily: 'Medium',
    fontSize: fontSize.smallM,
    color: colors.white,
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

  waveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: sizes.screenHeight * 0.005,
  },

  codeContainer: {
    backgroundColor: colors.bodyGrey,
    paddingVertical: 2,
    paddingBottom: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },

  codeContainerOrange: {
    backgroundColor: colors.appOrange,
    paddingVertical: 2,
    paddingBottom: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },

  codeText: {
    fontFamily: 'Regular',
    fontSize: fontSize.smallM,
    color: colors.white,
  },

  aboutCode: {
    fontFamily: 'Regular',
    fontSize: fontSize.smallM,
    color: colors.disabledText,
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

  lowerBody: {
    flex: 1,
    backgroundColor: colors.bodyGrey,
    borderTopRightRadius: 26,
    borderTopLeftRadius: 26,
    paddingTop: sizes.screenHeight * 0.02,
    paddingHorizontal: sizes.screenWidth * 0.05,
    justifyContent: 'space-between',
    marginTop: sizes.screenHeight * 0.01,
    paddingBottom: sizes.screenHeight * 0.03,
  },

  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: sizes.screenHeight * 0.03,
    justifyContent: 'space-between',
  },

  backIconContainer: {
    top: 3,
    marginRight: sizes.screenWidth * 0.02,
  },

  backIcon: {
    height: 30,
    width: 30,
  },

  title: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.extraLarge,
    color: colors.white,
    fontWeight: '500',
  },

  downloadIconContainer: {},

  downloadIcon: {
    height: sizes.screenHeight * 0.03,
    width: sizes.screenWidth * 0.05,
    resizeMode: 'contain',
  },

  bg1: {
    backgroundColor: '#3F3F3F',
    height: sizes.screenHeight * 0.1,
    width: sizes.screenWidth * 0.78,
    position: 'absolute',
    alignSelf: 'center',
    top: sizes.screenHeight * 0.07,
    borderRadius: 26,
  },

  bg2: {
    backgroundColor: '#4A4A4A',
    height: sizes.screenHeight * 0.1,
    width: sizes.screenWidth * 0.84,
    position: 'absolute',
    alignSelf: 'center',
    top: sizes.screenHeight * 0.08,
    borderRadius: 26,
  },

  // body: {
  //   flex: 1,
  //   backgroundColor: '#595959',
  //   width: sizes.screenWidth * 0.9,
  //   borderRadius: 26,
  //   marginTop: sizes.screenHeight * 0.032,
  // },

  body: {
    backgroundColor: '#595959',
    width: sizes.screenWidth * 0.9,
    borderRadius: 26,
    position: 'absolute',
    top: sizes.screenHeight * 0.09,
    bottom: sizes.screenHeight * 0.03,
    alignSelf: 'center',
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.02,
    justifyContent: 'space-between',
  },

  heading: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.regular,
    color: colors.white,
    marginVertical: 4,
  },

  textWhiteSmall: {
    fontFamily: 'Regular',
    fontSize: fontSize.small,
    color: colors.white,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 2,
  },

  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
    maxWidth: sizes.screenWidth * 0.63,
  },

  tabContainerOrange: {
    backgroundColor: colors.appOrange,
    paddingVertical: 2,
    paddingBottom: 4,
    paddingHorizontal: 6,
    borderRadius: 5,
  },

  tabContainer: {
    backgroundColor: '#4E4E4E',
    paddingVertical: 2,
    paddingBottom: 4,
    paddingHorizontal: 6,
    borderRadius: 5,
  },

  tabText: {
    fontFamily: 'Regular',
    fontSize: fontSize.small,
    color: colors.white,
  },

  upperBody: {
    flex: 1,
    alignItems: 'center',
  },

  urgencyO: {
    height: sizes.screenHeight * 0.17,
    width: sizes.screenWidth * 0.7,
    resizeMode: 'contain',
  },

  hr: {
    height: 1,
    width: sizes.screenWidth * 0.82,
    backgroundColor: colors.disabledText,
    marginVertical: sizes.screenHeight * 0.01,
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
    width: sizes.screenWidth * 0.82,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginVertical: sizes.screenHeight * 0.01,
  },

  rowLeft: {},

  textWhiteLarge: {
    fontFamily: 'Medium',
    fontSize: fontSize.medium,
    color: colors.white,
  },

  hrSmall: {
    height: 1,
    width: sizes.screenWidth * 0.42,
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
    height: sizes.screenHeight * 0.2,
    width: sizes.screenWidth * 0.82,
    borderRadius: 16,
  },

  width: {
    width: sizes.screenWidth * 0.82,
    marginBottom: sizes.screenHeight * 0.06,
  },

  workshopCardContainer: {
    height: sizes.screenHeight * 0.2,
    backgroundColor: colors.appOrange,
    borderRadius: 20,
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginBottom: sizes.screenHeight * 0.01,
    width: sizes.screenWidth * 0.82,
  },

  workshopImageContainer: {
    height: sizes.screenHeight * 0.18,
    width: sizes.screenWidth * 0.4,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: sizes.screenWidth * 0.02,
  },

  nameHeading: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.regular,
    color: colors.white,
  },

  textWhiteWorkshop: {
    fontFamily: 'Medium',
    fontSize: fontSize.small,
    color: colors.white,
  },

  disabledTextWorkshop: {
    fontFamily: 'Medium',
    fontSize: fontSize.small,
    color: '#FFFFFF77',
  },

  partsRow: {
    width: sizes.screenWidth * 0.82,
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

  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.appOrange,
    height: sizes.screenHeight * 0.04,
    width: sizes.screenWidth * 0.18,
    borderRadius: 100,
    justifyContent: 'center',
  },

  textWhite2: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.smallM,
    color: colors.white,
    fontWeight: '500',
    bottom: 2,
  },

  nextIcon: {
    height: 12,
    width: 12,
    resizeMode: 'contain',
    marginLeft: 4,
  },
});

export default styles;
