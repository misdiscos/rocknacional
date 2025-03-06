// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
    "https://www.dropbox.com/scl/fi/56gffjf6032fig5i5nhz3/01.-S-bado.mp3?rlkey=l1pttm6z5x9t8cq2qi6fl6s88&st=jzpfvr10&raw=1",
"https://www.dropbox.com/scl/fi/zpmct4hi6uxohjjjqofym/02.-Dame-un-lim-n.mp3?rlkey=m7pw6yqo3sik0s9z3c6agr8xj&st=puj3bwr2&raw=1",
"https://www.dropbox.com/scl/fi/kgtp69ef8l4agi8cnsb94/03.-Qu-tal_.mp3?rlkey=m0zpa3f2pgojjnd6w7eao8yjd&st=my2mc5tu&raw=1",
"https://www.dropbox.com/scl/fi/9ocfyogibuch04ktnnxv1/04.-El-38.mp3?rlkey=6dkn2k7i23u3yxd2uxd53iv6f&st=i7u9f68i&raw=1",
"https://www.dropbox.com/scl/fi/27pq0hqdaitwzsx68lqpu/05.-Qu-ves_.mp3?rlkey=740xs9bohxzlehc7en3py89uk&st=zyl0hit6&raw=1",
"https://www.dropbox.com/scl/fi/bn1h825o8l2tertcflnpv/06.-El-arriero.mp3?rlkey=z8qf08qzdtw22aq8cddkymq3q&st=iq9xlzk8&raw=1",
"https://www.dropbox.com/scl/fi/nks43gmx1zywl6fz2yclp/07.-Tomando-mate-en-la-paz.mp3?rlkey=6mg7nei9hxb29or7x3ikjcgn3&st=dc40er6z&raw=1",
"https://www.dropbox.com/scl/fi/fn3xn4xth7yxhyt781t5l/08.-Paisano-de-Hurlingham.mp3?rlkey=8nm0ntwmqv23tz2jihk5g9sli&st=24lragk4&raw=1",
"https://www.dropbox.com/scl/fi/wvq2wn7zqyr5ubwht2ze0/09.-Cielito-lindo.mp3?rlkey=epkugoa4u4f81rvprj57goarr&st=otsx96yw&raw=1",
"https://www.dropbox.com/scl/fi/pz4oyqwxw7lwphgdyfbsk/10.-15-5.mp3?rlkey=c3ol277oajqx5xopvvqoe0s65&st=jb9uyw54&raw=1",
"https://www.dropbox.com/scl/fi/jvb6yv3g78a16bgkpkws5/11.-Capo-cap-n.mp3?rlkey=52f4h9mpat3nfxywuacci6sy1&st=2r5km6g3&raw=1",
"https://www.dropbox.com/scl/fi/pqzsljjxbh536se61aenw/12.-Cabez-n.mp3?rlkey=euj1kb9967s1yskquvnj0j5ky&st=l0v7t2cy&raw=1",
"https://www.dropbox.com/scl/fi/wfzfmsbmnyawwrwsgccjt/13.-Potpourr-en-vivo.mp3?rlkey=2led5c744o24kwnnpx9sonhbb&st=7fv9a1hl&raw=1"


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
        albumCover.src = "tapas/contratapa15.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        const randomVinyl = ["vinilo1.gif", "vinilo2.gif", "vinilo3.gif", "vinilo4.gif", "vinilo5.gif", "vinilo6.gif", "vinilo7.gif", "vinilo8.gif", "vinilo9.gif", "vinilo10.gif"][Math.floor(Math.random() * 10)];
        albumCover.src = randomVinyl; // Muestra un vinilo aleatorio
        estado = 2;
    } else {
        albumCover.src = "tapas/tapa15.jpg"; // Vuelve a la tapa    
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
