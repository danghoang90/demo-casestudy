const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 600;

let score = 0;
let gameFrame =0 ;
ctx.font = "50px Grorgia";
let gameSpeed = 1;
let gameOver = false;

let canvasPosition = canvas.getBoundingClientRect()
const mouse = {
    x : canvas.width/3,
    y: canvas.height/2,
    click: false
}
canvas.addEventListener("mousedown", function (event){
    mouse.click = true
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
});
canvas.addEventListener("mouseup", function (){
    mouse.click =false;
});
    const playerLeft = new Image();
    playerLeft.src = 'img_9.png';
const playerRight = new Image();
playerRight.src = 'img_17.png';
class Player {
    constructor() {
        this.x = canvas.width/3;
        this.y = canvas.height/2;
        this.radius = 50;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spritewidth = 498;
        this.spriteheigth = 327;
    }
    update() {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        let theta = Math.atan2(dy,dx);
        this.angle = theta;
        if (mouse.x !== this.x) {
            this.x -= dx/20;
        }
        if (mouse.y !== this.y) {
            this.y -= dy/20;
        }
    }
    draw(){
        if (mouse.click) {
            ctx.lineWidth = 0.2 ;
            ctx.beginPath();
            ctx.moveTo(this.x ,this.y);
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();
        }
        // ctx.fillStyle = 'white';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0 , Math.PI *2);
        // ctx.fill();
        // ctx.closePath();
        // ctx.fillRect(this.x,this.y,this.radius,10)
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        if (this.x >= mouse.x){
        ctx.drawImage(playerLeft, this.frameX * this.spritewidth,this.frameY * this.spriteheigth,
            this.spritewidth,this.spriteheigth,0 -60,0 - 45,this.spritewidth/4,this.spriteheigth/4);
        } else {
            ctx.drawImage(playerRight, this.frameX * this.spritewidth,this.frameY * this.spriteheigth,
                this.spritewidth,this.spriteheigth,0 -60,0 - 45,this.spritewidth/4,this.spriteheigth/4);
        }
        ctx.restore();
    }
}
const player = new Player();

const bubblesArray = [];
const bubbleImage = new Image();
bubbleImage.src = 'img_12.png'
class Bubble {
    constructor() {
        this.x = Math.random() * (canvas.width-400);
        this.y = canvas.height + 100 ;
        this.radius = 50;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.counted = false;
        this.sound = Math.random() <= 0.5 ? 'sound1': 'sound2';
    }

    update() {
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy * dy);
    }

    draw() {
        // ctx.fillStyle = 'red';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // ctx.fill();
        // ctx.closePath();
        // ctx.drawImage(playerright);

        // ctx.stroke();
        ctx.drawImage(bubbleImage, this.x - 65, this.y- 65, this.radius* 2.6, this.radius * 2.6);
    }
}
    const bubblePop1 = document.createElement('audio');
    bubblePop1.src = 'bubble-single2.wav'
    function handleBubbles() {
        if (gameFrame % 50 === 0){
            bubblesArray.push(new Bubble());
        }
        for (let i=0 ; i < bubblesArray.length; i++){
            bubblesArray[i].update();
            bubblesArray[i].draw();
        }
        for (let i=0; i<bubblesArray.length; i++){
            if (bubblesArray[i].y<0 - bubblesArray[i].radius*2){
                bubblesArray.splice(i,1)
                i--
            }
            if (bubblesArray[i]){
            if (bubblesArray[i].distance <bubblesArray[i].radius + player.radius) {
                if (!bubblesArray[i].counted) {
                    bubblePop1.play();
                    score++;
                    bubblesArray[i].counted = true;
                    bubblesArray.splice(i, 1);
                    i--
                }
            }
            }
        }
    }
    const backGround = new Image();
    backGround.src = 'img_2.png';
const backGroundTwo = new Image();
backGroundTwo.src = 'img_16.png';
    const BG = {
        x1: 0,
        x2: canvas.width,
        y: 0,
    }

function handleBackground() {
        ctx.drawImage(backGround,BG.x1,BG.y,canvas.width,canvas.height);
        ctx.drawImage(backGroundTwo,BG.x1,BG.y,canvas.width,canvas.height);
}
const enemyImage = new Image();
    enemyImage.src = 'img_15.png';
