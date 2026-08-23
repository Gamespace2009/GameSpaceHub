// ============================================================
// 1. НАСТРОЙКИ
// ============================================================
const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const statusEl = document.getElementById('status');
const CELL = 20;
const ROWS = 21;
const COLS = 21;
canvas.width = COLS * CELL;
canvas.height = ROWS * CELL;
let maze = [];
let player = { x: 1, y: 1 };
let exitPos = { x: ROWS - 2, y: COLS - 2 };
let gameOver = false;
let currentDirection = null;       // 'horiz' или 'vert'
let allowedSides = [];
let isMoving = false;
let n = 0;
let stepsLeft = 0;
let moveDirection = null;
rer(2);
// ============================================================
// 2. ГЕНЕРАЦИЯ ЛАБИРИНТА
// ============================================================
function generateMaze(rows, cols) {
    let m = [];
    for (let r = 0; r < rows; r++) {
        m[r] = [];
        for (let c = 0; c < cols; c++) {
            m[r][c] = 1;
        }
    }

    function carve(r, c) {
        m[r][c] = 0;
        const dirs = [
            [0, -2], [0, 2],
            [-2, 0], [2, 0]
        ];
        for (let i = dirs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
        }
        for (let d of dirs) {
            let nr = r + d[0];
            let nc = c + d[1];
            if (nr > 0 && nr < rows && nc > 0 && nc < cols && m[nr][nc] === 1) {
                m[r + d[0] / 2][c + d[1] / 2] = 0;
                carve(nr, nc);
            }
        }
    }

    carve(1, 1);
    m[rows - 2][cols - 2] = 2;
    return m;
}

// ============================================================
// 3. ОТРИСОВКА
// ============================================================
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            let x = c * CELL;
            let y = r * CELL;
            if (maze[r][c] === 1) {
                ctx.fillStyle = '#300D75';
                ctx.fillRect(x, y, CELL, CELL);
            } else if (maze[r][c] === 2) {
                ctx.fillStyle = '#FFD700';
                ctx.shadowColor = '#FFD700';
                ctx.shadowBlur = 15;
                ctx.fillRect(x, y, CELL, CELL);
                ctx.shadowBlur = 0;
            }
        }
    }

    if (!gameOver) {
        ctx.fillStyle = '#00D4FF';
        ctx.shadowColor = '#00D4FF';
        ctx.shadowBlur = 20;
        ctx.fillRect(player.x * CELL + 2, player.y * CELL + 2, CELL - 4, CELL - 4);
        ctx.shadowBlur = 0;
    } else {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🎉 Выход найден!', canvas.width / 2, canvas.height / 2);
    }
}

// ============================================================
// 4. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================
function isWall(x, y) {
    if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return true;
    return maze[y][x] === 1;
}

function isExit(x, y) {
    return maze[y] && maze[y][x] == 2;
}

function enableAllButtons(enabled) {
    document.querySelectorAll('button').forEach(b => b.disabled = !enabled);
}

function setStatus(text) {
    statusEl.innerHTML = text;
}
function rollDirection() {
    rer(0);
    if (gameOver || isMoving) return;
    const isHoriz = Math.random() < 0.5;
    currentDirection = isHoriz ? 'horiz' : 'vert';
    allowedSides = isHoriz ? ['left', 'right'] : ['up', 'down'];
    if (currentDirection == 'horiz') {
        document.getElementById("row").style.display = "flex"
        document.getElementById("column").style.display = "none"
    }
    else if (currentDirection == 'vert') {
        document.getElementById("row").style.display = "none"
        document.getElementById("column").style.display = "flex"
    }

    setStatus(`🎯 Выпало: ${isHoriz ? 'ГОРИЗОНТАЛЬ' : 'ВЕРТИКАЛЬ'}. Выберите реран или выберите сторону в которую сходите :)`);
}


function skipTurn() {
    if (gameOver || isMoving) return;
    currentDirection = null;
    allowedSides = [];
    setStatus('⏭ запущен реран');
    rollDirection()
}


