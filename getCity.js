
const apikey="AIzaSyAqRe27kRIqXN8Qm5ACAdz3-LDr4jvbGQg"

export default async function getCity(city) {
  console.log(city)
  const url=`https://maps.googleapis.com/maps/api/place/autocomplete/json?&key=${apikey}&types=(cities)&input=${city}`;

    try {
        let response = await fetch(url)
        let responseJson = await response.json();
        
        return responseJson;
      } catch (error) {
        console.error(error);
      }
}

