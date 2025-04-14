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

    // Fetch Membership Data and Load Cards
    let membershipData = {};

    fetch("members.json") // Ensure your file is named correctly
        .then(response => response.json())
        .then(data => {
            membershipData = data.memberships;
            loadMembershipCards(membershipData);
        })
        .catch(error => console.error("Error loading membership data:", error));

    function loadMembershipCards(memberships) {
        const membershipContainer = document.querySelector(".membership-cards");
        membershipContainer.innerHTML = ""; // Clear existing cards

        memberships.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.id = `${member.id}-card`;
            card.innerHTML = `
                <h3>${member.title}</h3>
                <a href="#" data-type="${member.id}" class="view-benefits">View Benefits</a>
            `;
            membershipContainer.appendChild(card);
        });
    }

    // Modal Handling
    const modal = document.querySelector("#dialogBox");
    const modalTitle = document.querySelector("#dialogBox h2");
    const modalText = document.querySelector("#dialogBox div");
    const closeButton = document.querySelector("#closeButton");

    document.querySelector(".membership-cards").addEventListener("click", (event) => {
        if (event.target.classList.contains("view-benefits")) {
            event.preventDefault();
            const membershipType = event.target.getAttribute("data-type");

            if (membershipData.some(m => m.id === membershipType)) {
                const selectedMember = membershipData.find(m => m.id === membershipType);
                modalTitle.textContent = selectedMember.title;
                modalText.textContent = selectedMember.benefits;
                modal.showModal();
            } else {
                console.error("Membership type not found:", membershipType);
            }
        }
    });

    closeButton.addEventListener("click", () => {
        modal.close();
    });

    // Organization Title Validation
    document.querySelector("form").addEventListener("submit", function (event) {
        const orgTitle = document.getElementById("orgTitle").value;
        const regex = /^[A-Za-z\s-]{7,}$/;

        if (!regex.test(orgTitle)) {
            alert("Organization Title must be at least 7 characters long and contain only letters, spaces, and hyphens.");
            event.preventDefault();
        }
    });

    // Dynamic Footer Year & Last Modified Date
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    const lastModified = document.lastModified;
    document.getElementById('lastModified').textContent = `Last Modification: ${lastModified}`;

    document.getElementById('roseflower').textContent = '🌹';

    // Load Membership Cards from JSON
    async function loadMembershipCards() {
        try {
            const response = await fetch('data/member.json');
            const data = await response.json();
            const container = document.querySelector('.card-container');

            // Create a map of membership levels to their benefits
            const membershipBenefits = {};
            data.members.forEach(member => {
                membershipBenefits[member.membershipLevel] = {
                    title: member.title,
                    benefits: member.benefits
                };
            });

            // Create cards for each membership level
            const membershipLevels = ['NP', 'Bronze', 'Silver', 'Gold'];
            container.innerHTML = membershipLevels.map(level => `
                <div class="card">
                    <h3>${level} Membership</h3>
                    <button class="benefits-btn" data-level="${level}">View Benefits</button>
                </div>
            `).join('');

            // Add click event listeners to benefits buttons
            document.querySelectorAll('.benefits-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const level = button.dataset.level;
                    showBenefitsModal(level, membershipBenefits[level]);
                });
            });
        } catch (error) {
            console.error('Error loading membership cards:', error);
        }
    }

    // Modal Functions
    function showBenefitsModal(level, data) {
        const modal = document.getElementById('benefitsModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBenefits = document.getElementById('modalBenefits');

        modalTitle.textContent = data.title;
        modalBenefits.innerHTML = `<p>${data.benefits}</p>`;
        modal.style.display = 'block';
    }

    function closeModal() {
        const modal = document.getElementById('benefitsModal');
        modal.style.display = 'none';
    }

    // Event Listeners
    document.addEventListener('DOMContentLoaded', () => {
        loadMembershipCards();

        // Close modal when clicking the close button
        document.querySelector('.close').addEventListener('click', closeModal);

        // Close modal when clicking outside the modal content
        window.addEventListener('click', (event) => {
            const modal = document.getElementById('benefitsModal');
            if (event.target === modal) {
                closeModal();
            }
        });

        // Set timestamp
        document.getElementById('timestamp').value = new Date().toISOString();

        // Update footer year and last modified date
        const currentYear = new Date().getFullYear();
        document.getElementById('currentyear').textContent = currentYear;
        document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;
        document.getElementById('roseflower').textContent = '🌹';
    });

    // Form Validation
    function validateForm() {
        const orgTitle = document.getElementById('orgTitle');
        const pattern = /^[a-zA-Z\s-]{7,}$/;
        
        if (!pattern.test(orgTitle.value)) {
            alert('Organization title must be at least 7 characters long and contain only letters, spaces, and hyphens.');
            orgTitle.focus();
            return false;
        }
        return true;
    }

    // Modal functionality
    function setupModal() {
        const modal = document.getElementById('benefitsModal');
        const closeBtn = document.querySelector('.close');
        const modalTitle = document.getElementById('modalTitle');
        const modalBenefits = document.getElementById('modalBenefits');

        // Benefits data
        const benefits = {
            'np': {
                title: 'NP Membership Benefits',
                content: 'No fee, access to networking events, and community outreach programs.'
            },
            'bronze': {
                title: 'Bronze Membership Benefits',
                content: 'Basic advertising, networking events, and access to training workshops.'
            },
            'silver': {
                title: 'Silver Membership Benefits',
                content: 'Enhanced advertising, discounted event fees, and premium workshops.'
            },
            'gold': {
                title: 'Gold Membership Benefits',
                content: 'Spotlight advertising, VIP networking, and priority event access.'
            }
        };

        // Add click handlers to all benefit links
        document.querySelectorAll('.card a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const level = link.getAttribute('href').replace('#', '').replace('-modal', '');
                modalTitle.textContent = benefits[level].title;
                modalBenefits.textContent = benefits[level].content;
                modal.style.display = 'block';
            });
        });

        // Close modal when clicking the close button
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Initialize the page
    document.addEventListener('DOMContentLoaded', () => {
        setupModal();
        
        // Add animation to membership cards
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Set timestamp
        document.getElementById('timestamp').value = new Date().toISOString();
        
        // Update footer year and last modified date
        const currentYear = new Date().getFullYear();
        document.getElementById('currentyear').textContent = currentYear;
        document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;
        document.getElementById('roseflower').textContent = '🌹';
    });
});
