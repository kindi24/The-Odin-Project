const weatherDiv = document.getElementById('weather-content');
const cityHeaderHTML = document.getElementById('city-header');

export function renderStatus(message, isError) {
    const style = isError ? 'color: red; font-weight: bold;' : 'color: #333;';
    weatherDiv.innerHTML = `<p style="text-align: center; ${style}">${message}</p>`;
}

export function displayWeatherCards(data, city, isCelsius) {
    if (!data.days || data.days.length === 0) {
        renderStatus('No weather forecast data.');
        return;
    }

    const tempUnit = isCelsius ? '&deg;C' : '&deg;F';
    const windUnit = isCelsius ? 'km/h' : 'mph';

    cityHeaderHTML.innerHTML = `<h2>Weather Forecast for ${city}</h2>`;

    const cardsHTML = data.days.map((day, index) => {
        const date = new Date(day.datetimeEpoch * 1000);
        const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-GB', { weekday: 'short' });
        const dateString = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
        
        const tempMax = Math.round(day.tempmax);
        const tempMin = Math.round(day.tempmin);
        const windSpeed = Math.round(day.windspeed);

        return `
            <div class="weather-card">
                <h3>${dayName}</h3>
                <p>${dateString}</p>
                <img src="./assets/${day.icon}.svg" class="weather-icon" alt="${day.icon}">
                <div class="temp-main">${tempMax}${tempUnit}</div>
                <p>Min.: ${tempMin}${tempUnit}</p>
                <p class="condition">${day.conditions}</p>
                <p>Humidity: ${day.humidity}%</p>
                <p>Wind: ${windSpeed} ${windUnit}</p>
            </div>
        `;
    }).join('');

    weatherDiv.innerHTML =  cardsHTML;
}

const loadIcon = async (iconName) => {
    try {
        const mod = await import(`../assets/${iconName}.svg`);
        return (mod && (mod.default || mod)) || `../assets/${iconName}.svg`;
    } catch (err) {
        return `../assets/${iconName}.svg`;
    }
};

export function setupEventListeners(onSearch, onUnitChange) {
    const searchInput = document.querySelector('.input');
    const radioInputs = document.querySelectorAll('input[name="radio"]');

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const city = searchInput.value.trim();
            if (city) {
                onSearch(city);
            }
        }
    });

    radioInputs.forEach(radio => {
        radio.addEventListener('change', () => {
            const isCelsius = radioInputs[0].checked;
            onUnitChange(isCelsius);
        });
    });

}
