import { setupEventListeners, renderStatus, displayWeatherCards } from './modules/ui.js';
import { fetchWeatherData } from './modules/api.js';

let currentCity = 'Thessaloniki';
let isCelsius = true;

async function loadWeather(city, currentIsCelsius) {
    const isUsUnitGroup = !currentIsCelsius; 
    
    renderStatus('Loading weather forecast data...', false);

    try {
        const data = await fetchWeatherData(city, isUsUnitGroup);
        currentCity = data.resolvedAddress.split(',')[0] || city; 
        displayWeatherCards(data, currentCity, currentIsCelsius);

    } catch (error) {
        renderStatus(`Error: Cannot found weather for the city "${city}".`, true);
    }
}


function handleSearch(city) {
    currentCity = city;
    loadWeather(currentCity, isCelsius);
}

function handleUnit(newCelsius) {
    isCelsius = newCelsius;
    if (currentCity) loadWeather(currentCity, isCelsius);
}

setupEventListeners(handleSearch, handleUnit);

window.addEventListener('load', () => {
    loadWeather(currentCity, isCelsius);
});