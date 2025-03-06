// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
 "https://www.dropbox.com/scl/fi/hw8a1bknkzn7ctnkfeq7t/01.-Sin-Cadenas.mp3?rlkey=2thygf19f9w8q6oolkgj8w506&st=1q26l2na&raw=1",
"https://www.dropbox.com/scl/fi/ft42rpaswczayzblzpi2e/02.-Pupilas-Lejanas.mp3?rlkey=pwknik9zxdxcdczapa3d559b6&st=ex52ltef&raw=1",
"https://www.dropbox.com/scl/fi/plj1h4nllnmn2dpkl5k0f/03.-Don-Juan-Golden-Love.mp3?rlkey=u3iojnf24sg80ct5se9euqx31&st=dai33ud8&raw=1",
"https://www.dropbox.com/scl/fi/oop3yhwn9jru2auzkdwpx/04.-Mi-Flor.mp3?rlkey=ywh4a3thb9vdwjvht66optiog&st=cqf1q34c&raw=1",
"https://www.dropbox.com/scl/fi/dmvyp0fpjaurh940b22rr/05.-La-Hiena.mp3?rlkey=p8cshzlbg7zw0ucy33ifvw4e2&st=cktvl60q&raw=1",
"https://www.dropbox.com/scl/fi/gagu0apnmi8nywhlj86mf/06.-Monkey-Man.mp3?rlkey=76uf50cfjjdazposkt1tqvlga&st=1zyh792j&raw=1",
"https://www.dropbox.com/scl/fi/hmn18h06onoyzkx1q4d9y/07.-La-Mirada.mp3?rlkey=ca4itbmneyastzgzq20ct99gz&st=uspthdx5&raw=1",
"https://www.dropbox.com/scl/fi/4ovskg1kvt4ns9z2u9jx2/08.-Buenos-Dias.mp3?rlkey=kg86693f3t48qvcxi2vvn9ghf&st=hce9nk9v&raw=1",
"https://www.dropbox.com/scl/fi/8busuaj5oubojswnk5j1t/09.-Ska-Tijuana.mp3?rlkey=mktw30cni0v3isqes2xezjic5&st=439wplok&raw=1",
"https://www.dropbox.com/scl/fi/uk4iwiqv8t8bhi24avv0k/10.-Los-Libros-De-La-Buena-Memoria.mp3?rlkey=f633jbmvvg9kxn2xxzbqvu6is&st=3zewyw8r&raw=1",
"https://www.dropbox.com/scl/fi/nnmzl5xf1luvbkdat5ox2/11.-Rata-China.mp3?rlkey=q8zn8rj16mqlghaos20p47108&st=bwkecf2e&raw=1",
"https://www.dropbox.com/scl/fi/83ku5j69ivtg8dwk45t4q/12.-Islandia.mp3?rlkey=5rh9dwa0ty2y6d6xepui20fvu&st=clj171yf&raw=1",
"https://www.dropbox.com/scl/fi/phfd80fr6jd0kyzzoalb6/13.-Mystic-Love.mp3?rlkey=x69bqzm0qmb57ab3ilg23riwr&st=s5tvbl7j&raw=1",
"https://www.dropbox.com/scl/fi/05aijwosain7nyuo0kues/14.-El-Mejor-Lugar-Don_t-Stey-Out-Late.mp3?rlkey=sxxkw2zc8fnqrptl6lrdev585&st=u1ot5f05&raw=1",
"https://www.dropbox.com/scl/fi/rpxy2man2z76tn3iaaj75/15.-Donde-Van-Las-Almas.mp3?rlkey=ec006mevpu3lkxin1ifjfcoee&st=aaj9ayio&raw=1",
"https://www.dropbox.com/scl/fi/kzczwrncjg7ug0x78x7wy/16.-Monaco-GP.mp3?rlkey=lpyd9qusc9uaqzm368rp4pdui&st=84anzwsj&raw=1",
"https://www.dropbox.com/scl/fi/uy85h1bm9zot3cug0fq9j/17.-Pericos-Version-Grabador-Keep-On-Movin_.mp3?rlkey=kmw5z1s77rcm8pgf8nfgla6cn&st=ty1zmnu3&raw=1"


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
        albumCover.src = "tapas/contratapa25.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        albumCover.src = "vinilo2.gif"; // Muestra el vinilo
        estado = 2;
    } else {
        albumCover.src = "tapas/tapa25.jpg"; // Vuelve a la tapa    
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
