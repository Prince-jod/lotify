/* ============================================================
   SPOTIFY CLONE — script.js
   Author: Senior Frontend Dev
   ============================================================ */

'use strict';

/* ============================================================
   SONG DATA
   NOTE: Replace `src` with real audio file paths (e.g. './audio/song1.mp3')
         or hosted URLs. The player uses HTML5 <audio>.
         We use royalty-free demo URLs as fallbacks.
   ============================================================ */
const songs = [
  {
    id: 1,
    title: "Midnight Bloom",
    artist: "Aurora Skies",
    album: "Neon Dreams",
    genre: "Synthwave",
    duration: "3:42",
    durationSec: 222,
    /* Use a real .mp3 path like './audio/midnight-bloom.mp3' */
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/seed/song1/300/300",
    color: "#1a3a4a"
  },
  {
    id: 2,
    title: "Velvet Thunder",
    artist: "The Crimson Wave",
    album: "Electric Pulse",
    genre: "Indie Rock",
    duration: "4:10",
    durationSec: 250,
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/seed/song2/300/300",
    color: "#3a1a2a"
  },
  {
    id: 3,
    title: "Coastal Drift",
    artist: "Solaris & Friends",
    album: "Summer Haze",
    genre: "Chillout",
    duration: "3:55",
    durationSec: 235,
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/seed/song3/300/300",
    color: "#1a3a2a"
  },
  {
    id: 4,
    title: "Neon Cathedrals",
    artist: "Phantom Circuit",
    album: "Dark Matter",
    genre: "Electronic",
    duration: "5:03",
    durationSec: 303,
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    cover: "https://picsum.photos/seed/song4/300/300",
    color: "#2a1a4a"
  },
  {
    id: 5,
    title: "Golden Hour",
    artist: "Lena Hart",
    album: "Wanderlust",
    genre: "Indie Pop",
    duration: "3:28",
    durationSec: 208,
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    cover: "https://picsum.photos/seed/song5/300/300",
    color: "#4a3a1a"
  },
  {
    id: 6,
    title: "Starfall",
    artist: "Nova Collective",
    album: "Orbit",
    genre: "Ambient",
    duration: "4:33",
    durationSec: 273,
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    cover: "https://picsum.photos/seed/song6/300/300",
    color: "#1a2a4a"
  },
  {
    id: 7,
    title: "Last Dance",
    artist: "The Velvet Room",
    album: "Midnight Sessions",
    genre: "R&B",
    duration: "3:14",
    durationSec: 194,
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    cover: "https://picsum.photos/seed/song7/300/300",
    color: "#4a1a1a"
  },
  {
    id: 8,
    title: "Echo Valley",
    artist: "Mountain Wolves",
    album: "Wild North",
    genre: "Folk",
    duration: "4:55",
    durationSec: 295,
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    cover: "https://picsum.photos/seed/song8/300/300",
    color: "#1a4a1a"
  }
];

/* Playlists definition */
const playlists = [
  {
    id: 'pl-1',
    name: "Chill Vibes",
    description: "Relax and drift away",
    trackIds: [3, 5, 8, 6],
    cover: "https://picsum.photos/seed/pl1/300/300",
    color: "#0d4429"
  },
  {
    id: 'pl-2',
    name: "Night Drive",
    description: "Late night electronic energy",
    trackIds: [1, 4, 6, 2],
    cover: "https://picsum.photos/seed/pl2/300/300",
    color: "#2d0d44"
  },
  {
    id: 'pl-3',
    name: "Rock Anthems",
    description: "Turn it up loud",
    trackIds: [2, 7, 1, 8],
    cover: "https://picsum.photos/seed/pl3/300/300",
    color: "#44200d"
  },
  {
    id: 'pl-4',
    name: "Indie Mornings",
    description: "Start your day right",
    trackIds: [5, 3, 7, 6],
    cover: "https://picsum.photos/seed/pl4/300/300",
    color: "#0d2844"
  },
  {
    id: 'pl-5',
    name: "All Stars",
    description: "The complete collection",
    trackIds: [1, 2, 3, 4, 5, 6, 7, 8],
    cover: "https://picsum.photos/seed/pl5/300/300",
    color: "#1a1a2e"
  }
];

