import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Platform, StyleSheet} from 'react-native';
import Landing from '../../../screens/Landing';
import Home from '../../../screens/Home';
import LandingNext from '../../../screens/LandingNext';
import images from '../../utilities/images';
import {colors, fontSize, sizes} from '../../utilities';
import DashLights from '../../../screens/DashLights';
import Feedback from '../../../screens/Feedback';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  const [iconSets] = useState({
    Scan: {focused: images.bt1f, unfocused: images.bt1},
    Workshops: {focused: images.bt2f, unfocused: images.bt2},
    DashLights: {focused: images.bt3f, unfocused: images.bt3},
    Feedback: {focused: images.bt4f, unfocused: images.bt4},
  });

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          const icon = focused
            ? iconSets[route.name as keyof typeof iconSets].focused
            : iconSets[route.name as keyof typeof iconSets].unfocused;
          return <Image source={icon} style={styles.icon} />;
        },
        headerShown: false,
        tabBarStyle: {
          borderColor: '#444444',
          backgroundColor: '#444444',
          width: sizes.screenWidth,
          height: sizes.screenHeight * 0.08,
          paddingBottom:
            Platform.OS === 'android'
              ? sizes.screenHeight * 0.015
              : sizes.screenHeight * 0.025,
        },
        tabBarLabelStyle: {
          fontFamily: 'Medium',
          fontSize: fontSize.small,
          fontWeight: '400',
        },
        tabBarActiveTintColor: colors.appOrange,
        tabBarInactiveTintColor: '#A8A8A8',
      })}>
      <Tab.Screen
        name="Scan"
        component={Home}
        options={{tabBarLabel: 'Scan'}}
      />
      <Tab.Screen
        name="Workshops"
        component={LandingNext}
        options={{tabBarLabel: 'Workshops'}}
      />
      <Tab.Screen
        name="DashLights"
        component={DashLights}
        options={{tabBarLabel: 'Dash Lights'}}
      />
      <Tab.Screen
        name="Feedback"
        component={Feedback}
        options={{tabBarLabel: 'Feedback'}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 19,
    width: 19,
  },
  headerTitle: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.extraLarge,
    color: colors.white,
    fontWeight: '500',
  },
});

export default BottomTabNavigator;
