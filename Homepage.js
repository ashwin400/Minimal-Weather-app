import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState,useContext } from 'react';
import {  StyleSheet, Text, View,Modal,Image,TouchableOpacity, Button,RefreshControl,ScrollView,Dimensions ,TouchableWithoutFeedback, Pressable} from 'react-native';

import AuthContext from './context'
import { AntDesign } from '@expo/vector-icons';
import getWeather from "./getWeather"
import LottieView from 'lottie-react-native';


export default function HomePage({navigation,city}) {
  let authContext=useContext(AuthContext);
  const [refresh,setRefresh]=useState(false)
  const [timeofday,setTimeOfDay]=useState(0)
  
  let [weatherdata,setData]=useState([])
  const [isBusy, setBusy] = useState(true)
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var d = new Date();
  var dayName = days[d.getDay()];
  var curHr = d.getHours();
  const [modalVisible, setModalVisible] = useState(false);
  
  const toggleModal = () => {
  setModalVisible(!modalVisible); 
  };

  useEffect(()=>{
  fetchweather()
  if (curHr < 12) {
      setTimeOfDay("Morning")
    } else if (curHr < 16) {
      setTimeOfDay("Afternooon")
    } else if (curHr < 20) {
      setTimeOfDay("Evening")
    }else {
      setTimeOfDay("Night")
    }
  },[]);
  
  function fetchweather(){
    getWeather(city).then(weather=>{
      setData(weather)
      setBusy(false)
      setRefresh(false)
    }).catch(()=>setRefresh(false)) 
  }

  function handlerefresh(){
    setRefresh(true)
    fetchweather()
    console.log("refreshed")
  }

  

  if(isBusy){
    return(
      <View style={{alignItems:"center",justifyContent:"flex-end",flex:1}}>
            <LottieView source={require('./Weathericons/1173-sun-burst-weather-icon.json')} autoPlay loop />
            <Text style={{marginBottom:150,fontSize:20,fontFamily:"montserrat",alignSelf:"center",}}>
              Fetching Weather...
            </Text>
      </View>)
  }
  else{
    return (
      <ScrollView nestedScrollEnabled={true} contentContainerStyle={{alignItems:"center",flex:1,}} style={styles.container}  refreshControl={
      <RefreshControl  refreshing={refresh} onRefresh={handlerefresh} /> }>
      <View style={styles.weathertype}>
      <Text style={{fontSize:deviceHeight>800?35:27,fontFamily:"montserrat",marginBottom:20}}>
      {weatherdata.current.condition.text}
      </Text>
        <Image style={{height:deviceHeight>800?"70%":"60%",width:"90%",aspectRatio:1}} source={weatherimage[(weatherdata.current.condition.text).split(" ").join("")].image}/>
      </View>
      <View style={styles.temp}> 
      <View style={{flexDirection:"row"}}>
      <View style={{alignItems:"center"}}>
      <Text style={{fontSize:deviceHeight>800?80:68,marginLeft:20,fontFamily:"montserrat"}}>
        {parseInt(weatherdata.current.temp_c)}°
      </Text>
      <View style={{flexDirection:"row",width:100,height:"10%",justifyContent:"space-around"}}>
      <View style={{flexDirection:"row",alignItems:"center"}}>
      <AntDesign name="caretdown" size={14} color="black" />
      <Text style={{fontSize:deviceHeight>800?17:15,fontFamily:"montserrat"}}>
      {parseInt(weatherdata.forecast.forecastday[0].day.mintemp_c)}°
      </Text>
       </View>
      <View style={{flexDirection:"row",alignItems:"center"}}>
      <AntDesign name="caretup" size={14} color="black" />
      <Text style={{fontSize:deviceHeight>800?17:15,fontFamily:"montserrat"}}>
      {parseInt(weatherdata.forecast.forecastday[0].day.maxtemp_c)}°
      </Text>
      </View>
      </View>
      </View>
      </View>
      <View style={styles.details}>
      <Text style={{fontSize:deviceHeight>800?20:17,fontFamily:"montserrat"}}>
        Details
      </Text>
      <View style={{borderBottomColor: 'black',borderBottomWidth: 1,width:"80%"}}/>
      <View style={styles.detailscontent}> 
      <Text style={{fontFamily:"montserrat",fontSize:deviceHeight>800?14:12}}>
      Feels like
      </Text>
      <Text style={{fontFamily:"montserrat",fontSize:deviceHeight>800?14:12}}>
      {parseInt(weatherdata.current.feelslike_c)}°
      </Text>
      </View>
      <View style={styles.detailscontent}>
      <Text style={{fontFamily:"montserrat",fontSize:deviceHeight>800?14:12}}>
      Humidity
      </Text>
      <Text style={{fontFamily:"montserrat",fontSize:deviceHeight>800?14:12}}>
      {weatherdata.current.humidity}%
      </Text>
      </View>
      <View style={styles.detailscontent}>
      <Text style={{fontFamily:"montserrat",fontSize:deviceHeight>800?14:12}}>
      Wind
      </Text>
      <Text style={{fontFamily:"montserrat",fontSize:deviceHeight>800?14:12}}>
      {weatherdata.current.wind_kph} Km/h
      </Text>
      </View>
      <View style={styles.detailscontent}>
      <Text style={{fontFamily:"montserrat",fontSize:deviceHeight>800?14:12}}>
      Visibility
      </Text>
      <Text style={{fontFamily:"montserrat",fontSize:deviceHeight>800?14:12}}>
      {weatherdata.current.vis_km} km
      </Text>
      </View>
      </View>
      </View>
      <StatusBar style="auto" />
        
    </ScrollView>
  );
}}

const weatherimage = {
  Rain: {
    image:require('./Weathericons/rain.png')
  },
  Sunny: {
    image:require('./Weathericons/sun.png')
  },
  Thunderstorm: {
    image: require('./Weathericons/storm.png')
  },
  Clouds: {
    image:require('./Weathericons/Partlycloudy.png')
  },
 Partlycloudy: {
  image: require('./Weathericons/cloudone.png')
  },
  Moderaterainattimes: {
    image: require('./Weathericons/cloudone.png')
    },
    Overcast: {
      image: require('./Weathericons/cloudone.png')
      },

  Snow: {
    image: require('./Weathericons/snowflake.png')
  },
  Drizzle: {
    image: require('./Weathericons/Partlycloudy.png')
  },
  Lightrain: {
    image: require('./Weathericons/Partlycloudy.png')
  },
  Haze: {
    image: require('./Weathericons/Partlycloudy.png')
  },
  Mist: {
    image: require('./Weathericons/Partlycloudy.png')
  }
};

let deviceHeight = Dimensions.get('window').height
let deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  weathertype:{
    marginTop:10,
    width:"95%",
    height:"60%",
    alignItems:"center",
  },
  temp:{
    height:"18%",
    width:"95%",
    marginTop:15,
    flexDirection:"row",
    justifyContent:"center",
  },
  details:{
    width:"50%",
    height:"90%",
    marginLeft:20,
    backgroundColor:"white",
    alignItems:"center"
  },
  detailscontent:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:"80%",
    marginTop:5
  },
 
 
    
  
});
