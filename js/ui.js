// Render Genre Buttons 
function renderGenres(movieList) {
    const genreContainer = document.getElementById("genreFilters"); 

    // Extract unique genres 
    const genres = ["All", ...new Set(movieList.map(m => m.genre))]; 

    genreContainer.innerHTML = ""; 

    genres.forEach(genre => {
        const button = document.createElement("button"); 

        button.textContent = genre; 

        button.className = `
        px-6 py-2.5 rounded-full font-semibold text-sm uppercase tracking-wide bg-gray-800 text-gray-200 border border-gray-700
        hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 hover:scale-105 cursor-pointer shadow-md`;

        button.dataset.genre = genre;

        genreContainer.appendChild(button);
    });
}

// Open modal 
function openModal(movie) {
    const modal = document.getElementById("movieModal"); 
    const modalContent = document.getElementById("modalContent");

    modalContent.innerHTML = `
    <div class="flex flex-col">
        <div class="w-full aspect-video rounded-lg overflow-hidden mb-6 flex items-center justify-center bg-gray-800">
            <img 
                src="${movie.poster}"
                alt="${movie.title}"
                class="w-full h-full object-contain"/>
        </div>
        <h2 class="text-3xl font-black mb-4 text-white">${movie.title}</h2>
        <div class="flex gap-4 mb-6 flex-wrap items-center">
            <span class="bg-red-600 text-white px-4 py-2 rounded-full font-bold">${movie.genre}</span>
            <span class="text-yellow-400 font-bold text-lg">⭐ ${movie.rating}</span>
            <span class="text-gray-400 ">${movie.year}</span>
        </div>
        
        <p class="text-gray-300 leading-relaxed text-base">
            ${movie.description}
        </p>
    </div>`;

    modal.classList.remove("hidden");
}

// Close modal 
function closeModal() {
    const modal = document.getElementById("movieModal"); 
    modal.classList.add("hidden");
}

// Render all movies 
function renderMovies(movieList) {
    const movieGrid = document.getElementById('movieGrid'); 

    // Clear existing content 
    movieGrid.innerHTML = ""; 

    if (movieList.length === 0) {
        movieGrid.innerHTML = `
        <p class="text-center col-span-full text-gray-500 text-lg">
            No movies found
        </p>`;
        return;
    }

    movieList.forEach(movie => {
        const card = createMovieCard(movie); 
        movieGrid.append(card);
    });
}

// Create Movie Card 
function createMovieCard(movie) {
    const card = document.createElement("div");

    card.className = `
    bg-gray-900 rounded-xl shadow-xl overflow-hidden 
    hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer
    relative border border-gray-700 group`;

    card.innerHTML = `
        <div class="relative overflow-hidden bg-gray-800 aspect-video flex items-center justify-center">
            <img 
                src="${movie.poster}"
                alt="${movie.title}"
                class="w-full h-full object-contain group-hover:brightness-75 transition-all duration-300"
            />

            <button class="absolute top-3 right-3 text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-colors">
                ${favorites.includes(movie.id) ? "❤️" : "🤍"}
            </button>
        </div>

        <div class="p-4 bg-gradient-to-b from-gray-900 to-gray-950">
            <h3 class="text-lg font-bold mb-2 text-white truncate">${movie.title}</h3>
            <div class="flex justify-between items-center text-sm text-gray-400 mb-3">
                <span class="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">${movie.genre}</span>
                <span class="font-semibold text-yellow-400">⭐ ${movie.rating}</span>
            </div>

            <p class="text-xs text-gray-500">${movie.year}</p>
        </div>
    `;

    // Favorite button handler
    const favoriteBtn = card.querySelector("button"); 
    favoriteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); 
        toggleFavorite(movie.id);
    });

    // Open modal when clicked
    card.addEventListener("click", () => {
        openModal(movie)
    });

    return card;
}