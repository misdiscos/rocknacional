// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
    "https://www.dropbox.com/scl/fi/y78swcv7s6unzqcims5rm/01-Circo-Beat.mp3?rlkey=okxvp5rbpp4gb9ieesogib2ab&st=tkit2eas&raw=1",
"https://www.dropbox.com/scl/fi/9898cvwlcsh0s4tv1487l/02-Mariposa-Tecknicolor.mp3?rlkey=e0s2mci52okmg70dm8y2w8t4s&st=456vp8j5&raw=1",
"https://www.dropbox.com/scl/fi/7efncs2mu8vf1azoo7hay/03-Normal-1.mp3?rlkey=b5j1ivv0i1h6kapjtzmhvau79&st=saw6vo2g&raw=1",
"https://www.dropbox.com/scl/fi/9637v0nrtilpt6qkbrm1e/04-Las-tardes-del-sol-las-noches-de-agua.mp3?rlkey=2x9016s7ovs1s83iu0zqcb22y&st=u6qv6xr5&raw=1",
"https://www.dropbox.com/scl/fi/4ffcrfapa694wfxpzmfs2/05-Tema-de-piluso.mp3?rlkey=osg03c9l7mj2a6ib877s5nn8u&st=h61a8fe6&raw=1",
"https://www.dropbox.com/scl/fi/qzsh12545s7wimrx3rrco/06-She_s-mine.mp3?rlkey=e2mgb35gymh2b7vxj8gt4s2xr&st=hiytmm51&raw=1",
"https://www.dropbox.com/scl/fi/o377ktxqnzi7t33mmt0n0/07-El-jardin-donde-vuelan-los-mares.mp3?rlkey=kko7nc3cvj1r58h5ztcdmn1ci&st=qjjkr8w4&raw=1",
"https://www.dropbox.com/scl/fi/1n0l8fs3ae1cob8yomn1q/08-Nadie-detiene-al-amor-en-un-lugar.mp3?rlkey=ecvj9pck98l1t4j1myeld1ljc&st=4eusd5ko&raw=1",
"https://www.dropbox.com/scl/fi/0ciwa9jqde2tp6pcszomn/09-Si-Disney-despertase.mp3?rlkey=gkosgpgojz4efnkfrqcn0m7vj&st=tll64nut&raw=1",
"https://www.dropbox.com/scl/fi/etdw9px3igr6oyenzpfuu/10-Soy-un-hippie.mp3?rlkey=0xj4wxc5l8l91mu9i9aa5siat&st=4obtxps3&raw=1",
"https://www.dropbox.com/scl/fi/e9mysomqzavmfxiz46am3/11-Dejarlas-partir.mp3?rlkey=rh439yuedla2d5dvsqez629as&st=vkp7geaq&raw=1",
"https://www.dropbox.com/scl/fi/qixc5y7rc2hd4wjddncbn/12-Lo-que-el-viento-nunca-de-llevo.mp3?rlkey=t1mzwxuxzojrzmcr38je97d8i&st=x2gwn768&raw=1",
"https://www.dropbox.com/scl/fi/wvltcqtbrygh95g3oe8hh/13-Nada-del-mundo-real.mp3?rlkey=muqvrs5n1yzzfge9n4ywkqnsa&st=myjdsteu&raw=1"


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
        albumCover.src = "tapas/tapa19.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        albumCover.src = "tapas/contratapa19.jpg"; // Muestra el vinilo
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
