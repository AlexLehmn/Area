import React from 'react';
import {Text, ScrollView} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ActionScreen from '../screens/ActionScreen';
import ReactionScreen from '../screens/ReactionScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Actions" component={ActionScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Reactions" component={ReactionScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;