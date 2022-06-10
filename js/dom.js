import { getCoord, getWeathInfo, kelvin } from "./api.js";
import { celsiusFahrenheit, fahrenheitCelsius, kelvinCelsius, kelvinFahrenheit } from "./convert.js";

const getWeatherData = async (city = `Accra`) => {
  let coord = await getCoord(city, "473832ad10976f3d2b18368f35950cbb");

  let tempInfo = await getWeathInfo(
    coord.lat,
    coord.lon,
    "473832ad10976f3d2b18368f35950cbb"
  );

  return tempInfo;
};

 const tempToFahrenheight = async (temp, feelslike) => {
    document.querySelector(".temp > h1").innerHTML =
      Math.floor(kelvinFahrenheit(temp)) + "°F";
    document.querySelector(".one").innerHTML =
      Math.floor(kelvinFahrenheit(feelslike)) + "°F";
    
}

const tempToCelsius = (temp, feelsLike) => {
  document.querySelector(".temp > h1").innerHTML =
    Math.floor(kelvinCelsius(temp)) + "°C";
  document.querySelector(".one").innerHTML =
    Math.floor(kelvinCelsius(feelsLike)) + "°C";
};


export function backwallp(description){
    let app = document.querySelector(".App");
    if(description === 'Rain' ){
        return app.style.backgroundImage = 'url("../img/rain1.avif")'
    }
    if(description === 'Clouds'){
        return (app.style.backgroundImage = 'url("../img/cloud.avif")');
    }
     
}

export function render(temp, city, date, time, description, humidity, wind, cloud, feelslike){
    document.querySelector(".temp > h1").innerHTML = temp + "°C";
    document.querySelector(".lcation > h3").innerHTML = city;
    document.querySelector(".weath > p").innerHTML = description;
    document.querySelector(".one").innerHTML = feelslike + "°C";
    document.querySelector(".two").innerHTML = wind + "km/h";
    document.querySelector(".three").innerHTML = humidity+ "%";
    document.querySelector(".four").innerHTML = cloud + "%";
}


function listener() {
    let fahrenheit = false;
    document.querySelector(".search").addEventListener("keypress",async function (e) {
       if (e.key === "Enter") {
       let weatherData = await getWeatherData(
           `${document.querySelector(".search").value}`
         );   
          backwallp(weatherData.description);
          render(
            Math.floor(kelvinCelsius(await weatherData.temp)),
            await weatherData.city,
            "dta",
            "time",
            await weatherData.description,
            await weatherData.humidity,
            await weatherData.windSpeed,
            await weatherData.clouds,
            Math.floor(kelvinCelsius(await weatherData.feelsLike))
          );

          document.querySelector(".search").value = ""
       }
     });


    document.querySelector(".toggle + label").addEventListener("click", async function(e){   
        let weatherData = await getWeatherData(document.querySelector(".lcation > h3").innerHTML);
        if(!fahrenheit){
             fahrenheit = true;
             tempToFahrenheight(weatherData.temp, weatherData.feelsLike);
             return;
        }
            fahrenheit = false;
            tempToCelsius(weatherData.temp, weatherData.feelsLike);
            return;
       
           
         });      
    
      
}

export async function init() {  
  let weatherData = await getWeatherData();
   backwallp(weatherData.description);
   render(
    Math.floor(kelvinCelsius(await weatherData.temp)),
    await weatherData.city,
    "dta",
    "time",
    await weatherData.description,
    await weatherData.humidity,
    await weatherData.windSpeed,
    await weatherData.clouds,
    Math.floor(kelvinCelsius(await weatherData.feelsLike))
  );
  getWeatherData().temp
  listener();
}

 
