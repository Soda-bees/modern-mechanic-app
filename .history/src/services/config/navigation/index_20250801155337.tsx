import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Landing from '../../../screens/Landing';
import Login from '../../../screens/Login';
import ForgotPassword from '../../../screens/ForgotPassword';
import Otp from '../../../screens/Otp';
import ResetPassword from '../../../screens/ResetPassword';
import LandingNext from '../../../screens/LandingNext';
import SignUp from '../../../screens/SignUp';
import AddVehicle from '../../../screens/AddVehicle';
import Garage from '../../../screens/Garage';
import EditVehicle from '../../../screens/EditVehicle';
import BottomTabNavigator from '../BottomTabNavigator';
import Scann from '../../../screens/Scann';
import Review from '../../../screens/Review';
import WorkshopDetails from '../../../screens/WorkshopDetails';
import ScanResult from '../../../screens/ScanResult';
import ScanHistory from '../../../screens/ScanHistory';
import DetailedHistory from '../../../screens/DetailedHistory';
import AddUserVehicle from '../../../screens/AddUserVehicle';
import BLEScanScreen from '../../../screens/BLEScanScreen';
import {useSelector} from 'react-redux';
import {selectAuthToken} from '../../../store/authSlice';
import Profile from '../../../screens/Profile';
import EditProfile from '../../../screens/EditProfile';
import Security from '../../../screens/Security';
import ScanResultDemo from '../../../screens/ScanResultDemo';
import {DTCResponse, ProcessDtcsResponse} from '../API';
import Complain from '../../../screens/Complain';
import AiAssistantChat from '../../../screens/AiAssistantChat';
import LiveData from '../../../screens/LiveData';
import Query from '../../../screens/Query';
import DetailedQuery from '../../../screens/DetailedQuery';

export type VehicleDataType = {
  make: string;
  model: string;
  year: number;
  image: any;
  transmission: string;
  id: number;
};

export type UserDataType = {
  name: string;
  email: string;
  zipCode: number;
  password: string;
  cars?: VehicleDataType[];
};

export type RootStackParamList = {
  Landing: any;
  LandingNext: any;
  Login: any;
  ForgotPassword: any;
  Otp: {email: string};
  ResetPassword: {email: string};
  SignUp: any;
  AddVehicle: {userData?: UserDataType};
  Garage: any;
  EditVehicle: {vehicleData: VehicleDataType};
  BottomTabNavigator: any;
  Scann: any;
  Review: any;
  WorkshopDetails: {id: number};
  ScanResult: any;
  ScanHistory: any;
  DetailedHistory: {id: number};
  AddUserVehicle: any;
  BLEScanScreen: any;
  Profile: any;
  EditProfile: any;
  Security: any;
  ScanResultDemo: any;
  Complain: {id: number};
  AiAssistantChat: any;
  LiveData: any;
  Query: {id: number};
  DetailedQuery: {id: number};
};

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator: React.FC = (): JSX.Element => {
  const authToken = useSelector(selectAuthToken);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!authToken ? (
          <>
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="LandingNext" component={LandingNext} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Otp" component={Otp} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="AddVehicle" component={AddVehicle} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="BottomTabNavigator"
              component={BottomTabNavigator}
            />
            <Stack.Screen name="Garage" component={Garage} />
            <Stack.Screen name="EditVehicle" component={EditVehicle} />
            <Stack.Screen name="Scann" component={Scann} />
            <Stack.Screen name="Review" component={Review} />
            <Stack.Screen name="WorkshopDetails" component={WorkshopDetails} />
            <Stack.Screen name="ScanResult" component={ScanResult} />
            <Stack.Screen name="ScanHistory" component={ScanHistory} />
            <Stack.Screen name="DetailedHistory" component={DetailedHistory} />
            <Stack.Screen name="AddUserVehicle" component={AddUserVehicle} />
            <Stack.Screen name="BLEScanScreen" component={BLEScanScreen} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Security" component={Security} />
            <Stack.Screen name="ScanResultDemo" component={ScanResultDemo} />
            <Stack.Screen name="Complain" component={Complain} />
            <Stack.Screen name="LiveData" component={LiveData} />
            <Stack.Screen name="AiAssistantChat" component={AiAssistantChat} />
            <Stack.Screen name="Query" component={Query} />
            <Stack.Screen name="DetailedQuery" component={DetailedQuery} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

{
  /* <NavigationContainer>
<Stack.Navigator
  screenOptions={{headerShown: false}}
  initialRouteName={authToken ? 'BottomTabNavigator' : 'Landing'}>
  <Stack.Screen name="Landing" component={Landing} />
  <Stack.Screen
    name="BottomTabNavigator"
    component={BottomTabNavigator}
  />
  <Stack.Screen name="LandingNext" component={LandingNext} />
  <Stack.Screen name="Login" component={Login} />
  <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  <Stack.Screen name="Otp" component={Otp} />
  <Stack.Screen name="ResetPassword" component={ResetPassword} />
  <Stack.Screen name="SignUp" component={SignUp} />
  <Stack.Screen name="AddVehicle" component={AddVehicle} />
  <Stack.Screen name="Garage" component={Garage} />
  <Stack.Screen name="EditVehicle" component={EditVehicle} />
  <Stack.Screen name="Scann" component={Scann} />
  <Stack.Screen name="Review" component={Review} />
  <Stack.Screen name="WorkshopDetails" component={WorkshopDetails} />
  <Stack.Screen name="ScanResult" component={ScanResult} />
  <Stack.Screen name="ScanHistory" component={ScanHistory} />
  <Stack.Screen name="DetailedHistory" component={DetailedHistory} />
  <Stack.Screen name="AddUserVehicle" component={AddUserVehicle} />
  <Stack.Screen name="BLEScanScreen" component={BLEScanScreen} />
</Stack.Navigator>
</NavigationContainer> */
}

// old approach

{
  /* <NavigationContainer>
{!authToken ? (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName={'Landing'}>
    <Stack.Screen name="Landing" component={Landing} />
    <Stack.Screen name="LandingNext" component={LandingNext} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="Otp" component={Otp} />
    <Stack.Screen name="ResetPassword" component={ResetPassword} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="AddVehicle" component={AddVehicle} />
  </Stack.Navigator>
) : (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName={'BottomTabNavigator'}>
    <Stack.Screen
      name="BottomTabNavigator"
      component={BottomTabNavigator}
    />
    <Stack.Screen name="Garage" component={Garage} />
    <Stack.Screen name="EditVehicle" component={EditVehicle} />
    <Stack.Screen name="Scann" component={Scann} />
    <Stack.Screen name="Review" component={Review} />
    <Stack.Screen name="WorkshopDetails" component={WorkshopDetails} />
    <Stack.Screen name="ScanResult" component={ScanResult} />
    <Stack.Screen name="ScanHistory" component={ScanHistory} />
    <Stack.Screen name="DetailedHistory" component={DetailedHistory} />
    <Stack.Screen name="AddUserVehicle" component={AddUserVehicle} />
    <Stack.Screen name="BLEScanScreen" component={BLEScanScreen} />
  </Stack.Navigator>
)}
</NavigationContainer> */
}
