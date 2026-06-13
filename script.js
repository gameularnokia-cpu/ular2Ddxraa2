const canvas =
document.getElementById("canvas");


const ctx =
canvas.getContext("2d");



const scoreText =
document.getElementById("score");


const timeText =
document.getElementById("time");


const highText =
document.getElementById("high");


const message =
document.getElementById("message");



const start =
document.getElementById("start");



const size=20;

const grid=20;



let snake;

let fruits=[];


let dx=1;

let dy=0;


let score=0;

let time=90;


let speed;


let gameTimer;

let timeTimer;


let running=false;



const startSpeed=120;



let high =
Number(localStorage.getItem("snakeHigh")) || 0;


highText.innerHTML=high;




function startGame(){


snake=[
{x:10,y:10}
];


fruits=[];


dx=1;
dy=0;


score=0;

time=90;


speed=startSpeed;


running=true;


message.innerHTML="";


spawnFruit();



clearInterval(gameTimer);

clearInterval(timeTimer);



gameTimer =
setInterval(
game,
speed
);



timeTimer =
setInterval(()=>{


time--;

timeText.innerHTML=time;


if(time<=0)

endGame();


},1000);


}





function spawnFruit(){


while(fruits.length<10){


let f={

x:
Math.floor(Math.random()*grid),

y:
Math.floor(Math.random()*grid)

};


if(
!snake.some(
s=>s.x==f.x &&
s.y==f.y
)

)

fruits.push(f);


}


}





function game(){

move();

draw();

}




function move(){



let head={

x:snake[0].x+dx,

y:snake[0].y+dy

};




if(

head.x<0 ||
head.y<0 ||
head.x>=grid ||
head.y>=grid

){

endGame();

return;

}




snake.unshift(head);



let eat =
fruits.findIndex(

f=>
f.x==head.x &&
f.y==head.y

);



if(eat!=-1){


fruits.splice(eat,1);


score+=10;


scoreText.innerHTML=score;



// cepat 0.5%

speed -= startSpeed*0.005;


if(speed<40)

speed=40;



clearInterval(gameTimer);


gameTimer =
setInterval(
game,
speed
);



spawnFruit();


}

else{


snake.pop();

}


}







function draw(){


ctx.clearRect(
0,0,400,400
);



snake.forEach((s,i)=>{


if(i==0)

headDraw(s);

else{


ctx.fillStyle="#ff4da6";


ctx.fillRect(
s.x*20,
s.y*20,
18,
18
);


}


});



fruits.forEach(
fruitDraw
);


}






function headDraw(p){


ctx.fillStyle="#ff66b2";

ctx.beginPath();



if(dx==1){

ctx.moveTo(
p.x*20+20,
p.y*20+10
);

ctx.lineTo(
p.x*20,
p.y*20
);

ctx.lineTo(
p.x*20,
p.y*20+20
);

}



if(dx==-1){

ctx.moveTo(
p.x*20,
p.y*20+10
);

ctx.lineTo(
p.x*20+20,
p.y*20
);

ctx.lineTo(
p.x*20+20,
p.y*20+20
);

}



if(dy==1){

ctx.moveTo(
p.x*20+10,
p.y*20+20
);

ctx.lineTo(
p.x*20,
p.y*20
);

ctx.lineTo(
p.x*20+20,
p.y*20
);

}



if(dy==-1){

ctx.moveTo(
p.x*20+10,
p.y*20
);

ctx.lineTo(
p.x*20,
p.y*20+20
);

ctx.lineTo(
p.x*20+20,
p.y*20+20
);

}


ctx.closePath();

ctx.fill();


}






function fruitDraw(f){


ctx.fillStyle="#009933";


ctx.beginPath();


ctx.arc(
f.x*20+10,
f.y*20+10,
9,
0,
Math.PI*2
);


ctx.fill();



ctx.fillStyle="#ff3366";


ctx.beginPath();


ctx.arc(
f.x*20+10,
f.y*20+10,
6,
0,
Math.PI*2
);


ctx.fill();


ctx.fillStyle="#111";


ctx.fillRect(
f.x*20+8,
f.y*20+8,
2,
2
);


}







function endGame(){


running=false;


clearInterval(gameTimer);

clearInterval(timeTimer);



if(score>high){


high=score;


localStorage.setItem(
"snakeHigh",
high
);


message.innerHTML=
"🏆 MENANG";


}

else{


message.innerHTML=
"KALAH";


}


highText.innerHTML=high;


}






document.addEventListener(
"keydown",
e=>{


let k=e.key.toLowerCase();



if(k=="w"||k=="arrowup"){

dx=0;
dy=-1;

}


if(k=="s"||k=="arrowdown"){

dx=0;
dy=1;

}


if(k=="a"||k=="arrowleft"){

dx=-1;
dy=0;

}


if(k=="d"||k=="arrowright"){

dx=1;
dy=0;

}


});





function control(x,y){

dx=x;
dy=y;

}



up.onclick=
()=>control(0,-1);


down.onclick=
()=>control(0,1);


left.onclick=
()=>control(-1,0);


right.onclick=
()=>control(1,0);





start.onclick=startGame;



snake=[
{x:10,y:10}
];


spawnFruit();

draw();
