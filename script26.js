// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
 "https://www.dropbox.com/s/53o80b3vgz25dkf/01%20-%20Milonga%20Del%20Marinero%20Y%20El%20Capit%C3%A1n.mp3?st=m7zh7daa&raw=1",
"https://www.dropbox.com/s/k4esc1fed8x7hp7/02%20-%20Palabras%20M%C3%A1s%2C%20Palabras%20Menos.mp3?st=378mi6o5&raw=1",
"https://www.dropbox.com/s/usxdrpvuhcn3ygo/03%20-%20Aqu%C3%AD%20No%20Podemos%20Hacerlo.mp3?st=21zg9rio&raw=1",
"https://www.dropbox.com/s/e9ck5w3qof48jyr/04%20-%20Todav%C3%ADa%20Una%20Canci%C3%B3n%20De%20Amor.mp3?st=4ovbo0pm&raw=1",
"https://www.dropbox.com/s/0p7p1xf3jwmjcpl/05%20-%20Para%20No%20Olvidar.mp3?st=wv891mn0&raw=1",
"https://www.dropbox.com/s/d50lidltciv4kjb/06%20-%20El%20Tiempo%20Lo%20Dir%C3%A1.mp3?st=28zzmoju&raw=1",
"https://www.dropbox.com/s/vej5w9ksauzmpxn/07%20-%20En%20Un%20Hotel%20De%20Mil%20Estrellas.mp3?st=8riuamei&raw=1",
"https://www.dropbox.com/s/iorou9bd3mqw13i/08%20-%20Mucho%20Mejor.mp3?st=zq185i8g&raw=1",
"https://www.dropbox.com/s/1q8vm8g2zsvndr8/09%20-%20La%20Puerta%20De%20Al%20Lado.mp3?st=wxlusfvb&raw=1",
"https://www.dropbox.com/s/9qtmcug86a8zohu/10%20-%20Una%20Forma%20De%20Vida.mp3?st=1mv86a57&raw=1",
"https://www.dropbox.com/s/x55fh5m0g0umcgq/11%20-%20Extra%C3%B1o.mp3?st=dvbud39b&raw=1",
"https://www.dropbox.com/s/51j6okt93fx5kbk/12%20-%2010%20A%C3%B1os%20Despu%C3%A9s.mp3?st=kbmmi4ue&raw=1",
"https://www.dropbox.com/s/sungq2fg879irz5/13%20-%20Algunos%20Hombre%20Buenos.mp3?st=0tki0t1m&raw=1",


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
        albumCover.src = "tapas/contratapa26.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        albumCover.src = "vinilo2.gif"; // Muestra el vinilo
        estado = 2;
    } else {
        albumCover.src = "tapas/tapa26.jpg"; // Vuelve a la tapa    
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
