// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
   "https://www.dropbox.com/scl/fi/5eybwanr2bckseieisgrh/01-La-guitarra.mp3?rlkey=ypyixviepeyb9sp0z3cxkffei&st=lehudf3z&raw=1",
"https://www.dropbox.com/scl/fi/ztgpfzzopadma055249oq/02-Las-miradas.mp3?rlkey=zed3mg7j83i7k2z7z7qtw8hry&st=9ad3n9jd&raw=1",
"https://www.dropbox.com/scl/fi/7hxbyxanyct9jtfa3mmnq/03-El-Murguero-Original-versi-n.mp3?rlkey=br75ptk7q7tzesbp0tel321ec&st=t5ezfgix&raw=1",
"https://www.dropbox.com/scl/fi/pjk6j2knj90z2gxk0gvwk/04-El-p-jaro-vi-el-cielo-y-se-vol.mp3?rlkey=rx4huans7tpuebq2i3urin86l&st=6wq451f9&raw=1",
"https://www.dropbox.com/scl/fi/4rjtqpiemi1arg3eybigl/05-Diosa.mp3?rlkey=2o8vp7hu4pcgoh0b0bd605duf&st=6z6st1hq&raw=1",
"https://www.dropbox.com/scl/fi/g3p4i2rfgpyhlp8o87ine/06-sta-locura.mp3?rlkey=q0hms4q0g666edl8u8hy867o8&st=o6jfupvc&raw=1",
"https://www.dropbox.com/scl/fi/szw4zha282ia1mphmf1nm/07-La-chica-del-sur.mp3?rlkey=zj1p2p4mw4kcc62nkf8m189wh&st=ndfqmcm2&raw=1",
"https://www.dropbox.com/scl/fi/27s4btay9hoo653bv6his/08-Me-mor-de-risa.mp3?rlkey=d7s57enr5ejjn1ob8099o9u7t&st=skbhc7xd&raw=1",
"https://www.dropbox.com/scl/fi/51ipquersf4qy1iukgytq/09-Coraz-n.mp3?rlkey=3ed27wswvi4gbs4lrasd8juox&st=j5hbmivg&raw=1",
"https://www.dropbox.com/scl/fi/c53vy8bwdomic784ym4xs/10-Turdera.mp3?rlkey=509rs9n2de9ufp4wnmlnxa9t4&st=zsexos7t&raw=1",
"https://www.dropbox.com/scl/fi/flvs02oifxvjbsmuyppum/11-Qu-le-vamo_-a-hacer.mp3?rlkey=ivh9omto1uhgsf34jilyyx67m&st=umcculfm&raw=1",
"https://www.dropbox.com/scl/fi/pdqepjbnw45a6y0gn4pn3/12-Mil-noches.mp3?rlkey=o8jmhm7361swujp0ohd8bq1sk&st=ysks8vdy&raw=1",
"https://www.dropbox.com/scl/fi/czw93zoga30nmugwia14j/13-Aguinaldo-Fr-o-calor.mp3?rlkey=mgl6hrhco62a2v3ew68mitb0u&st=ksfo3l8t&raw=1",
"https://www.dropbox.com/scl/fi/6e5orvwg39xb824hea3o9/14-Marecchiare.mp3?rlkey=q40qqc9gf28z68om5bwbg6rnq&st=8tk1rmd1&raw=1"


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
        albumCover.src = "tapas/tapa10.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        albumCover.src = "tapas/contratapa10.jpg"; // Muestra el vinilo
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
