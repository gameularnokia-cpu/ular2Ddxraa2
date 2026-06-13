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



const startBtn =
document.getElementById("start");



const size=20;

const grid=20;



let snake;

let apples=[];


let dx;

let dy;


let score;

let time;


let running=false;


let timer;

let clock;



const startSpeed=120;

let speed;



let highScore =
Number(localStorage.getItem("high")) || 0;


highText.innerHTML=highScore;




function startGame(){


snake=[
{x:10,y:10}
];


dx=1;
dy=0;


apples=[];


score=0;

time=90;


speed=startSpeed;


running=true;



message.innerHTML="";



spawnApple();



clearInterval(timer);

clearInterval(clock);



timer =
setInterval(
game,
speed
);



clock =
setInterval(()=>{


time--;

timeText.innerHTML=time;



if(time<=0){

endGame();

}


},1000);


}







function spawnApple(){


while(apples.length<10){



let a={

x:
Math.floor(Math.random()*grid),

y:
Math.floor(Math.random()*grid)

};



let same =
snake.some(
s=>
s.x==a.x &&
s.y==a.y
);



if(!same)
apples.push(a);



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



let hit =
apples.findIndex(
a=>
a.x==head.x &&
a.y==head.y
);



if(hit!=-1){



apples.splice(hit,1);



score+=10;



scoreText.innerHTML=score;




// naik cepat 0.5%

speed -= startSpeed*0.005;



if(speed<40)
speed=40;



clearInterval(timer);


timer =
setInterval(
game,
speed
);



spawnApple();



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


if(i==0){

drawHead(s);


}

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




apples.forEach(a=>{


ctx.fillStyle="red";


ctx.beginPath();


ctx.arc(

a.x*20+10,

a.y*20+10,

8,

0,

Math.PI*2

);


ctx.fill();


});


}






function drawHead(p){


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








function endGame(){


running=false;


clearInterval(timer);

clearInterval(clock);



if(score>highScore){


highScore=score;


localStorage.setItem(
"high",
highScore
);



message.innerHTML=
"🏆 MENANG HIGH SCORE";


}

else{


message.innerHTML=
"KALAH";


}



highText.innerHTML=highScore;


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






function moveControl(x,y){

dx=x;

dy=y;

}



up.onclick=
()=>moveControl(0,-1);


down.onclick=
()=>moveControl(0,1);


left.onclick=
()=>moveControl(-1,0);


right.onclick=
()=>moveControl(1,0);




startBtn.onclick=startGame;



snake=[
{x:10,y:10}
];


spawnApple();

draw();
