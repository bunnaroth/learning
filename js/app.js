const state = {
    movies: movies, 
    filteredMovies: movies, 
    selectedGenre: "All", 
    searchKeyword: ""
};

function initApp() {
    renderMovies(state.filteredMovies); 
    renderGenres(state.movies); 
    attachModalEvents(); 
    attachAppEvents(); 
}

function attachModalEvents() {
    const modal = document.getElementById("movieModal"); 
    const closeBtn = document.getElementById("closeModal"); 
    closeBtn.addEventListener("click", () => closeModal()); 
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
}

function attachAppEvents() {
    const searchInput = document.getElementById("searchInput"); 
    searchInput.addEventListener("input", (e) => {
        state.searchKeyword = e.target.value.trim().toLowerCase();
        applyFilters();
    });
    const genreButtons = document.getElementById("genreFilters"); 
    genreButtons.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            state.selectedGenre = e.target.dataset.genre;
            applyFilters();
        }
    });
    const darkToggle = document.getElementById("darkToggle"); 
    darkToggle.addEventListener("click", () => {
        document.body.classList.toggle("bg-gray-900"); 
        document.body.classList.toggle("bg-white");
    });
}

function applyFilters() {
    state.filteredMovies = state.movies.filter((movie) => {
        const matchesGenre = state.selectedGenre === "All" || movie.genre === state.selectedGenre; 
        const matchesSearch = movie.title.toLowerCase().includes(state.searchKeyword); 
        return matchesGenre && matchesSearch;
    });
    renderMovies(state.filteredMovies); 
}

document.addEventListener("DOMContentLoaded", () => {
    initApp();
});