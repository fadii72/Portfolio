//constants

let inputDir = { x: 0, y: 0 };
let food = [{
    x: 3,
    y: 4,
}, {
    x: 6,
    y: 4,
}, {
    x: 15,
    y: 8,
}];
let snakeArray = [
    { x: 3, y: 14 },
    // { x: 4, y: 14 },
    // { x: 5, y: 14 },

];
let BonusfoodLocation = {
    x: 6, y: 9,
}

let speed = 10;
var PrevPaintTime = 0;
let board = document.querySelector('#board');
let score = 0;
let moveSound = new Audio('music/move.mp3');
let foodSound = new Audio('music/food.mp3');
let ScoreElement = document.querySelector('#score');

let playButton = document.querySelector("#play");
var AllFoods = document.getElementsByClassName('.food');
var bonusFood;


//fucntions
function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - PrevPaintTime) / 1000 < 1 / speed) {
        return;
    }
    PrevPaintTime = ctime;
    gameEngine();

}

function Collide(snake) {
    for (let i = 1; i < snakeArray.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;

        }


    }
    if (snake[0].x >= 25 || snake[0].x <= 0 || snake[0].y >= 25 || snake[0].y <= 0) {


        return true;
    }

    return false
}


function gameEngine() {
    //eating food and incrementing score
    food.forEach((e, index) => {
        if (snakeArray[0].x === e.x && snakeArray[0].y === e.y) {
            snakeArray.unshift({ x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y });
            e.x = Math.round((Math.random() * 22) + 1);
            e.y = Math.round((Math.random() * 22) + 1);
            foodSound.play();
            score = score + 1;
            ScoreElement.textContent = score;

        }


    })

    //colliding function calling
    if (Collide(snakeArray)) {
        alert('Game Over Score = ' + score);
        inputDir = { x: 0, y: 0 };

        snakeArray = [
            { x: 3, y: 14 },


        ];
        score = 0;
        ScoreElement.textContent='0';



    }

    //moving the snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] };

    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;



    //display the food
    board.innerHTML = '';

    food.forEach((e, index) => {
        var foodelement = document.createElement('div');
        foodelement.classList.add('food');
        foodelement.style.gridRowStart = e.y;
        foodelement.style.gridColumnStart = e.x;

        board.appendChild(foodelement);

    })

    //displaying the snake
    snakeArray.forEach((e, index) => {

        var snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0)
            snakeElement.classList.add('head');
        if (index > 0)
            snakeElement.classList.add('snake');

        board.appendChild(snakeElement);
    })

    //after some elemnts not completed
    
    
    for (let i = 4; i <= 1000; i = i + 4) {
        if (score === i) {
            bonusFood = document.createElement('div');
            bonusFood.style.gridRowStart = BonusfoodLocation.y;
            bonusFood.style.gridColumnStart = BonusfoodLocation.x;
            bonusFood.classList.add('bonusScore');
            // bonusScore.textContent = '+5';
            
            board.appendChild(bonusFood);
        }

            if(snakeArray[0].x === BonusfoodLocation.x && snakeArray[0].y === BonusfoodLocation.y){
                score += 5;
                BonusfoodLocation.y =Math.round((Math.random() * 22) + 1);
                BonusfoodLocation.x =Math.round((Math.random() * 22) + 1);
                ScoreElement.textContent=score;
                foodSound.play();

            }




            // Array.from(AllFoods).forEach((e)=>{
            //     e.style.display='none';

            // })
    }


}


//logic
window.requestAnimationFrame(main);

playButton.addEventListener('click', () => {
    inputDir = { x: 1, y: 0 };

})



window.addEventListener('keydown', e => {

    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            moveSound.play();
            break;
        case "ArrowDown":
            moveSound.play();
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            moveSound.play();
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            moveSound.play();
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }

})