/* Browse categories */
const categories = [
  { name: "Pop",        color: "#E8115B", img: "https://picsum.photos/seed/cat1/80/80" },
  { name: "Hip-Hop",   color: "#BA5D07", img: "https://picsum.photos/seed/cat2/80/80" },
  { name: "Electronic",color: "#1E3264", img: "https://picsum.photos/seed/cat3/80/80" },
  { name: "Rock",      color: "#8D67AB", img: "https://picsum.photos/seed/cat4/80/80" },
  { name: "R&B",       color: "#0D73EC", img: "https://picsum.photos/seed/cat5/80/80" },
  { name: "Indie",     color: "#1AA34A", img: "https://picsum.photos/seed/cat6/80/80" },
  { name: "Ambient",   color: "#148A08", img: "https://picsum.photos/seed/cat7/80/80" },
  { name: "Folk",      color: "#E61E32", img: "https://picsum.photos/seed/cat8/80/80" }
];

/* ============================================================
   APP STATE
   ============================================================ */
const state = {
  currentIndex: -1,       // index in `songs` of currently loaded track
  isPlaying: false,
  isShuffle: false,
  repeatMode: 0,          // 0=off, 1=all, 2=one
  volume: 0.7,
  isMuted: false,
  likedSongs: new Set(),
  currentSection: 'home', // 'home' | 'search' | 'library'
  isDraggingProgress: false,
  isDraggingVolume: false,
  shuffleQueue: [],
  shufflePos: 0
};

/* ============================================================
   DOM REFS
   ============================================================ */
const audio           = document.getElementById('audioPlayer');
const playPauseBtn    = document.getElementById('playPauseBtn');
const playPauseIcon   = document.getElementById('playPauseIcon');
const prevBtn         = document.getElementById('prevBtn');
const nextBtn         = document.getElementById('nextBtn');
const shuffleBtn      = document.getElementById('shuffleBtn');
const repeatBtn       = document.getElementById('repeatBtn');
const likeBtn         = document.getElementById('likeBtn');
const playerSong      = document.getElementById('playerSong');
const playerArtist    = document.getElementById('playerArtist');
const playerThumb     = document.getElementById('playerThumb');
const playerThumbLoading = document.getElementById('playerThumbLoading');
const progressFill    = document.getElementById('progressFill');
const progressThumb   = document.getElementById('progressThumb');
const progressBarWrap = document.getElementById('progressBarWrap');
const currentTimeEl   = document.getElementById('currentTime');
const totalTimeEl     = document.getElementById('totalTime');
const volFill         = document.getElementById('volFill');
const volThumb        = document.getElementById('volThumb');
const volBarWrap      = document.getElementById('volBarWrap');
const volBtn          = document.getElementById('volBtn');
const volIcon         = document.getElementById('volIcon');
const greetingRow     = document.getElementById('greetingRow');
const featuredRow     = document.getElementById('featuredRow');
const trackListContainer = document.getElementById('trackListContainer');
const categoryGrid    = document.getElementById('categoryGrid');
const libraryList     = document.getElementById('libraryList');
const libraryCards    = document.getElementById('libraryCards');
const libraryPromo    = document.getElementById('libraryPromo');
const searchInput     = document.getElementById('searchInput');
const searchResults   = document.getElementById('searchResults');
const searchEmpty     = document.getElementById('searchEmpty');
const clearSearch     = document.getElementById('clearSearch');
const toast           = document.getElementById('toast');
const menuToggle      = document.getElementById('menuToggle');
const sidebar         = document.getElementById('sidebar');
const sidebarOverlay  = document.getElementById('sidebarOverlay');

/* Nav links */
const navLinks = document.querySelectorAll('.nav-link');

/* ============================================================
   INITIALISE
   ============================================================ */
function init() {
  renderGreeting();
  renderFeaturedPlaylists();
  renderTrackList(songs, trackListContainer);
  renderCategories();
  renderLibrarySidebar();
  renderLibrarySection();
  setVolume(state.volume);
  setupEventListeners();
}

/* ============================================================
   RENDER: GREETING CARDS (recently played — use playlists)
   ============================================================ */
