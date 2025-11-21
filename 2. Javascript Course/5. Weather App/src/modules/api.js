import { API_KEY, BASE_URL } from "./config.js";

export async function fetchWeatherData(city, isUsUnitGroup) {
    const unitGroup = isUsUnitGroup? 'us' : 'metric';
    const encodedCity = encodeURIComponent(city);

    const url = `${BASE_URL}${encodedCity}?unitGroup=${unitGroup}&include=days%2Ccurrent&key=${API_KEY}&contentType=json`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (e) {
        console.log("Error at loading: ", e);
        throw e;
    }
}