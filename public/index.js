let inputdir = {x:0,y:0};
const gameover = new Audio("over.mp3")
const foodsound = new Audio("food.mp3")


let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];
food = {x: 6, y: 7};
let score = 0;

//loop
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1 /speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}

function isCollide(snake) {
    // Collide Itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // Collide in Wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    // update the snake array and food

        //Snake Collide
        if(isCollide(snakeArr)){
            gameover.play();
            inputdir={x: 0, y: 0}; 
            alert("Game Over.Press any key to play again.")
            snakeArr = [{x: 13, y: 15}];
            score = 0;
            scoreBox.innerHTML = "Score: " + score;
        }

    //Food Regenerate
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodsound.play();
        score += 1;
        scoreBox.innerHTML = "Score: " + score;

        //Snake Body Segment
        snakeArr.unshift({x: snakeArr[0].x + inputdir.x , y: snakeArr[0].y + inputdir.y});

        //Food
        let a = 1;
        let b = 18;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }
    
    //Snake Movement
    for(let i = snakeArr.length -2 ; i>=0 ; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputdir.x;
    snakeArr[0].y += inputdir.y;

    // display the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        } else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//Logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputdir = {x:0 , y:1} //start game
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x = 0;
            inputdir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputdir.x = 0;
            inputdir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x = -1;
            inputdir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x = 1;
            inputdir.y = 0;
            break;
        default:
            break;
    }
});