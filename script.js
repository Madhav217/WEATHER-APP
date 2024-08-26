document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "abea037b86404e46988135847242508"; // Replace with your WeatherAPI key
    const cityInput = document.getElementById("city-input");
    const searchBtn = document.getElementById("search-btn");
    const weatherResult = document.getElementById("weather-result");
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("wind-speed");

    searchBtn.addEventListener("click", () => {
        const city = cityInput.value.trim();
        if (city) {
            fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data) {
                        cityName.textContent = `Weather in ${data.location.name}, ${data.location.country}`;
                        temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
                        description.textContent = `Description: ${data.current.condition.text}`;
                        humidity.textContent = `Humidity: ${data.current.humidity}%`;
                        windSpeed.textContent = `Wind Speed: ${data.current.wind_kph} kph`;
                        weatherResult.style.display = "block";
                    } else {
                        alert("City not found. Please try again.");
                        weatherResult.style.display = "none";
                    }
                })
                .catch(error => {
                    console.error("Error fetching weather data:", error);
                    alert("Error fetching weather data. Please try again.");
                    weatherResult.style.display = "none";
                });
        } else {
            alert("Please enter a city name.");
            weatherResult.style.display = "none";
        }
    });
});
