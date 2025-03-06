// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
 "https://www.dropbox.com/s/6v6hl6sd29caq7w/01.%20El%20anillo%20del%20capitan%20Beto.mp3?st=g6gg57u2&raw=1",
"https://www.dropbox.com/s/4xh04gnbmhcvxkx/02.%20Yo%20vivo%20en%20esta%20ciudad.mp3?st=yvoba5dw&raw=1",
"https://www.dropbox.com/s/95qn0lsw51raxfn/03.%20Amanece%20en%20la%20ruta.mp3?st=5g0j2g8n&raw=1",
"https://www.dropbox.com/s/6g37daoe7xy1koq/04.%20Donde%20mand%20marinero.mp3?st=mcpc3090&raw=1",
"https://www.dropbox.com/s/c40iigh2zelg4m3/05.%20La%20bestia%20pop.mp3?st=5ngfdotv&raw=1",
"https://www.dropbox.com/s/fo9bce2awnrxnev/06.%20Eiti%20Leda.mp3?st=xunn60cd&raw=1",
"https://www.dropbox.com/s/2zu54p50ewm4w46/07.%20Fue%20amor.mp3?st=gy21m89h&raw=1",
"https://www.dropbox.com/s/dhcrixbhwggjdmj/08.%20Murguita%20del%20sur.mp3?st=tq77c37i&raw=1",
"https://www.dropbox.com/s/fhkakxxrsf2b46b/09.%20Un%20loco%20en%20la%20calesita.mp3?st=tsg903nz&raw=1",
"https://www.dropbox.com/s/xvblgnz0s1sulua/10.%20Me%20arde.mp3?st=ajbr5yki&raw=1",
"https://www.dropbox.com/s/zujal6g1pn8qsvc/11.%20Spaghetti%20del%20rock.mp3?st=b9kwmwgp&raw=1",
"https://www.dropbox.com/s/4qrookb220awo21/12.%20Cancion%20de%20alicia%20en%20el%20pais.mp3?st=gjr9ll2t&raw=1",
"https://www.dropbox.com/s/5e22hb49mtdp3jh/13.%20Profugos.mp3?st=p8hw00u1&raw=1",
"https://www.dropbox.com/s/xybu6j3hwoiunxw/14.%20Nada%20es%20para%20siempre.mp3?st=6ii6l65x&raw=1",
"https://www.dropbox.com/s/90n3zhp0jplzkzz/15.%20Mary%20poppins%20y%20el%20deshollinador.mp3?st=rz324iji&raw=1",
"https://www.dropbox.com/s/7bo54fn0ifl87di/16.%20Ya%20fue.mp3?st=qlbrrkot&raw=1",
"https://www.dropbox.com/s/mutt9dwe9ku9sxd/17.%20Cleopatra%2C%20la%20reina%20de%20twist.mp3?st=ges871kt&raw=1",


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
        albumCover.src = "tapas/contratapa30.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        const randomVinyl = ["vinilo1.gif", "vinilo2.gif", "vinilo3.gif", "vinilo4.gif", "vinilo5.gif", "vinilo6.gif", "vinilo7.gif", "vinilo8.gif", "vinilo9.gif", "vinilo10.gif"][Math.floor(Math.random() * 10)];
        albumCover.src = randomVinyl; // Muestra un vinilo aleatorio
        estado = 2;
    } else {
        albumCover.src = "tapas/tapa30.jpg"; // Vuelve a la tapa    
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
