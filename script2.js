// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
"https://www.dropbox.com/scl/fi/qb1hbj03d6fml5fs9v4x3/01-Cuando-Ya-Me-Empiece-A-Quedar-Solo.mp3?rlkey=933e3ymcgwzmoia4wyt7kf4rs&st=twnoiv1a&raw=1",
"https://www.dropbox.com/scl/fi/ecwnepim460mjefcrrnnf/02-Bienvenidos-Al-Tren.mp3?rlkey=r2eg4zswd4j4uf4g1tdq5umo3&st=jkqlvice&raw=1",
"https://www.dropbox.com/scl/fi/ddkkwplbvpqchgcf6kmgr/03-Un-Hada-Un-Cisne.mp3?rlkey=p76amobis6q9ciedb7cvd87z6&st=87zhwc47&raw=1",
"https://www.dropbox.com/scl/fi/4vfskxw4gpnfeensjy2vb/04-Confesiones-De-Invierno.mp3?rlkey=yizmzqedjh98n15tu4sdpyhug&st=3wt9u1ol&raw=1",
"https://www.dropbox.com/scl/fi/v1kny7uwunuao133zcee6/05-Rasgu-a-Las-Piedras.mp3?rlkey=64bp47k7tuvzdmn51njbfr105&st=rcgf8vpo&raw=1",
"https://www.dropbox.com/scl/fi/lntt1upct4ofgymun3wsp/06-Lunes-Otra-Vez.mp3?rlkey=idsp20w647j57tmwx5dbnl44c&st=y1nxmfx4&raw=1",
"https://www.dropbox.com/scl/fi/oblo7a4blvj2jaqhi49qq/07-Aprendizaje.mp3?rlkey=v7tglo4sv2zic6v85s12qr5n7&st=wa776xsw&raw=1",
"https://www.dropbox.com/scl/fi/hldtlmlcmr0mh51zzefmu/08-Mr.-Jones-O-Peque-a-Semblanza-De-Una-Familia-Tipo-Americana.mp3?rlkey=6o83jbu2oo54v3slz2hgden22&st=ieq00afi&raw=1",
"https://www.dropbox.com/scl/fi/3dr45rbpeoe1ifpenqk9w/09-Tribulaciones-Lamento-Y-Ocaso-De-Un-Tonto-Rey-Imaginario-O-No.mp3?rlkey=h1sc44knw97znomzxsxcezfkc&st=fqvclvzi&raw=1",
"https://www.dropbox.com/scl/fi/fw4xk4vr4ix64n3c7c5qy/10-Alto-En-La-Torre.mp3?rlkey=kvn87l4ie0ta477c0mk1sfa51&st=valbcjt0&raw=1"


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
        albumCover.src = "tapas/contratapa2.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        const randomVinyl = ["vinilo1.gif", "vinilo2.gif", "vinilo3.gif", "vinilo4.gif", "vinilo5.gif", "vinilo6.gif", "vinilo7.gif", "vinilo8.gif", "vinilo9.gif", "vinilo10.gif"][Math.floor(Math.random() * 10)];
        albumCover.src = randomVinyl; // Muestra un vinilo aleatorio
        estado = 2;
    } else {
        albumCover.src = "tapas/tapa2.jpg"; // Vuelve a la tapa    
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
