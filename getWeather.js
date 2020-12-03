import { API_KEY } from './apikey';


export default async function getWeather(city) {
  console.log(city)
  const url=`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`;

    try {
        let response = await fetch(url)
        let responseJson = await response.json();
        
        return responseJson;
      } catch (error) {
        console.error(error);
      }
}