const enemyImageTwo = new Image();
enemyImageTwo.src = 'img_11.png';
const enemyImageThree = new Image();
enemyImageThree.src = 'img_19.png';

    class Enemy {
        constructor() {
            this.x = canvas.width;
            this.y = Math.random() * (canvas.height - 150) + 90;
            this.radius = 60;
            this.speed = Math.random() *2 +2;
            this.frame = 0 ;
            this.frameX = 0 ;
            this.frameY = 0 ;
            this.spriteWidth = 418;
            this.spriteHeight = 397
        }
        draw(){
            // ctx.fillStyle = 'white';
            // ctx.beginPath();
            // ctx.arc(this.x, this.y, this.radius,0,Math.PI *2);
            // ctx.fill();
            ctx.drawImage(enemyImage, this.x-60,this.y-70,this.spriteWidth/3,this.spriteHeight/3);

        }
        drawThree(){
            // ctx.fillStyle = 'white';
            // ctx.beginPath();
            // ctx.arc(this.x, this.y, this.radius,0,Math.PI *2);
            // ctx.fill();
            ctx.drawImage(enemyImageThree, this.x-80,this.y-80,this.spriteWidth/2,this.spriteHeight/2);
        }
        drawTwo() {
            ctx.drawImage(enemyImageTwo,this.x-800,this.y-70,140,80);
        }
        updateTwo(){
            this.x += this.speed
            this.y +=1
            if (this.x > 1700) {
                this.x = 800 ;
                this.y = Math.random() * (canvas.height - 150) + 90 ;
                this.speed = Math.random() *2 +2;
            }

            const dx = this.x - player.x;
            const dy = this.y - player.y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < this.radius + player.radius-20){
                handleGameOver();
            }
        }
        updateThree(){
            this.x -= this.speed;
            this.y -=1;
            if (this.x < 0 - this.radius *2) {
                this.x = canvas.width +200;
                this.y = Math.random() * (canvas.height - 150) + 90 ;
                this.speed = Math.random() *2 +2;
            }
            if (gameFrame % 5 === 0){
                this.frame++;
                if (this.frame >= 12){
                    this.frame =0;
                }
                if (this.frame === 3 || this.frame === 7 || this.frame === 11){
                    this.frame =0;
                } else {
                    this.frameX++;
                }
            }
            const dx = this.x - player.x;
            const dy = this.y - player.y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < this.radius + player.radius-20){
                handleGameOver();
            }
        }
        update(){
            this.x -= this.speed;
            if (this.x < 0 - this.radius *2) {
                this.x = canvas.width +200;
                this.y = Math.random() * (canvas.height - 150) + 90 ;
                this.speed = Math.random() *2 +2;
            }
            if (gameFrame % 5 === 0){
                this.frame++;
                if (this.frame >= 12){
                    this.frame =0;
                }
                if (this.frame === 3 || this.frame === 7 || this.frame === 11){
                    this.frame =0;
                } else {
                    this.frameX++;
                }
            }
            const dx = this.x - player.x;
            const dy = this.y - player.y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < this.radius + player.radius-20){
                handleGameOver();
            }
        }
    }
     const enemy1 = new Enemy();
     const enemy2 = new Enemy();
     const enemy3 = new Enemy();
    function handleEnemies(){
        enemy1.draw();
        enemy1.update();
        enemy3.drawThree();
        enemy3.updateThree();
        enemy2.drawTwo();
        enemy2.updateTwo();
    }
    function handleGameOver() {
        ctx.fillStyle = 'white';
        ctx.fillText('GameOver, Điểm của bạn là: ' + score, 130,250);
        gameOver = true;
    }

function animate () {
    ctx.clearRect(0,0,canvas.width,canvas.width);
    handleBackground();
    handleBubbles();
    player.update();
    player.draw();
    handleEnemies();
    ctx.fillStyle = 'black'
    ctx.fillText('score: ' + score,10,50)
    gameFrame++
    if (!gameOver) requestAnimationFrame(animate);
}
animate();
    window.addEventListener('resize', function (){
        canvasPosition = canvas.getBoundingClientRect();
    });