const countdownElement = document.getElementById('countdown');
const fireworksElement = document.getElementById('fireworks');
const backgroundMusic = document.getElementById('background-music');
const messageElement = document.getElementById('message');
const playButton = document.getElementById('play-button');

// Definir o volume da música
backgroundMusic.volume = 0.4;

// Função para iniciar a música
function startMusic() {
    backgroundMusic.play().then(() => {
        console.log("A música começou a tocar.");
        playButton.style.display = 'none';
    }).catch(error => {
        console.log("Erro ao tentar tocar a música:", error);
    });
}

// Adicionar evento para iniciar a música ao clicar no botão
playButton.addEventListener('click', startMusic);

// Data de destino
const targetDate = new Date('December 18, 2024 17:00:00').getTime();

// Atualizar contagem regressiva a cada segundo
const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        countdownElement.textContent = "Férias!";
        showFireworks();
        messageElement.style.display = 'none';
    } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}, 1000);

function showFireworks() {
    particlesJS('fireworks', {
        particles: {
            number: {
                value: 100
            },
            color: {
                value: ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff80', '#00ffff', '#0080ff', '#8000ff', '#ff00ff']
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 1
            },
            size: {
                value: 10,
                random: true
            },
            line_linked: {
                enable: false
            },
            move: {
                enable: true,
                speed: 5,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        }
    });
}
