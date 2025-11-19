//=============================================================================
// AnimeSearch 2025 - Modern Redesign
// Author: Luca Mastroianni | BlueMoon
// Enhanced search engine for SUB ITA/ENG Anime with advanced features
//=============================================================================

// Global state
let allAnimeResults = [];
let currentFilters = {
    status: 'all',
    minScore: 0,
    sortBy: 'relevance'
};
let favorites = JSON.parse(localStorage.getItem('anime_favorites') || '[]');
let isShowingFavorites = false;
let searchDebounceTimer = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    _updateFavoritesCount();
    _setupSearchBar();
    _loadMALUsername();
});

//=============================================================================
// MYANIMELIST INTEGRATION
//=============================================================================

function _loadMALUsername() {
    const username = localStorage.getItem('mal_username');
    if (username) {
        document.getElementById('malUsername').value = username;
        _updateMALLink(username);
    }
}

function _saveMALUsername() {
    const username = document.getElementById('malUsername').value.trim();
    if (username) {
        localStorage.setItem('mal_username', username);
        _updateMALLink(username);
        _showToast('Username MyAniList salvato!', 'success');
    } else {
        localStorage.removeItem('mal_username');
        document.getElementById('malProfileLink').style.display = 'none';
        _showToast('Username rimosso', 'info');
    }
}

function _updateMALLink(username) {
    const link = document.getElementById('malProfileLink');
    if (username) {
        link.href = `https://myanimelist.net/profile/${username}`;
        link.style.display = 'flex';
    } else {
        link.style.display = 'none';
    }
}

//=============================================================================
// SEARCH FUNCTIONALITY
//=============================================================================

function _setupSearchBar() {
    const searchInput = document.getElementById('searchBarInput');
    const clearBtn = document.getElementById('clearBtn');
    
    searchInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            clearBtn.classList.add('active');
        } else {
            clearBtn.classList.remove('active');
        }
    });
}

function _clearSearch() {
    document.getElementById('searchBarInput').value = '';
    document.getElementById('clearBtn').classList.remove('active');
    document.getElementById('cardList').innerHTML = '';
    document.getElementById('resultsInfo').style.display = 'none';
}

function _startSearch() {
    const searchInput = document.getElementById('searchBarInput');
    const value = searchInput.value.trim();
    
    if (!value) {
        _showToast('Inserisci un termine di ricerca', 'error');
        return;
    }
    
    if (isShowingFavorites) {
        isShowingFavorites = false;
    }
    
    _showLoading(true);
    _clearResults();
    
    // Jikan v4 API - Free, no API key needed, 60 req/min
    fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(value)}&limit=25`, {
        method: "GET"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella ricerca');
            }
            return response.json();
        })
        .then(data => {
            _showLoading(false);
            
            if (!data.data || data.data.length === 0) {
                _createNullifyHeader();
                return;
            }
            
            // Convert Jikan v4 format to our format
            allAnimeResults = data.data.map(anime => ({
                mal_id: anime.mal_id,
                url: anime.url,
                image_url: anime.images.jpg.large_image_url || anime.images.jpg.image_url,
                title: anime.title,
                airing: anime.airing,
                score: anime.score
            }));
            
            _applyFilters();
            _showToast(`Trovati ${allAnimeResults.length} risultati`, 'success');
        })
        .catch(error => {
            _showLoading(false);
            console.error('Error:', error);
            _showToast('Errore durante la ricerca. Riprova.', 'error');
            _createErrorMessage();
        });
}

//=============================================================================
// FILTER & SORT FUNCTIONALITY
//=============================================================================

function _applyFilters() {
    // Get filter values
    const statusFilter = document.getElementById('statusFilter').value;
    const minScore = parseFloat(document.getElementById('minScore').value);
    const sortBy = document.getElementById('sortBy').value;
    
    currentFilters = { status: statusFilter, minScore, sortBy };
    
    // Filter results
    let filteredResults = allAnimeResults.filter(anime => {
        // Status filter
        if (statusFilter === 'airing' && !anime.airing) return false;
        if (statusFilter === 'completed' && anime.airing) return false;
        
        // Score filter
        if (anime.score && anime.score < minScore) return false;
        
        return true;
    });
    
    // Sort results
    filteredResults = _sortAnime(filteredResults, sortBy);
    
    // Display results
    _clearResults();
    _displayResults(filteredResults);
}

function _sortAnime(animeList, sortBy) {
    const sorted = [...animeList];
    
    switch(sortBy) {
        case 'score-desc':
            sorted.sort((a, b) => (b.score || 0) - (a.score || 0));
            break;
        case 'score-asc':
            sorted.sort((a, b) => (a.score || 0) - (b.score || 0));
            break;
        case 'title-asc':
            sorted.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            // Keep original order (relevance)
            break;
    }
    
    return sorted;
}

function _displayResults(results) {
    const resultsInfo = document.getElementById('resultsInfo');
    const resultsCount = document.getElementById('resultsCount');
    
    if (results.length === 0) {
        _createNullifyHeader();
        resultsInfo.style.display = 'none';
        return;
    }
    
    resultsInfo.style.display = 'block';
    resultsCount.textContent = `${results.length} anime trovati`;
    
    results.forEach(anime => {
        _createCard(anime);
    });
}

//=============================================================================
// CARD CREATION
//=============================================================================

function _createCard(anime) {
    const id = String(anime.mal_id);
    const imgSrc = anime.image_url;
    const title = anime.title;
    const isAiring = anime.airing;
    const score = anime.score || 'N/A';
    const infoUrl = anime.url;
    const isFavorite = favorites.includes(id);
    
    const card = document.createElement("div");
    card.className = "card";
    card.id = id;
    card.innerHTML = `
        <div class="card_image">
            <img src="${imgSrc}" alt="${title}" loading="lazy" />
            <span class="status-badge ${isAiring ? 'airing' : 'completed'}">
                <i class="fas fa-circle"></i>
                ${isAiring ? 'In Onda' : 'Concluso'}
            </span>
            <div class="info-icon-wrapper">
                <button class="info-icon" onclick="_showAnimeDetails('${id}')" title="Dettagli">
                    <i class="fas fa-info-circle"></i>
                </button>
            </div>
            <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                    onclick="_toggleFavorite(event, '${id}')" 
                    title="${isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}">
                <i class="fas fa-heart"></i>
            </button>
        </div>
        <div class="card_content">
            <h3 class="card_title">${title}</h3>
            <div class="card_meta">
                <span class="score-badge">
                    <i class="fas fa-star"></i>
                    ${score}
                </span>
            </div>
            <div class="card_streamings">
                <p class="streamings-title">Guarda su:</p>
                <div class="streaming-list">
                    <button class="streaming-icon" 
                            onclick="_animeSaturn('${encodeURIComponent(title)}')" 
                            title="AnimeSaturn">
                        <i class="fas fa-globe-europe"></i>
                    </button>
                    <button class="streaming-icon" 
                            onclick="_animeUnity('${encodeURIComponent(title)}')" 
                            title="AnimeUnity">
                        <i class="fas fa-infinity"></i>
                    </button>
                    <button class="streaming-icon" 
                            onclick="_socialAnime('${encodeURIComponent(title)}')" 
                            title="SocialAnime">
                        <i class="fab fa-stripe-s"></i>
                    </button>
                    <button class="streaming-icon" 
                            onclick="_animeHDITA('${encodeURIComponent(title)}')" 
                            title="AnimeHD ITA">
                        <i class="fas fa-tv"></i>
                    </button>
                    <button class="streaming-icon" 
                            onclick="_yamatoVideo('${encodeURIComponent(title)}')" 
                            title="Yamato Video">
                        <i class="fab fa-youtube"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById("cardList").appendChild(card);
}

