// API key from OpenWeatherMap
const apiKey = "eed0f0d933fcfab76b87cb338c5d3e04"; // Your API key

// Function to get weather data based on city name
async function getWeather() {
    const city = document.getElementById("city").value;
    const weatherResult = document.getElementById("weather-result");

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    // Show loading message
    weatherResult.innerHTML = "<p>Loading...</p>";
    weatherResult.style.display = "block";

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.cod === "404") {
            weatherResult.innerHTML = `<p>City not found. Please try again.</p>`;
            return;
        }

        // Extract weather information
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const description = data.weather[0].description;
        const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        // Display weather result
        weatherResult.innerHTML = `
            <h2>Weather in ${city}</h2>
            <img src="${icon}" alt="Weather Icon">
            <p>Temperature: ${temp}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Description: ${description}</p>
        `;
    } catch (error) {
        console.error("Error fetching data:", error); // Log the error to the console for debugging
        weatherResult.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
    }
}
