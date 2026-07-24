var elements = [];
var elements2 = [];
var colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#800080", "#FFA500", "#FF69B4", "#00FFFF", "#A52A2A", "#808080"];
var colors2 = {"#FF0000": 0, "#00FF00": 0, "#0000FF": 0, "#FFFF00": 0, "#800080": 0, "#FFA500": 0, "#FF69B4": 0, "#00FFFF": 0, "#A52A2A": 0, "#808080": 0}
var score = document.getElementById("score");
var score2 = 0;
var a;
var pole_kl = document.getElementsByClassName("pole")




function disableCards() {
    document.querySelectorAll('.pole').forEach(el => {
        el.classList.add('disabled');
    });
}
function enableCards() {
    document.querySelectorAll('.pole').forEach(el => {
        el.classList.remove('disabled');
    });
}
function tm() {
    let restart = setTimeout(function(){
    let re = confirm("хотите начать сначала?")
    if (re) {
        for (var i = 0; i<pole_kl.length; i ++) {
            pole_kl[i].style.display = "block"
            pole_kl[i].dataset.color = ""
            pole_kl[i].dataset.index = "0"
            score.textContent = ""
            score2 = 0
            colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#800080", "#FFA500", "#FF69B4", "#00FFFF", "#A52A2A", "#808080"];
            colors2 = {"#FF0000": 0, "#00FF00": 0, "#0000FF": 0, "#FFFF00": 0, "#800080": 0, "#FFA500": 0, "#FF69B4": 0, "#00FFFF": 0, "#A52A2A": 0, "#808080": 0}
        }}
    else window.location.href = "../../game_home1.html"
    }, 1500)
}
function add(el) {
    if (el.dataset.index == "0") {
        el.dataset.index = "1"
        a = Math.floor(Math.random() * colors.length)
        colors.sort(() => Math.random() - 0.5)
        colors2[colors[a]] ++
        el.style.background = `${colors[a]}`
        el.dataset.color =  `${colors[a]}`
        if (colors2[colors[a]] == 2) colors.splice(a, 1)
    }
    else if (el.dataset.index == "1"){
        el.style.background = el.dataset.color
    }
    elements.push(el.dataset.color)
    elements2.push(el)
    // console.log(el.style.background)
    console.log(colors2)
    el.classList.add('disabled')
    if (elements.length == 2) {
        console.log(`${elements[0]} / ${elements[1]}`)
        disableCards()
        let time = setTimeout(function(){
            enableCards()
            if (elements[0] == elements[1])  {
                score2 ++;
                score.textContent = `${score2}`
                for (var i = 0; i<elements2.length; i ++) {
                    elements2[i].style.display = "none"
                }}
            else  score.textContent = `не угадали поищите в другом месте`;
            for (var i = 0; i<elements.length; i++) elements2[i].style.background = "#383838"
            elements.length = 0;
            elements2.length = 0;
            if (score2 == 10) tm()}, 2000)}}
