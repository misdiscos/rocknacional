// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
    "https://www.dropbox.com/scl/fi/o3hhwola09h9kaupzdvz7/01.-Zig-Zag.mp3?rlkey=cvaodqqbip5mt9sfihacrfywd&st=o5oyny6x&raw=1",
"https://www.dropbox.com/scl/fi/jx75jrsxq3o36cvhpy04e/02.-Sin-Gamul-n.mp3?rlkey=b50j3s2ptyyumovj0o2pcis1x&st=q5etmuk5&raw=1",
"https://www.dropbox.com/scl/fi/rdnnk5kutp9n3ztxnejb6/03.-Meditasol.mp3?rlkey=8t8r4tnrr58dll692xd1j1kpr&st=i0bi2vml&raw=1",
"https://www.dropbox.com/scl/fi/60o2ctjlxdvhats4c0a3u/04.-Mil-Horas.mp3?rlkey=wq9sqxkc066eaeaubhhx9ogv6&st=mnm01df0&raw=1",
"https://www.dropbox.com/scl/fi/e9uz68zgq33jsiygwf2w7/05.-Guindilla-Ardiente.mp3?rlkey=f6snpgd1necjpf3ln4r5lg2bp&st=h38i8apm&raw=1",
"https://www.dropbox.com/scl/fi/ma0hnnnlhwxwnqqm17zsg/06.-Sinton-a-Americana.mp3?rlkey=kaj40zxnqmu57a5di7zm8nlru&st=x23t88yf&raw=1",
"https://www.dropbox.com/scl/fi/crzlnqaliu95q4hvo8v9c/07.-As-Es-El-Calor.mp3?rlkey=2bv9tddmbd9n1bajd4dxsyfsz&st=4y0y4h4m&raw=1",
"https://www.dropbox.com/scl/fi/yuinjsoyvv6t5nxo0t5wh/08.-Costumbres-Argentinas.mp3?rlkey=flrptum9xe4vry00kh8qwjltn&st=wll3wbjw&raw=1",
"https://www.dropbox.com/scl/fi/byuewntmir36mxoc6r4ce/09.-Himno-De-Mi-Coraz-n.mp3?rlkey=tsx076wbp05g0kaqtkqif6r95&st=2dbb3jok&raw=1",
"https://www.dropbox.com/scl/fi/rpmfpy4ywwi42fu0y10wk/10.-No-Te-Enamores-Nunca-De-Aquel-Marinero-Bengal.mp3?rlkey=7h9y154xpsn4z9vnm0qyh2igf&st=n8kimgek&raw=1",
"https://www.dropbox.com/scl/fi/c3fr1ltyehiq4d8phcpw7/11.-Chalam-n.mp3?rlkey=1faqrouswmw301d0oa1ja6nyo&st=nfc8eb81&raw=1",
"https://www.dropbox.com/scl/fi/pbornipse1u6xwy69n86s/12.-Lunes-Por-La-Madrugada.mp3?rlkey=9pncvj1pwo3ql81d71yzznf6p&st=8t3u4lt5&raw=1"


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
        albumCover.src = "tapas/tapa5.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        albumCover.src = "tapas/contratapa5.jpg"; // Muestra el vinilo
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