function renderGreeting() {
  const hour = new Date().getHours();
  let greet;
  if (hour < 12)      greet = "Good morning";
  else if (hour < 18) greet = "Good afternoon";
  else                greet = "Good evening";

  // We'll put the heading above the grid via a temporary trick:
  // add a full-width item first
  greetingRow.innerHTML = '';

  // Insert a heading row (spans full grid)
  const h1 = document.createElement('h1');
  h1.textContent = greet;
  h1.style.cssText = 'font-family:"Nunito",sans-serif;font-weight:900;font-size:1.75rem;grid-column:1/-1;margin-bottom:4px;';
  greetingRow.appendChild(h1);

  // Show 6 greeting cards using playlists + first two songs
  const items = [
    ...playlists.slice(0, 4),
    { name: songs[0].title, cover: songs[0].cover, _songId: songs[0].id },
    { name: songs[4].title, cover: songs[4].cover, _songId: songs[4].id }
  ];

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'greeting-card fade-in';
    card.innerHTML = `
      <img src="${item.cover}" alt="${item.name}" loading="lazy" />
      <span class="greeting-card-title">${item.name}</span>
      <button class="greeting-play-btn" aria-label="Play ${item.name}">
        <span class="material-icons-round">play_arrow</span>
      </button>
    `;

    card.addEventListener('click', () => {
      if (item._songId) {
        const idx = songs.findIndex(s => s.id === item._songId);
        playSong(idx);
      } else {
        // play first track of playlist
        const pl = playlists.find(p => p.id === item.id);
        if (pl && pl.trackIds.length) {
          const idx = songs.findIndex(s => s.id === pl.trackIds[0]);
          playSong(idx);
        }
      }
    });

    greetingRow.appendChild(card);
  });
}

/* ============================================================
   RENDER: FEATURED PLAYLIST CARDS
   ============================================================ */
function renderFeaturedPlaylists() {
  featuredRow.innerHTML = '';
  playlists.forEach(pl => {
    const card = createCard({
      title: pl.name,
      sub: pl.description,
      imgSrc: pl.cover,
      onPlay: () => {
        const idx = songs.findIndex(s => s.id === pl.trackIds[0]);
        playSong(idx);
        showToast(`Playing: ${pl.name}`);
      }
    });
    featuredRow.appendChild(card);
  });
}

/* ============================================================
   RENDER: TRACK LIST
   ============================================================ */
function renderTrackList(trackArray, container, showHeader = true) {
  container.innerHTML = '';

  if (showHeader) {
    const header = document.createElement('div');
    header.className = 'track-list-header';
    header.innerHTML = `
      <span class="th-num">#</span>
      <span>Title</span>
      <span class="th-album">Album</span>
      <span class="th-dur">
        <span class="material-icons-round" style="font-size:1rem;vertical-align:middle">schedule</span>
      </span>
    `;
    container.appendChild(header);
  }

  if (trackArray.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'No tracks found.';
    empty.style.cssText = 'color:var(--text-subdued);padding:24px 16px;';
    container.appendChild(empty);
    return;
  }

  trackArray.forEach((song, i) => {
    const globalIdx = songs.indexOf(song);
    const row = document.createElement('div');
    row.className = 'track-row';
    row.dataset.index = globalIdx;
    if (state.currentIndex === globalIdx) row.classList.add('active-track');

    row.innerHTML = `
      <div class="track-num">
        <span class="num-text">${i + 1}</span>
        <span class="material-icons-round play-hover-icon">play_arrow</span>
        <div class="playing-bars" aria-label="Now playing">
          <span></span><span></span><span></span>
        </div>
      </div>
      <div class="track-info">
        <img src="${song.cover}" alt="${song.title}" loading="lazy" />
        <div class="track-text">
          <div class="track-name">${song.title}</div>
          <div class="track-artist">${song.artist}</div>
        </div>
      </div>
      <div class="track-album">${song.album}</div>
      <div class="track-duration">${song.duration}</div>
    `;

    row.addEventListener('click', () => {
      if (state.currentIndex === globalIdx) {
        togglePlayPause();
      } else {
        playSong(globalIdx);
      }
    });

    // Right-click context simulation
    row.addEventListener('contextmenu', e => {
      e.preventDefault();
      showToast(`Saved "${song.title}" to library`);
    });

    container.appendChild(row);
  });
}

/* ============================================================
   RENDER: CATEGORIES
   ============================================================ */
function renderCategories() {
  categoryGrid.innerHTML = '';
  categories.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.style.background = cat.color;
    card.innerHTML = `
      <h3>${cat.name}</h3>
      <img class="cat-img" src="${cat.img}" alt="${cat.name}" loading="lazy" />
    `;
    card.addEventListener('click', () => {
      // Filter tracks by genre and show in search
      navigateTo('search');
      searchInput.value = cat.name;
      handleSearch(cat.name);
    });
    categoryGrid.appendChild(card);
  });
}

