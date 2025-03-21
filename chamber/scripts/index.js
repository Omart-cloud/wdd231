// Responsive Navigation Menu Handling

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Add active class to the current page link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
});

// Function to get location
async function getLocation() {
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const weather = await getWeather(position.coords.latitude, position.coords.longitude);
            displayWeather(weather);

        },
        error => console.error("Error getting location:", error.message)
    );
}

// Call the function to set global variables
getLocation();

const APIKey = "f7716739134e6c4f57cff448d9b8d444";


async function getWeather(latitude, longitude){
    if (latitude && longitude) {
        try {
            // Fetch current weather data
            const currentWeatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKey}`
            );
            const currentWeatherData = await currentWeatherResponse.json();
    
            // Fetch 5-day forecast data
            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKey}`
            );
            const forecastData = await forecastResponse.json();
    
            // Extracting current weather details
            const currentTemperature = currentWeatherData.main.temp;
            const currentDescription = currentWeatherData.weather[0].description;
    
            // Extracting 3-day forecast (every 24 hours at 12:00 PM)
            const forecast = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
            
            const forecastDetails = forecast.map(item => ({
                date: item.dt_txt.split(" ")[0],
                temperature: item.main.temp,
                description: item.weather[0].description
            }));
    
            return {
                currentTemperature,
                currentDescription,
                forecastDetails
            };
            
        } catch (error) {
            console.error("Error fetching weather data:", error);
            return null;
        }
    }
}

function displayWeather(weather) {
    console.log(weather);
    const weatherContainer = document.querySelector(".weather-data");
    
    // Display current weather
    weatherContainer.innerHTML = `
        <dt>Temperature:</dt>
        <dd>${weather.currentTemperature}°C</dd>
        
        <dt>Conditions:</dt>
        <dd>${weather.currentDescription}</dd>
        
        <h3>3-Day Forecast</h3>
    `;

    // Display forecast details
    weather.forecastDetails.forEach(day => {
        weatherContainer.innerHTML += `
            <div>
                <dt>Date:</dt>
                <dd>${day.date}</dd>
                
                <dt>Temperature:</dt>
                <dd>${day.temperature}°C</dd>
                
                <dt>Conditions:</dt>
                <dd>${day.description}</dd>
            </div>
        `;
    });
}


async function getMember(index) {
    try {
        const data = await fetch("data/member.json");
        const response = await data.json();
        const member = response.members[index];

        if (member.membershipLevel==="Silver" || member.membershipLevel==="Gold") {
            return member;
        }
    } catch (error) {console.log(error)}
}

async function generateSpotlight() {
    const items = new Set();  // Use a Set to avoid duplicates

    while (items.size < 3) {
        const randomIndex = Math.floor(Math.random() * 7);  // Change 7 to your total number of members
        const item = await getMember(randomIndex);

        if (item && typeof item === 'object' && !Array.from(items).some(existingItem => existingItem.name === item.name)) {
            items.add(item);  // Only add valid and unique items
        }
    }

    // Convert the Set to an array and shuffle before returning
    return Array.from(items).sort(() => Math.random() - 0.5);
}

async function displaySpotlight() {
    try {
        const spotlights = await generateSpotlight();

        document.querySelector(".spotlights").innerHTML += spotlights.map((spotlight) => (
            `<div class="spotlight">
                <h3>${spotlight.name}</h3>
                <p>${spotlight.description}</p>
            </div>`
        )).join("");
    } catch (err) {
        console.log(err)
    }
}

displaySpotlight();
// Dynamic Footer Year & Last Modified Date

document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    const lastModified = document.lastModified;
    document.getElementById('lastModified').textContent = `Last Modification: ${lastModified}`;

    document.getElementById('roseflower').textContent = '🌹';
});