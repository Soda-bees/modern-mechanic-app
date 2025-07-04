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
    // justifyContent: 'space-between',
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: sizes.screenHeight * 0.02,
    backgroundColor: '#444444',
    padding: 8,
    borderRadius: 16,
  },

  historyCarImg: {
    height: sizes.screenWidth * 0.18,
    width: sizes.screenWidth * 0.18,
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
    fontSize: fontSize.small,
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
});

export default styles;
