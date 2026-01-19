const startScreen = document.getElementById('start-screen');
const canvas = document.getElementById('matrix-canvas');
const messageCard = document.getElementById('message-card');
const overlay = document.querySelector('.overlay');
const ctx = canvas.getContext('2d');
const heart = document.getElementById('heart');

let player;
let playerReady = false;
let userClicked = false;
const videoId = 'c56t2upa8Bk'; // New video from your suggestion
const startTime = 66;        // New start time from your suggestion

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '1',
    width: '1',
    videoId: videoId,
    playerVars: {
        'playsinline': 1,
        'start': startTime,
        'autoplay': 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
    playerReady = true;
    event.target.setVolume(25);
    event.target.unMute(); // Explicitly unmute the player when it's ready.

    // If the user clicked before the player was ready, play now.
    if (userClicked) {
        event.target.seekTo(startTime);
        event.target.playVideo();
    }
}

function onPlayerStateChange(event) {
    // Loop the video when it ends.
    if (event.data === YT.PlayerState.ENDED) {
        player.seekTo(startTime);
        player.playVideo();
    }
}

startScreen.addEventListener('click', () => {
    userClicked = true;

    startScreen.style.display = 'none';
    canvas.style.display = 'block';
    overlay.style.display = 'block';
    messageCard.style.display = 'flex';

    setTimeout(() => {
        heart.classList.add('heart-pulse');
    }, 5000);

    // If the player is ready, unmute and play it now that the user has clicked.
    if (playerReady) {
        player.unMute();
        player.seekTo(startTime);
        player.playVideo();
    }

    // Matrix canvas logic
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }
    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };
    setInterval(draw, 33);
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});