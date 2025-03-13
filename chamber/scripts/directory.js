
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

document.addEventListener('DOMContentLoaded', () => {
    const directory = document.getElementById('directory');
    const members = [
        "Bright Beginning Cleaning Service",
        "Chikleen All",
        "YZ Cleanup",
        "Omartkleen",
        "Smootch",
        "Best Clean"
    ];

    function displayAsList() {
        directory.className = 'list';
        directory.innerHTML = `<ul>${members.map(member => `<li>${member}</li>`).join('')}</ul>`;
    }

    function displayAsGrid() {
        directory.className = 'grid';
        directory.innerHTML = members.map(member => `<div class="card">${member}</div>`).join('');
    }

    document.getElementById('list-view').addEventListener('click', displayAsList);
    document.getElementById('grid-view').addEventListener('click', displayAsGrid);

    displayAsList(); // Default view
});

// Dynamic Footer Year & Last Modified Date
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    const lastModified = document.lastModified;
    document.getElementById('lastModified').textContent = `Last Modification: ${lastModified}`;

    document.getElementById('roseFlower').textContent = '🌹';
});

