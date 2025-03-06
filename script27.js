// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
"https://www.dropbox.com/s/so4x8en1m6hl54u/01%20El%20Cielo%20Puede%20Esperar.mp3?st=xo1yfzch&raw=1",
"https://www.dropbox.com/s/wpjgowa8s2gpwkp/02%20M%C3%A1s%20De%20Un%20Mill%C3%B3n.mp3?st=b5iaowm0&raw=1",
"https://www.dropbox.com/s/11kno9umo93hju6/03%20Tiempo%20Para%20Estar.mp3?st=cx22uvfn&raw=1",
"https://www.dropbox.com/s/b1hyscw9pnx4b3y/04%20S%C3%B3lo%20Por%20Placer.mp3?st=n7zxum9t&raw=1",
"https://www.dropbox.com/s/rfgw8df54s3n8mo/05%20Vuelve%20A%20Casa.mp3?st=9u0pv5e8&raw=1",
"https://www.dropbox.com/s/qpie8qsnmolleuf/06%20Espadas%20Y%20Serpientes.mp3?st=zzq7tocw&raw=1",
"https://www.dropbox.com/s/82551kbcd3yzs2i/07%20Un%20Momento%20De%20Meditaci%C3%B3n.mp3?st=jhoasb7k&raw=1",
"https://www.dropbox.com/s/71lg3qf302rjc0n/08%20Hacelo%20Por%20M%C3%AD.mp3?st=wq483ot6&raw=1",
"https://www.dropbox.com/s/dcoaj2tw4ebsieo/09%20No%20Te%20Pudiste%20Aguantar.mp3?st=nqsipjzj&raw=1",
"https://www.dropbox.com/s/gqitinrg3y73c50/10%20Donde%20Las%20%C3%81guilas%20Se%20Atreven.mp3?st=at4z8boq&raw=1",


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
        albumCover.src = "tapas/contratapa27.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        albumCover.src = "vinilo2.gif"; // Muestra el vinilo
        estado = 2;
    } else {
        albumCover.src = "tapas/tapa27.jpg"; // Vuelve a la tapa    
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
