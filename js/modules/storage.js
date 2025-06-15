import { sanitizeString, validateCardData } from './utils.js';
import { categories } from './categories.js';

// Function to save cards to local storage
export function saveCardsToStorage(cards) {
    if (!Array.isArray(cards)) return;
    
    const sanitizedCards = cards.map(card => ({
        category: sanitizeString(card.category),
        displayName: sanitizeString(card.displayName),
        number: Number(card.number)
    }));

    localStorage.setItem('bunkerCards', JSON.stringify(sanitizedCards));
}

// Function to load cards from local storage
export function loadCardsFromStorage() {
    try {
        const cards = JSON.parse(localStorage.getItem('bunkerCards'));
        if (!Array.isArray(cards)) return null;

        // Validate each card
        const validCards = cards.filter(card => validateCardData(card, categories));
        return validCards.length === cards.length ? validCards : null;
    } catch {
        return null;
    }
} 