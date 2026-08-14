var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var plat = {x: 230, y: 400};
var block = [];
var ball = { x: 250, y: 380, r: 8, dx: 3, dy: -4 };
var games;
var mouseDown = false;
var score = 0;
var starter;
function start(el) {
    canvas.style.display = "block"
    for (var row = 0; row < 7; row++) {
        for (var col = 0; col < 18; col++) {
            block.push({
                x: col * 27 + 8,
                y: row * 17 + 30,
                w: 25,
                h: 15,
                alive: true
            });
        }
    }
    console.log(block)
    starter = el
    el.style.display = "none"
    games = setInterval(game, 30);
}

function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    ctx.fillStyle = "#00b4e0";
    ctx.fillRect(plat.x, plat.y, 60, 15);


    ctx.fillStyle = "#442c00";
    for (var i = 0; i < block.length; i++) {
        if (block[i].alive) {
            ctx.fillRect(block[i].x, block[i].y, block[i].w, block[i].h);
        }
    }


    ctx.fillStyle = "#FFD700";
    ctx.shadowColor = "#c09919";
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;


    ball.x += ball.dx;
    ball.y += ball.dy;

 
    if (ball.x - ball.r < 0 || ball.x + ball.r > canvas.width) ball.dx = -ball.dx;
    if (ball.y - ball.r < 0) ball.dy = -ball.dy;


    if ((ball.y + ball.r > canvas.height) || (score == block.length)) {
        restart()
    }


    if (ball.dy > 0 &&
        ball.y + ball.r >= plat.y &&
        ball.y + ball.r <= plat.y + 10 + 5 &&
        ball.x >= plat.x - ball.r &&
        ball.x <= plat.x + 70 + ball.r) {
        ball.dy = -ball.dy;
        ball.y = plat.y - ball.r;
    }

    for (var i = 0; i < block.length; i++) {
        var b = block[i];
        if (!b.alive) continue;
        if (ball.x + ball.r > b.x &&
            ball.x - ball.r < b.x + b.w &&
            ball.y + ball.r > b.y &&
            ball.y - ball.r < b.y + b.h) {
            b.alive = false;
            ball.dy = -ball.dy;
            score++;
            document.getElementById('score').textContent = score;
            break;
        }
    }

    
}
canvas.addEventListener('mousemove', function(e) {
    if (!mouseDown) return;

    var rect = canvas.getBoundingClientRect();
    var scaleX = canvas.width / rect.width;
    var mouseX = (e.clientX - rect.left) * scaleX;
    plat.x = mouseX - 15;
    if (plat.x < 0) plat.x = 0;
    if (plat.x + 30 > canvas.width) plat.x = canvas.width - 30;
});
canvas.addEventListener('mousedown', function(e) {
    if (e.button === 0) { 
        mouseDown = true;
    }
});

canvas.addEventListener('mouseup', function(e) {
    if (e.button === 0) {
        mouseDown = false;
    }
});

canvas.addEventListener('mouseleave', function() {
    mouseDown = false; 
});

function restart() {
    clearInterval(games);
    let res = confirm("игра закончилась. Хотите начать сначала?");
    if (res == true) {
        starter.style.display = "block";
        canvas.style.display = "none";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        plat = {x: 230, y: 400};
        block = [];
        ball = {
            x: 250,      
            y: 380,       
            r: 8,         
            dx: 3,        
            dy: -4         
        };
        score = 0
        document.getElementById('score').textContent = "";
        
    }
    else window.location.href = "../../game_home1.html";
}