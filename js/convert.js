export const kelvinCelsius = input =>   input - 273.15;

export const kelvinFahrenheit = input => (input -273.15) * (1.8) + 32;

export const celsiusFahrenheit = (input) => (input * 1.8) + 32;

export const fahrenheitCelsius = (input) =>  (input - 32) * (5/9);

export const kmperhr = input => input * (18/5);

export const toHours = (hours, input) =>{
    if (hours + input / 3600 === 24){
        return 0
    }

    if (hours + input / 3600 > 24) {
        let rem = hours + input / 3600 - 24;
        return rem;
      }
    
      return hours
};

export function getLocalTime(data) {
  let date = new Date();
  let time = date.getTime();
  let localOffset = date.getTimezoneOffset() * 60000;
  let utc = time + localOffset;
  let localTime = utc + 1000 * data;
  let localTimeDate = new Date(localTime);
  return localTimeDate.toLocaleString();
}


      

   


// humidity % // wind meter/sec -km.h // clouds %