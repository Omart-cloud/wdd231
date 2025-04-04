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

function loadDiscoveries() {
    const container = document.getElementById('discoveries-container');

    discoveries.forEach((discovery, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.gridArea = `card${index + 1}`;

        card.innerHTML = `
            <h2>${discovery.name}</h2>
            <figure>
                <img src="${discovery.image}" alt="${discovery.name}">
            </figure>
            <address>${discovery.address}</address>
            <p>${discovery.description}</p>
            <a href="#" class="btn">Learn More</a>
        `;

        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", loadDiscoveries);


document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.getElementById("sidebar-message");

    // Get the last visit from localStorage
    const lastVisit = localStorage.getItem("lastVisit");
    const currentVisit = new Date();

    if (!lastVisit) {
        // First visit
        sidebar.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        // Calculate time difference in days
        const lastVisitDate = new Date(lastVisit);
        const timeDifference = currentVisit - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference < 1) {
            sidebar.textContent = "Back so soon! Awesome!";
        } else {
            sidebar.textContent = `You last visited ${daysDifference} day${daysDifference > 1 ? "s" : ""} ago.`;
        }
    }

    // Store the current visit date
    localStorage.setItem("lastVisit", currentVisit);
});



// Dynamic Footer Year & Last Modified Date

document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    const lastModified = document.lastModified;
    document.getElementById('lastModified').textContent = `Last Modification: ${lastModified}`;

    document.getElementById('roseflower').textContent = '🌹';
});