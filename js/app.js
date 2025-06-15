import { dealCards, initCards, showBunkerTypeCard } from './modules/cards.js';
import { showPopup, hidePopup } from './modules/popup.js';

// Make popup functions available globally for onclick handlers
window.showPopup = showPopup;

// Initialize the app
function init() {
    // Initialize cards
    initCards();

    // Add event listeners
    document.getElementById('dealCards').addEventListener('click', dealCards);
    document.querySelector('.popup-close').addEventListener('click', hidePopup);
    
    // Bunker type card handling
    document.getElementById('showBunkerType').addEventListener('click', () => {
        const number = parseInt(document.getElementById('bunkerTypeNumber').value);
        if (!isNaN(number)) {
            showBunkerTypeCard(number);
        }
    });

    // Close popup when clicking outside the image
    document.getElementById('cardPopup').addEventListener('click', (e) => {
        if (e.target.id === 'cardPopup') {
            hidePopup();
        }
    });
}

// Start the app
init(); 