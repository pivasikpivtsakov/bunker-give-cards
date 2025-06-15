import { categories, cardsNumber, bunkerTypesNumber } from './categories.js';
import { getRandomInt, sanitizeString } from './utils.js';
import { saveCardsToStorage, loadCardsFromStorage } from './storage.js';

function getCardPath(category, number) {
    return `cards/${category}/${number}.jpg`;
}

function getBunkerTypeCardPath(number) {
    return `bunker-types/${number}.jpg`;
}

// Function to get the highest card number in a category
function getHighestCardNumber(category) {
    return cardsNumber[category];
}

// Function to display a specific bunker type card
export function showBunkerTypeCard(number) {
    const container = document.getElementById('bunkerTypeContainer');
    const category = 'bunker-types';
    const displayName = categories[category];
    
    if (number < 1 || number > bunkerTypesNumber) {
        container.innerHTML = '<div class="col-12 text-center text-danger">Неверный номер карты</div>';
        return;
    }

    const cardHtml = `
        <div class="col-md-6 col-lg-4">
            <div class="card-container">
                <h3 class="card-header">${sanitizeString(displayName)}</h3>
                <p class="card-number">Карта №${number}</p>
                <img src="${getBunkerTypeCardPath(number)}" 
                    alt="${sanitizeString(displayName)} - Карта ${number}" 
                    class="card-image"
                    onclick="window.showPopup('${getBunkerTypeCardPath(number)}', '${sanitizeString(displayName)} - Карта ${number}')">
            </div>
        </div>
    `;
    container.innerHTML = cardHtml;
}

// Function to deal cards
export function dealCards() {
    const cards = [];

    for (const category in categories) {
        // Skip bunker-types as it's handled separately
        if (category === 'bunker-types') continue;
        
        const highestNumber = getHighestCardNumber(category);
        if (highestNumber > 0) {
            const randomNumber = getRandomInt(1, highestNumber);
            cards.push({ category, displayName: categories[category], number: randomNumber });
        }
    }

    // Save cards to local storage
    saveCardsToStorage(cards);

    // Display cards
    displayCards(cards);
}

// Function to display cards
export function displayCards(cards) {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = '';

    cards.forEach(({ category, displayName, number }) => {
        const cardHtml = `
            <div class="col-md-6 col-lg-4">
                <div class="card-container">
                    <h3 class="card-header">${sanitizeString(displayName)}</h3>
                    <p class="card-number">Карта №${number}</p>
                    <img src="${getCardPath(category, number)}" 
                         alt="${sanitizeString(displayName)} - Карта ${number}" 
                         class="card-image"
                         onclick="window.showPopup('${getCardPath(category, number)}', '${sanitizeString(displayName)} - Карта ${number}')">
                </div>
            </div>
        `;
        container.innerHTML += cardHtml;
    });
}

// Function to initialize cards
export function initCards() {
    const savedCards = loadCardsFromStorage();
    if (savedCards) {
        displayCards(savedCards);
    }
} 