import 'react-native-gesture-handler';
import React, { Component,useState,useContext,useEffect } from 'react';
import { Dimensions,SafeAreaView,StyleSheet, Text, View,Image, TouchableOpacity,FlatList,StatusBar,Animated, Button, ToastAndroid, } from 'react-native';
import Carousel  from 'react-native-snap-carousel';
import Dots from 'react-native-dots-pagination';
import * as Location from 'expo-location';
import getcoordWeather from "./getWeatherlocation"
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import getWeather from "./getWeather"
import HomePage from './Homepage';
import AuthContext from './context'
import { AntDesign } from '@expo/vector-icons';


export default function Weatherpage({navigation}){
  let authContext=useContext(AuthContext);
  let citydata=authContext.citydata
  const [timeofday,setTimeOfDay]=useState(0)
  const [active ,setActive]=useState(0);
  const [dactive ,setdActive]=useState(0);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let [weatherdata,setData]=useState([])
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var d = new Date();
  var dayName = days[d.getDay()];
  var curHr = d.getHours();
  
  useEffect(()=>{
    (async () => {
      fetchweather()
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }else{
        try{
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);}
          catch(error){
            ToastAndroid.show("Please turn on Location",ToastAndroid.SHORT)
          }
        }
        if (curHr < 12) {
          setTimeOfDay("Morning")
        } else if (curHr < 16) {
          setTimeOfDay("Afternooon")
        } else if (curHr < 20) {
          setTimeOfDay("Evening")
        }else {
          setTimeOfDay("Night")
        }
      })();
    },[]);
    
    function fetchweather(){
      getWeather(authContext.citydata[active]).then(weather=>{
        setData(weather)
        
      }).catch(()=>console.log("error")) 
    }
    const renderCard = ({ item }) => (  
        <HomePage
        city={item}
        
         />)
         const renderdCard = ({ item }) => {  
           if(weatherdata.location.name!=authContext.citydata[active]){
             fetchweather()
           }
           if(item=="one" && weatherdata.forecast!=undefined ) {return(
             <View style={{height:90,alignItems:"center",justifyContent:"center"}}>
        <Text style={{fontSize:deviceHeight>800?30:25,paddingTop:15,fontFamily:"montserrat",alignSelf:"center"}}>
          {dayName}
          </Text>
          <Text style={{fontSize:deviceHeight>800?15:12,fontFamily:"montserrat",paddingBottom:15}}>
             {weatherdata.forecast.forecastday[0].day.condition.text}
      </Text>
          </View>
          )}
          else{
            
            if(weatherdata.forecast!=undefined){
            
            return(
              
              <View style={{backgroundColor:"white",flexDirection:"row",alignSelf:"center",flex:1,}}>
              <View style={{marginRight:20,justifyContent:"flex-end",alignItems:"center",marginBottom:10}}>
              <View style={{flexDirection:"row",alignItems:"center"}}>
              <AntDesign name="caretdown" size={10} color="black" />
              <Text style={{fontFamily:"montserrat",marginRight:5,fontSize:deviceHeight>800?14:12}}>
                {parseInt(weatherdata.forecast.forecastday[0].day.mintemp_c)}°
              </Text>
              <AntDesign name="caretup" size={10} color="black" />
              <Text style={{fontFamily:"montserrat",fontSize:deviceHeight>800?14:12}}>
                {parseInt(weatherdata.forecast.forecastday[0].day.maxtemp_c)}°
              </Text>
              </View>
                <Image style={{height:deviceHeight>800?50:40,width:deviceHeight>800?50:40,}} source={{uri:'http:'+weatherdata.forecast.forecastday[0].day.condition.icon}}/>
                <Text style={{fontFamily:"montserrat",fontSize:deviceHeight>800?14:12}}>
                {dayName}
                </Text>
              </View>
              <View style={{justifyContent:"flex-end",alignItems:"center",marginBottom:10}}>
              <View style={{flexDirection:"row",alignItems:"center"}}>
              <AntDesign name="caretdown" size={10} color="black" />
              <Text style={{fontFamily:"montserrat",marginRight:5,fontSize:deviceHeight>800?14:12}}>
                {parseInt(weatherdata.forecast.forecastday[1].day.mintemp_c)}°
              </Text>
              <AntDesign name="caretup" size={10} color="black" />
              <Text style={{fontFamily:"montserrat",fontSize:deviceHeight>800?14:12}}>
                {parseInt(weatherdata.forecast.forecastday[1].day.maxtemp_c)}°
              </Text>
              </View>
              <Image style={{height:deviceHeight>800?50:40,width:deviceHeight>800?50:40,}} source={{uri:'http:'+weatherdata.forecast.forecastday[1].day.condition.icon}}/>
                <Text style={{fontFamily:"montserrat",fontSize:deviceHeight>800?14:12}}>
                {days[days.indexOf(dayName)+1]}
                </Text>
              </View>
              <View style={{marginLeft:20,marginBottom:10,justifyContent:"flex-end",alignItems:"center"}}>
              <View style={{flexDirection:"row",alignItems:"center"}}>
              <AntDesign name="caretdown" size={10} color="black" />
              <Text style={{fontFamily:"montserrat",marginRight:5,fontSize:deviceHeight>800?14:12}}>
                {parseInt(weatherdata.forecast.forecastday[2].day.mintemp_c)}°
              </Text>
              <AntDesign name="caretup" size={10} color="black" />
              <Text style={{fontFamily:"montserrat",fontSize:deviceHeight>800?14:12}}>
                {parseInt(weatherdata.forecast.forecastday[2].day.maxtemp_c)}°
              </Text>
              </View>
              <Image style={{height:deviceHeight>800?50:40,width:deviceHeight>800?50:40,}} source={{uri:'http:'+weatherdata.forecast.forecastday[2].day.condition.icon}}/>
                <Text style={{fontFamily:"montserrat",fontSize:deviceHeight>800?14:12}}>
                {days[days.indexOf(dayName)+2]}
                </Text>
              </View>
              </View>
        )
          }}
        }
         const wdata=["one","two"]

         const renderhCard = ({ item }) => {  
          if(item=="one") {return(
          <View style={{height:80,alignItems:"center",justifyContent:"center"}}>
         <Text style={{fontSize:deviceHeight>800?30:25,paddingTop:15,paddingBottom:15,fontFamily:"montserrat"}}>
        {timeofday}
      </Text>
          </View>
          )}
          else{
            
            if(weatherdata.forecast!=undefined){
            
            return(
              
              <View style={{backgroundColor:"white",flexDirection:"row",alignSelf:"center",flex:1,}}>
              <View style={{marginRight:20,justifyContent:"flex-end",alignItems:"center",marginBottom:10}}>
              <Text style={{fontFamily:"montserrat",marginRight:5,fontSize:deviceHeight>800?14:12}}>
                {curHr-12}
              </Text>
                <Image style={{height:deviceHeight>800?50:40,width:deviceHeight>800?50:40,}} source={{uri:'http:'+weatherdata.forecast.forecastday[0].hour[curHr].condition.icon}}/>
                <Text style={{fontFamily:"montserrat",fontSize:deviceHeight>800?14:12}}>
                {weatherdata.forecast.forecastday[0].hour[curHr].condition.text}
                </Text>
              </View>
              <View style={{justifyContent:"flex-end",alignItems:"center",marginBottom:10}}>
              <Text style={{fontFamily:"montserrat",marginRight:5,fontSize:deviceHeight>800?14:12}}>
                {curHr-11}
              </Text>
              <Image style={{height:deviceHeight>800?50:40,width:deviceHeight>800?50:40,}} source={{uri:'http:'+weatherdata.forecast.forecastday[0].hour[curHr+1].condition.icon}}/>
                <Text style={{fontFamily:"montserrat",fontSize:deviceHeight>800?14:12}}>
                {weatherdata.forecast.forecastday[0].hour[curHr+1].condition.text}
                </Text>
              </View>
              <View style={{marginLeft:20,marginBottom:10,justifyContent:"flex-end",alignItems:"center"}}>
              <Text style={{fontFamily:"montserrat",marginRight:5,fontSize:deviceHeight>800?14:12}}>
                {curHr-10}
              </Text>
              <Image style={{height:deviceHeight>800?50:40,width:deviceHeight>800?50:40,}} source={{uri:'http:'+weatherdata.forecast.forecastday[0].hour[curHr+2].condition.icon}}/>
                <Text style={{fontFamily:"montserrat",fontSize:deviceHeight>800?14:12}}>
                {weatherdata.forecast.forecastday[0].hour[curHr+2].condition.text}
                </Text>
              </View>
              </View>
        )
          }}
        }
        

      function getWeatherloc(lat,long){
          
          getcoordWeather(lat,long).then(weather=>{
            setData(weather)
            updateCity(weatherdata.location.name)
          }).catch(()=>console.log("error"))
        
      }
        
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
        let text = '';
  if (errorMsg) {
    console.log(errorMsg);
  } else if (location) {
    text = location;
  }
         let deviceHeight = Dimensions.get('window').height
         let deviceWidth = Dimensions.get('window').width

    function removecity(city){
        var index = authContext.citydata.indexOf(city);
        if (index !== -1) {
        authContext.citydata.splice(index, 1);}
        
    
    }
    return( 
        <View style={{backgroundColor:"white",flex: 1,}}>
       <View style={styles.header}>
      <TouchableOpacity style={{marginLeft:10}} onPress={()=>{if(text){getWeatherloc(text.coords.latitude,text.coords.longitude)}else{ToastAndroid.show("Location not available",ToastAndroid.SHORT)}}}>
      <Entypo name="location-pin" size={deviceHeight>800?38:32} color="black" />
      </TouchableOpacity>
      
      <Text style={{fontSize:deviceHeight>800?21:18,fontFamily:"montserrat",marginLeft:"9%"}}>
        {authContext.citydata[active]}
      </Text>
      <View style={{flexDirection:"row",alignItems:"center"}}>
      <TouchableOpacity style={{marginRight:20}} onPress={()=>removecity(authContext.citydata[active])}>
      <Entypo name="trash" size={deviceHeight>800?22:19} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Addcity')}>
      <Ionicons name="ios-add" size={deviceHeight>800?40:35} color="black" />
      </TouchableOpacity>
      </View>
      </View>
         <Carousel
          
          data={authContext.citydata}
          renderItem={renderCard}
          sliderWidth={deviceWidth}
          itemWidth={deviceWidth}
          onSnapToItem={(index)=> setActive(index)}/>
      
         <View style={styles.dayinfo}>
      <View style={{borderBottomColor: 'black',borderBottomWidth: 0.8,width:"80%"}}/>
      <Carousel
          
          data={wdata}
          renderItem={renderdCard}
          sliderWidth={deviceWidth}
          itemWidth={deviceWidth}
         />
        
      <View style={{borderBottomColor: 'black',borderBottomWidth: 0.8,width:"80%",}}/>
      <Carousel
          
          data={wdata}
          renderItem={renderhCard}
          sliderWidth={deviceWidth}
          itemWidth={deviceWidth}
         />
      
      </View> 
      <Dots 
         length={citydata.length} 
         active={active} 
         passiveColor={'#cdcdcd'} 
         activeColor={'#000000'}
         activeDotWidth={8}
         activeDotHeight={8}
         passiveDotWidth={5}
         passiveDotHeight={5}
         paddingVertical={7}
         />
        

      </View>

    )
}
const styles = StyleSheet.create({
    header:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height:"7%",
        width:"95%",
        marginTop:30,
       
        padding:3,
      },
      dayinfo:{
        height:"22%",
        alignItems:"center",
        width:"95%",
        
        
        marginBottom:20
      },
})