// script.js actualizado con interruptor de modo claro/oscuro y manteniendo el reproductor


// Lista de canciones en la carpeta "1"
const songs = [
   
    "https://www.dropbox.com/scl/fi/ij2n1lyk9j6ba04d0q4fa/01-Celeste-Carballo-Me-Voy-Al-Oeste.mp3?rlkey=x5zsomevqxhm58uf515mk4l9b&st=s09yundy&raw=1",
"https://www.dropbox.com/scl/fi/fzhbeu7z0ayqnwccj06e4/02-Celeste-Carballo-Ratones-Paranoicos-Sabemos-Que-Vuelvo-Pronto.mp3?rlkey=3ng2r6ysfgpllnzufyrjpxo0s&st=o7brj90r&raw=1",
"https://www.dropbox.com/scl/fi/zqjz5p0fyo26iny131ln6/03-Celeste-Carballo-Ahora-Estoy-En-Libertad.mp3?rlkey=uzltc0vl8lmp2luz6hwu1dgla&st=ap0kgnim&raw=1",
"https://www.dropbox.com/scl/fi/o2tq8isvkeodj7uhiec2h/04-Celeste-Carballo-Blues-Del-Veraneo.mp3?rlkey=st70tqe0d0ako05fyj16ygxba&st=uqf32ide&raw=1",
"https://www.dropbox.com/scl/fi/g1n0xbw8t7l8isa6qpjl4/05-Celeste-Carballo-Los-Poetas-De-Latinoamerica.mp3?rlkey=t7ktrn4w8cttv691hu6bzkkch&st=mouz6y7z&raw=1",
"https://www.dropbox.com/scl/fi/tvixskcjuh4efru9eyghf/06-Celeste-Carballo-Paloma.mp3?rlkey=zetka79vhqmws55keh9rztt52&st=je59c3x6&raw=1",
"https://www.dropbox.com/scl/fi/fz343558udd9qhz7tfanq/07-Celeste-Carballo-Me-Vuelvo-Cada-D-a-Mas-Loca.mp3?rlkey=undo2qhpk7hhxq8xu12ym99s0&st=k9b88o56&raw=1",
"https://www.dropbox.com/scl/fi/irm8gbkfbo78hu36q1fwe/08-Celeste-Carballo-Charly-Garc-a-Busc-bamos-Vida.mp3?rlkey=iuk2gxlms2d551jhel6571ckz&st=nh36d01n&raw=1",
"https://www.dropbox.com/scl/fi/9odft1xbm1dywvwxqyusk/09-Celeste-Carballo-Un-Tango-Desnuda.mp3?rlkey=i5clzzwkesbseezzjchkhyren&st=5tzqihmy&raw=1",
"https://www.dropbox.com/scl/fi/goas2t76jnzm0m2jgd0bm/10-Celeste-Carballo-Juanse-Una-Canci-n-Diferente.mp3?rlkey=2hj8lxe5q798oguj7cpswovb7&st=vailcmjf&raw=1",
"https://www.dropbox.com/scl/fi/ezzjeijqot9ugrsxuteen/11-Celeste-Carballo-Conf-o.mp3?rlkey=yhs0rx14eum4e5ucbrpj94fru&st=5gwxin9s&raw=1",
"https://www.dropbox.com/scl/fi/19l4jpvtc19r6xxnn4i5u/12-Celeste-Carballo-Algo-Nuevo.mp3?rlkey=u526jzg55ro37ut2akyys8t2t&st=tel5ba8t&raw=1"


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
        albumCover.src = "tapas/contratapa8.jpg"; // Muestra la contratapa
        estado = 1;
    } else if (estado === 1) {
        const randomVinyl = ["vinilo1.gif", "vinilo2.gif", "vinilo3.gif", "vinilo4.gif", "vinilo5.gif", "vinilo6.gif", "vinilo7.gif", "vinilo8.gif", "vinilo9.gif", "vinilo10.gif"][Math.floor(Math.random() * 10)];
        albumCover.src = randomVinyl; // Muestra un vinilo aleatorio
        estado = 2;
    } else {
        albumCover.src = "tapas/tapa8.jpg"; // Vuelve a la tapa    
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
