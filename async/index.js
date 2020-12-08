const submitBtn = document.querySelector('.submit-btn');

async function getWeather(location) {
    try {
        const response = await fetch(`http://api.weatherstack.com/current?access_key=d8a02aa44c5d122a3900e1013bd56c7d&query=${location}`);

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

    const response = await getWeather(cityInput.value);

    tempValue.innerHTML = `${response.current.temperature}&#176;C`;

    cityInput.value = '';
    countryInput.value = '';
})