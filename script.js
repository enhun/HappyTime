const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-btn');
const owlSound = document.getElementById('owl-sound');

let score = 0;
let timeLeft = 15;
let gameActive = false;
let lastHole;
let timer;

function randomHole() {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) return randomHole();
    lastHole = hole;
    return hole;
}

function showOwl() {
    const hole = randomHole();
    const owl = document.createElement('div');
    owl.classList.add('owl');
    owl.addEventListener('click', hitOwl);
    hole.appendChild(owl);

    setTimeout(() => owl.classList.add('pop'), 10);

    setTimeout(() => {
        if (hole.contains(owl)) hole.removeChild(owl);
    }, 1000);
}

function hitOwl() {
    score++;
    scoreDisplay.textContent = score;

    // 敲擊動畫
    this.classList.add('hammer-down');
    setTimeout(() => {
        this.classList.remove('hammer-down');
        this.parentNode.removeChild(this);
    }, 200); // 敲擊動畫持續0.2秒

    // 被打中時播放叫聲
    owlSound.currentTime = 0;
    owlSound.play();
}

function updateTimer() {
    timerDisplay.textContent = timeLeft;
    if (timeLeft > 0) {
        timeLeft--;
    } else {
        endGame();
    }
}

function startGame() {
    if (gameActive) return;
    gameActive = true;
    score = 0;
    timeLeft = 15;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    startButton.textContent = '遊戲進行中...';
    startButton.disabled = true;

    const gameLoop = setInterval(showOwl, 1000);
    timer = setInterval(updateTimer, 1000);

    setTimeout(() => {
        clearInterval(gameLoop);
    }, 15000);
}

function endGame() {
    gameActive = false;
    clearInterval(timer);
    startButton.textContent = '開始遊戲';
    startButton.disabled = false;
    alert(`遊戲結束！你的得分是: ${score}`);
}

startButton.addEventListener('click', startGame);
