const playBoard=document.querySelector(".play-ground");
const scoreelement=document.querySelector(".score");
const highscoreelement=document.querySelector(".high-score");
let foodX=13,foodY=10;
let snakeX=5,snakeY=10;
let snakeBody=[];
let veloX=0,velY=0;
let gameOver=false;
let setIntervalid;
let score=0;
let highscore=localStorage.getItem("high-score")||0;
highscoreelement.innerHTML=`high-score : ${highscore}`;

const changefp=()=>{
    foodX=Math.floor(Math.random()*30)+1;
    foodX=Math.floor(Math.random()*30)+1;
}
const initGame=()=>{
    if(gameOver) return handleGameOver();
    let htmlMarkup=`<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    if(snakeX ===foodX&&snakeY===foodY){
        changefp();
        snakeBody.push([foodY,foodX]);
        score++;
        highscore=score>=highscore?score:highscore;
        localStorage.setItem("high-score",highscore);
        scoreelement.innerHTML=`Score : ${score}`
        highscoreelement.innerHTML=`high-score : ${highscore}`;
       
    }

    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i]=snakeBody[i-1];
    }
    snakeBody[0]=[snakeX,snakeY];
    snakeX+=veloX;
    snakeY+=velY;

    if(snakeX<=0 || snakeX>30 ||snakeY<=0|| snakeY>=30){
        console.log("game over");
        gameOver=true;
    }
    for(let i=0;i<snakeBody.length;i++){
        htmlMarkup+=`<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i!=0&&snakeBody[0][1]===snakeBody[i][1]&&snakeBody[0][0]===snakeBody[i][0])
        gameOver=true;
    }
    playBoard.innerHTML=htmlMarkup;
}
const changedir=(e)=>{
    if(e.key==="ArrowUp"&&velY!=1){
        veloX=0;
        velY=-1;
    }
    else if(e.key==="ArrowDown"&&velY!=-1){
        veloX=0;
        velY=1;
    }
    else if(e.key==="ArrowLeft"&&veloX!=1){
        veloX=-1;
        velY=0;
    }
    else if(e.key==="ArrowRight"&&veloX!=-1){
        veloX=1;
        velY=0;
    }
    initGame();
}
changefp();
setIntervalid=setInterval(initGame,125);
document.addEventListener("keydown",changedir);


const handleGameOver=()=>{
    clearInterval(setIntervalid);
    alert("game over ");
    location.reload();
}