import { API_KEY } from './apikey';


export default async function getcoordWeather(lat,long) {
  console.log(lat,long)
  const url=`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${long}&days=3`;

    try {
        let response = await fetch(url)
        let responseJson = await response.json();
        
        return responseJson;
      } catch (error) {
        console.error(error);
      }
}