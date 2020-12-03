
import React, {useState, useContext,} from 'react';
import {  StyleSheet, Text, View,Image,ScrollView, Button,ToastAndroid ,FlatList,Dimensions,TouchableOpacity} from 'react-native';

import { EvilIcons } from '@expo/vector-icons';
import { Sae } from 'react-native-textinput-effects';
import PopularcityTab from "./popularcitytab"
import AuthContext from './context'
import getCity from './getCity'


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];


export default function AddCity({navigation}) {
  let [citiesdata,setData]=useState([])
  let authContext=useContext(AuthContext);
  const [value, onChangeText] = useState();
  const Item = ({ title }) => (
  <TouchableOpacity 
  style={{width:"90%",alignSelf:"center",backgroundColor:"#cdcdcd",padding:25,margin:10,borderRadius:0.9*deviceWidth/2}}
  onPress={()=>updateCity(title.substr(0, title.indexOf(',')))}>
    <Text style={{fontFamily:"montserrat",fontSize:18}}>{title}</Text>
  </TouchableOpacity>
);
  function updateCity(city){
    if(authContext.citydata.includes(city)){
      ToastAndroid.showWithGravityAndOffset("City already added",ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      500) 
      return}
    else{
    authContext.setCity([...authContext.citydata.concat(city)])
    console.log(authContext.citydata)
    navigation.navigate("carousel")
  }}
  function fetchcities(city){
    getCity(city).then(cities=>{
      setData(cities)
      console.log(citiesdata)
    }).catch(()=>console.log("error") )
  }
  
const renderItem = ({ item }) => (
  <Item title={item.description} />
);

  return (
    
  <FlatList
  style={{backgroundColor:"#fff"}}
        data={citiesdata.predictions}
        renderItem={renderItem}
        keyExtractor={item => item.place_id}
        ListHeaderComponent={<ScrollView scrollEnabled={false} nestedScrollEnabled={true} contentContainerStyle={{flex:1}}>
   <View style={styles.addCityPage}>
     <View style={{height:"10%",width:"95%",marginTop:35,alignSelf:"center"}}>
     <Sae
    label={'Search '}
    iconClass={EvilIcons}
    iconName={'search'}
    iconColor={'black'}
    inputPadding={16}
    labelHeight={24}
    inputStyle={{color:"gray",fontFamily:"montserrat"}}
    // active border height
    borderHeight={1.5}
    // TextInput props
    returnKeyType="search"
    labelStyle={{color:"gray",fontFamily:"montserrat"}}
    autoCapitalize={'none'}
    autoCorrect={false}
    onChangeText={text => onChangeText(text)}
    value={value}
    onSubmitEditing={()=>fetchcities(value)}
  />
  <Text style={{marginBottom:20,marginTop:30,fontFamily:"montserrat",color:"gray"}}>
    Popular Cities
  </Text>
  <View style={{flexDirection:"row",flexWrap:"wrap",marginBottom:20}}>
    <PopularcityTab city="Bengaluru" onPress={()=>updateCity("Bengaluru")}/>
    <PopularcityTab city="Mumbai" onPress={()=>updateCity("Mumbai")}/>
    <PopularcityTab city="Chennai" onPress={()=>updateCity("Chennai")}/>
    <PopularcityTab city="Kolkata" onPress={()=>updateCity("Kolkata")}/>
    <PopularcityTab city="Hyderabad" onPress={()=>updateCity("Hyderabad")}/>
    <PopularcityTab city="Ahmedabad" onPress={()=>updateCity("Ahmedabad")}/>
    <PopularcityTab city="Jaipur" onPress={()=>updateCity("Jaipur")}/>
    <PopularcityTab city="Pune" onPress={()=>updateCity("Pune")}/>
    <PopularcityTab city="New Delhi" onPress={()=>updateCity("New Delhi")}/>
    <PopularcityTab city="Chandigarh" onPress={()=>updateCity("Chandigarh")}/>
    <PopularcityTab city="Agra" onPress={()=>updateCity("Agra")}/>
    <PopularcityTab city="Lucknow" onPress={()=>updateCity("Lucknow")}/>
    <PopularcityTab city="Patna" onPress={()=>updateCity("Patna")}/>
  </View>
     </View>
   </View>
    </ScrollView>}
      />
    );}
    
    
let deviceHeight = Dimensions.get('window').height
let deviceWidth = Dimensions.get('window').width

  const styles = StyleSheet.create({
    addCityPage:{
      flex:1,
      backgroundColor:"#fff"

    },
    
  })