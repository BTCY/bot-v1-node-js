import { getWeatherService } from "../api/weather-service";

/**
 *   Template message the weather forecast.
 */
const messageTemplate = (data, cityName) => {
    return (`
<b>${cityName} — weather forecast</b> 
${data?.weather[0]?.description} 
 
now: <b>${data.main.temp} °C</b>
feels: <b>${data.main.feels_like} °C</b>
max: <b>${data.main.temp_min} °C</b>
min:  <b>${data.main.temp_max} °C</b>  
------------
pressure: <b>${data.main.pressure} hPa</b>
humidity: <b>${data.main.humidity} %</b>
visibility:   <b>${data.visibility} meter</b>
wind: <b>${data.wind.speed} meter/sec</b>

upd: ${new Date(data.dt * 1000).toLocaleString()}
`)
};


/**
 *   Get the weather forecast.
 */
export const getWeather = async (ctx) => {
    const [first, ...rest] = ctx.update.message.text.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const cityName = rest.join(" ") || undefined;

    if (!cityName) {
        ctx.reply("Enter city name. Example: /w London");
    }
    else {
        try {
            const weather_data = await getWeatherService(cityName);
            if (weather_data?.main) {
                ctx.replyWithHTML(messageTemplate(weather_data, cityName));
            } else {
                ctx.reply(`No weather data found for ${cityName}`);
            }
        } catch (e) {
            console.log(e);
            ctx.reply("An error occurred while loading data. Try later.")
        }
    }
};



