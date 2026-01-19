const startScreen = document.getElementById('start-screen');
const canvas = document.getElementById('matrix-canvas');
const messageCard = document.getElementById('message-card');
const overlay = document.querySelector('.overlay');
const ctx = canvas.getContext('2d');
const heart = document.getElementById('heart');
const audioPlayer = document.getElementById('audio-player');

const startTime = 0; // Start time in seconds

startScreen.addEventListener('click', () => {
    startScreen.style.display = 'none';
    canvas.style.display = 'block';
    overlay.style.display = 'block';
    messageCard.style.display = 'flex';

    // Start and control the audio
    audioPlayer.volume = 0.25;
    audioPlayer.currentTime = startTime;
    audioPlayer.play();

    // Custom looping
    audioPlayer.addEventListener('ended', function() {
        this.currentTime = startTime;
        this.play();
    }, false);

    setTimeout(() => {
        heart.classList.add('heart-pulse');
    }, 5000);

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