//=============================================================================
// STREAMING LINKS
//=============================================================================

function _animeSaturn(title) {
    window.open("https://www.animesaturn.it/animelist?search=" + title, "_blank");
}

function _socialAnime(title) {
    window.open("https://socialanime.it/search?q=" + title, "_blank");
}

function _animeHDITA(title) {
    window.open("https://www.animehdita.org/?s=" + title, "_blank");
}

function _yamatoVideo(title) {
    const decodedTitle = decodeURIComponent(title);
    window.open("https://www.youtube.com/results?search_query=yamato+" + decodedTitle.replace(/\s/g, "+"), "_blank");
}

function _animeUnity(title) {
    window.open("https://www.animeunity.it/archivio?title=" + title, "_blank");
}

//=============================================================================
// FAVORITES SYSTEM
//=============================================================================

function _toggleFavorite(event, animeId) {
    event.stopPropagation();
    
    const index = favorites.indexOf(animeId);
    const btn = event.currentTarget;
    
    if (index > -1) {
        // Remove from favorites
        favorites.splice(index, 1);
        btn.classList.remove('active');
        btn.title = 'Aggiungi ai preferiti';
        _showToast('Rimosso dai preferiti', 'info');
        
        // If showing favorites view, remove card
        if (isShowingFavorites) {
            const card = document.getElementById(animeId);
            if (card) {
                card.style.animation = 'cardAppear 0.3s ease reverse';
                setTimeout(() => card.remove(), 300);
            }
        }
    } else {
        // Add to favorites
        favorites.push(animeId);
        btn.classList.add('active');
        btn.title = 'Rimuovi dai preferiti';
        _showToast('Aggiunto ai preferiti!', 'success');
    }
    
    localStorage.setItem('anime_favorites', JSON.stringify(favorites));
    _updateFavoritesCount();
}

function _updateFavoritesCount() {
    const favCount = document.getElementById('favCount');
    if (favCount) {
        favCount.textContent = favorites.length;
    }
}

