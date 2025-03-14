const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";

const cards = document.querySelector("cards");

async function getProphetData() {
    const response = await fetch(url);
    const data = response.json();
    console.table(data.Prophets);
}

getProphetData();