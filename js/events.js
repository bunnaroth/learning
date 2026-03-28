// Initialize Favorite from Storage 
let favorites = loadFavorites(); 

// Toggle Favorite 
function toggleFavorite(movieId) {
    const index = favorites.indexOf(movieId); 

    if (index === -1) {
        // Add to favorite 
        favorites.push(movieId);
    } else {
        // Remove from favorite 
        favorites.splice(index, 1);
    }

    // Save updated favorites
    saveFavorites(favorites); 

    // Reflect favorite status 
    renderMovies(state.filteredMovies);
}

