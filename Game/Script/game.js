/**
*		HTTP Status 404 page
*		Game source code
*		Create by Yuito.M
*		
*
*/
/*Getting Context*/
const mycanvas = document.getElementById("MyCanvas");
const ctx= mycanvas.getContext("2d");
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

let game_interval=0;
let myreq;

//Ball definition



//Ball speed parameter
let ball_dx = 2;
let ball_dy = -2;
const ball_speed_regulator=2;
const ball_speed_arr = [4,5,7,9,10].map( str => parseInt(str, 10) );
let ball_speed_regulator_counter=1;
let speed_up_counter=0;

//Paddle definition
const paddle_Height=75;
const paddle_Width=10;
const paddle_X =( mycanvas.width - (4 * paddle_Width) );
let paddle_Y = ( mycanvas.height -paddle_Height ) /2

//Paddle(Computer or 2P)
const paddle_2P_Height=75;
const paddle_2P_Width=10;
let paddle_X_2P= ( 4 * paddle_2P_Width );
let paddle_Y_2P=( mycanvas.height -paddle_2P_Height ) /2

//Ball param
let ball_x=mycanvas.height / 2;
let ball_y=mycanvas.height-paddle_X;
const ballRadius=10;

//Player Life
let life_player1=1;
let life_player2=1;

//Key control
let Up_Pressed=false;
let Down_Pressed=false;
let W_Pressed=false;
let S_Pressed=false;

//Key Control
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
  if (e.key === "Up" || e.key === "ArrowUp") {
    Up_Pressed = true;
  } else if (e.key === "Down" || e.key === "ArrowDown") {
    Down_Pressed = true;
  }else if (e.code=="KeyW") {
    W_Pressed = true;
  } else if (e.code=="KeyS") {
    S_Pressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Up" || e.key === "ArrowUp") {
    Up_Pressed = false;
  } else if (e.key === "Down" || e.key === "ArrowDown") {
    Down_Pressed = false;
  }else if (e.code=="KeyW") {
    W_Pressed = false;
  } else if (e.code=="KeyS") {
    S_Pressed = false;
  }
}


function drawBall(){
	
	ctx.beginPath();
	ctx.arc(ball_x, ball_y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "Black";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddle_X, paddle_Y, paddle_Width, paddle_Height);
	ctx.fillStyle="Red"
	ctx.fill();
	ctx.closePath();
}

function drawPaddle_2P(){
	ctx.beginPath();
	ctx.rect(paddle_X_2P, paddle_Y_2P, paddle_2P_Width, paddle_2P_Height);
	ctx.fillStyle="Green"
	ctx.fill();
	ctx.closePath();
}

function MovingBall(){
	//check ball x point
	if( (ball_x + ball_dx > mycanvas.width - ballRadius ) ||( ball_x + ball_dx < ballRadius ) ){
		ball_dx =ball_dx * (-1)
	}
	
	//check ball y point
	if(( ball_y + ball_dy > mycanvas.height - ballRadius ) || ( ball_y + ball_dy < ballRadius ) ){
		ball_dy = ball_dy * (-1);
	}
	ball_x += ball_dx;
	ball_y += ball_dy;
}

//speed_up_counter
//Regurate Ball Speed function
function Moving_Ball_SpeedRegurator(){
	if( ball_speed_regulator_counter % 5 == 0 ){
		if(ball_dy < 0){
			ball_dy = (-1) * ball_speed_arr[speed_up_counter];
			console.log(ball_speed_arr[speed_up_counter]);
			ball_speed_regulator_counter+=1;
			speed_up_counter+=1;
		}else if(0 < ball_dy){
			ball_dy = 1 * ball_speed_arr[speed_up_counter];
			console.log(ball_speed_arr[speed_up_counter]);
			ball_speed_regulator_counter+=1;
			speed_up_counter+=1;
		}else{
		}
	}
	if( 5 <= speed_up_counter ){
		speed_up_counter=0;
		ball_speed_regulator_counter=0;
	}
	
	/*
	if(ball_speed_regulator_counter % 5 == 0){
		if(ball_dy < 0){
			ball_dy -= 1*ball_speed_regulator;
			ball_speed_regulator_counter=1;
			speed_up_counter+=1;
		}else if(0 < ball_dy){
			ball_dy += 1*ball_speed_regulator;
			ball_speed_regulator_counter=1;
			speed_up_counter+=1;
		}else{
		}
	}else if(3 < speed_up_counter){
		speed_up_counter=0;
		if(ball_dy < 0){
			ball_dy = -2;
		}else if(0 < ball_dy){
			ball_dy = 2;
		}
	}*/
}

function Check_Bound_Ball_And_Paddle_1P(){
	if(  ( ( ( mycanvas.width - ( 4.1 * paddle_Width ) ) <= ( ball_x + ballRadius )) && (( ball_x + ballRadius ) <=( mycanvas.width - ( 4 * paddle_Width ) ) ) ) && ( (paddle_Y <= ball_y) && (ball_y <= paddle_Y+paddle_Height)) ){
		ball_dx = ball_dx * (-1);
		console.log("Bound");
		ball_speed_regulator_counter+=1;
	}
}