/* ============================================================
   RENDER: LIBRARY SIDEBAR
   ============================================================ */
function renderLibrarySidebar() {
  libraryList.innerHTML = '';
  libraryPromo.style.display = 'none'; // hide promo once we have library content

  playlists.forEach(pl => {
    const li = document.createElement('li');
    li.className = 'library-item';
    li.dataset.playlistId = pl.id;

    const currentPlaylistSong = songs[state.currentIndex];
    const isCurrentPlaylist = currentPlaylistSong &&
      pl.trackIds.includes(currentPlaylistSong.id);

    li.innerHTML = `
      <img src="${pl.cover}" alt="${pl.name}" loading="lazy" />
      <div class="library-item-info">
        <div class="library-item-title">${pl.name}</div>
        <div class="library-item-meta">
          ${isCurrentPlaylist && state.isPlaying ? '<span class="playing-dot material-icons-round" style="font-size:0.75rem;color:var(--green)">graphic_eq</span>' : ''}
          Playlist · ${pl.trackIds.length} songs
        </div>
      </div>
    `;

    li.addEventListener('click', () => {
      const idx = songs.findIndex(s => s.id === pl.trackIds[0]);
      playSong(idx);
      showToast(`Playing: ${pl.name}`);
      highlightLibraryItem(pl.id);
    });

    libraryList.appendChild(li);
  });
}

function highlightLibraryItem(plId) {
  document.querySelectorAll('.library-item').forEach(el => {
    el.classList.toggle('active-lib', el.dataset.playlistId === plId);
  });
}

/* ============================================================
   RENDER: LIBRARY SECTION (main content)
   ============================================================ */
function renderLibrarySection() {
  libraryCards.innerHTML = '';
  playlists.forEach(pl => {
    const card = createCard({
      title: pl.name,
      sub: `Playlist · ${pl.trackIds.length} songs`,
      imgSrc: pl.cover,
      onPlay: () => {
        const idx = songs.findIndex(s => s.id === pl.trackIds[0]);
        playSong(idx);
        showToast(`Playing: ${pl.name}`);
      }
    });
    libraryCards.appendChild(card);
  });
}

/* ============================================================
   HELPER: Create a Card element
   ============================================================ */
function createCard({ title, sub, imgSrc, onPlay, round = false }) {
  const card = document.createElement('div');
  card.className = 'card fade-in';

  card.innerHTML = `
    <div class="card-img-wrap ${round ? 'round' : ''}">
      <img src="${imgSrc}" alt="${title}" loading="lazy" />
      <button class="card-play-btn" aria-label="Play ${title}">
        <span class="material-icons-round">play_arrow</span>
      </button>
    </div>
    <div class="card-title">${title}</div>
    <div class="card-sub">${sub}</div>
  `;

  card.querySelector('.card-play-btn').addEventListener('click', e => {
    e.stopPropagation();
    onPlay();
  });

  card.addEventListener('click', () => onPlay());

  return card;
}

/* ============================================================
   AUDIO PLAYBACK
   ============================================================ */

/**
 * Load and play a song by its index in `songs` array
 */
function playSong(index) {
  if (index < 0 || index >= songs.length) return;

  const song = songs[index];
  state.currentIndex = index;
  state.isPlaying = false;

  // Show loading spinner
  playerThumbLoading.classList.remove('hidden');
  playerThumb.style.opacity = '0';

  // Update player info
  playerSong.textContent   = song.title;
  playerArtist.textContent = song.artist;

  // Set thumbnail
  const tempImg = new Image();
  tempImg.onload = () => {
    playerThumb.src = song.cover;
    playerThumb.alt = song.title;
    playerThumb.style.opacity = '1';
    playerThumbLoading.classList.add('hidden');
    playerThumb.classList.add('loading-ring');
    setTimeout(() => playerThumb.classList.remove('loading-ring'), 1000);
  };
  tempImg.onerror = () => {
    playerThumbLoading.classList.add('hidden');
    playerThumb.style.opacity = '1';
  };
  tempImg.src = song.cover;

  // Load audio
  audio.src = song.src;
  audio.load();
  audio.play().then(() => {
    state.isPlaying = true;
    updatePlayPauseIcon();
    updateTrackRows();
    updateLikeButton();
    renderLibrarySidebar(); // refresh playing indicator
  }).catch(err => {
    console.warn('Playback failed:', err);
    showToast('Could not load audio. Check file path.');
    playerThumbLoading.classList.add('hidden');
  });

  // Set total time from metadata (fallback to stored)
  totalTimeEl.textContent = song.duration;

  // Update document title
  document.title = `${song.title} • ${song.artist} — Spotify`;
}

