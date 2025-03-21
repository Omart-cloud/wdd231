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
    const items = [];

    while (items.length < 3) {
        const randomIndex = Math.floor(Math.random() * 7);
        const item = await getMember(randomIndex);

        if (item !== null) {  // Add item only if it's not null
            items.push(item);
        }
    }

    console.log(items)
    // Shuffle the collected items before returning
    return items.sort(() => Math.random() - 0.5);
}

generateSpotlight()
// Dynamic Footer Year & Last Modified Date

document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    const lastModified = document.lastModified;
    document.getElementById('lastModified').textContent = `Last Modification: ${lastModified}`;

    document.getElementById('roseflower').textContent = '🌹';
});