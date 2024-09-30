const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

const tileSize = 20; // Size of each tile on the grid
let snake = [{ x: 200, y: 200 }]; // Initial snake position
let food = { x: 0, y: 0 }; // Initial food position
let direction = { x: 0, y: 0 }; // Direction (initially stationary)
let score = 0; // Current score
let highScore = 0; // High score
let gameInterval; // Variable to store the game loop interval

// Draw a rectangle on the canvas (used for snake segments and food)
function drawRect(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, tileSize, tileSize);
}

// Generate a random position for the food
function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / tileSize)) * tileSize;
    food.y = Math.floor(Math.random() * (canvas.height / tileSize)) * tileSize;
}

// Update the snake's position and check for collisions
function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check if the snake hits the wall or itself
    if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height ||
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        alert('Game Over!');
        clearInterval(gameInterval); // Stop the game loop
        if (score > highScore) {
            highScore = score; // Update high score
            document.getElementById('highScore').innerText = highScore;
        }
        resetGame(); // Reset the game
        return;
    }

    // Add the new head to the snake's body
    snake.unshift(newHead);

    // Check if the snake eats the food
    if (newHead.x === food.x && newHead.y === food.y) {
        score++; // Increase score
        document.getElementById('score').innerText = score; // Update score display
        generateFood(); // Generate new food
    } else {
        snake.pop(); // Remove the last segment if no food is eaten
    }
}

// Draw the game elements (snake, food)
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw the food (red square)
    drawRect(food.x, food.y, 'red');

    // Draw the snake (green squares)
    snake.forEach(segment => drawRect(segment.x, segment.y, 'green'));
}

// Handle keyboard input for controlling the snake
function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -tileSize };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: tileSize };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -tileSize, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: tileSize, y: 0 };
            break;
    }
}

// Start the game loop
function startGame() {
    resetGame();
    document.addEventListener('keydown', handleKeyPress); // Listen for key presses
    gameInterval = setInterval(() => {
        moveSnake(); // Move the snake
        drawGame(); // Draw the updated game state
    }, 100); // Adjust this value to control snake speed
}

// Reset the game state (called on game over or start)
function resetGame() {
    snake = [{ x: 200, y: 200 }]; // Reset snake to initial position
    direction = { x: 0, y: 0 }; // Stop the snake
    score = 0; // Reset the score
    document.getElementById('score').innerText = score; // Update score display
    generateFood(); // Create initial food position
    drawGame(); // Draw the initial game state
}

// Start the game as soon as the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    resetGame(); // Initialize the game
});