function togglePlayPause() {
  if (state.currentIndex === -1) {
    playSong(0);
    return;
  }

  if (state.isPlaying) {
    audio.pause();
    state.isPlaying = false;
  } else {
    audio.play().catch(err => console.warn(err));
    state.isPlaying = true;
  }

  updatePlayPauseIcon();
  updateTrackRows();
}

function playNext() {
  if (state.isShuffle) {
    playShuffleNext();
    return;
  }
  let next = state.currentIndex + 1;
  if (next >= songs.length) next = 0;
  playSong(next);
}

function playPrev() {
  // If more than 3s played, restart; otherwise go back
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }

  if (state.isShuffle) {
    playShufflePrev();
    return;
  }

  let prev = state.currentIndex - 1;
  if (prev < 0) prev = songs.length - 1;
  playSong(prev);
}

/* Shuffle */
function buildShuffleQueue() {
  const indices = songs.map((_, i) => i).filter(i => i !== state.currentIndex);
  // Fisher-Yates shuffle
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  if (state.currentIndex >= 0) indices.unshift(state.currentIndex);
  state.shuffleQueue = indices;
  state.shufflePos   = 0;
}

function playShuffleNext() {
  if (!state.shuffleQueue.length) buildShuffleQueue();
  state.shufflePos = (state.shufflePos + 1) % state.shuffleQueue.length;
  playSong(state.shuffleQueue[state.shufflePos]);
}

function playShufflePrev() {
  if (!state.shuffleQueue.length) buildShuffleQueue();
  state.shufflePos = (state.shufflePos - 1 + state.shuffleQueue.length) % state.shuffleQueue.length;
  playSong(state.shuffleQueue[state.shufflePos]);
}

/* ============================================================
   VOLUME
   ============================================================ */
function setVolume(v) {
  v = Math.max(0, Math.min(1, v));
  state.volume = v;
  audio.volume = v;

  const pct = (v * 100).toFixed(1) + '%';
  volFill.style.width  = pct;
  volThumb.style.left  = pct;
  volBarWrap.setAttribute('aria-valuenow', Math.round(v * 100));

  // Update icon
  if (v === 0 || state.isMuted) {
    volIcon.textContent = 'volume_off';
  } else if (v < 0.4) {
    volIcon.textContent = 'volume_down';
  } else {
    volIcon.textContent = 'volume_up';
  }
}

function toggleMute() {
  state.isMuted = !state.isMuted;
  audio.muted = state.isMuted;
  volIcon.textContent = state.isMuted ? 'volume_off' : (state.volume < 0.4 ? 'volume_down' : 'volume_up');
}

/* ============================================================
   UI UPDATES
   ============================================================ */
function updatePlayPauseIcon() {
  playPauseIcon.textContent = state.isPlaying ? 'pause' : 'play_arrow';
}

function updateTrackRows() {
  document.querySelectorAll('.track-row').forEach(row => {
    const idx = parseInt(row.dataset.index);
    row.classList.toggle('active-track', idx === state.currentIndex);
  });
}

function updateLikeButton() {
  if (state.currentIndex < 0) return;
  const songId = songs[state.currentIndex].id;
  const liked  = state.likedSongs.has(songId);
  likeBtn.classList.toggle('liked', liked);
  likeBtn.querySelector('.material-icons-round').textContent = liked ? 'favorite' : 'favorite_border';
  likeBtn.style.color = liked ? 'var(--green)' : '';
}

