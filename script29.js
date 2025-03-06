// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
"https://www.dropbox.com/s/9nwb8mljh0tl9ee/01)%20Casi%20Estatua.mp3?st=36wudklr&raw=1",
"https://www.dropbox.com/s/m2tfkxglxj8mybv/02)%20Par%20Mil.mp3?st=u5svhh3y&raw=1",
"https://www.dropbox.com/s/x07jmprok2w9c3e/03)%20Tanto%20Anteojo.mp3?st=6b29dm89&raw=1",
"https://www.dropbox.com/s/i6owe4qazezr86k/04)%20Que%20Pasa%20Conmigo.mp3?st=xfofekjg&raw=1",
"https://www.dropbox.com/s/3ogxc1tfjv1bynr/05)%20Spaghetti%20Del%20Rock.mp3?st=6pbibmn7&raw=1",
"https://www.dropbox.com/s/taaztu48i8mp023/06)%20Elefantes%20En%20Europa.mp3?st=qm7bb00u&raw=1",
"https://www.dropbox.com/s/vic27cm2jjxq9i5/07)%20Vida%20De%20Topo.mp3?st=krvv7oxi&raw=1",
"https://www.dropbox.com/s/3plv3lxrm4w1i09/08)%20La%20%C3%91api%20De%20Mam%C3%A1.mp3?st=b182ctx9&raw=1",
"https://www.dropbox.com/s/yy9lkv12psxy7ob/09)%20Como%20Un%20Cuento.mp3?st=2i0zgjky&raw=1",
"https://www.dropbox.com/s/04ckzfghvsw92tr/10)%20Sopa%20De%20Tortuga.mp3?st=tez6yrvp&raw=1",
"https://www.dropbox.com/s/8m93m606j7q67yp/11)%20Pasiones%20Zurdas%20Derechas.mp3?st=kt5jqo5e&raw=1",
"https://www.dropbox.com/s/677l60kmek3g5yl/12)%20La%20Gente%20Se%20Divierte.mp3?st=q06pvjyi&raw=1",
"https://www.dropbox.com/s/g9619az9mpr5bp0/13)%20La%20Firma%20Del%20Opa.mp3?st=ehds453i&raw=1",


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
        albumCover.src = "tapas/contratapa29.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        albumCover.src = "vinilo2.gif"; // Muestra el vinilo
        estado = 2;
    } else {
        albumCover.src = "tapas/tapa29.jpg"; // Vuelve a la tapa    
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
