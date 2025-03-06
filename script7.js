// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
    "https://www.dropbox.com/scl/fi/c2ayyjne098evcwas17qp/01.-En-el-pa-s-de-la-libertad.mp3?rlkey=pyg85xwkfwx4o0lje2w3tllat&st=3ph9dq31&raw=1",
"https://www.dropbox.com/scl/fi/2jwyal5mfm4inq1annsj5/02.-D-jame-que-te-sienta.mp3?rlkey=26wqfb5bz2g8zr0v6ywj4wdpp&st=zsb5521l&raw=1",
"https://www.dropbox.com/scl/fi/uoqscl5jdmx4sz2qz4ojm/03.-Cada-d-a-somos-m-s.mp3?rlkey=16k302v17406uti6dyly7l8dw&st=mxqknz67&raw=1",
"https://www.dropbox.com/scl/fi/d33tarj7502dmfh1gjhvh/04.-Seamos-todos-caballos.mp3?rlkey=rfmxb8rq62e9fyq6qij5td4vy&st=ho0dlrnx&raw=1",
"https://www.dropbox.com/scl/fi/zdx6nagz5noh33wpmaf8v/05.-Hombres-de-hierro.mp3?rlkey=tz34e68z910ni40e4udoi4i73&st=t57psf7t&raw=1",
"https://www.dropbox.com/scl/fi/0g2uykpp2hdqf4e046w2g/06.-Mar-a-del-campo.mp3?rlkey=t4ij24loaft16kzvoave6axs0&st=fcm3062v&raw=1",
"https://www.dropbox.com/scl/fi/ypmw9626hopk6t22648pd/07.-Todos-los-caballos-blancos.mp3?rlkey=msh5bncjhhzcmhfnm522ua956&st=d8ggq0nm&raw=1",
"https://www.dropbox.com/scl/fi/gtp4cjj2rtjuxh4u5ych6/08.-Campesinos-del-norte.mp3?rlkey=7674czas49c81zj2hyirxceey&st=oyeaccvx&raw=1",
"https://www.dropbox.com/scl/fi/m7jsftf1v6szmjxq1nuyi/09.-Soles-grises-y-mares-rojos.mp3?rlkey=km46aqdjtv3sc9jnttawexlpf&st=efxutsx3&raw=1",
"https://www.dropbox.com/scl/fi/3zz3tf1xd5e0p8av9kj8p/10.-La-colina-sobre-el-terciopelo.mp3?rlkey=3tp1mbuer8mymrc8odkfo5b97&st=lscjrhks&raw=1"

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
        albumCover.src = "tapas/contratapa7.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        const randomVinyl = ["vinilo1.gif", "vinilo2.gif", "vinilo3.gif", "vinilo4.gif", "vinilo5.gif", "vinilo6.gif", "vinilo7.gif", "vinilo8.gif", "vinilo9.gif", "vinilo10.gif"][Math.floor(Math.random() * 10)];
        albumCover.src = randomVinyl; // Muestra un vinilo aleatorio
        estado = 2;
    } else {
        albumCover.src = "tapas/tapa7.jpg"; // Vuelve a la tapa    
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
