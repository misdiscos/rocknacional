// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
   "https://www.dropbox.com/scl/fi/m1ciorxl6fjulz5ubx9mj/01-Zimbabwe-Reconquistandome.mp3?rlkey=cltlhg1sw72hy4i9jk5m0y29f&st=ne26ya2h&raw=1",
"https://www.dropbox.com/scl/fi/ouh30zo9m3bcadk1wtjtx/02-Zimbabwe-Alguien-Como-T.mp3?rlkey=7p1tnyeybfr2b0zewooanf1ci&st=j510r4if&raw=1",
"https://www.dropbox.com/scl/fi/73fp9awlpn38mja4ofokz/03-Zimbabwe-Amor-Criminal.mp3?rlkey=x0l8irfojpdnwhmbkqh5p0obs&st=1cab68vf&raw=1",
"https://www.dropbox.com/scl/fi/3zafy4sluuivnlog0a9sc/04-Zimbabwe-Verano-Del-_57.mp3?rlkey=i9gt6yo74psby0hqe02roftix&st=q9m67p3o&raw=1",
"https://www.dropbox.com/scl/fi/xcez4kddt3653psuk9y1m/05-Zimbabwe-Sangre-Caliente.mp3?rlkey=1xso5pk110vm97yt9fv1b9wkr&st=7um46rs3&raw=1",
"https://www.dropbox.com/scl/fi/4lxlxgalchj8bc5mc9na5/06-Zimbabwe-Sangre-Toast.mp3?rlkey=r24pkj99561vmmrnzo6h664va&st=el2oplan&raw=1",
"https://www.dropbox.com/scl/fi/ofjg2ok01huymxgk3nhoc/07-Zimbabwe-Cuesti-n-de-Honor.mp3?rlkey=m6g1xeesdhr0y8s4os0uj5hhg&st=x8pcikzb&raw=1",
"https://www.dropbox.com/scl/fi/w185icgecj7lwx5qitlau/08-Zimbabwe-Lado-B.mp3?rlkey=hbtme598ca86twvbbnqvqk2zx&st=omwrkq2l&raw=1",
"https://www.dropbox.com/scl/fi/o27jrr2cawhgvf0q0yf6o/09-Zimbabwe-Paseo-Nocturno.mp3?rlkey=owxluzqnogojbee686uh1zd5l&st=gy4t30lu&raw=1",
"https://www.dropbox.com/scl/fi/cbio42nbw0qry30rlddur/10-Zimbabwe-Passionatta.mp3?rlkey=kc7ytksnsjm6aq3y6lxbjl38q&st=7f8q1qnq&raw=1",
"https://www.dropbox.com/scl/fi/6xmjgrayan0h4tr5y2s0v/11-Zimbabwe-Ya-No-Me-Pidas-...-Que-Sea-Como-Antes.mp3?rlkey=gz5nnrskor9vxge7x4st0c7ur&st=1ky1bs16&raw=1",
"https://www.dropbox.com/scl/fi/5z6mi1za3nz673fnd2rcv/12-Zimbabwe-Traici-n-a-la-Mejicana.mp3?rlkey=gk6c2hshz4qj4i1xrlqswigo7&st=9oxlcanw&raw=1",
"https://www.dropbox.com/scl/fi/xtjz8itwp8bpvw1ctlepa/13-Zimbabwe-Loco-de-Atar.mp3?rlkey=9kj9x259mzepvs4fdra2xt649&st=uyvh3vee&raw=1",
"https://www.dropbox.com/scl/fi/wd38qegdgy3pagm0gbonr/14-Zimbabwe-S-lo-Se.mp3?rlkey=8nzp7smj07uyv1menhx5sk3rc&st=n027uv2c&raw=1"


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
        albumCover.src = "tapas/tapa22.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        albumCover.src = "tapas/contratapa22.jpg"; // Muestra el vinilo
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
