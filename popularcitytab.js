import React, { useEffect, useState } from 'react';
import {  StyleSheet, Text, View,Image,ScrollView, TouchableOpacity } from 'react-native';

export default function PopularcityTab({city,onPress}){
    return(
        <TouchableOpacity activeOpacity={0.4} onPress={onPress}>
        <View style={styles.popularcitytab}>
        <Text style={styles.textstyle}>
        {city}
        </Text>
      </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    popularcitytab:{
        backgroundColor:"#cdcdcd",
        padding:8,
        borderRadius:15,
        margin:5,
        alignItems:"center",
        justifyContent:"center",
      },
    textstyle:{
        fontFamily:"montserrat"
    },
})