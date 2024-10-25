import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Landing from '../../../screens/Landing';
import LandingNext from '../../../screens/LandingNext';
import images from '../../utilities/images';
import {Image, Platform, StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../utilities';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  const [bt1, setBt1] = useState<any>(images.bt1);
  const [bt2, setBt2] = useState<any>(images.bt2);
  const [bt3, setBt3] = useState<any>(images.bt3);
  const [bt4, setBt4] = useState<any>(images.bt4);
  const [bt1f, setBt1f] = useState<any>(images.bt1f);
  const [bt2f, setBt2f] = useState<any>(images.bt2f);
  const [bt3f, setBt3f] = useState<any>(images.bt3f);
  const [bt4f, setBt4f] = useState<any>(images.bt4f);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          if (route.name === 'Landing') {
            iconName = focused ? 'qr-code' : 'qr-code-outline';
          } else if (route.name === 'LandingNext') {
            iconName = focused ? 'construct' : 'construct-outline';
          } else {
            iconName = 'ellipse';
          }

          // Render icon
          return <Image source={images.bg} style={styles.icon} />;
        },
        headerShown: false,
        tabBarStyle: {
          borderBlockColor: '#444444',
          backgroundColor: '#444444',
          width: sizes.screenWidth,
          height: sizes.screenHeight * 0.08,
          paddingBottom:
            Platform.OS == 'android'
              ? sizes.screenHeight * 0.015
              : sizes.screenHeight * 0.025,
        },

        tabBarActiveTintColor: colors.appOrange,
        tabBarInactiveTintColor: '#A8A8A8',
      })}>
      <Tab.Screen
        name="Scan"
        component={Landing}
        options={{tabBarLabel: 'Scan'}}
      />
      <Tab.Screen
        name="Workshops"
        component={LandingNext}
        options={{tabBarLabel: 'Workshops'}}
      />
      <Tab.Screen
        name="Dash Lights"
        component={Landing}
        options={{tabBarLabel: 'Dash Lights'}}
      />
      <Tab.Screen
        name="Feedback"
        component={LandingNext}
        options={{tabBarLabel: 'Feedback'}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 16,
    width: 16,
  },

  headerTitle: {
    fontFamily: 'SemiBold',
    fontSize: fontSize.extraLarge,
    color: colors.white,
    fontWeight: '500',
  },
});

export default BottomTabNavigator;
