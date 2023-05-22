require('dotenv').config();
import axios from 'axios';

/*
*   Template message the weather forecast.
*/
const messageTemplate = (data, cityName) => {
    return (`
<b>${cityName} - прогноз погоды</b>

Сейчас
------------
температура: <b>${data.current.temperature} °C</b>
ощущается как: <b>${data.current.feelslike} °C</b>
влажность: <b>${data.current.humidity} %</b>
скорость ветра: <b>${data.current.winddisplay}</b>
примечания: ${(data.current.skytext).toLowerCase()}

Завтра
------------
температура: <b>от ${data.forecast[2].low} до ${data.forecast[2].high} °C</b>
вероятность осадков: <b>${data.forecast[2].precip} %</b>
`)
};


/*
*   Get the weather forecast.
*/
export const getWeather = async (ctx, constCity = undefined) => {
    let [first, ...rest] = ctx.update.message.text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1));
    let cityName = rest.join(' ') || undefined;

    if (!cityName) {
        ctx.reply("Enter city name. Example: /w London");
    }

    try {
        var weather_data = (await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_SERVICE_TOKEN}`)).data;
        console.log(weather_data)
        if (!weather_data?.main) {
            var data = weather_data.result[0];
            ctx.replyWithHTML(messageTemplate(data, cityName));
        } else {
            ctx.reply(`No weather data found for ${cityName}`);
        }
    } catch (e) {
        console.log(e);
        ctx.reply("An error occurred while loading data. Try later.")
    }
};



