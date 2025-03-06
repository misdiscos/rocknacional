// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
"https://www.dropbox.com/s/hk51dtnhxexy3y7/01-Yendo%20de%20la%20cama%20al%20living.mp3?st=4q1bs44w&raw=1",
"https://www.dropbox.com/s/vqlzwpi719cmohf/02-Rezo%20por%20vos.mp3?st=9revm287&raw=1",
"https://www.dropbox.com/s/0gcel1n40ruuxl9/03-Fanky.mp3?st=4jycrowe&raw=1",
"https://www.dropbox.com/s/xo336ydojgg4wgi/04-Pasajera%20en%20trance.mp3?st=ybg8658s&raw=1",
"https://www.dropbox.com/s/zv1mzp2y4fkyr07/05-Eiti%20leda%20-%20Viernes%203%20AM.mp3?st=5jzmvhga&raw=1",
"https://www.dropbox.com/s/tayltehvcfok6mj/06-Cerca%20de%20la%20revoluci%C3%B3n.mp3?st=8v9egeil&raw=1",
"https://www.dropbox.com/s/oxl485wllyl42qs/07-Promesas%20sobre%20el%20bidet.mp3?st=60bgskga&raw=1",
"https://www.dropbox.com/s/c7bjn8f168ix3zo/08-No%20soy%20un%20extra%C3%B1o.mp3?st=p94jxc2f&raw=1",
"https://www.dropbox.com/s/fobblpdt67ei4hs/09-Los%20dinosaurios.mp3?st=0zm1ukpr&raw=1",
"https://www.dropbox.com/s/u2knp816q6nfybs/10-Chipi%20chipi.mp3?st=twxau7ok&raw=1",
"https://www.dropbox.com/s/36l6fl53wi2dnlf/11-La%20sal%20no%20sala.mp3?st=tby2fguh&raw=1",
"https://www.dropbox.com/s/a8hcbeyj88fn5iw/12-Nos%20siguen%20pegando%20abajo(pecado%20mortal).mp3?st=2r459qx0&raw=1",
"https://www.dropbox.com/s/52o7gklk8rr9usv/13-Ojos%20de%20videotape.mp3?st=fydhisx3&raw=1",
"https://www.dropbox.com/s/q5bkpnagh7q4od6/14-Demoliendo%20hoteles.mp3?st=wta6snsj&raw=1",
"https://www.dropbox.com/s/eflwteo99fsd7rr/15-Fifteen%20forever.mp3?st=fxfdcugk&raw=1",


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
        albumCover.src = "tapas/contratapa28.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        albumCover.src = "vinilo2.gif"; // Muestra el vinilo
        estado = 2;
    } else {
        albumCover.src = "tapas/tapa28.jpg"; // Vuelve a la tapa    
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
