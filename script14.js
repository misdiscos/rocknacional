// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
   "https://www.dropbox.com/scl/fi/jbr6vz7z5pl3tw6fnqcw1/01-Llego-Tarde.mp3?rlkey=822alrj0m8h2kb279qgxkny9f&st=npmyxsvh&raw=1",
"https://www.dropbox.com/scl/fi/8pvn20ps0nkib06442pbu/02-Kitty.mp3?rlkey=n5rdlddbo8h0mqptjejygpitg&st=5o953jdf&raw=1",
"https://www.dropbox.com/scl/fi/xp4m32he1pohumrllyepj/03-Mary-Poppins-Y-El-Deshollinador.mp3?rlkey=kt2u6bne53nq00h2kq1hzjcjf&st=um1jtol3&raw=1",
"https://www.dropbox.com/scl/fi/sjtdyvvwv0r1e5sjd8wxy/04-Cosas-Que-Pasan.mp3?rlkey=43h8vjq3j7b58y8r380nfpp0g&st=7xs5wa6g&raw=1",
"https://www.dropbox.com/scl/fi/0k6xlun0hjlgy7u58syl5/05-Una-Chica-Torpe-En-Una-Gran-Ciudad.mp3?rlkey=50qh0qmrke40w48lxt7i0q6j7&st=ux4exx90&raw=1",
"https://www.dropbox.com/scl/fi/lgx9mctnv03190nve0oag/06-Arcos.mp3?rlkey=sblswzpew6g34ch7cei7mw77r&st=ipcqgy2r&raw=1",
"https://www.dropbox.com/scl/fi/khp9cwiqdwzl3dhwr585e/07-Mi-Enfermedad.mp3?rlkey=svc4fn1u6ihcmrl72dokn6hok&st=tlrjx11d&raw=1",
"https://www.dropbox.com/scl/fi/h6qwwq1z9kmffo61cavje/08-4-Brazos-4-Piernas.mp3?rlkey=ihk1qfdagcsy9qm7sarll128k&st=9kenkhsp&raw=1",
"https://www.dropbox.com/scl/fi/pmi74uhioew2m9jb34wa2/09-Ayer-So-Con-Walter.mp3?rlkey=zuknzdot2kdcal3hfz63fwi0n&st=mjnjis2r&raw=1",
"https://www.dropbox.com/scl/fi/n2z06d6p8jsyvmjn7gkn8/10-Buscando-Siempre.mp3?rlkey=66gauvexyyofvw3c76qhphixk&st=sl7mhosu&raw=1",
"https://www.dropbox.com/scl/fi/6e8d03uyi9st3jlxd5a8v/11-Algo-Mejor.mp3?rlkey=8upd2qnvp46w471t6dvkqwoba&st=v9myc6hj&raw=1"


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
        albumCover.src = "tapas/tapa14.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        albumCover.src = "tapas/contratapa14.jpg"; // Muestra el vinilo
        estado = 2;
    } else {
        albumCover.src = "vinilo2.gif"; // Vuelve a la tapa
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
