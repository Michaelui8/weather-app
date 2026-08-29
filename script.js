
async function fetchWeatherData() {
    const input = document.getElementById('cityInput');
    const display = document.getElementById('displayArea');
    const targetCity = input.value.trim();

    if (!targetCity) {
        display.innerHTML = "<p style='color: #f85149;'>Please enter a city name.</p>";
        return;
    }

    display.innerHTML = "<p>Retrieving data...</p>";

    try {
        // Utilizing a clean v1 JSON formatting structure from wttr.in
        const response = await fetch(`https://wttr.in{targetCity}?format=j1`);
        
        if (!response.ok) throw new Error("Network issue or city not found");
        
        const data = await response.json();
        
        const currentCondition = data.current_condition[0];
        const temperatureCelsius = currentCondition.temp_C;
        const weatherDescription = currentCondition.weatherDesc[0].value;
        const humidityValue = currentCondition.humidity;

        display.innerHTML = `
            <div class="result-card">
                <h2 style="margin: 0; color: white;">${targetCity}</h2>
                <div class="temp">${temperatureCelsius}°C</div>
                <div class="status">${weatherDescription}</div>
                <p style="margin-top: 1rem; font-size: 0.9rem; color: #8b949e;">Humidity: ${humidityValue}%</p>
            </div>
     
    } catch (err) {
        display.innerHTML = "<p style='color: #f85149;'>Unable to find city. Please check spelling.</p>";
    }
}
