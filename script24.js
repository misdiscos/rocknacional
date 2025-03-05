// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
    "https://www.dropbox.com/scl/fi/sdi481efvgo60myqg3swl/01-Toxi-Taxi.mp3?rlkey=qjtgadmc56gku7ce9joxnq8u7&st=rp2nj45l&raw=1",
"https://www.dropbox.com/scl/fi/3d5p5hjf1qfbofnvcd5gm/02-Fusilados-por-la-Cruz-Roja.mp3?rlkey=0m1wvtmc9x5cidymwcyamihrm&st=5mccwtmy&raw=1",
"https://www.dropbox.com/scl/fi/3d5owu0p8wsjiwvt9mph8/03-Un-poco-de-amor-franc-s.mp3?rlkey=nuen9zlhmrj0xbu3bzphc45le&st=7jardrpb&raw=1",
"https://www.dropbox.com/scl/fi/si8y6evhrvnlgjak9xyu6/04-Mi-perro-dinamita.mp3?rlkey=d7v5dhm8zgs70o2qtvayw28z1&st=w40epdke&raw=1",
"https://www.dropbox.com/scl/fi/qf8cfjt4mrixacwf8kjog/05-Blues-de-la-artiller-a.mp3?rlkey=7hrjqh63a7o0ockk1bw2sbhvv&st=rpbl9zom&raw=1",
"https://www.dropbox.com/scl/fi/kw8yc5zk4o4xfj6tk27jd/06-Tarea-fina.mp3?rlkey=y410ihxarcbu7e1ezy3xbi0e4&st=l0x0tbcp&raw=1",
"https://www.dropbox.com/scl/fi/i68a0b1kykigpa85d1pxu/07-El-pibe-de-los-astilleros.mp3?rlkey=r4w3sswnut4euap93fcynm4u3&st=rio3zrzc&raw=1",
"https://www.dropbox.com/scl/fi/3es1t7e1266z3x9gj7hhf/08-Nueva-Roma.mp3?rlkey=tr63xa8p58tw5o0s3rigys87p&st=ewmyxojn&raw=1",
"https://www.dropbox.com/scl/fi/ojct0c0005fbrh5tcp1ja/09-Salando-las-heridas.mp3?rlkey=pdseix700bgvs1jn8srxrivyt&st=g6bi8zyb&raw=1",
"https://www.dropbox.com/scl/fi/9g1s72gzsqyh77epmcr8v/10-Queso-ruso.mp3?rlkey=33wcqrnn7krimmoaqaoq3um10&st=qslln2do&raw=1"


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

let estado = 0; // 0: tapa, 1: contratapa, 2: vinilo

albumCover.addEventListener("click", () => {
    if (estado === 0) {
        albumCover.src = "tapas/contratapa24.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        albumCover.src = "vinilo2.gif"; // Muestra el vinilo
        estado = 2;
    } else {
        albumCover.src = "tapas/tapa24.jpg"; // Vuelve a la tapa    
        estado = 0;
    }
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
