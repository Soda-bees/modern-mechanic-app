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

  body: {
    height: sizes.screenHeight * 0.84,
    width: sizes.screenWidth,
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
    justifyContent: 'space-between',
  },

  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizes.screenHeight * 0.03,
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

  textWhiteSmall: {
    fontFamily: 'Medium',
    fontSize: fontSize.regular,
    color: colors.white,
    marginBottom: sizes.screenHeight * 0.03,
  },

  gifContainer: {
    height: sizes.screenHeight * 0.18,
    width: sizes.screenWidth * 0.9,
    backgroundColor: colors.disabledBg,
    borderRadius: 20,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: sizes.screenHeight * 0.02,
  },

  bottomRow2: {
    marginBottom: sizes.screenHeight * 0.02,
  },

  bottomMeter: {
    height: sizes.screenHeight * 0.12,
    width: sizes.screenWidth * 0.38,
    resizeMode: 'contain',
  },

  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.disabledBg,
    marginTop: sizes.screenHeight * 0.02,
    alignSelf: 'flex-end',
    height: sizes.screenHeight * 0.055,
    width: sizes.screenWidth * 0.3,
    borderRadius: 100,
    justifyContent: 'center',
    marginBottom: sizes.screenHeight * 0.02,
  },

  textWhite2: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.regular,
    color: colors.white,
    fontWeight: '500',
    bottom: 2,
  },

  nextIcon: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
    marginLeft: 4,
  },

  textArea: {
    height: sizes.screenHeight * 0.18,
    width: sizes.screenWidth * 0.9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.disabledBg,
    paddingHorizontal: sizes.screenWidth * 0.02,
  },

  textAreaInput: {
    fontFamily: 'Medium',
    fontSize: fontSize.regular,
    color: colors.disabledText,
  },

  deviceItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.disabledText,
    flexDirection: 'column',
    marginVertical: 5,
    backgroundColor: colors.cardBackground,
    borderRadius: 5,
  },
});

export default styles;
