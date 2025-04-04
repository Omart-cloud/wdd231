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

// Fetching and Displaying Members from JSON file
async function fetchMembers() {
    try {
        const response = await fetch("data/member.json")
        const data = await response.json();
        return data.members; // Return the members array directly
    } catch (error) {
        console.error('Failed to fetch members:', error);
        return []; // Return an empty array in case of error
    }
}

function displayAsList(members) {
    const directory = document.getElementById('directory');
    directory.className = 'list';
    directory.innerHTML = '<ul>' + members.map(member => `
        <li>
            <h3>${member.name}</h3>
            <p>Address: ${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p>Membership Level: ${member.membershipLevel}</p>
        </li>
    `).join('') + '</ul>';
}

function displayAsGrid(members) {
    const directory = document.getElementById('directory');
    directory.className = 'grid';
    directory.innerHTML = members.map(member => `
        <div class="card">
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name} logo">
            <p>Membership Level: ${member.membershipLevel}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        </div>
    `).join('');
}

async function initialize() {
    const members = await fetchMembers(); // No need to pass data here

    if (members && Array.isArray(members)) { // Check if members is valid
        document.getElementById('list-view').addEventListener('click', () => displayAsList(members));
        document.getElementById('grid-view').addEventListener('click', () => displayAsGrid(members));

        displayAsList(members); // Default view
    } else {
        console.error("Members data is invalid.");
        document.getElementById('directory').innerHTML = "<p>Data could not be loaded</p>"
    }
}

initialize(); // Call initialize directly

// Dynamic Footer Year & Last Modified Date

document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    const lastModified = document.lastModified;
    document.getElementById('lastModified').textContent = `Last Modification: ${lastModified}`;

    document.getElementById('roseflower').textContent = '🌹';
});