function formatTime(secs) {
  if (isNaN(secs) || !isFinite(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/* ============================================================
   SEARCH
   ============================================================ */
function handleSearch(query) {
  query = (query || '').trim().toLowerCase();
  clearSearch.classList.toggle('hidden', !query);

  if (!query) {
    searchResults.innerHTML = '';
    searchEmpty.classList.remove('hidden');
    return;
  }

  searchEmpty.classList.add('hidden');

  const results = songs.filter(s =>
    s.title.toLowerCase().includes(query)  ||
    s.artist.toLowerCase().includes(query) ||
    s.album.toLowerCase().includes(query)  ||
    s.genre.toLowerCase().includes(query)
  );

  renderTrackList(results, searchResults, true);
}

/* ============================================================
   NAVIGATION
   ============================================================ */
function navigateTo(section) {
  state.currentSection = section;

  // Update nav links
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === section);
  });

  // Show/hide sections
  document.getElementById('homeSection').classList.toggle('hidden',    section !== 'home');
  document.getElementById('searchSection').classList.toggle('hidden',  section !== 'search');
  document.getElementById('librarySection').classList.toggle('hidden', section !== 'library');

  // Scroll main content to top
  document.querySelector('.main-content').scrollTop = 0;

  // Close mobile sidebar
  closeSidebar();
}

function scrollToPlaylists() {
  navigateTo('library');
}

/* ============================================================
   TOAST NOTIFICATION
   ============================================================ */
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ============================================================
   MOBILE SIDEBAR
   ============================================================ */
function openSidebar() {
  sidebar.classList.add('open');
  sidebarOverlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('visible');
  document.body.style.overflow = '';
}

/* ============================================================
   DRAG HELPERS for progress/volume bars
   ============================================================ */
function getBarValue(e, barEl) {
  const rect   = barEl.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  let ratio   = (clientX - rect.left) / rect.width;
  return Math.max(0, Math.min(1, ratio));
}

function applyProgressSeek(ratio) {
  const duration = audio.duration;
  if (!isFinite(duration) || isNaN(duration)) return;
  audio.currentTime = ratio * duration;
  const pct = (ratio * 100).toFixed(2) + '%';
  progressFill.style.width  = pct;
  progressThumb.style.left  = pct;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  progressBarWrap.setAttribute('aria-valuenow', Math.round(ratio * 100));
}

function applyVolumeChange(ratio) {
  setVolume(ratio);
  if (state.isMuted && ratio > 0) {
    state.isMuted = false;
    audio.muted   = false;
  }
}

/* ============================================================
   EVENT LISTENERS
   ============================================================ */
