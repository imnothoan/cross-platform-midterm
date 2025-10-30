import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS, FONTS } from '../constants/theme';

// Import tất cả các màn hình
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import EditUserScreen from '../screens/EditUserScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          // Tùy chỉnh header chung cho phong cách Minecraft
          headerStyle: {
            backgroundColor: COLORS.woodBrown,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            ...FONTS.h3,
          },
          headerShadowVisible: false, // Bỏ shadow dưới header
        }}
      >
        <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} // Ẩn header cho màn hình Login
        />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Tao Tai Khoan' }} />
        <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen name="EditUser" component={EditUserScreen} options={{ title: 'Sua Thong Tin' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;