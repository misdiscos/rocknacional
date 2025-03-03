// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "3"
const songs = [
   
"https://www.dropbox.com/scl/fi/ops42za12928jay3alnsu/01.-Encadenado-al-Anima.mp3?rlkey=bhto9phfq5wckkwilteroumx2&st=m5rok3zo&raw=1",
"https://www.dropbox.com/scl/fi/ka4yoi8yamhc773tvgfyf/02.-Durazno-Sangrando.mp3?rlkey=ut3c4dor7aalyk31ktqrptin9&st=em1xptm2&raw=1",
"https://www.dropbox.com/scl/fi/3wu124q1yyzunfiyjduf7/03.-Pleamar-de-Aguilas.mp3?rlkey=dahtoqea4xojb65e6gcslsm9r&st=b8h9ylng&raw=1",
"https://www.dropbox.com/scl/fi/oqc3w9qw9j06anyg51d3m/04.-En-una-Lejana-Playa-del-Animus.mp3?rlkey=0ri0c89ne8q5bhu8iot21agn8&st=rc8wbl06&raw=1",
"https://www.dropbox.com/scl/fi/m3ojxjk8xid7q7gbrtysv/05.-Dios-de-Adolescencia.mp3?rlkey=u8gayb9dgi87o0xtr7m7igurg&st=j6ogqhnw&raw=1"


];

let currentSongIndex = 0;
const audioPlayer = new Audio();
const playPauseButton = document.getElementById("play-pause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const backButton = document.getElementById("back");
const songTitle = document.getElementById("song-title");
const progressBar = document.getElementById("progress-bar");
const volumeButton = document.getElementById("volume-btn");
const volumeSlider = document.getElementById("volume-slider");
const albumCover = document.querySelector(".album-cover");
let showingBack = false; // Estado para saber qué imagen está mostrando

albumCover.addEventListener("click", () => {
    if (showingBack) {
        albumCover.src = "tapas/tapa3.jpg"; // Vuelve a la tapa
    } else {
        albumCover.src = "tapas/contratapa3.jpg"; // Muestra la contratapa
    }
    showingBack = !showingBack; // Cambia el estado
});



volumeSlider.addEventListener("input", () => {
    audioPlayer.volume = volumeSlider.value;
});

volumeButton.addEventListener("click", () => {
    volumeSlider.style.display = volumeSlider.style.display === "none" ? "block" : "none";
});

function loadSong(index) {
    audioPlayer.src = songs[index];
    audioPlayer.play().catch(error => console.log("Error al reproducir:", error));
    playPauseButton.textContent = "❚❚";
    let fileName = decodeURIComponent(songs[index].split("/").pop().split("?")[0].replace(".mp3", "")).replace(/-/g, " ");
    songTitle.textContent = fileName;
    progressBar.value = 0;
}

audioPlayer.addEventListener("timeupdate", () => {
    progressBar.max = audioPlayer.duration;
    progressBar.value = audioPlayer.currentTime;
});

progressBar.addEventListener("input", () => {
    audioPlayer.currentTime = progressBar.value;
});

playPauseButton.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.textContent = "❚❚";
    } else {
        audioPlayer.pause();
        playPauseButton.textContent = "▶";
    }
});

prevButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

nextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

audioPlayer.addEventListener("ended", () => {
    nextButton.click();
});

backButton.addEventListener("click", () => {
    window.history.back();
});

loadSong(currentSongIndex);

// Modo Claro/Oscuro
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
    themeToggle.checked = true;
}

themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
        body.classList.add("light-mode");
        localStorage.setItem("theme", "light");
    } else {
        body.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
    }
});
