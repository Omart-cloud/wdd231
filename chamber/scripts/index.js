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

// Declare global variables
let userLatitude = null;
let userLongitude = null;

// Function to get location
function getLocation() {
    navigator.geolocation.getCurrentPosition(
        position => {
            userLatitude = position.coords.latitude;
            userLongitude = position.coords.longitude;

            getWeather();

        },
        error => console.error("Error getting location:", error.message)
    );
}

// Call the function to set global variables
getLocation();

const APIKey = "f7716739134e6c4f57cff448d9b8d444";


async function getWeather(){
    if (userLatitude && userLongitude) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${userLatitude}&lon=${userLongitude}&appid=${APIKey}`)
            const weather = await response.json()
            console.log(weather)
        } catch (error) {
            console.log("Error:" , error);
        }
    }
}

// Dynamic Footer Year & Last Modified Date

document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    const lastModified = document.lastModified;
    document.getElementById('lastModified').textContent = `Last Modification: ${lastModified}`;

    document.getElementById('roseflower').textContent = '🌹';
});