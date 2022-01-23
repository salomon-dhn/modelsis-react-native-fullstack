import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenAddProduct from '../screen/ScreenAddProduct';
import ScreenAddType from '../screen/ScreenAddType';
import ScreenProduct from '../screen/ScreenProduct';
import ProductDetails from '../screen/ProductDetails';
import Intro from '../screen/Intro';
import Login from '../screen/Login';
import Icon from 'react-native-vector-icons/Ionicons';
const Stack = createNativeStackNavigator();
const ProductStack = createNativeStackNavigator();
const BarTabNavigator = createBottomTabNavigator();

function BottomNavigator() {
  return (
    <BarTabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'ScreenProductNavigation') {
            iconName = 'cube';
          } else if (route.name === 'ScreenAddProduct') {
            iconName = focused ? 'md-add-circle' : 'md-add-circle-outline';
          } else if (route.name === 'ScreenAddType') {
            iconName = 'phone-portrait';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#12ad91',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [
          {
            "display": "flex"
          },
          null
        ]
      })}
    >
      <BarTabNavigator.Screen name="ScreenProductNavigation" component={ScreenProductNavigation} options={{ title: 'List of Product' }} />
      <BarTabNavigator.Screen name="ScreenAddProduct" component={ScreenAddProduct} options={{ title: 'Add a product' }} />
      <BarTabNavigator.Screen name='ScreenAddType' component={ScreenAddType} options={{ title: 'Add a type', }} />
    </BarTabNavigator.Navigator>
  );
}

const ScreenProductNavigation = () => {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen
        name="ScreenProduct"
        component={ScreenProduct}
        options={{ headerShown: false }}
      />
      <ProductStack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ headerTitle: 'Détails', headerShown: true }}
      />
    </ProductStack.Navigator>
  );
}

export function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}


export default Navigation;