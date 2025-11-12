const STREAM_URL = 'https://afradio.es/listen/afradio/radio.mp3';


const audio = document.getElementById('radio-audio');
const playBtn = document.getElementById('play-btn');
const shareBtn = document.getElementById('share-btn');
const visualizer = document.getElementById('visualizer');


// Redes sociales reales
const fb = document.getElementById('fb');
const ig = document.getElementById('ig');
const tiktok = document.getElementById('tiktok');
const pod = document.getElementById('pod');
fb.href = 'https://www.facebook.com/afradiolatina';
tiktok.href = 'https://tiktok.com/@afradiolatina7';
ig.href = 'https://www.instagram.com/afradio2022';
pod.href = 'https://afradio.es/public/afradio/podcasts';


let isPlaying = false;


playBtn.addEventListener('click', async () => {
if (!isPlaying) {
try {
audio.src = STREAM_URL;
audio.crossOrigin = 'anonymous';
await audio.play();
playBtn.textContent = '⏸️ Pausar';
isPlaying = true;
startVisualizer();
} catch (err) {
console.error('Error al reproducir:', err);
alert('No se pudo iniciar la reproducción. Revisa la URL del stream o CORS.');
}
} else {
audio.pause();
playBtn.textContent = '▶️ Escuchar AFRadio';
isPlaying = false;
stopVisualizer();
}
});


shareBtn.addEventListener('click', async () => {
const shareData = { title: 'AFradio', text: 'Escucha AFRadio - la mejor del mundo', url: location.href };
try {
if (navigator.share) await navigator.share(shareData);
else navigator.clipboard.writeText(location.href) && alert('Enlace copiado al portapapeles');
} catch (e) { console.warn('Share failed', e); }
});


// Visualizador
let audioCtx, analyser, source, rafId;
function startVisualizer() {
if (!audioCtx) {
audioCtx = new (window.AudioContext || window.webkitAudioContext)();
analyser = audioCtx.createAnalyser();
source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 256;
}
draw();
}
function stopVisualizer() {
if (rafId) cancelAnimationFrame(rafId);
}