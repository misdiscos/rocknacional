// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
   "https://www.dropbox.com/scl/fi/2yu4dbiothee4zqpcb47g/01-Los-Piojos-Olvidate-Ia-Ves.mp3?rlkey=g7eaq62zqkotubnni664d5wfo&st=tcs6mdmx&raw=1",
"https://www.dropbox.com/scl/fi/lvvvvogsoct0ftr2dmb3w/02-Los-Piojos-Chac-Tu-Chac.mp3?rlkey=nvl6gt9x8nqjk33mhkyh01iub&st=bojdem0e&raw=1",
"https://www.dropbox.com/scl/fi/tcajc91l4wf3sru83cir3/03-Los-Piojos-Desde-Lejos-No-Se-Ve.mp3?rlkey=102nen2245qlbv3upfshrogjv&st=buoz1pk0&raw=1",
"https://www.dropbox.com/scl/fi/7oiumzsz0cx1kakzarao3/04-Los-Piojos-Ay-Ay-Ay.mp3?rlkey=q0xi6yw26w5ngzx91971cxdf5&st=6rbjqach&raw=1",
"https://www.dropbox.com/scl/fi/h78fsukj037ojgedev0sl/05-Los-Piojos-Angelito.mp3?rlkey=hed94q4h5r0qz85gpdj1h8kmq&st=vabassm4&raw=1",
"https://www.dropbox.com/scl/fi/wvhweejqkwx6wrbaipxfu/06-Los-Piojos-Agua.mp3?rlkey=sw8s64zzvr7m1mm49xr0jjw4a&st=z93ct2kr&raw=1",
"https://www.dropbox.com/scl/fi/nbnyty5ac9msiq06pouse/07-Los-Piojos-Arco.mp3?rlkey=cakj8bhddoe5iv7mvc4d4one1&st=axv773fp&raw=1",
"https://www.dropbox.com/scl/fi/04u6uue8utgc23ldn2bb5/08-Los-Piojos-Tan-Solo.mp3?rlkey=ssks1hh28rckbrl5resnavo6v&st=tzzf2pw8&raw=1",
"https://www.dropbox.com/scl/fi/4a0ueju071katzyxbp2v4/09-Los-Piojos-Intro-Himno-Nacional-Argentino-Intro-Marad.mp3?rlkey=lezmclya2r4tndaanigodzfhj&st=oscfoaqx&raw=1",
"https://www.dropbox.com/scl/fi/llvxy58i21xar8yggg48s/10-Los-Piojos-Marado.mp3?rlkey=6fbs1d2y7gp8a2f90dsyayg5k&st=4und0jtt&raw=1",
"https://www.dropbox.com/scl/fi/30091epxvhmzd0b2lydo0/11-Los-Piojos-Ando-Ganas-Llora-Llora.mp3?rlkey=4pjlfvf2anhhg7ogtoui7drc9&st=vnd0giqc&raw=1",
"https://www.dropbox.com/scl/fi/60llim6c1no3wuykq77z8/12-Los-Piojos-Cruel.mp3?rlkey=5wa3xtmi13aim412xkpsgl802&st=i5u7shxa&raw=1",
"https://www.dropbox.com/scl/fi/wxihyud5nr3nld7hkdfnt/13-Los-Piojos-Todo-Pasa.mp3?rlkey=mo5y3axusn35w97ac9843rv9i&st=c50aqzw3&raw=1",
"https://www.dropbox.com/scl/fi/ct8w0l0jab940ki65nesm/14-Los-Piojos-Around-Around-Zapatos-De-Gamuza-Azul.mp3?rlkey=v8qvl4twn7rtnyrz5bm1eibj9&st=4wafi0sw&raw=1",
"https://www.dropbox.com/scl/fi/vazcd636ivwmipka8j6kb/15-Los-Piojos-Es-S-lo-Rock-And-Roll-It_s-Only-Rock-_n_-Roll.mp3?rlkey=hq7j889tp3kl2bgg1fq99c3j4&st=bvj5rdp6&raw=1"


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
        albumCover.src = "tapas/contratapa9.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        const randomVinyl = ["vinilo1.gif", "vinilo2.gif", "vinilo3.gif", "vinilo4.gif", "vinilo5.gif", "vinilo6.gif", "vinilo7.gif", "vinilo8.gif", "vinilo9.gif", "vinilo10.gif"][Math.floor(Math.random() * 10)];
        albumCover.src = randomVinyl; // Muestra un vinilo aleatorio
        estado = 2;
    } else {
        albumCover.src = "tapas/tapa9.jpg"; // Vuelve a la tapa    
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
