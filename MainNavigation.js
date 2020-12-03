import 'react-native-gesture-handler';
import React, { Component,useState, useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import HomePage from './Homepage';
import AddCity from './AddCityScreen';
import Weatherpage from './WeatherPages'

export default function Startnav(){
  
  const Stack = createStackNavigator();
    return (
        
        
        

        <Stack.Navigator headerMode="none" initialRouteName="carousel" 
        >
           <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Addcity" component={AddCity} />
            <Stack.Screen name="carousel" component={Weatherpage} />
          </Stack.Navigator>
        
        
        
    );
}