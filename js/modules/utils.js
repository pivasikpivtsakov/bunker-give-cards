// Function to get a random number between min and max (inclusive)
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to sanitize string to prevent XSS
export function sanitizeString(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Function to validate card data
export function validateCardData(card, categories) {
    return (
        card &&
        typeof card === 'object' &&
        typeof card.category === 'string' &&
        typeof card.displayName === 'string' &&
        typeof card.number === 'number' &&
        Object.keys(categories).includes(card.category) &&
        card.number > 0
    );
} 