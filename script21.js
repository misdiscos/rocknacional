// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
 "https://www.dropbox.com/scl/fi/qiyoqd67dt8wvramre43e/01.-No-se-detiene.mp3?rlkey=ozn5ydvpq2q8i62n0n3rtlmit&st=4rwsql8s&raw=1",
"https://www.dropbox.com/scl/fi/dgw6j82139y35bug2pu7i/02.-La-bifurcada.mp3?rlkey=otz2kdzzg1vrkc80go94tro1s&st=ehwq0rvo&raw=1",
"https://www.dropbox.com/scl/fi/l0ihcbcx50eeasifgu6ff/03.-Mataderos-blues.mp3?rlkey=gfzefq5045bhh2z56dnjvtvu0&st=8bx4e82t&raw=1",
"https://www.dropbox.com/scl/fi/sga50c9apd5fm22qltj91/04.-Sopa-de-letras.mp3?rlkey=8wsm1qa0iottztwisto58cdhu&st=hslg3ovr&raw=1",
"https://www.dropbox.com/scl/fi/8y5zlhfqzx5eydvsu4rxy/05.-Blues-del-estibador.mp3?rlkey=0apeugor8ll66dkjvcodg6k22&st=kws3j7eg&raw=1",
"https://www.dropbox.com/scl/fi/ua3vr9huz0x1e0zwgjqra/06.-Eugenia.mp3?rlkey=qhg8pswlxqkvbo49j9vk10lma&st=fpymlayy&raw=1",
"https://www.dropbox.com/scl/fi/4lurt8o5u33x1qe0a85cf/07.-Lo-mismo-boogie.mp3?rlkey=6yo5u787kf9cwtsibl8y85ean&st=mmmbdbz4&raw=1",
"https://www.dropbox.com/scl/fi/ga86otkiraztmwvlebyo2/08.-Monton-de-nada.mp3?rlkey=7yyktc2m6fai8lw7mcez1bhrn&st=4no4kzmb&raw=1",
"https://www.dropbox.com/scl/fi/utj9ujaau5gexq9m1ckby/09.-Moscato-pizza-y-faina.mp3?rlkey=v7i2l1zxoqa3t3l8u07die565&st=d202wh33&raw=1",
"https://www.dropbox.com/scl/fi/vl9hz020hibphb2zot5tx/10.-Tonto-rompecabezas.mp3?rlkey=4wx3h2e6bhgiiq0oqix9brq4b&st=5xs4wzt7&raw=1",
"https://www.dropbox.com/scl/fi/amzeduxarpagyioyv9de8/11.-Popurri.mp3?rlkey=opz7v2m3br4xd4jwh4e7uy07n&st=qqmz485x&raw=1",
"https://www.dropbox.com/scl/fi/cdf69zne4l2rx1hz47hzv/12.-Locura.mp3?rlkey=6o84mpat3bnp05c0satgvcdf0&st=mibt2uca&raw=1"

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
        albumCover.src = "tapas/tapa21.jpg"; // Vuelve a la tapa
    } else {
        albumCover.src = "tapas/contratapa21.jpg"; // Muestra la contratapa
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
