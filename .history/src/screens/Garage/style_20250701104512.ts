import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services/utilities';
import SignUp from '../SignUp';

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
    height: sizes.screenHeight * 0.8,
    width: sizes.screenWidth,
    backgroundColor: 'white',
  },

  hrFull: {
    height: 1,
    width: sizes.screenWidth,
    backgroundColor: colors.disabledText,
    marginVertical: sizes.screenHeight * 0.03,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: sizes.screenWidth * 0.9,
    alignSelf: 'center',
    marginTop: sizes.screenHeight * 0.03,
    justifyContent: 'space-between',
  },

  backTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backIconContainer: {
    marginRight: sizes.screenWidth * 0.03,
  },

  backIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    top: 3,
  },

  headerTitle: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.extraLarge,
    color: colors.white,
    fontWeight: '500',
  },

  addVehicleBtn: {
    backgroundColor: colors.appOrange,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: sizes.screenWidth * 0.06,
    borderRadius: 8,
  },

  selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 8,
  },

  setSelectBtn: {
    backgroundColor: '#ffffff33',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    height: 24,
    width: sizes.screenWidth * 0.17,
  },

  setSelectedBtn: {
    backgroundColor: colors.appOrange,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    height: 24,
    width: sizes.screenWidth * 0.17,
  },

  textWhite: {
    fontFamily: 'Medium',
    fontSize: fontSize.regular,
    color: colors.white,
    fontWeight: '500',
    bottom: 2,
  },

  textWhiteSmall: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.small,
    color: colors.white,
    fontWeight: '500',
    bottom: 2,
  },

  textWhite2: {
    fontFamily: 'Medium',
    fontSize: fontSize.regular,
    color: colors.white,
    fontWeight: '500',
    maxWidth: sizes.screenWidth * 0.4,
  },

  sectionContainer: {
    width: sizes.screenWidth * 0.9,
    alignSelf: 'center',
  },

  vehicleCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: sizes.screenWidth * 0.9,
    justifyContent: 'space-between',
    // gap: sizes.screenWidth * 0.04,
  },

  vehicleContainer: {
    backgroundColor: colors.grey,
    borderRadius: 20,
    padding: sizes.screenWidth * 0.015,
    marginBottom: sizes.screenWidth * 0.04,
  },

  carImg: {
    height: sizes.screenHeight * 0.17,
    width: sizes.screenWidth * 0.4,
  },

  deleteIconContainer: {
    position: 'absolute',
    right: 6,
    top: 6,
    backgroundColor: '#ffffff66',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
  },

  deleteIcon: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },

  carImgContainer: {
    height: sizes.screenHeight * 0.17,
    width: sizes.screenWidth * 0.4,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 4,
  },

  uploadImgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadImgPreview: {
    height: sizes.screenHeight * 0.2,
    width: sizes.screenWidth * 0.9,
    resizeMode: 'contain',
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
    marginBottom: 4,
  },

  inputLabel: {
    fontFamily: 'Medium',
    fontSize: fontSize.medium,
    color: colors.white,
    marginTop: sizes.screenHeight * 0.01,
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
    marginBottom: 10,
  },

  inputIcon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },

  input: {
    fontFamily: 'Medium',
    fontSize: fontSize.medium,
    color: colors.disabledText,
    width: sizes.screenWidth * 0.68,
    marginLeft: 4,
  },

  transmissionRow: {
    width: sizes.screenWidth * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: sizes.screenHeight * 0.02,
    alignSelf: 'center',
  },

  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizes.screenWidth * 0.4,
  },

  selectIcon: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
    marginRight: 8,
  },

  selectorText: {
    fontFamily: 'Regular',
    fontSize: fontSize.regular,
    color: colors.white,
    // width: sizes.screenWidth * 0.25,
    // backgroundColor: colors.white,
  },

  separator: {
    backgroundColor: colors.disabledText,
    width: 1,
    height: sizes.screenHeight * 0.04,
  },

  errMsg: {
    fontFamily: 'Medium',
    fontSize: fontSize.regular,
    color: colors.appOrange,
    marginBottom: sizes.screenHeight * 0.01,
  },
});

export default styles;
