var hd = 1;
var des_hd = document.getElementById('des_hd');
var one = document.getElementById('one');
var two = document.getElementById('two');
var free = document.getElementById('three');
var four = document.getElementById('four');
var five = document.getElementById('five');
var six = document.getElementById('six');
var seven = document.getElementById('seven');
var eich = document.getElementById('eich');
var nine = document.getElementById('nine');
var grid = document.getElementById("grid");
var grid_cl = document.getElementsByClassName('grid');
var x = document.getElementById('x');
var o = document.getElementById('o');
if (hd == 0) des_hd.textContent = "Ходит Нолик";
if (hd == 1) des_hd.textContent = "Ходит Крестик";

var res;
function hod(el){
    console.log(el.dataset.value)
    
    if (el.dataset.value == "3") {
        if (hd == 0) {
            el.style.background = "url('img/нолик.png')";
            el.dataset.value = "0";
            hd=1;
        }
        else if (hd == 1){
            el.style.background = "url('img/крестик.png')";
            el.dataset.value = "1";
            hd=0;
        }
    }
    if (hd == 0) des_hd.textContent = "Ходит Нолик";
    if (hd == 1) des_hd.textContent = "Ходит Крестик";
    
    if (((one.dataset.value== "0" && two.dataset.value== "0" && free.dataset.value== "0" ) || (four.dataset.value== "0" && five.dataset.value== "0" && six.dataset.value== "0" )|| (seven.dataset.value== "0" && eich.dataset.value== "0" && nine.dataset.value== "0" )) ||
    ((one.dataset.value== "0" && four.dataset.value== "0" && seven.dataset.value== "0" ) || (two.dataset.value== "0" && five.dataset.value== "0" && eich.dataset.value== "0" )|| (free.dataset.value== "0" && six.dataset.value== "0" && nine.dataset.value== "0" )) ||
    ((one.dataset.value== "0" && five.dataset.value== "0" && nine.dataset.value== "0" ) || (free.dataset.value== "0" && five.dataset.value== "0" && seven.dataset.value== "0" ))) {
        grid.style.display = "none";
        des_hd.textContent = "Победили нолики";
        var timer = setTimeout(function chec(){res = confirm("Вы хотите начать сначала?"); restart()}, 3000);
    }
    else if (((one.dataset.value== "1" && two.dataset.value== "1" && free.dataset.value== "1" ) || (four.dataset.value== "1" && five.dataset.value== "1" && six.dataset.value== "1" )|| (seven.dataset.value== "1" && eich.dataset.value== "1" && nine.dataset.value== "1" )) ||
    ((one.dataset.value== "1" && four.dataset.value== "1" && seven.dataset.value== "1" ) || (two.dataset.value== "1" && five.dataset.value== "1" && eich.dataset.value== "1" )|| (free.dataset.value== "1" && six.dataset.value== "1" && nine.dataset.value== "1" )) ||
    ((one.dataset.value== "1" && five.dataset.value== "1" && nine.dataset.value== "1" ) || (free.dataset.value== "1" && five.dataset.value== "1" && seven.dataset.value== "1" ))) {
        grid.style.display = "none";
        des_hd.textContent = "Победили крестики";
        var timer = setTimeout(function chec(){res = confirm("Вы хотите начать сначала?"); restart()}, 3000);
    }
    
}





function restart(){ 
    if (res){
        grid.style.display = "block";
        if (hd == 0) des_hd.textContent = "Ходит Нолик";
        if (hd == 1) des_hd.textContent = "Ходит Крестик";
        for (var i = 0; i<grid_cl.length; i++) {
            grid_cl[i].style.background = "url('img/пустая клетка.png')";
            grid_cl[i].dataset.value = "3";
        }
    }
    else {window.location.href = "../../game_home1.html"}
}