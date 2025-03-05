// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
    "https://www.dropbox.com/scl/fi/3it0aapcl2opsgrzxdrlm/01-De-la-cabeza.mp3?rlkey=9t5yf1c6ki6jlxorajfyhslqh&st=fcvl29ki&raw=1",
"https://www.dropbox.com/scl/fi/jwzpiqflk9iwpas72rhih/02-El-tiempo-no-para.mp3?rlkey=wc71ndbv6nmp3khps3gdhwdza&st=l2zwohe5&raw=1",
"https://www.dropbox.com/scl/fi/0xwsgska6jr3p92zjmj0x/03-Danza-De-los-muertos-pobres.mp3?rlkey=a3x1qb5sppbgp1tgzvyzyc9vu&st=1c9ibqs5&raw=1",
"https://www.dropbox.com/scl/fi/0mlvuuftypag0z1uo7pq5/04-El-viejo-de-arriva.mp3?rlkey=13u48w134kw27n9yiiaijwwk5&st=8f0xn771&raw=1",
"https://www.dropbox.com/scl/fi/l16ny9e3xxx15mg76fl4a/05-Espiritu-de-esta-selva.mp3?rlkey=rdlnfzedx70y2f50hz770wt5l&st=ob9wa4hs&raw=1",
"https://www.dropbox.com/scl/fi/ufnwxm8y8r2i5ybkwajnu/06.-Vuelos-Bersuit.mp3?rlkey=4su7r3d8xdtzswf4wmffibos1&st=386j7h4q&raw=1",
"https://www.dropbox.com/scl/fi/41868hv87v1803dvepxrp/07-Mi-caramelo.mp3?rlkey=qg0yd2yetx6289k66h22jk63n&st=2bgsfc1j&raw=1",
"https://www.dropbox.com/scl/fi/m51tz2he0e2swdj6fv1dp/08-Un-pacto.mp3?rlkey=0yz83isajv9wbox7h4rm4pnpb&st=rphgjxm5&raw=1",
"https://www.dropbox.com/scl/fi/ssoh3hdrhgu70ulq6rdxo/09-Perro-amor-explota.mp3?rlkey=mki1gtn1z7fs22vuvamvarfb0&st=1zty9oiq&raw=1",
"https://www.dropbox.com/scl/fi/aoxxkxwrx0onybp4swuj4/10-Tuyu.mp3?rlkey=2c217ek4sxcz262r2uhxuxn9c&st=4b38qeh9&raw=1",
"https://www.dropbox.com/scl/fi/m2h0fgdkr2nomxpc6tj5p/11-Yo-tomo.mp3?rlkey=4zrj6p6aenlk82t98nukenurg&st=7jfg1kmu&raw=1",
"https://www.dropbox.com/scl/fi/zwe6p9xq92dns4ffhbd31/12-Se-or-cobranza.mp3?rlkey=l7hx2o4tvo8h27b2m2tuwiceb&st=guhg1hdk&raw=1",
"https://www.dropbox.com/scl/fi/voeeg371tbldgyytx9lw2/13-La-bolsa.mp3?rlkey=6ypdzlffr0lbkuq6bq0yuoi5i&st=ui5co399&raw=1",
"https://www.dropbox.com/scl/fi/a3tu6xkdaylps9vg5icth/14-Muguita-del-sur.mp3?rlkey=uot26n8hhpx3plx1efvd1ytmr&st=v3bvxaxc&raw=1",
"https://www.dropbox.com/scl/fi/mi4i22o51256li43fbc0v/15-Se-biene.mp3?rlkey=pbe9vu2wdr0kwchvniq9xeyxw&st=gw7r6f3z&raw=1",
"https://www.dropbox.com/scl/fi/p23iwsdotubi2al8brufd/16-Hosiquito-de-raton-bonus-diez-mil.mp3?rlkey=auam922l8lpio2as39m5x89l5&st=htzzxde2&raw=1"

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
        albumCover.src = "tapas/contratapa16.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        albumCover.src = "vinilo2.gif"; // Muestra el vinilo
        estado = 2;
    } else {
        albumCover.src = "tapas/tapa16.jpg"; // Vuelve a la tapa    
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
