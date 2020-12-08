const submitBtn = document.querySelector('.submit-btn');

async function getWeather(city) {
    try {
        const response = await fetch(`http://api.weatherstack.com/current?access_key=d8a02aa44c5d122a3900e1013bd56c7d&query=${city}`);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const result = response.json();

        return result;
    } catch (error) {
        console.log(error);
    }
}

submitBtn.addEventListener('click', async event => {
    const cityInput = document.getElementById('city-input');
    const countryInput = document.getElementById('country-input');

    const tempValue = document.querySelector('.weather-temperature');
    const regionStr = document.querySelector('.weather-location');

    const timeStr = document.querySelector('.weather-time');
    const feelsStr = document.querySelector('.weather-feeling');
    const conditionsStr = document.querySelector('.weather-conditions');

    const windStr = document.querySelector('.weather-wind');
    const speedStr = document.querySelector('.weather-speed');
    const pressureStr = document.querySelector('.weather-pressure');

    const response = await getWeather(cityInput.value);

    if (response.success == false) {
        alert(`City "${cityInput.value}" doesn't exist! Try again!`);
        return;
    }

    if (!countryInput.value) countryInput.value = response.location.country;

    if (response.location.name.toLowerCase() == cityInput.value.toLowerCase()
        && response.location.country.toLowerCase() == countryInput.value.toLowerCase()) {
        const weatherContainerEl = document.querySelector('.weather-output');
        weatherContainerEl.style.display = 'flex';

        tempValue.innerHTML = `${response.current.temperature}&#176;C`;
        regionStr.innerText = `${response.location.name}, ${response.location.country}`;

        timeStr.innerText = `Time: ${response.current.observation_time}`;
        feelsStr.innerHTML = `Feels like: ${response.current.feelslike}&#176;C`;
        conditionsStr.innerText = `Today is ${response.current.weather_descriptions[0].toLowerCase()}`;

        windStr.innerText = `Wind: ${response.current.wind_dir}`;
        speedStr.innerText = `Wind speed: ${response.current.wind_speed} km/h`;
        pressureStr.innerText = `Pressure: ${response.current.pressure} MB`;

        cityInput.value = '';
        countryInput.value = '';
    } else {
        alert(`No such city or wrong country entered! Try again`);
        console.log(countryInput.value);
        console.log(cityInput.value);
        return;
    }
})