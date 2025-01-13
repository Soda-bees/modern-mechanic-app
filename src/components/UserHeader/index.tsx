import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import images from '../../services/utilities/images'; // Assuming you have the images
import {colors, fontSize, sizes} from '../../services/utilities';
import {useNavigation} from '@react-navigation/native';

interface UserHeaderProps {
  onPress: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({onPress}): JSX.Element => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>
        Modern
        <Text style={styles.headerTitleOrange}> Mechanic</Text>
      </Text>

      <View style={styles.headerRightSection}>
        {/* <TouchableOpacity>
          <Image source={images.settingsIcon} style={styles.settingsIcon} />
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.userIconContainer} onPress={onPress}>
          <Image source={images.userIcon} style={styles.userIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

  headerRightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  settingsIcon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },

  userIconContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 100,
    marginLeft: sizes.screenWidth * 0.05,
  },

  userIcon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
});

export default UserHeader;
