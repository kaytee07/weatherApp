import { kelvinCelsius, kmperhr, toHours, getLocalTime, kelvinFahrenheit } from "./convert.js";
import { backwallp, render } from "./dom.js";

export function kelvin(hjs){
 return hjs
}


export async function getCoord(city, apiKey){
    try{
         let json = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${apiKey}`)
    let info = await json.json();
    return {
        lat:info[0].lat,
        lon:info[0].lon,
    }
    }catch(err){
        console.log(err)
    }
   
}



export async function getWeathInfo(lat, lon, apiKey){
    try{
         let info = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
       );
       let weath = await info.json()
       return {
         temp:weath.main.temp,
         city: weath.name,
         description: weath.weather[0].description,
         humidity: weath.main.humidity,
         windSpeed:Math.floor(kmperhr(weath.wind.speed)),
         clouds: weath.clouds.all,
         feelsLike:weath.main.feels_like
       };
    }catch(err){
        console.log(err)
    }
 
  
//   let weathInf =await info.json();
}



function getForeCast(lat,lon,apiKey){
    const getCast = Promise.resolve(
      fetch(
        `api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=10&appid=${apiKey}`
      )
    );

    getCast
      .then((data) => console.log(data))
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
}
