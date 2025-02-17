// Lista de canciones en la carpeta "2"
const songs = [
    "6/01. El Tempano.mp3",
    "6/02. Tratando De Crecer.mp3",
    "6/03. Jeremias.mp3",
    "6/04. Historia De Mate Cocido.mp3",
    "6/05. La Musica Me Ayuda.mp3",
    "6/06. Carta De Un Leon A Otro.mp3",
    "6/07. Un Loco En La Calesita.mp3",
    "6/08. El Gigante De Ojos Azules.mp3",
    "6/09. Amor En Otras Palabras.mp3"
    
];

let currentSongIndex = 0;
const audioPlayer = new Audio(); // Crea un nuevo objeto Audio
const playPauseButton = document.getElementById("play-pause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

// Función para cargar una canción
const songTitle = document.getElementById("song-title");
const progressBar = document.getElementById("progress-bar");

// Wake Lock API para evitar que la app se duerma
defineWakeLock();
async function defineWakeLock() {
    let wakeLock = null;
    try {
        wakeLock = await navigator.wakeLock.request('screen');
    } catch (err) {
        console.error('No se pudo activar Wake Lock:', err);
    }

    document.addEventListener("visibilitychange", async () => {
        if (document.visibilityState === "visible" && wakeLock === null) {
            await defineWakeLock();
        }
    });
}

function loadSong(index) {
    audioPlayer.src = songs[index];
    audioPlayer.play().catch(error => console.log("Error al reproducir:", error));
    playPauseButton.textContent = "⏸️";
    
    // Mostrar nombre del archivo sin ruta
    let fileName = songs[index].split("/").pop().replace(".mp3", "");
    songTitle.textContent = fileName;

    // Resetear la barra de progreso
    progressBar.value = 0;

    // Configurar Media Session API para controles en segundo plano
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: fileName,
            artist: "Artista Desconocido", // Puedes cambiar esto si tienes los datos
            album: "Álbum Desconocido",
            artwork: [{ src: "ruta-a-tu-imagen.jpg", sizes: "512x512", type: "image/png" }]
        });

        navigator.mediaSession.setActionHandler("play", () => {
            audioPlayer.play();
            playPauseButton.textContent = "⏸️";
        });

        navigator.mediaSession.setActionHandler("pause", () => {
            audioPlayer.pause();
            playPauseButton.textContent = "▶️";
        });

        navigator.mediaSession.setActionHandler("previoustrack", () => {
            prevButton.click();
        });

        navigator.mediaSession.setActionHandler("nexttrack", () => {
            nextButton.click();
        });
    }
}

// Actualizar la barra de progreso mientras la canción se reproduce
audioPlayer.addEventListener("timeupdate", () => {
    progressBar.max = audioPlayer.duration; // Define el máximo de la barra
    progressBar.value = audioPlayer.currentTime; // Actualiza el valor según la canción
});

// Permitir que el usuario cambie la posición de la canción
progressBar.addEventListener("input", () => {
    audioPlayer.currentTime = progressBar.value;
});

// Evento Play/Pausa
playPauseButton.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.textContent = "⏸️";
    } else {
        audioPlayer.pause();
        playPauseButton.textContent = "▶️";
    }
});

// Evento para ir a la canción anterior
prevButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

// Evento para ir a la siguiente canción
nextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

audioPlayer.addEventListener("ended", () => {
    nextButton.click(); // Simula el botón "siguiente"
});

// Cargar la primera canción al iniciar
loadSong(currentSongIndex);

const volumeButton = document.getElementById("volume-btn");
const volumeSlider = document.getElementById("volume-slider");

// Mostrar u ocultar el control de volumen al hacer clic en el botón
volumeButton.addEventListener("click", () => {
    volumeSlider.style.display = volumeSlider.style.display === "none" ? "block" : "none";
});

// Cambiar el volumen del reproductor
volumeSlider.addEventListener("input", () => {
    audioPlayer.volume = volumeSlider.value;
});


