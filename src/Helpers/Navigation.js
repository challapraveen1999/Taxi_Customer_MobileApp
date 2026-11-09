import React from 'react';
import { createNativeStackNavigator }
    from '@react-navigation/native-stack';

import SplashScreen from '../Screens/SplashScreen'
import OnboardingScreen from '../Screens/OnboardingScreen';
import SignIn from '../Screens/SignIn';
import OTPVerificationScreen from '../Screens/OTPVerificationScreen';
import BottomTabs from '../Components/BottomTabs';
import LocationSelection from '../Screens/LocationSelection';
import RideSelection from '../Screens/RideSelection';
import RideAccept from '../Screens/RideAccept';
import DriverArriving from '../Screens/DriverArriving';
import ChatScreen from '../Screens/ChatScreen';
import Notifications from '../Screens/Notifications'

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{headerShown: false,}}>
            <Stack.Screen name="SplashScreen" component={SplashScreen}/>
            <Stack.Screen name="OnboardingScreen" component={OnboardingScreen}/>
            <Stack.Screen name="SignIn" component={SignIn}/>
            <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen}/>
            <Stack.Screen name="BottomTabs" component={BottomTabs}/>
            <Stack.Screen name="LocationSelection" component={LocationSelection}/>
            <Stack.Screen name="RideSelection" component={RideSelection}/>
            <Stack.Screen name="RideAccept" component={RideAccept}/>
            <Stack.Screen name="DriverArriving" component={DriverArriving}/>
            <Stack.Screen name="ChatScreen" component={ChatScreen}/>
            <Stack.Screen name="Notifications" component={Notifications}/>
        </Stack.Navigator>
    );
};

export default StackNavigator;