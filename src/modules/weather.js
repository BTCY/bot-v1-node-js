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
    let location = undefined;
    let [first, ...rest] = ctx.update.message.text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1));
    let city = rest.join(' ') || undefined;
    let cityName = undefined;

    if (constCity === 'Yagul') {
        location = 'Yagul';
        cityName = 'Ягул';
    }
    else if (!city) {
        location = 'Izhevsk';
        cityName = 'Ижевск';
    }
    else {
        location = city;
        cityName = city;
    };

    try {
        var weather_data = (await axios.get(`${process.env.WEATHER_SERVICE_API_URL}${location}`)).data;
        if (weather_data.error === null && weather_data.result.length !== 0) {
            var data = weather_data.result[0];
            ctx.replyWithHTML(messageTemplate(data, cityName));
        } else {
            ctx.reply("Данные не найдены");
        }
    } catch (e) { console.log(e) }
};