function _toggleFavoritesView() {
    if (favorites.length === 0) {
        _showToast('Nessun anime nei preferiti', 'info');
        return;
    }
    
    isShowingFavorites = !isShowingFavorites;
    
    if (isShowingFavorites) {
        _showLoading(true);
        _clearResults();
        
        // Fetch favorite anime details
        const favoritePromises = favorites.map(id => {
            return fetch(`https://api.jikan.moe/v4/anime/${id}`)
            .then(response => response.json())
            .then(data => data.data)
            .catch(() => null);
        });
        
        Promise.all(favoritePromises)
            .then(results => {
                _showLoading(false);
                const validResults = results.filter(r => r && r.mal_id);
                
                if (validResults.length === 0) {
                    _createNullifyHeader();
                    return;
                }
                
                // Convert to search result format
                allAnimeResults = validResults.map(anime => ({
                    mal_id: anime.mal_id,
                    url: anime.url,
                    image_url: anime.images.jpg.large_image_url || anime.images.jpg.image_url,
                    title: anime.title,
                    airing: anime.airing,
                    score: anime.score
                }));
                
                _displayResults(allAnimeResults);
                
                const resultsInfo = document.getElementById('resultsInfo');
                const resultsCount = document.getElementById('resultsCount');
                resultsInfo.style.display = 'block';
                resultsCount.textContent = `${validResults.length} anime nei preferiti`;
            });
    } else {
        // Return to previous search or clear
        _clearResults();
        document.getElementById('resultsInfo').style.display = 'none';
    }
}

//=============================================================================
// MODAL FOR ANIME DETAILS
//=============================================================================

function _showAnimeDetails(animeId) {
    const modal = document.getElementById('animeModal');
    const modalBody = document.getElementById('modalBody');
    
    modal.classList.add('active');
    modalBody.innerHTML = '<div class="loading-container"><div class="spinner"></div><p>Caricamento dettagli...</p></div>';
    
    fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
    .then(response => response.json())
    .then(result => {
        const anime = result.data;
        const genres = anime.genres ? anime.genres.map(g => g.name).join(', ') : 'N/A';
        const studios = anime.studios ? anime.studios.map(s => s.name).join(', ') : 'N/A';
        const episodes = anime.episodes || 'N/A';
        const duration = anime.duration || 'N/A';
        const premiered = anime.season && anime.year ? `${anime.season} ${anime.year}` : 'N/A';
        const imgUrl = anime.images.jpg.large_image_url || anime.images.jpg.image_url;
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <img src="${imgUrl}" alt="${anime.title}" class="modal-image">
                <div class="modal-info">
                    <h2>${anime.title}</h2>
                    <div class="modal-tags">
                        <span class="modal-tag"><i class="fas fa-star"></i> Score: ${anime.score || 'N/A'}</span>
                        <span class="modal-tag"><i class="fas fa-film"></i> Episodi: ${episodes}</span>
                        <span class="modal-tag"><i class="fas fa-clock"></i> ${duration}</span>
                        <span class="modal-tag"><i class="fas fa-calendar"></i> ${premiered}</span>
                    </div>
                    <div class="modal-tags">
                        <span class="modal-tag"><i class="fas fa-tag"></i> ${genres}</span>
                    </div>
                    <div class="modal-tags">
                        <span class="modal-tag"><i class="fas fa-building"></i> ${studios}</span>
                    </div>
                </div>
            </div>
            <div class="modal-synopsis">
                <h3>Sinossi</h3>
                <p>${anime.synopsis || 'Nessuna sinossi disponibile.'}</p>
            </div>
        `;
    })
    .catch(error => {
        console.error('Error fetching anime details:', error);
        modalBody.innerHTML = `
            <div class="no-results">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Errore</h2>
                <p>Impossibile caricare i dettagli dell'anime.</p>
            </div>
        `;
    });
}

function _closeModal() {
    const modal = document.getElementById('animeModal');
    modal.classList.remove('active');
}

// Close modal on outside click
document.addEventListener('click', function(event) {
    const modal = document.getElementById('animeModal');
    if (event.target === modal) {
        _closeModal();
    }
});

//=============================================================================
// UI HELPERS
//=============================================================================

function _showLoading(show) {
    const loading = document.getElementById('loadingSpinner');
    loading.style.display = show ? 'flex' : 'none';
}

function _clearResults() {
    document.getElementById('cardList').innerHTML = '';
}

function _createNullifyHeader() {
    const cardList = document.getElementById('cardList');
    cardList.innerHTML = `
        <div class="no-results" style="grid-column: 1 / -1;">
            <i class="fas fa-search"></i>
            <h2>Nessun risultato trovato</h2>
            <p>Prova con un altro termine di ricerca o modifica i filtri</p>
        </div>
    `;
}

function _createErrorMessage() {
    const cardList = document.getElementById('cardList');
    cardList.innerHTML = `
        <div class="no-results" style="grid-column: 1 / -1;">
            <i class="fas fa-exclamation-triangle"></i>
            <h2>Errore di connessione</h2>
            <p>Si è verificato un errore durante la ricerca. Riprova tra qualche istante.</p>
        </div>
    `;
}

function _showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

//=============================================================================
// KEYBOARD SHORTCUTS
//=============================================================================

document.addEventListener('keydown', function(event) {
    // ESC to close modal
    if (event.key === 'Escape') {
        const modal = document.getElementById('animeModal');
        if (modal.classList.contains('active')) {
            _closeModal();
        }
    }
    
    // Ctrl/Cmd + K to focus search
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        document.getElementById('searchBarInput').focus();
    }
});
