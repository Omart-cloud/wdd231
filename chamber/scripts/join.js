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

    // Fetch Membership Data
    let membershipData = {};

    fetch("member.json")
        .then(response => response.json())
        .then(data => {
            membershipData = data.memberships;
        })
        .catch(error => console.error("Error loading membership data:", error));

    // Modal Handling
    const modal = document.querySelector("#dialogBox");
    const modalTitle = document.querySelector("#dialogBox h2");
    const modalText = document.querySelector("#dialogBox div");
    const closeButton = document.querySelector("#closeButton");

    document.querySelector(".membership-cards").addEventListener("click", (event) => {
        if (event.target.tagName === "A") {
            event.preventDefault();
            const membershipType = event.target.parentElement.id.split("-")[0]; // Extracts "np", "bronze", etc.

            if (membershipData[membershipType]) {
                modalTitle.textContent = membershipData[membershipType].title;
                modalText.textContent = membershipData[membershipType].benefits;
                modal.showModal();
            } else {
                console.error("Membership type not found:", membershipType);
            }
        }
    });

    closeButton.addEventListener("click", () => {
        modal.close();
    });

    // Dynamic Footer Year & Last Modified Date
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    const lastModified = document.lastModified;
    document.getElementById('lastModified').textContent = `Last Modification: ${lastModified}`;

    document.getElementById('roseflower').textContent = '🌹';
});
