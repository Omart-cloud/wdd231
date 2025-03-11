// Dynamic Footer Year & Last Modified Date
const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = currentYear;
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Adding rose flower emoji dynamically
document.getElementById('rose flower').textContent = '🌹';
