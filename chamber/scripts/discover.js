// Responsive Navigation Menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Load Discoveries from JSON
async function loadDiscoveries() {
    try {
        const response = await fetch('data/discoveries.json');
        const data = await response.json();
        const container = document.getElementById('discoveries-container');

        data.discoveries.forEach((discovery, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            card.innerHTML = `
                <h2>${discovery.name}</h2>
                <figure>
                    <img src="${discovery.image}" alt="${discovery.name}" loading="lazy">
                </figure>
                <address>${discovery.address}</address>
                <p>${discovery.description}</p>
                <a href="#" class="btn">Learn More</a>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading discoveries:', error);
    }
}

// Last Visit Message
function updateLastVisitMessage() {
    const sidebarMessage = document.getElementById('sidebar-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentVisit = new Date();

    if (!lastVisit) {
        sidebarMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(lastVisit);
        const timeDifference = currentVisit - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference < 1) {
            sidebarMessage.textContent = "Back so soon! Awesome!";
        } else {
            sidebarMessage.textContent = `You last visited ${daysDifference} day${daysDifference > 1 ? 's' : ''} ago.`;
        }
    }

    localStorage.setItem('lastVisit', currentVisit);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadDiscoveries();
    updateLastVisitMessage();

    // Update footer year and last modified date
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;
    document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;
    document.getElementById('roseflower').textContent = '🌹';
});