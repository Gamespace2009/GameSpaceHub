var canvas = document.getElementById("snake");
var score = document.getElementById("score");
var ctx = canvas.getContext('2d');
var game;
var shrink = 0;
var applex = (Math.floor(Math.random() * ((canvas.width - shrink * 2) / 20)) * 20) + shrink;
var appley = (Math.floor(Math.random() * ((canvas.height - shrink * 2) / 20)) * 20) + shrink;
var snake = [{x: 100, y: 100}];
var direct = "right";
var touchStart = {x: 0, y: 0};
var upgr;

function start(el) {
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    python();
    el.style.pointerEvents = 'none';
    upgr = setInterval(upgrate, 5000);
}

function python() {
    game = setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        
        

        
        var x2 = snake[snake.length - 1].x;
        var y2 = snake[snake.length - 1].y;

        
        for (var i = snake.length - 1; i > 0; i--) {
            snake[i].x = snake[i - 1].x;
            snake[i].y = snake[i - 1].y;
        }

        
        switch (direct) {
            case "right": snake[0].x += 20; break;
            case "left":  snake[0].x -= 20; break;
            case "up":    snake[0].y -= 20; break;
            case "down":  snake[0].y += 20; break;
        }

        
        if (snake[0].x === applex && snake[0].y === appley) {
            snake.push({x: x2, y: y2});
            foods();
            score.textContent = snake.length - 1;
            clearInterval(upgr);
            upgr = setInterval(upgrate, 6500);
        }

        
        ctx.fillStyle = '#145c02';
        for (var i = 0; i < snake.length; i++) {
            ctx.fillRect(snake[i].x, snake[i].y, 20, 20);
        }
        ctx.fillStyle = '#4fbe4b'; // или любой другой цвет
        ctx.fillRect(snake[0].x, snake[0].y, 20, 20);

        ctx.fillStyle = "#ffebe3";
        ctx.fillRect(applex, appley, 20, 20);


        // === ГРАНИЦА СЖАТИЯ ===
        ctx.strokeStyle = '#5205aa';
        ctx.lineWidth = 4;
        ctx.strokeRect(shrink, shrink, canvas.width - shrink * 2, canvas.height - shrink * 2);

        // === ПРОВЕРКА ВЫХОДА ЗА ГРАНИЦУ ===
        if (snake[0].x < shrink || snake[0].x > canvas.width - shrink - 20 ||
            snake[0].y < shrink || snake[0].y > canvas.height - shrink - 20) {
            clearInterval(game);
            
            restart()
        }

        
        if (snake[0].x >= canvas.width || snake[0].y >= canvas.height || 
            snake[0].x < 0 || snake[0].y < 0) {
            clearInterval(game);
            restart()
        }
    }, 150);
}

function foods() {
    applex = (Math.floor(Math.random() * ((canvas.width - shrink * 2) / 20)) * 20) + shrink;
    appley = (Math.floor(Math.random() * ((canvas.height - shrink * 2) / 20)) * 20) + shrink;
}

// === УПРАВЛЕНИЕ ===
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp' && direct !== 'down') direct = 'up';
    else if (e.key === 'ArrowDown' && direct !== 'up') direct = 'down';
    else if (e.key === 'ArrowLeft' && direct !== 'right') direct = 'left';
    else if (e.key === 'ArrowRight' && direct !== 'left') direct = 'right';
});

document.body.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    touchStart.x = touch.clientX;
    touchStart.y = touch.clientY;
});

document.body.addEventListener('touchmove', function(e) {
    e.preventDefault();
    if (!touchStart.x || !touchStart.y) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && direct !== 'left') direct = 'right';
        else if (dx < 0 && direct !== 'right') direct = 'left';
    } else {
        if (dy > 0 && direct !== 'up') direct = 'down';
        else if (dy < 0 && direct !== 'down') direct = 'up';
    }
    touchStart = {x: 0, y: 0};
});

// === СЖАТИЕ ПОЛЯ ===
function upgrate() {
    shrink += 40;
    foods()
    if (shrink >= canvas.width / 2) {
        clearInterval(game);
        alert('Поле сжалось! Game Over!');
    }

    clearInterval(upgr);
    upgr = setInterval(upgrate, 5000);
}
function restart() {
    let res = confirm("вы проиграли! Хотите начать заново?")
    if (res) {
        clearInterval(game);
        clearInterval(upgr);
        snake = [{x: 100, y: 100}];
        direct = "right";
        shrink = 0;
        score.textContent = 0;
        applex = Math.floor(Math.random() * (canvas.width / 20)) * 20;
        appley = Math.floor(Math.random() * (canvas.height / 20)) * 20;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        python();
        upgr = setInterval(upgrate, 5000);
        }
    else window.location.href = "../../game_home1.html"
}
function side(el) {
    direct = el.id
}
function toggleButtons() {
    const c = document.getElementById('contein');
    c.style.display = c.style.display === 'none' ? 'flex' : 'none';
}
