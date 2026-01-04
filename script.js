const tracks = [
  { title: "Perfect", artist: "Ed Sheeran", src: "songs/track1.mp3", cover: "covers/cover1.jpg" },
  { title: "dilbar ki ankho ka", artist: "rashmeet kaur", src: "songs/track2.mp3", cover: "covers/cover2.jpg" },
  { title: "Dil Dil Dil", artist: "Sunidhi Chauhan, Divya Kumar", src: "songs/track3.mp3", cover: "covers/cover3.jpg" },
  { title: "Azul", artist: "Guru Randhawa", src: "songs/track4.mp3", cover: "covers/cover4.jpg" },
  { title: "Humnava", artist: "Arijit Singh", src: "songs/track5.mp3", cover: "covers/cover5.jpg" },
  { title: "Sanam Teri Kasam", artist: "Ankit Tiwari", src: "songs/track6.mp3", cover: "covers/cover6.jpg" },
  { title: "Dirty Little Secret", artist: "Zack Knight, Nora Fatehi", src: "songs/track7.mp3", cover: "covers/cover7.jpg" },
  { title: "Lil Mama See", artist: "Road Runner", src: "songs/track8.mp3", cover: "covers/cover8.jpg" },
  { title: "Playdate", artist: "Lilly Brooks", src: "songs/track9.mp3", cover: "covers/cover9.jpg" },
  { title: "Go Down Deh", artist: "Spice", src: "songs/track10.mp3", cover: "covers/cover10.jpg" },
  { title: "Paro", artist: "Nej", src: "songs/track11.mp3", cover: "covers/cover11.jpg" },
  { title: "Better", artist: "Zayn Malik", src: "songs/track12.mp3", cover: "covers/cover12.jpg" },
];

let currentTrack = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const playBtn = document.querySelector(".play-btn");

function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.src;
  title.textContent = track.title;
  artist.textContent = track.artist;
  cover.src = track.cover;
}

function playTrack(index) {
  currentTrack = index;
  loadTrack(index);
  audio.play();
  playBtn.textContent = "⏸️";
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % tracks.length;
  playTrack(currentTrack);
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  playTrack(currentTrack);
}

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

audio.addEventListener("ended", nextTrack);

// 🎵 Popup - Fullscreen Version
const popup = document.createElement("div");
popup.className = "popup hidden";
document.body.appendChild(popup);

function showPopup(index) {
  const track = tracks[index];
  popup.innerHTML = `
    <span class="popup-close">&times;</span>
    <div class="popup-content">
      <img src="${track.cover}" class="popup-cover">
      <h3>${track.title}</h3>
      <p>${track.artist}</p>
      <div class="popup-buttons">
        <button class="popup-btn" id="popupPlay">▶ Play</button>
        <button class="popup-btn" id="popupFav">❤️ Favorite</button>
      </div>
    </div>
  `;
  popup.classList.remove("hidden");

  // Close button
  popup.querySelector(".popup-close").addEventListener("click", () => {
    popup.classList.add("hidden");
  });

  // Play button
  document.getElementById("popupPlay").addEventListener("click", () => {
    playTrack(index);
    popup.classList.add("hidden");
  });

  // Favourite button
  document.getElementById("popupFav").addEventListener("click", () => {
    addToFavourites(tracks[index].title, tracks[index].artist);
    popup.classList.add("hidden");
  });
}

function openTrackPopup(index) {
  showPopup(index);
}

// 🔍 Search Filter
function searchSongs() {
  const input = document.getElementById("searchBar").value.toLowerCase();
  const cards = document.querySelectorAll(".track-card");

  cards.forEach(card => {
    const title = card.querySelector(".card-title").innerText.toLowerCase();
    const artist = card.querySelector(".card-text").innerText.toLowerCase();
    card.parentElement.style.display =
      title.includes(input) || artist.includes(input) ? "" : "none";
  });
}

/* ❤️ FAVOURITES SECTION */
function addToFavourites(songTitle, artistName) {
  const favList = document.getElementById("favouritesList");

  // Remove placeholder text if first song added
  if (favList.querySelector(".text-muted")) favList.innerHTML = "";

  // Prevent duplicates
  const existing = Array.from(favList.querySelectorAll(".favourites-item"));
  if (existing.some(item => item.dataset.title === songTitle)) return;

  // Create favourite item
  const item = document.createElement("div");
  item.classList.add("favourites-item", "glow");
  item.dataset.title = songTitle;
  item.innerHTML = `
    <span>${songTitle} <small>- ${artistName}</small></span>
    <button class="btn btn-sm text-danger" onclick="this.parentElement.remove()">🗑</button>
  `;
  favList.appendChild(item);

  // Add glow animation
  setTimeout(() => item.classList.remove("glow"), 1500);
}
