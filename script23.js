// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
    "https://www.dropbox.com/scl/fi/ya71ccyyulnkq3tean72d/01-Sola-en-los-bares.mp3?rlkey=lk3ahdd225vmef61lvhtuub5j&st=u5lv2w31&raw=1",
"https://www.dropbox.com/scl/fi/dipsyng00f4vkkmaudsav/02-Caribe-sur.mp3?rlkey=wqku4v6e13y7zpu3xsiwc8wwr&st=yqagz4hp&raw=1",
"https://www.dropbox.com/scl/fi/er51c609o20didk68ruqu/03-La-maga.mp3?rlkey=l2eav9syddurjukgce41ppg1t&st=roeo049l&raw=1",
"https://www.dropbox.com/scl/fi/64xg9h3j7r43q4knd6ikh/04-Maldito-alquiler.mp3?rlkey=sfk5n80x0uyf25hvpy5a50o1p&st=4kazmjh3&raw=1",
"https://www.dropbox.com/scl/fi/qohs1z5gwcv6oovodtsiq/05-La-noche-anterior.mp3?rlkey=cttknb4t1a5uflbl1u12npamc&st=gqx5zxr2&raw=1",
"https://www.dropbox.com/scl/fi/09oq8g4v0co3tpo2noeii/06-El-fantasma.mp3?rlkey=y75l596f1fyfc4yn6aay1f0ow&st=b67jh4oy&raw=1",
"https://www.dropbox.com/scl/fi/twquqxlz5fnaxx99ts43e/07-Tierra-sagrada-Charly-Garcia.mp3?rlkey=hmzdhk1k9r85shvaq3m3g46k3&st=586d42xp&raw=1",
"https://www.dropbox.com/scl/fi/6ymxkcre4oq7j0febr103/08-Olvidate-de-mi.mp3?rlkey=rdg4ujq0tre782t3e7zoh8a4b&st=pmxb1wyf&raw=1",
"https://www.dropbox.com/scl/fi/xu1w44yevpdzwzunp2nqg/09-Lo-imposible.mp3?rlkey=ff1krpqj20kpsmdp3zv5qkwfn&st=lhg4xyti&raw=1",
"https://www.dropbox.com/scl/fi/x6qi8etrk1gjf3kt6vcac/10-En-el-baldio.mp3?rlkey=tz3eq439jcld6k7xt34ev3ado&st=s2bow8h9&raw=1",
"https://www.dropbox.com/scl/fi/4d8p5vvu3a2parzgym0tg/11-Perro-de-playa.mp3?rlkey=cnemr4ioh8p0s09qom8451xrh&st=4nrn6avj&raw=1",
"https://www.dropbox.com/scl/fi/wfemvakislyo8ogls6kba/12-Al-final.mp3?rlkey=a4ynnh8c9g35j6ph2owoj1plm&st=fojpuhg9&raw=1",
"https://www.dropbox.com/scl/fi/jucz2x6gabxovktn4mo40/13-Estan-rompiendo-todo.mp3?rlkey=soz1si51tqe41vqasj3jfxq8u&st=tt8vtgbq&raw=1",
"https://www.dropbox.com/scl/fi/jucz2x6gabxovktn4mo40/13-Estan-rompiendo-todo.mp3?rlkey=soz1si51tqe41vqasj3jfxq8u&st=tt8vtgbq&raw=1"

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
        albumCover.src = "tapas/tapa23.jpg"; // Vuelve a la tapa
    } else {
        albumCover.src = "tapas/contratapa23.jpg"; // Muestra la contratapa
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
