// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
    "https://www.dropbox.com/scl/fi/qmf37ok8o68zl3j5bdw2a/01.-En-la-ciudad-de-la-furia.mp3?rlkey=8gm7k75tprm5fw6c1zj7gvnop&st=d42anta2&raw=1",
"https://www.dropbox.com/scl/fi/0fk3x3lnug9z8iv6uzwuu/02.-Un-misil-en-mi-placard.mp3?rlkey=g2qtteg6d8dllbqpd6e6rxw6n&st=qs1bq0f8&raw=1",
"https://www.dropbox.com/scl/fi/spjhqruyn5ifk1401do6m/03.-Pasos.mp3?rlkey=p8qrccdf5pk75j15pom3enqsy&st=b38k0haj&raw=1",
"https://www.dropbox.com/scl/fi/7oxic3r8x8pjm5o215a2z/04.-Entre-can-bales.mp3?rlkey=brzyoaadhp1mdi2atyv5lo521&st=5s1uif9b&raw=1",
"https://www.dropbox.com/scl/fi/k3nj3rrsl3s4dsiztlqne/05.-Te-para-tres.mp3?rlkey=4myb7hq0ef3eijjvkxh1n6r9q&st=jbeha7y4&raw=1",
"https://www.dropbox.com/scl/fi/4h9tu50ccqcedb9mgplky/06.-Angel-el-ctrico.mp3?rlkey=3x51q1f7rzxdl7n0sqdvdvvp4&st=8g7nom71&raw=1",
"https://www.dropbox.com/scl/fi/wsg3lcbkon2x3oebapcqo/07.-Ella-uso-mi-cabeza-como-un-revolver.mp3?rlkey=z5spl2fa6uepwb9j20kenioc5&st=zssrivij&raw=1",
"https://www.dropbox.com/scl/fi/huke8ytdv8u4khgv1bxy7/08.-Sonoman.mp3?rlkey=admtqrltw4dh7jg6noh557fjl&st=l8y0vghv&raw=1",
"https://www.dropbox.com/scl/fi/1xycckzn8gecj0fmdt1p3/09.-Planeador.mp3?rlkey=solbi8bzzlrrtovxyilzwkaja&st=v0uygrlh&raw=1",
"https://www.dropbox.com/scl/fi/i37losallqcclr8id29fi/10.-Coral.mp3?rlkey=bhdquxrykt7ihn4inuh8oekeu&st=rgg3j03x&raw=1",
"https://www.dropbox.com/scl/fi/nddbw2pjpmqsgbk8qqu1a/11.-Superstar.mp3?rlkey=td7r2wn1wm0k83o840w4ltvx7&st=8mdrpl45&raw=1"


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
        albumCover.src = "tapas/tapa18.jpg"; // Vuelve a la tapa
    } else {
        albumCover.src = "tapas/contratapa18.jpg"; // Muestra la contratapa
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
