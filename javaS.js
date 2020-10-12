/* For Start Page --> Start */
function submitform(e) {
    e.preventDefault();
    let name = document.forms["welcome_form"]["Username"].value;
    // for store username
    sessionStorage.setItem("Username", name)
    console.log(name);
}
/* For Start Page --> End */

/* For gameArea --> Start */
const score = document.querySelector('.score');
const submit = document.querySelector('.submit');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const bt = document.querySelector('button');

submit.addEventListener('click', start);

let player = { speed: 5, score: 0 };

/* For arrowKeys --> Start */
let keys = { ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false }

document.addEventListener('keydown', keyDown);
document, addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
}
/* For arrowKeys --> End */

/* For carCollide --> Start */
function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))

}
/* For carCollide --> End */

/* For moveRoadLine --> Start */
function moveLines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function (item) {

        if (item.y >= 700) {
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}
/* For moveRoadLine --> End */

/* For endGame --> Start */
function endGame() {
    player.start = false;
    startScreen.classList.remove('hide');
    gameArea.classList.add('hide');
    bt.innerHTML = "Start Again"
    music.pause();
}
/* For endGame --> End */

/* For moveEnemyCar --> Start */
function moveEnemyCar(car) {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function (item) {
        if (isCollide(car, item)) {
            endGame();
        }
        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}
/* For moveEnemyCar --> End */

function gamePlay() {
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();

    if (player.start) {

        moveLines();
        moveEnemyCar(car);

/* For moveCar --> Start */
        if (keys.ArrowUp && player.y > (road.top + 150)) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.bottom - 90)) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < (road.width - 62)) { player.x += player.speed }
/* For moveCar --> End */

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);

        player.score++;
        score.innerHTML = "score: " + player.score;
    }
}

function start() {
    gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";

    playMusic();

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

/* For crateRoadLine --> Start */
    for (x = 0; x < 5; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }
/* For createRoadLine --> End */

/* For createCar --> Start */
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);
/* For createCar --> End */

/* For findCarPosition --> Start */
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
/* For findCarPosition --> End */

/* For enemyCarCreate --> Start */
    for (x = 0; x < 3; x++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x + 1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }
}
/* For enemyCarCreate --> End */

/* For randomColor --> Start */
function randomColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#" + c() + c() + c();
}
/* For randomColor --> End */


/* For gameArea --> End */

/* For backgroundSound --> Start */
const music = document.querySelector('#music');
function playMusic() {
    if (music.paused) {
        music.play()
    }
}
/* For backgroundSound --> End */