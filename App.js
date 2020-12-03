import React, { useEffect, useState } from 'react';
import {  StyleSheet, Text, View,Image,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font'
import AuthContext from "./context"

import Startnav from './MainNavigation';


export default function App() {
  let [citydata,setCity]=useState(["Bengaluru"])
  const [fontsLoaded] = useFonts({
    'montserrat':  require('./Montserrat-Regular.ttf'),})
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <AuthContext.Provider value={{citydata,setCity}}>

    <NavigationContainer>

  <Startnav/>
    </NavigationContainer>
    </AuthContext.Provider>
    );}}