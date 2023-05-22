import axios from "axios";
require('dotenv').config();

/**
 * @file API: exchange-rates.
 * 
 * {@link https://openweathermap.org API}  
 */


const apikey = process.env.WEATHER_SERVICE_TOKEN;


/**
 * Get the converted currency. 
 * 
 * {@link https://openweathermap.org/current API}  
 * 
 * @param   {string}   from            The three-letter currency code of the currency you would like to convert from. 
 * @return  {IApiConvertedCurrency}    Converted currency
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

