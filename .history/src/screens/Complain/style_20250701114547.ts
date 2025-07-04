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

  title: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.large,
    color: colors.white,
    fontWeight: '500',
    marginBottom: sizes.screenHeight * 0.02,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizes.screenHeight * 0.03,
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

  disabledText: {
    fontFamily: 'Regular',
    fontSize: fontSize.smallM,
    color: colors.disabledText,
  },

  comment: {
    fontFamily: 'Regular',
    fontSize: fontSize.smallM,
    color: colors.white,
    marginTop: 5,
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

  bottomBtnContainer: {
    position: 'absolute',
    bottom: sizes.screenHeight * 0.05,
    alignSelf: 'center',
  },

  inputGroup: {
    marginBottom: 16,
  },

  inputLabel: {
    fontFamily: 'Regular',
    fontSize: fontSize.medium,
    color: colors.white,
    marginBottom: 6,
    marginLeft: 4,
  },

  input: {
    fontFamily: 'Regular',
    backgroundColor: colors.inputBackground || '#2a2a2a',
    color: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: fontSize.smallM,
  },
});

export default styles;
