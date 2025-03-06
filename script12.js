// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
    "https://www.dropbox.com/scl/fi/dzhmlpb9rwe27c3axwelc/01-Dos-Edificios-Dorados.mp3?rlkey=dywgdpx9p66g24bjzx67nqyzg&st=ipslcr7e&raw=1",
"https://www.dropbox.com/scl/fi/hdb849wn8tsewjkr5v4sl/02-Si-Me-Das-Tu-Amor.mp3?rlkey=etwp4bwyowbcafoybzzaue07r&st=1tforu9y&raw=1",
"https://www.dropbox.com/scl/fi/t2u8d20pzt3nsycrydmmx/03-Mundo-Agradable.mp3?rlkey=l75mhvztqirkqfmjt5wbsp69i&st=f5u6c9oy&raw=1",
"https://www.dropbox.com/scl/fi/kmf6rielvj2jkcdq13gbg/04-Solo-Dios-Sabe.mp3?rlkey=tuyo23fcqvcq4e4dwrhbwc2h1&st=s8ppqalt&raw=1",
"https://www.dropbox.com/scl/fi/hi04rmg6cgw7wq05h1hfb/05-Casa-De-Ara-as.mp3?rlkey=b2zw0vqid2uprmm3sokfg71wj&st=men6zah4&raw=1",
"https://www.dropbox.com/scl/fi/zik1i6h6utpagckssk99c/06-Mar-a-Navidad.mp3?rlkey=hb5x21xn2j3s4et20g6ooh0qj&st=c9z67vtt&raw=1",
"https://www.dropbox.com/scl/fi/q98p3dtmfi3klyry9flpk/07-Fotos-De-Tokio.mp3?rlkey=q30mn9kgiqzox8p8pml2s1c50&st=dsf40lxt&raw=1",
"https://www.dropbox.com/scl/fi/anwlwpzgps9m9jqkps1yj/08-Reina.mp3?rlkey=cgnuuq5hjk5qqa4aixmpz6xbb&st=po53yxll&raw=1",
"https://www.dropbox.com/scl/fi/qtshvn0y009ih0vyb97ry/09-Amor-De-Juventud.mp3?rlkey=e8g0j6igf9pizo6m6zh30whc7&st=s1sicxjb&raw=1",
"https://www.dropbox.com/scl/fi/9qnkrp71e8tlsn6jzahps/10-Copado-Por-El-Diablo.mp3?rlkey=i38zvrcy3vf2naiibjpjchmgz&st=b98kovf8&raw=1",
"https://www.dropbox.com/scl/fi/kt5u74fbbhpkxpbh6lqom/11-Mano-Dura.mp3?rlkey=3lt8ojqqrr20w2tvx7k6g5dce&st=3o8vrk5r&raw=1",
"https://www.dropbox.com/scl/fi/joevaad3s3f9fufmjjmun/12-A-Cada-Hombre-Cada-Mujer.mp3?rlkey=lyfql03q4vyt9zwk3p9wettu1&st=vyvjs2c6&raw=1",
"https://www.dropbox.com/scl/fi/1qu5q93124wr7szv8kd7o/01-Tu-Amor.mp3?rlkey=i4nhtkungl71kf1aucrtx1krl&st=5gldr3he&raw=1",
"https://www.dropbox.com/scl/fi/x03yj6ul6ckt070bj2vcq/02-Ya-No-Hay-Forma-De-Pedir-Perdon.mp3?rlkey=w71jxlbow6kat5hfl9100r76h&st=u2zoid97&raw=1",
"https://www.dropbox.com/scl/fi/w3fyyp5e8fsi2gl5upi9o/03-El-Tiempo-Es-Veloz.mp3?rlkey=q64in402pr5sof0e6ayn6x4c1&st=wij6ts3n&raw=1",
"https://www.dropbox.com/scl/fi/ejcmfcvh8cqi25tzy2yd7/04-Tu-Llegada.mp3?rlkey=h2a2424jdc7142oxhhbmrrkod&st=bifje0uj&raw=1",
"https://www.dropbox.com/scl/fi/ffpqubevuwffw80yyokw0/05-Muriendo-Por-Vivir.mp3?rlkey=9vszga2tsi2nchvdw20epz4be&st=vrewyw5m&raw=1",
"https://www.dropbox.com/scl/fi/xgvqeezb0jlp528qg6tw7/06-Despues-De-Todo-El-Tiempo.mp3?rlkey=gg73fjf2evmreyu5ha9ix0329&st=r9ahia6d&raw=1",
"https://www.dropbox.com/scl/fi/y2zzo1vm2fsm6cpkat9rz/07-Sin-Decir-Adios.mp3?rlkey=mulapqr0bfwn95stjw241gr48&st=gh6w5eb5&raw=1",
"https://www.dropbox.com/scl/fi/i75fkm703qof9872b8v2y/08-Traicion.mp3?rlkey=s7woprd8ywixwhpprazrhe8ld&st=zei7sbyh&raw=1",
"https://www.dropbox.com/scl/fi/jojzzlpamhagn91de6q7x/09-Nos-Veremos-Otra-Vez.mp3?rlkey=meyan6dxctuxvqde4u9v1obhu&st=fd6w14vk&raw=1",
"https://www.dropbox.com/scl/fi/7y0bazwzw0ujqwi08v5yr/10-Noche-De-Perros.mp3?rlkey=0ziyy1vl8axvnwfv3fn0aiunu&st=phqbqfpz&raw=1",
"https://www.dropbox.com/scl/fi/gjxhcgf75kqm7o60n45zn/11-32-macetas-Voy-A-mil-Mientes.mp3?rlkey=utagmudmj00v4iuytu0bpln8e&st=tn88w1nw&raw=1",
"https://www.dropbox.com/scl/fi/4bf78z8rolq6z3gzfetya/12-Seminare.mp3?rlkey=lcopnw7yya2jelx33ktqk5o0o&st=knhbmc55&raw=1"


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
        albumCover.src = "tapas/contratapa12.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        const randomVinyl = ["vinilo1.gif", "vinilo2.gif", "vinilo3.gif", "vinilo4.gif", "vinilo5.gif", "vinilo6.gif", "vinilo7.gif", "vinilo8.gif", "vinilo9.gif", "vinilo10.gif"][Math.floor(Math.random() * 10)];
        albumCover.src = randomVinyl; // Muestra un vinilo aleatorio
        estado = 2;
    } else {
        albumCover.src = "tapas/tapa12.jpg"; // Vuelve a la tapa    
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
