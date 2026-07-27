var q = 0;
var y = 1;
var i = 0;
var p = 100;
var e = 10;
var skore = document.getElementById("score");
var phon = document.getElementById("one");
var kometa = ["img/разгорание.png", "img/разгорание X2.png", "img/разгорание X3.png", "img/сверхнова.png",];
function scores() {
    q += y;
    skore.innerHTML = `${q}`;
    if (q % p == 0) level_up();
    console.log(q);
}
function level_up(){
    if (y > 1) {
        y*= e;
        e *= 10;
    }
    if (y == 1) {
        y--;
        y += 10;
    }
    p*= 100;
    if (i < kometa.length) { 
        phon.style.backgroundImage = `url(${kometa[i]})`;
        phon.style.backgroundRepeat = "no-repeat";
        phon.style.backgroundPosition = "center";
        phon.style.backgroundSize = "contain";
        i++;
    }
}
