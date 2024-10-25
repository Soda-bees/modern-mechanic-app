import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import images from '../../services/utilities/images'; // Assuming you have the images
import {colors, fontSize, sizes} from '../../services/utilities';
import {useNavigation} from '@react-navigation/native';

interface HeaderProps {
  goBack?: boolean;
  title: string;
}

const Header: React.FC<HeaderProps> = ({goBack, title}): JSX.Element => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      {goBack ? (
        <TouchableOpacity
          onPress={handleGoBack}
          style={styles.backIconContainer}>
          <Image style={styles.backIcon} source={images.backIcon} />
        </TouchableOpacity>
      ) : null}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: sizes.screenWidth * 0.9,
    alignSelf: 'center',
    marginTop: sizes.screenHeight * 0.03,
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
});

export default Header;
