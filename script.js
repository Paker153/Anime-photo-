// script.js
document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const coin = document.getElementById('coin');
    const obstacles = document.querySelectorAll('.obstacle');
    let playerPosition = { x: 20, y: 20 };
    let isJumping = false;
    const gravity = 2;

    function movePlayer(direction) {
        if (direction === 'left') {
            playerPosition.x -= 10;
        } else if (direction === 'right') {
            playerPosition.x += 10;
        } else if (direction === 'jump' && !isJumping) {
            isJumping = true;
            let jumpCount = 0;
            const jumpInterval = setInterval(() => {
                if (jumpCount < 15) {
                    playerPosition.y += 15;
                } else if (jumpCount < 30) {
                    playerPosition.y -= 15;
                } else {
                    clearInterval(jumpInterval);
                    isJumping = false;
                }
                jumpCount++;
                updatePlayerPosition();
            }, 20);
        }
        updatePlayerPosition();
    }

    function updatePlayerPosition() {
        player.style.left = `${playerPosition.x}px`;
        player.style.bottom = `${playerPosition.y}px`;
        checkCollision();
    }

    function checkCollision() {
        obstacles.forEach(obstacle => {
            const obstacleRect = obstacle.getBoundingClientRect();
            const playerRect = player.getBoundingClientRect();
            if (
                playerRect.left < obstacleRect.right &&
                playerRect.right > obstacleRect.left &&
                playerRect.bottom > obstacleRect.top &&
                playerRect.top < obstacleRect.bottom
            ) {
                alert('اصطدمت بالعقبة! اللعبة انتهت.');
                resetGame();
            }
        });

        const coinRect = coin.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();
        if (
            playerRect.left < coinRect.right &&
            playerRect.right > coinRect.left &&
            playerRect.bottom > coinRect.top &&
            playerRect.top < coinRect.bottom
        ) {
            alert('لقد جمعت العملة الذهبية! تهانينا!');
            resetGame();
        }
    }

    function resetGame() {
        playerPosition = { x: 20, y: 20 };
        updatePlayerPosition();
    }

    document.getElementById('leftButton').addEventListener('click', () => movePlayer('left'));
    document.getElementById('rightButton').addEventListener('click', () => movePlayer('right'));
    document.getElementById('jumpButton').addEventListener('click', () => movePlayer('jump'));

    updatePlayerPosition();
});
