// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
    "https://www.dropbox.com/scl/fi/mqhn9jxwr8vkleyvh9h7l/01.-El-Tempano.mp3?rlkey=mwkta6o0s2c7zu4a926l6rbop&st=l1i7i0sd&raw=1",
"https://www.dropbox.com/scl/fi/elw4si5ngwujvhjc1m7ia/02.-Tratando-De-Crecer.mp3?rlkey=5z77dy8ry3luad60czq76lbjj&st=vopyhixj&raw=1",
"https://www.dropbox.com/scl/fi/44g9hf5gc9hczgjv3thml/03.-Jeremias.mp3?rlkey=hit4j2gg32kfc0ocqlmn94y0x&st=0zb94et6&raw=1",
"https://www.dropbox.com/scl/fi/ii8nnmcrjh8yztm9xvbw6/04.-Historia-De-Mate-Cocido.mp3?rlkey=motemiwnqupx7z4qq32wykex7&st=ajahwb1r&raw=1",
"https://www.dropbox.com/scl/fi/pfvnswedah33i2cw22cqk/05.-La-Musica-Me-Ayuda.mp3?rlkey=sma2kf44w4esj1wcbidqsdhtf&st=jht2lez9&raw=1",
"https://www.dropbox.com/scl/fi/8957iz84928iwe3u62gp2/06.-Carta-De-Un-Leon-A-Otro.mp3?rlkey=ortxpq6vibhfb7qww1jbej916&st=gc6o0fh6&raw=1",
"https://www.dropbox.com/scl/fi/mjgklfyfkhyyelpopta0m/07.-Un-Loco-En-La-Calesita.mp3?rlkey=awydzf9d54wyx3jhd46ooqup9&st=v2zoi737&raw=1",
"https://www.dropbox.com/scl/fi/vwmciizng26p47uds4owx/08.-El-Gigante-De-Ojos-Azules.mp3?rlkey=0pybxh7b945nm3kdkpruc87qa&st=crzb5vbh&raw=1",
"https://www.dropbox.com/scl/fi/i14ohuodpv28wofdzwhb0/09.-Amor-En-Otras-Palabras.mp3?rlkey=x6olzac9x64x2hkkeck09lik3&st=rwjuq730&raw=1"


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
        albumCover.src = "tapas/tapa6.jpg"; // Vuelve a la tapa
    } else {
        albumCover.src = "tapas/contratapa6.jpg"; // Muestra la contratapa
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
