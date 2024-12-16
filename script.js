const countdownElement = document.getElementById('countdown');
const fireworksElement = document.getElementById('fireworks');
const backgroundMusic = document.getElementById('background-music');
const messageElement = document.getElementById('message');
const santaGifElement = document.getElementById('santa-gif');
const mainContainer = document.getElementById('main-container');

// Definir o volume da música
backgroundMusic.volume = 0.4;

// Tentar iniciar a música automaticamente quando a página carregar
window.addEventListener('load', () => {
    backgroundMusic.play().catch(error => {
        console.log("Erro ao tentar tocar a música automaticamente:", error);
        document.body.addEventListener('click', () => {
            backgroundMusic.play();
        }, { once: true });
    });
});

// Data de destino - defina para uma data próxima para teste
const targetDate = new Date('December 18, 2024 17:00:00').getTime();

// Atualizar contagem regressiva a cada segundo
const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        showGifAndFireworks();
    } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}, 1000);

function showGifAndFireworks() {
    // Esconder todos os elementos da página exceto o GIF e os fogos de artifício
    mainContainer.style.display = 'none';
    santaGifElement.style.display = 'flex';

    // Tocar música de fundo
    backgroundMusic.play();

    // Mostrar fogos de artifício
    for (let i = 0; i < 10; i++) {
        setTimeout(createRocket, i * 500);
    }
}

function createRocket() {
    const rocket = document.createElement('div');
    rocket.className = 'rocket';
    rocket.style.left = `${Math.random() * 100}%`;
    fireworksElement.appendChild(rocket);

    rocket.addEventListener('animationend', () => {
        rocket.remove();
        createExplosion(rocket.style.left);
    });
}

function createExplosion(leftPosition) {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = leftPosition;
            firework.style.top = '80%';
            firework.style.backgroundColor = getRandomColor();
            fireworksElement.appendChild(firework);

            setTimeout(() => {
                firework.remove();
            }, 2000);
        }, i * 50);
    }
}

function getRandomColor() {
    const colors = ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff80', '#00ffff', '#0080ff', '#8000ff', '#ff00ff'];
    return colors[Math.floor(Math.random() * colors.length)];
}
