// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
"https://www.dropbox.com/scl/fi/0w6ikquaxdg723hucq9mx/01-Nos-siguen-pegando-abajo-Pecado-mortal.mp3?rlkey=48dcjomlifev6too3g1olhgvs&st=60riqvk4&raw=1",
"https://www.dropbox.com/scl/fi/pyp4p32zgsmm01mstf7vd/02-No-soy-un-extra-o.mp3?rlkey=muldzrkvkr3a850fo47qxkeaa&st=fffs68zf&raw=1",
"https://www.dropbox.com/scl/fi/ipl08oarbxtkc0ufnohp4/03-Dos-cero-uno-transas.mp3?rlkey=1k9k643dlrgw1zhcsp1yclzne&st=1uqkbi6x&raw=1",
"https://www.dropbox.com/scl/fi/52abof0db48a605tnnmis/04-Nuevos-trapos.mp3?rlkey=gw3wor4myed2e5lq3j7iq8t53&st=3sf9k3xt&raw=1",
"https://www.dropbox.com/scl/fi/yyl7fbacrtl1lj412lleo/05-Bancate-ese-defecto.mp3?rlkey=y0tun8zzkhm9f45uuxuvosup2&st=fh9zb3qq&raw=1",
"https://www.dropbox.com/scl/fi/rbbew1ys5snfv7a00eyfo/06-No-me-dejan-Salir.mp3?rlkey=cgzx695n2crd5hgseoon5nk5p&st=zo7b504r&raw=1",
"https://www.dropbox.com/scl/fi/qaiy45hu4341ozpqnn2x8/07-Los-dinosaurios.mp3?rlkey=8tp7up5dcjhd6s05h2ko5pmbl&st=psiijgvv&raw=1",
"https://www.dropbox.com/scl/fi/goxx6efvv9meyuoxe52ty/08-Plateado-sobre-plateado-huellas-en-el-mar.mp3?rlkey=0b9qdqqpn32bzsxk031n29vee&st=ef10dget&raw=1",
"https://www.dropbox.com/scl/fi/8rxk4sejhumeu7tay9ueo/09-Ojos-de-video-tape.mp3?rlkey=astlxsz864cdtg3cl6pcmnaws&st=lqmd2srk&raw=1"

  

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
        albumCover.src = "tapas/contratapa11.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        albumCover.src = "vinilo2.gif"; // Muestra el vinilo
        estado = 2;
    } else {
        albumCover.src = "tapas/tapa11.jpg"; // Vuelve a la tapa    
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
