// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
   "https://www.dropbox.com/scl/fi/48ta2jmrl6jrn60g6g9ie/01-Tema-De-Pototo.mp3?rlkey=ikcf1zc4268nb2iprzds4ckgr&st=qaqsnq1h&raw=1",
"https://www.dropbox.com/scl/fi/4f6grqf7aak6sbxabmdzp/02-El-Mundo-Entre-Las-Manos.mp3?rlkey=4z9xzsevx8kokytd85l9afs78&st=znlj19yb&raw=1",
"https://www.dropbox.com/scl/fi/dmygf5nn9jjffwrj0oy8g/03-Hoy-Todo-El-Hielo-En-La-Ciudad.mp3?rlkey=bjw9ztx99nmv6tvgsmng4e2sr&st=w960apt2&raw=1",
"https://www.dropbox.com/scl/fi/9t63oj4tl3jb0jvws83vb/04-Campos-Verdes.mp3?rlkey=9v7s7r24ap7qbxeuqgxzsltsr&st=4cwscwdg&raw=1",
"https://www.dropbox.com/scl/fi/c408508nb9lckyj8ld7wq/05-Gabinetes-Espaciales.mp3?rlkey=x4ttie4gu401ya2br1ba3hqyl&st=7h31j64h&raw=1",
"https://www.dropbox.com/scl/fi/tywas8gic1d2zmqyk8pco/06-Final.mp3?rlkey=hl0f2ne299kevjr2f681zriic&st=m9zegjod&raw=1",
"https://www.dropbox.com/scl/fi/nr3d86fcsi7mo9ri6hcsp/07-Muchacha-Ojos-De-Papel.mp3?rlkey=limyvzsihdeuo4vqsvugqhzeg&st=vbsnsamu&raw=1",
"https://www.dropbox.com/scl/fi/nr3d86fcsi7mo9ri6hcsp/07-Muchacha-Ojos-De-Papel.mp3?rlkey=limyvzsihdeuo4vqsvugqhzeg&st=vbsnsamu&raw=1",
"https://www.dropbox.com/scl/fi/faphtvsqr9bax00b5mgvk/09-Figuraci-n.mp3?rlkey=0h6o960o4hb0lfpa06k1e3jjx&st=w4w18yye&raw=1",
"https://www.dropbox.com/scl/fi/m8xw7dsp4d44kg7562jbk/10-Ana-No-Duerme.mp3?rlkey=7hpjv9z6sbpjiwsy7zp83a602&st=38ft6k25&raw=1",
"https://www.dropbox.com/scl/fi/i51rltdfc3o0kf3s9ko83/11-Ferm-n.mp3?rlkey=x319i5arr9tt255i4brm70nh5&st=9pf5lqs0&raw=1",
"https://www.dropbox.com/scl/fi/b80qsnpleeo467s8d8mfj/12-Plegaria-Para-Un-Ni-o-Dormido.mp3?rlkey=37nipsca5zs066az3o0fe63fb&st=o0ov7m0d&raw=1",
"https://www.dropbox.com/scl/fi/0k0gttk4yhvj2iw0bnv35/13-A-Estos-Hombres-Tristes.mp3?rlkey=12n5snbg4icke81zi5751s9x0&st=kzk6vdh7&raw=1",
"https://www.dropbox.com/scl/fi/pe75v25lvz3v0xuwqzjso/14-Que-El-Viento-Borr-Tus-Manos.mp3?rlkey=8qor7usijdjq2cansyhkutask&st=ro4rhp6i&raw=1",
"https://www.dropbox.com/scl/fi/4vfyqk7zw1vdz12huwcmm/15-Laura-Va.mp3?rlkey=4rxigod8gd55ngvlp973j2ctb&st=c56sl20u&raw=1",
"https://www.dropbox.com/scl/fi/l8virnm48k7fljmyyb5eh/16-Hermano-Perro.mp3?rlkey=y5tfx00eqkbi9yjy6h5da07g4&st=bdg7g9s6&raw=1",
"https://www.dropbox.com/scl/fi/3atc3dve176mfxa0gpf6r/17-Mestizo.mp3?rlkey=v7vcdg7p7mmfelab2tts1s786&st=bpk651xb&raw=1",
"https://www.dropbox.com/scl/fi/wdhhnent4c4gq4u8stvqw/18-Toma-El-Tren-Hacia-El-Sur.mp3?rlkey=5h6la5luzr6y809rxnw674mvs&st=ljdbnnex&raw=1",
"https://www.dropbox.com/scl/fi/gj4ai04u3mj6n1jjcffc9/19-Jingle.mp3?rlkey=mfcc6b97ry6rpdkgyq1stkeex&st=uqo0zvb6&raw=1",
"https://www.dropbox.com/scl/fi/dk50okaro5peqkdl3cn0f/20-Rutas-Argentinas.mp3?rlkey=qtvb99tk5f9kvzcaky7vxjcot&st=taxi5ty8&raw=1"


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
        albumCover.src = "tapas/contratapa20.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        albumCover.src = "vinilo2.gif"; // Muestra el vinilo
        estado = 2;
    } else {
        albumCover.src = "tapas/tapa20.jpg"; // Vuelve a la tapa    
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
