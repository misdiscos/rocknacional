// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
  "https://www.dropbox.com/scl/fi/en0bmkke1yhs4ol4f63mc/01-Los-Calientes.mp3?rlkey=6q6lg4qok88bex4uae5yy0wcv&st=9w3230xl&raw=1",
"https://www.dropbox.com/scl/fi/ac5c0rjafh9pjn7s726ps/02-Fizz.mp3?rlkey=sqkfjrdnk8uj4zgab8g9efcbc&st=woegollo&raw=1",
"https://www.dropbox.com/scl/fi/1ft9v5sgw72v1byishz8x/03-Del-ctrico.mp3?rlkey=q348z5lh1jsh5munx0rucevgo&st=n85bkiu7&raw=1",
"https://www.dropbox.com/scl/fi/gvl4w8cfqsl8gi8nocvww/04-Soy-Rock.mp3?rlkey=gp78xjxca0i4aexodrg20piyn&st=64dtr20o&raw=1",
"https://www.dropbox.com/scl/fi/b5abj46cx71dvov3qo8iw/05-Pendejo.mp3?rlkey=rm9la1ubidcoeretjp9uz4wjo&st=snadlwdf&raw=1",
"https://www.dropbox.com/scl/fi/1yi9c3o6vq7u7n7fnl6pr/06-El-Loco.mp3?rlkey=oq33wp1dlq2oy5hcztydcqb5y&st=7c3r3tl1&raw=1",
"https://www.dropbox.com/scl/fi/5gz507503ihv11gixaxqp/07-La-Fox.mp3?rlkey=a6hmotdzzquucqtamyqgg56ct&st=gqrn0par&raw=1",
"https://www.dropbox.com/scl/fi/ji69u7nrp2wzp3ntqyyn2/08-Toxica.mp3?rlkey=5rs1pgndefp4usxoowwsx3b4i&st=7pue2cwd&raw=1",
"https://www.dropbox.com/scl/fi/vi19tt8s38cvbll4lp5ne/09-Yoli.mp3?rlkey=uriq67iaiw9dav63cwpzg1vzk&st=o8m3j9bx&raw=1",
"https://www.dropbox.com/scl/fi/zb6ahuxp2hg7uzxmjn2ox/10-Rubi.mp3?rlkey=m68a9ksb76dqqxmi520xuzt8s&st=qq8tv9uo&raw=1",
"https://www.dropbox.com/scl/fi/qa3age3i2n2vm67jygfac/11-Camar-n.mp3?rlkey=lg04698zdundeu5kkzzstar8b&st=yrha3gl4&raw=1",
"https://www.dropbox.com/scl/fi/2utxlhb2ngzkmag2isjfc/12-Atomicum.mp3?rlkey=yb8t2y7fv8qjv1xjd2m0m3mi6&st=xcvqrmst&raw=1"


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
        albumCover.src = "tapas/contratapa13.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        albumCover.src = "vinilo2.gif"; // Muestra el vinilo
        estado = 2;
    } else {
        albumCover.src = "tapas/tapa13.jpg"; // Vuelve a la tapa    
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