function setupEventListeners() {

  /* ---- Playback controls ---- */
  playPauseBtn.addEventListener('click', togglePlayPause);
  nextBtn.addEventListener('click', playNext);
  prevBtn.addEventListener('click', playPrev);

  shuffleBtn.addEventListener('click', () => {
    state.isShuffle = !state.isShuffle;
    shuffleBtn.classList.toggle('active-ctrl', state.isShuffle);
    if (state.isShuffle) buildShuffleQueue();
    showToast(state.isShuffle ? 'Shuffle on' : 'Shuffle off');
  });

  repeatBtn.addEventListener('click', () => {
    state.repeatMode = (state.repeatMode + 1) % 3;
    const icons = ['repeat', 'repeat', 'repeat_one'];
    const labels = ['Repeat off', 'Repeat all', 'Repeat one'];
    repeatBtn.querySelector('.material-icons-round').textContent = icons[state.repeatMode];
    repeatBtn.classList.toggle('active-ctrl', state.repeatMode > 0);
    showToast(labels[state.repeatMode]);
  });

  likeBtn.addEventListener('click', () => {
    if (state.currentIndex < 0) return;
    const songId = songs[state.currentIndex].id;
    if (state.likedSongs.has(songId)) {
      state.likedSongs.delete(songId);
      showToast('Removed from Liked Songs');
    } else {
      state.likedSongs.add(songId);
      showToast('Added to Liked Songs');
    }
    updateLikeButton();
  });

  /* ---- Audio events ---- */
  audio.addEventListener('timeupdate', () => {
    if (state.isDraggingProgress) return;
    const { currentTime, duration } = audio;
    if (!isFinite(duration) || isNaN(duration) || duration === 0) return;

    const ratio = currentTime / duration;
    const pct   = (ratio * 100).toFixed(2) + '%';
    progressFill.style.width  = pct;
    progressThumb.style.left  = pct;
    currentTimeEl.textContent = formatTime(currentTime);
    totalTimeEl.textContent   = formatTime(duration);
    progressBarWrap.setAttribute('aria-valuenow', Math.round(ratio * 100));
  });

  audio.addEventListener('loadedmetadata', () => {
    totalTimeEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('ended', () => {
    if (state.repeatMode === 2) {
      // Repeat one
      audio.currentTime = 0;
      audio.play();
    } else {
      playNext();
    }
  });

  audio.addEventListener('play',  () => { state.isPlaying = true;  updatePlayPauseIcon(); updateTrackRows(); });
  audio.addEventListener('pause', () => { state.isPlaying = false; updatePlayPauseIcon(); updateTrackRows(); });

  audio.addEventListener('waiting', () => {
    playerThumbLoading.classList.remove('hidden');
  });

  audio.addEventListener('canplay', () => {
    playerThumbLoading.classList.add('hidden');
  });

  /* ---- Progress bar: mouse ---- */
  progressBarWrap.addEventListener('mousedown', e => {
    state.isDraggingProgress = true;
    applyProgressSeek(getBarValue(e, progressBarWrap));
  });

  window.addEventListener('mousemove', e => {
    if (state.isDraggingProgress) applyProgressSeek(getBarValue(e, progressBarWrap));
    if (state.isDraggingVolume)   applyVolumeChange(getBarValue(e, volBarWrap));
  });

  window.addEventListener('mouseup', () => {
    state.isDraggingProgress = false;
    state.isDraggingVolume   = false;
  });

  /* Progress bar: touch */
  progressBarWrap.addEventListener('touchstart', e => {
    state.isDraggingProgress = true;
    applyProgressSeek(getBarValue(e, progressBarWrap));
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (state.isDraggingProgress) applyProgressSeek(getBarValue(e, progressBarWrap));
    if (state.isDraggingVolume)   applyVolumeChange(getBarValue(e, volBarWrap));
  }, { passive: true });

  window.addEventListener('touchend', () => {
    state.isDraggingProgress = false;
    state.isDraggingVolume   = false;
  });

  /* Progress bar: keyboard */
  progressBarWrap.addEventListener('keydown', e => {
    const step = 5;
    if (e.key === 'ArrowRight') audio.currentTime = Math.min(audio.duration, audio.currentTime + step);
    if (e.key === 'ArrowLeft')  audio.currentTime = Math.max(0, audio.currentTime - step);
  });

  /* ---- Volume bar: mouse ---- */
  volBarWrap.addEventListener('mousedown', e => {
    state.isDraggingVolume = true;
    applyVolumeChange(getBarValue(e, volBarWrap));
  });

  /* Volume bar: touch */
  volBarWrap.addEventListener('touchstart', e => {
    state.isDraggingVolume = true;
    applyVolumeChange(getBarValue(e, volBarWrap));
  }, { passive: true });

  /* Volume bar: keyboard */
  volBarWrap.addEventListener('keydown', e => {
    const step = 0.05;
    if (e.key === 'ArrowRight') setVolume(state.volume + step);
    if (e.key === 'ArrowLeft')  setVolume(state.volume - step);
  });

  volBtn.addEventListener('click', toggleMute);

  /* ---- Navigation ---- */
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(link.dataset.section);
    });
  });

  /* ---- Search ---- */
  searchInput.addEventListener('input', () => handleSearch(searchInput.value));
  searchInput.addEventListener('focus', () => {
    if (!searchInput.value) searchEmpty.classList.remove('hidden');
  });

  clearSearch.addEventListener('click', () => {
    searchInput.value = '';
    handleSearch('');
    searchInput.focus();
  });

  /* ---- Mobile sidebar ---- */
  menuToggle.addEventListener('click', openSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);

  /* ---- Keyboard shortcuts ---- */
  document.addEventListener('keydown', e => {
    // Don't hijack when typing in input
    if (e.target.tagName === 'INPUT') return;

    switch (e.code) {
      case 'Space':
        e.preventDefault();
        togglePlayPause();
        break;
      case 'ArrowRight':
        if (e.altKey) playNext();
        break;
      case 'ArrowLeft':
        if (e.altKey) playPrev();
        break;
      case 'KeyM':
        toggleMute();
        break;
      case 'KeyS':
        shuffleBtn.click();
        break;
    }
  });

  /* ---- Topbar back/fwd (cosmetic) ---- */
  document.getElementById('backBtn').addEventListener('click', () => {
    history.back();
  });
  document.getElementById('fwdBtn').addEventListener('click', () => {
    history.forward();
  });
}

/* ============================================================
   BOOT
   ============================================================ */
document.addEventListener('DOMContentLoaded', init);

/* ============================================================
   EXPOSE helpers for inline HTML onclick (scrollToPlaylists)
   ============================================================ */
window.scrollToPlaylists = scrollToPlaylists;
