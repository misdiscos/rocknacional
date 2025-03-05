// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
    
"https://www.dropbox.com/scl/fi/dz2ce2cd6xkr8afjbr667/01-Cadillacs.mp3?rlkey=rwt5pcj9o7shhg7y3aigqj03p&st=dq0twxlw&raw=1",
"https://www.dropbox.com/scl/fi/fhamhf6shh8elnnd37by6/02-Matador.mp3?rlkey=rimt6nlkwh0yr1atcm5lrr5no&st=e45yqdrw&raw=1",
"https://www.dropbox.com/scl/fi/2o5yt8tnqspkarzkv32c6/03-Te-Tirare-del-Altar.mp3?rlkey=wsu77p19d9weoys3jqpk458ic&st=ca0qr95b&raw=1",
"https://www.dropbox.com/scl/fi/mq6wpzqzeytt4hnr0tkpi/04-V-Centenario.mp3?rlkey=sjz1sttij9h0pvf225o42adpw&st=japb191x&raw=1",
"https://www.dropbox.com/scl/fi/wis4wcikd8nbf7xdjr71x/05-Mi-Novia-Se-Cayo-En-Un-Pozo-Ciego.mp3?rlkey=jala23tpvbzzfw25klstt9ohn&st=s9zt8nyd&raw=1",
"https://www.dropbox.com/scl/fi/l0fwcb9pxt81y8migojpn/06-El-Satanico-Dr.-Cadillac.mp3?rlkey=9voad8jn8pthw06pga2qpi9fs&st=vi2m03xo&raw=1",
"https://www.dropbox.com/scl/fi/jguo6f5gx75s1z406vk6e/07-Gitana.mp3?rlkey=tj36s20xtq67lr0wmb6h0qgfc&st=u0c5l2pb&raw=1",
"https://www.dropbox.com/scl/fi/upwocoak12h7y00h7qy1y/08-Siguiendo-La-Luna.mp3?rlkey=kin9sh76z59xa146o2ulq25n4&st=d5g03epw&raw=1",
"https://www.dropbox.com/scl/fi/009to3ptv3ul3cyappmxg/09-Manuel-Santillan-El-Leon.mp3?rlkey=apk5yaqkx40qyumc6o0jsn2xw&st=ckaiy4uz&raw=1",
"https://www.dropbox.com/scl/fi/3g857qoeddvr4125qtud2/10-Demasiada-Presion.mp3?rlkey=n7lry9lqf0yih1midlxji06q2&st=qn6h46v3&raw=1",
"https://www.dropbox.com/scl/fi/yi45xkgxyyhf98wkygia7/11-Vasos-Vacios.mp3?rlkey=3px4r33rs440f3cuzdc07s19p&st=ovgbuooe&raw=1",
"https://www.dropbox.com/scl/fi/jfyr0oe3f73c2o3uerc2g/12-Revolution-Rock.mp3?rlkey=5hv8nasa4pumld0xt0on9jnm0&st=1cr2ju45&raw=1",
"https://www.dropbox.com/scl/fi/5lu4jr6yf2vpahqjl47xy/13-Yo-No-Me-Sentaria-En-Tu-Mesa.mp3?rlkey=qhiz3r5emlturlhychlbhfb91&st=tde7hyjs&raw=1",
"https://www.dropbox.com/scl/fi/nv7gcheakh3beu1xyq1qh/14-Yo-te-avis.mp3?rlkey=ohdnmez7m7uk3r3qt6fjq3kce&st=jdq5qx8u&raw=1",
"https://www.dropbox.com/scl/fi/p7uai0vxplykx4o0tkg7v/15-El-Genio-Del-Dub.mp3?rlkey=thyen9jn0jzpi8pgpnp5doldd&st=w746tqz1&raw=1",
"https://www.dropbox.com/scl/fi/dxbkqt15xvqod40haxbv5/16-Silencio-Hospital.mp3?rlkey=os4sl0bxwucprwzuupa6gh9m6&st=n0tlvw3h&raw=1",
"https://www.dropbox.com/scl/fi/ydj0h2avf0pxgw6ima99m/17-Basta-De-Llamarme-Asi.mp3?rlkey=bti6ow0m3hxqbe3181h00ij1b&st=bjc5xh8j&raw=1"


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
        albumCover.src = "tapas/tapa17.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        albumCover.src = "tapas/contratapa17.jpg"; // Muestra el vinilo
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