function Check_Bound_Ball_And_Paddle_2P(){
	if( ( ( ( 4 * paddle_2P_Width ) <= ball_x - ballRadius ) && ( ball_x - ballRadius <= 4.1 * paddle_2P_Width ) ) && ( ( paddle_Y_2P < ball_y - ballRadius ) && (ball_y < paddle_Y_2P+paddle_2P_Height)) ){
		ball_dx = ball_dx * (-1);
		console.log("Bound_2P");
	}
}


//Check Ball & Paddle Bound Position for Player 1
function CheckBallAndPaddle_1P(){
	if( ( ( paddle_X-ballRadius <= ball_x ) && (ball_x <= ( paddle_X + paddle_Width + ballRadius ) ) ) &&( ( (ball_y + ballRadius) >= (mycanvas.width - ( 3.1 * paddle_Width ) ) ) && ( ( ball_y + ballRadius ) <= (mycanvas.width - ( 2.8 * paddle_width ) ) ) ) ){
		ball_dy = ball_dy * (-1);
		console.log("Bound");
		ball_speed_regulator_counter+=1;
	}
		
}
//Check Ball & Paddle Position for Player 2 or computer
function CheckBallAndPaddle_2P(){
	if( ((paddle_X_2P - ballRadius <= ball_x) && (ball_x <= (paddleX_2P + paddle_2P_Width + ballRadius))) && ((ball_y - ballRadius)==(3 * paddle_2P_Height)) ){
		ball_dy = ball_dy * (-1);
		ball_speed_regulator_counter+=1;
	}
}

//Enemy Paddle Move
function Com_Paddle(){
	
}


function Key_Control_1P(){
	if(Up_Pressed){
		paddle_Y = Math.max(paddle_Y - 7, 0);
	}else if(Down_Pressed){
		 paddle_Y = Math.min(paddle_Y + 7, mycanvas.height - paddle_Height);
	}
}

function Key_Control_2P(){
	if(W_Pressed){
		paddle_Y_2P = Math.max(paddle_Y_2P - 7, 0);
	}else if(S_Pressed){
		paddle_Y_2P = Math.min(paddle_Y_2P + 7, mycanvas.height - paddle_2P_Height);
	}
}


//2Player game Win or Lose Check
function Check_Life_and_Win_or_Lose(func){
	if((ball_y + ballRadius) == 0){
		life_player2-=1;
	}else if((ball_y - ballRadius) == mycanvas.width){
		life_player1-=1;
	}
	if(life_player1 == 0 || life_player2 == 0){
		if(life_player1 == 0){
			alert("1P LOSE");
			//cancelAnimetionFrame(func);
		}else if(life_player2 == 0){
			alert("2P LOSE");
			//clearInterval(game_interval);
			//
		}
		cancelAnimationFrame(func);
	}
}

function Check_Gameover(func){
	if( ( ball_x + ballRadius ) > ( mycanvas.width - paddle_Width ) ){
		alert("GameOver");
		
		cancelAnimationFrame(func);
	}
}
var demo = document.getElementById("Game_Status_Display");

function draw_Hockey1(){
	demo.innerHTML="ballx:"+ball_x+"<br>bally:" + ball_y +"<br>dx:"+ball_dx+ "<br>dy:"+ball_dy;
	ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
	
	drawBall();
	drawPaddle();
	drawPaddle_2P();
	MovingBall();
	Check_Bound_Ball_And_Paddle_1P();
	Check_Bound_Ball_And_Paddle_2P();
	//CheckBallAndPaddle_1P();
	//Moving_Ball_SpeedRegurator();
	//CheckBallAndPaddle_2P()
	Key_Control_1P();
	myreq = requestAnimationFrame(draw_Hockey1);
	Check_Gameover(myreq);
	
}
//var demo = document.getElementById("debug_dy");


function draw_Hockey2(){
	//demo.innerHTML="life_p1(red):" + life_player1 + "<br>" +"life_p2(green):" + life_player2;
	demo.innerHTML="p1_X:"+paddle_X+"<br>p1_Y:"+paddle_Y+"<br>p2_X:"+paddle_X_2P+"<br>p2_Y:"+paddle_Y_2P;
	ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
	drawBall();
	drawPaddle();
	drawPaddle_2P();
	MovingBall();
	Check_Bound_Ball_And_Paddle_1P();
	Check_Bound_Ball_And_Paddle_2P();
	//Moving_Ball_SpeedRegurator();
	Key_Control_1P();
	Key_Control_2P();
	myreq = requestAnimationFrame(draw_Hockey2);
	Check_Life_and_Win_or_Lose(myreq);
	
	
}
//Game function
function player_1_hockey(){
	//game_interval=setInterval(draw_Hockey1,10);
	draw_Hockey1();
}
function player_2_hockey(){
	//game_interval=setInterval(draw_Hockey2,10);
	draw_Hockey2();
}
//clearInterval(interval);

/*
//Painting Block
for(i=0;i<=10;i++){
ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();
}

//Painting Boal
ctx.beginPath();
ctx.arc(250, 400, 20, 0, Math.PI*2, false);
ctx.fillStyle = "#00FFFF";
ctx.fill();
ctx.closePath();
*/

//clearInterval(game_interval);