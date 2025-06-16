import { sanitizeString } from './utils.js';

let scrollPosition = 0;

// Function to show popup with image
export function showPopup(imageSrc, title) {
    const popup = document.getElementById('cardPopup');
    const popupImage = popup.querySelector('.popup-image');
    
    // Save current scroll position
    scrollPosition = window.pageYOffset;
    
    popupImage.src = sanitizeString(imageSrc);
    popupImage.alt = sanitizeString(title);
    popup.style.display = 'flex';
    
    // Prevent body scrolling
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
}

// Function to hide popup
export function hidePopup() {
    const popup = document.getElementById('cardPopup');
    popup.style.display = 'none';
    
    // Restore body scrolling
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPosition);
}
