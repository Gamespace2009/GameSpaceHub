var rules = document.getElementById("rules")
var game_space = document.getElementById("game_space")
var random_num = Math.floor(Math.random() * 100) + 1;
var attempts = 0;
var input = document.getElementById("theory")
var theory;
var answer = document.getElementById("answer")

function start(el) {
    el.style.display = "none"
    game_space.style.display = "flex"
    
}
function test(el) {
    theory =  Number(input.value);
    attempts += 1;
    console.log(theory);
    
    if (theory < random_num) {
        answer.textContent = "нужно число по больше";
    }
    else if (theory > random_num)  {
        answer.textContent = "нужно число по меньше";
    }
    else if (input.value === "" || isNaN(theory)) {
        answer.textContent = "введите корректное число";
    }
    else {
        answer.textContent = "вы угадали  загаданное число";
        let timer = setTimeout(function(){
            answer.textContent = `отчёт: для того что бы отгадать число вам потребовалось попыток: ${attempts}`;
            el.style.display = "none";
            answer.style.cursor = "pointer";
            answer.addEventListener('click', restart)
        }, 4000)
    }
}
//  Math.floor(Math.random() * (max - min + 1)) + min; формула для рандомных чисел в указаном диапозоне
function restart () {
    let a = confirm("вы хотите начать сначала?");
    attempts = 0;
    random_num = Math.floor(Math.random() * 100) + 1;
    document.getElementById("pusk").style.display = "block";
    answer.textContent = "";
    answer.removeEventListener('click', restart);
    if (!a) window.location.href = "../../game_home1.html"
}