function resetGame() {
    let res;
    if (n > 0){
        res = confirm('Поздравляем с победой 🎉 Хотите попробовать снова?')
        if (!res) window.location.href = "../../game_home1.html"
    }
    maze = generateMaze(ROWS, COLS);
    player = { x: 1, y: 1 };
    gameOver = false;
    currentDirection = null;
    allowedSides = [];
    isMoving = false;
    rollDirection()
    enableAllButtons(true);
    draw();
}
function rer(sit){
    if ( sit == 0){
        document.getElementById("skipBtn").style.display = "flex"
        document.getElementById("rollBtn").style.display = "none"
        document.getElementById("resetBtn").style.display = "none"
    }
    if (sit == 1){
        document.getElementById("skipBtn").style.display = "none"
        document.getElementById("rollBtn").style.display = "flex"
        document.getElementById("resetBtn").style.display = "none"
    }
    if (sit == 2){
        document.getElementById("skipBtn").style.display = "none"
        document.getElementById("rollBtn").style.display = "none"
        document.getElementById("resetBtn").style.display = "flex"
    }
}
function chooseSide(side) {
    document.getElementById("column").style.display = "none"
    document.getElementById("row").style.display = "none"
    if (gameOver || isMoving) return;
    if (!currentDirection) {
        setStatus('⚠️ Сначала нажми «Направление»!');
        return;
    }
    const dirMap = {
        left:  { dx: -1, dy: 0 },
        right: { dx: 1, dy: 0 },
        up:    { dx: 0, dy: -1 },
        down:  { dx: 0, dy: 1 }
    };
    moveDirection = dirMap[side];
    // Проверка на стену прямо перед игроком
    if (isWall(player.x + moveDirection.dx, player.y + moveDirection.dy)) {
        setStatus(`🚫 В этом направлении стена! Нажми на реран`);
        currentDirection = null;
        allowedSides = [];
        moveDirection = null;
        return n++;
    }
    // Бросок шагов (1–6)
    stepsLeft = Math.floor(Math.random() * 6) + 1;
    isMoving = true;
    n++
    enableAllButtons(false);
    // Запускаем движение
    const moveInterval = setInterval(() => {
        if (stepsLeft <= 0) {
            clearInterval(moveInterval);
            finishMove();
            return;
        }

        const nx = player.x + moveDirection.dx;
        const ny = player.y + moveDirection.dy;

        if (isWall(nx, ny)) {
            clearInterval(moveInterval);
            setStatus(`🛑 Упёрся в стену! Остановился.`);
            finishMove();
            return;
        }
        rer(1);
        // Делаем шаг
        player.x = nx;
        player.y = ny;
        stepsLeft--;
        draw();
        if (isExit(player.x, player.y)) {
            clearInterval(moveInterval);
            gameOver = true;
            setStatus(`🎉 Ты нашёл выход! Поздравляю!<br> потребавалось попыток: ${n}`);
            enableAllButtons(false);
            draw();
            rer(2)
            return;
        }
    }, 120);
}
function finishMove() {
    isMoving = false;
    currentDirection = null;
    allowedSides = [];
    moveDirection = null;
    enableAllButtons(true);
    if (!gameOver) {
        setStatus('🎲 Нажми «Направление» для следующего хода');
    }
}
// ============================================================
// 6. УПРАВЛЕНИЕ
// ============================================================
// Кнопки
document.getElementById('rollBtn').addEventListener('click', rollDirection);
document.getElementById('skipBtn').addEventListener('click', skipTurn);
document.getElementById('resetBtn').addEventListener('click', resetGame);
document.getElementById('upBtn').addEventListener('click', () => chooseSide('up'));
document.getElementById('downBtn').addEventListener('click', () => chooseSide('down'));
document.getElementById('leftBtn').addEventListener('click', () => chooseSide('left'));
document.getElementById('rightBtn').addEventListener('click', () => chooseSide('right'));
// Клавиатура
document.addEventListener('keydown', (e) => {
    if (gameOver || isMoving) return;
    switch (e.key) {
        case 'ArrowUp': chooseSide('up'); break;
        case 'ArrowDown': chooseSide('down'); break;
        case 'ArrowLeft': chooseSide('left'); break;
        case 'ArrowRight': chooseSide('right'); break;
    }
});