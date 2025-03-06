// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
    "https://www.dropbox.com/scl/fi/co1h1pw51c7f38ba9nefw/01.-El-amor-despues-del-amor.mp3?rlkey=iapa9y4gh38iyre7dpjr0cxs8&raw=1",
    "https://www.dropbox.com/scl/fi/ous0ct0wwvusss42l1rpy/02.-Dos-dias-en-la-vida.mp3?rlkey=06e9jtbsaw95mdbvngnu8m6s8&st=tmfzu91s&raw=1",
    "https://www.dropbox.com/scl/fi/g6g20yjdb405yuqsqfzpm/03.-La-Veronica.mp3?rlkey=sxf700xr8t3dfjjvkfw4mpn70&st=itfcgg40&raw=1",
    "https://www.dropbox.com/scl/fi/5wbh7arexffwxstp04p03/04.-Trafico-por-Katmandu.mp3?rlkey=qv0j4je4dt85rfgpzr5opgt8u&st=jr2gm0fm&raw=1",
    "https://www.dropbox.com/scl/fi/dnjjqns93te6yls2v5t66/05.-Petalo-de-sal.mp3?rlkey=4fcmbzk1lfh6ysvivkjehiqih&st=1uq56ur1&raw=1",
    "https://www.dropbox.com/scl/fi/2gw76572c7g1rlcjilv7h/06.-Sasha-Sissi-y-el-Circulo-de-Baba.mp3?rlkey=9zdi493iamr9uiie5hkcsk0nd&st=pruf3h5v&raw=1",
    "https://www.dropbox.com/scl/fi/c19d9dgk4qszp9pdzmlns/07.-Un-vestido-y-un-amor.mp3?rlkey=rt1x9pqbzb6tt7tmu3v9etzdi&st=6646i65v&raw=1",
    "https://www.dropbox.com/scl/fi/1pknfmoagknjlvj10prnt/08.-Tumbas-de-la-Gloria.mp3?rlkey=8sofe776d2qhynjolfapk0avc&st=xr7za1in&raw=1",
    "https://www.dropbox.com/scl/fi/exlgb5ayjq57os4k1zbw8/09.-La-rueda-magica.mp3?rlkey=yh8c15ahrgvcg6jpwun7m4va4&st=1scaohzs&raw=1",
    "https://www.dropbox.com/scl/fi/ay9hlmdur8fhcn78dx35o/10.-Creo.mp3?rlkey=u43v1wljfun7t0r6i6v15w7pq&st=4evt8ll6&raw=1",
    "https://www.dropbox.com/scl/fi/9pzjijfw775v4zv6oq4sx/11.-Detras-del-muro-de-los-lamentos.mp3?rlkey=9af3j07ups83ja2nbq6d1uikv&st=8rfg8kpx&raw=1",
    "https://www.dropbox.com/scl/fi/7vn0j34setm5ngoz41wox/12.-Balada-de-Donna-Helena.mp3?rlkey=lptyr3gqojanlhyobog6gentv&st=s8wzanat&raw=1",
    "https://www.dropbox.com/scl/fi/lp5k6s213w3ss3mm315dl/13.-Brillante-sobre-el-Mic.mp3?rlkey=363eigw9gw6hs34gva2ux18ck&st=zv1gp0r3&raw=1",
    "https://www.dropbox.com/scl/fi/9tt6kxszlyxy19uzip138/14.-A-rodar-mi-vida.mp3?rlkey=9v72c5vvac4yxetuk2yux0d4r&st=xz0jl1sh&raw=1"


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
        albumCover.src = "tapas/contratapa1.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        const randomVinyl = ["vinilo1.gif", "vinilo2.gif", "vinilo3.gif", "vinilo4.gif", "vinilo5.gif", "vinilo6.gif", "vinilo7.gif", "vinilo8.gif", "vinilo9.gif", "vinilo10.gif"][Math.floor(Math.random() * 10)];
        albumCover.src = randomVinyl; // Muestra un vinilo aleatorio
        estado = 2;
    } else {
        albumCover.src = "tapas/tapa1.jpg"; // Vuelve a la tapa    
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
