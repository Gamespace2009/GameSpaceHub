var img_game = document.getElementById('img_game')
var description = document.getElementById('description')
var name_game = document.getElementById('name_game')
var rules = document.getElementById('rules')
var game_cards = document.getElementsByClassName('game_cards')
var game_id;
function card_on(el) {
    document.getElementById('window_description').style.display= 'block'
    img_game.src = 'game_browser/img/' + el.id + '.png'
    if (el.id == "tic-tuc-toe"){
        description.innerHTML = 'Описание:<br> Крестики-нолики — настольная логическая игра для двух участников на квадратном поле 3x3.'
        name_game.textContent = "Крестики Нолики"
        rules.innerHTML = 'Правила:<br> Участники по очереди заполняют пустые клетки своим символом. Победа присуждается игроку, который первым составит непрерывный ряд из трёх своих знаков (горизонтально, вертикально или диагонально).'
    }
    else if (el.id == "luky_num") {
        description.innerHTML  = "Описание:<br> Компьютер загадывает число от 1 до 100. Твоя задача — отгадать его с помощью подсказок."
        name_game.textContent = "Угадай число"
        rules.innerHTML = "Правила:<br> Введи число в поле и нажми «Проверить».<br>Система подскажет: «нужно больше» или «нужно меньше».<br>Когда угадаешь — система покажет:<br>    сколько попыток потребовалось<br>После завершения раунда ты можешь:<br>    начать заново (клик по результату)<br>    или вернуться в меню игр"
    }
    else if (el.id == "cliker") {
        description.innerHTML = "Описание:<br> Ты кликаешь по кнопке — и комета начинает нагреваться. С каждым кликом температура растёт, и комета проходит стадии: от холодного камня до пылающей сверхновой. Никакой механики — просто кликай и смотри, как комета становится горячее."
        name_game.textContent = "Комета кликер"
        rules.innerHTML = "Правила:<br> Нажимай на кнопку — твой счёт увеличивается.<br>Чем больше кликов, тем сильнее становится клик.<br>С каждым новым уровнем:<br> Сила клика увеличивается <br>  Фон меняется — ты проходишь путь от кометы до сверхновой<br>Цель — увидеть все стадии эволюции и собрать максимальный счёт."
    }
    else if (el.id == "memory-match") {
        description.innerHTML = `Описание:<br>Игра на внимание и память.<br>Перед тобой поле с серыми картами.<br>Кликай по картам — они открываются, показывая цвет.<br>Твоя задача — найти две карты одинакового цвета и запомнить расположение карт разных цветов.<br>Попробуй найти все пары в <b>Memory Match<b>.` 
        name_game.textContent = "Найди пару"
        rules.innerHTML =  ` Правила:<br> 1) Открывай карты по одной.<br> 2) Если открылись две карты одного цвета — они исчезают, и ты получаешь очко.<br> 3) Если цвета не совпали — карты закрываются.<br> 4) Игра продолжается, пока не будут найдены все пары`
    }



    
    
    
    
    
    
    
        game_id = el.id
    for (var i = 0; i< game_cards.length; i++) game_cards[i].style.display= 'none'
}
function card_off(el) {
    document.getElementById('window_description').style.display= 'none'
    for (var i = 0; i< game_cards.length; i++) game_cards[i].style.display= 'block'
}
function play(el){
    console.log("game_browser/" + game_id + "/" + game_id + ".html")
    window.location.href = "game_browser/" + game_id + "/" + game_id + ".html";
}