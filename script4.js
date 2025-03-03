// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
"https://www.dropbox.com/scl/fi/5p5otcfz7vyy0evthllno/01.-Alta-Suciedad.mp3?rlkey=nk2gbhmynksgu7qz4yugz2nhu&st=dwo0qpgf&raw=1",
"https://www.dropbox.com/scl/fi/zlf9p7z4y1nn876b7xqqw/02.-Todo-Lo-Dem-s-Tambi-n.mp3?rlkey=pptyheosov42199xbjluvi8qv&st=38o6vskd&raw=1",
"https://www.dropbox.com/scl/fi/ky8di49sgg26sumdcp0nm/03.-Cansado-De-Pensar.mp3?rlkey=je0ab9oafv8mkk45wfw1xghvx&st=fgqjmwhv&raw=1",
"https://www.dropbox.com/scl/fi/7eof6lzosvf10on4axo0k/04.-Loco.mp3?rlkey=y7kdgwon270j91yg8ixhvs18b&st=pq6rlwlu&raw=1",
"https://www.dropbox.com/scl/fi/4dqtm29egqnz5eoeys9gk/05.-Flaca.mp3?rlkey=970pmhempn3zo2swp74i10kpn&st=3kq3voga&raw=1",
"https://www.dropbox.com/scl/fi/3ewz0hsgd90kx0tyv59cy/06.-Dentro-Del-Pecho.mp3?rlkey=52fq0vjhhgr22dqf8xkkjj4fa&st=d800335o&raw=1",
"https://www.dropbox.com/scl/fi/e27vrivy8yojottjcsoa4/07.-Media-Ver-nica.mp3?rlkey=4vtjkc7p0nk9qj7wgxjoacgcg&st=re6l30sn&raw=1",
"https://www.dropbox.com/scl/fi/edycaok0ed0t1vqqolfev/08.-Que-Sea-As.mp3?rlkey=hhzyocvt06szix6nzeuchac2s&st=ih04981y&raw=1",
"https://www.dropbox.com/scl/fi/r1bhv9rlk8el24nzgeawu/09.-Sin-Saber-Por-Qu.mp3?rlkey=ndd2dh5cv0jy2xueycuucbvqw&st=r0lecdud&raw=1",
"https://www.dropbox.com/scl/fi/d0v3fqnklnv93ets4w75o/10.-Ser-Mejor-As.mp3?rlkey=psg6o38ym8cp6dp6gt33p422w&st=0ojktfxy&raw=1",
"https://www.dropbox.com/scl/fi/1krgse2jsdaiekb3xeer1/11.-Me-Arde.mp3?rlkey=rg6jncn6qu0435gi8gut569c0&st=cpxu5xpr&raw=1",
"https://www.dropbox.com/scl/fi/z81q4pd67pjpov4rgts95/12.-El-Lado-De-La-Soledad.mp3?rlkey=0xs5934g8blcg6qa18sk95xnq&st=jcnvxl1b&raw=1",
"https://www.dropbox.com/scl/fi/9djnmfazpxra5omuhlhie/13.-Que-Est-Pasando.mp3?rlkey=85jh3n3qhhtec8rweccs9uex4&st=7hyovqnl&raw=1",
"https://www.dropbox.com/scl/fi/fugax8ywdfv296ehzlt7r/14.-El-Novio-Del-Olvido.mp3?rlkey=o1mxwx2x9p5dy7dtf8pydun96&st=zg4yy7hv&raw=1",
"https://www.dropbox.com/scl/fi/fbkiwv8hw5jfxzsr600n6/15.-Catalina.mp3?rlkey=u4rprtzhqekytdxmm3pmfhffl&st=9qimg597&raw=1"


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

albumCover.addEventListener("click", () => {
    if (showingBack) {
        albumCover.src = "tapas/tapa4.jpg"; // Vuelve a la tapa
    } else {
        albumCover.src = "tapas/contratapa4.jpg"; // Muestra la contratapa
    }
    showingBack = !showingBack; // Cambia el estado
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
