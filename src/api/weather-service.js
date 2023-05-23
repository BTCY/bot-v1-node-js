import axios from "axios";
require("dotenv").config();

/**
 * @file API: weather.
 * 
 * {@link https://openweathermap.org API}  
 */


const apikey = process.env.WEATHER_SERVICE_TOKEN;


/**
 * Get weather. 
 * 
 * {@link https://openweathermap.org/current API}  
 * 
 * @param   {string}   cityName        City mame
 * @return  {}                         Result
 */
export const getWeatherService = (
    cityName,
    units = "metric"
) =>
    axios.get(
        "http://api.openweathermap.org/data/2.5/weather", {
        params: {
            appid: apikey,
            q: cityName,
            units,
        }
    })
        .then(res => res.data)
        .catch(e => {
            throw e;
        });

