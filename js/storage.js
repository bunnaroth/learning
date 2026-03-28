// Key name 
const FAVORITE_KEY = "moviehub_favorites"; 

// Load favorites from LocalStorage 
function loadFavorites() {
    const stored = localStorage.getItem(FAVORITE_KEY); 
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error("Error parsing favorites from LocalStorage", e); 
            return [];
        }
    }
    return [];
}

// Save favorites to LocalStorage
function saveFavorites(favoriteArray) {
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(favoriteArray));
}