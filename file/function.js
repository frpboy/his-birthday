const startScreen = document.getElementById('start-screen');
const canvas = document.getElementById('matrix-canvas');
const messageCard = document.getElementById('message-card');
const overlay = document.querySelector('.overlay');
const ctx = canvas.getContext('2d');

let player;
let playerReady = false;
let userClicked = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'c56t7upa8Bk',
    playerVars: { 'playsinline': 1 },
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
    playerReady = true;
    if (userClicked) {
        event.target.playVideo();
    }
}

startScreen.addEventListener('click', () => {
    userClicked = true;

    startScreen.style.display = 'none';
    canvas.style.display = 'block';
    overlay.style.display = 'block';
    messageCard.style.display = 'flex';

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

    if (playerReady) {
        player.playVideo();
    }
});
