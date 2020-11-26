{// canvas variable
var canvas;
// Game State as like ( Start , Play , End )
var gameState = "start";
// Buttons 
var startImg;
var start;
// background variable and its image
var bg;
var bgImg;
// player variable and its image 
var player;
var playerImg;
// Enemy tanks variable and its images
var t1Img , t2Img , t3Img , t4Img , t5Img , t6Img ;
var enemy;
var enemies;
// Score Image  and sprite variable
var score1;
var score2;
var scoreImg;
// Bullet variable and its Image and its sound
var bullet;
var bulletsg;
var bulletImg;
// sound for explosion of enemy tank
var boomSound;
// Score variable for counting of score that player will earns
var scoreCount = 0;
}
// Function for loading Images and Sounds
function preload(){
  // Screen - 1 
  scr2Img = loadImage("Images/scr1.png");
  // Start Button Image
  startImg = loadImage("Images/start.png");
  // background Image
  bgImg = loadImage("Images/grass.png");
  // player Tank Image
  playerImg = loadImage("Images/player.png");
  // Enemy Tank Image
  t1Img = loadImage("Images/t1.png");
  t2Img = loadImage("Images/t2.png");
  t3Img = loadImage("Images/t3.png");
  t4Img = loadImage("Images/t4.png");
  t5Img = loadImage("Images/t5.png");
  t6Img = loadImage("Images/t6.png");
  // Bullet Image
  bulletImg = loadImage("Images/bullet.png");
  // Shooting Sound
  ShootSound = loadSound("Sounds/shoot.mp3");
  // Sound of explosion 
  boomSound = loadSound("Sounds/explo.mp3");
  // Sound plays in end
  overSound = loadSound("Sounds/over.mp3")
  // Restart Button Image
  resetButtonImg = loadImage("Images/restart.png");
  // Score Count Image
  scoreImg = loadImage("Images/score.png");
  // Defeat Image
  endImg = loadImage("Images/defeat.gif");
  //Victory Image
  victoryImg = loadImage("Images/Victory.gif");
}

// Function for creating Sprites
function setup() {

  // Canvas Size
  canvas =  createCanvas(displayWidth-20,displayHeight-30);

  // starting Screen 
  screen = createSprite(displayWidth/2,displayHeight/2,20,20);
  screen.addImage(scr2Img);
  screen.scale = 1.5;

  // Start button
  start = createSprite(displayWidth/2, displayHeight/2+200,20,20);
  start.addImage(startImg);
  start.scale = 0.5;

  // Victory Screen
  victory = createSprite(displayWidth/2,displayHeight/2,20,20);
  victory.addImage(victoryImg);
  victory.scale = 1;

  // End Image
  end = createSprite(displayWidth/2,displayHeight/2,20,20);
  end.addImage(endImg);
  end.scale = 1;

  // Player Tank Sprite 
  player = createSprite(displayWidth/2,650,20,20);
  player.addImage(playerImg);
  player.scale = 0.5;

  // Group for making multiple Ememies 
  enemies = new Group();
  // Group for making multiple Bullets
  bulletsg = new Group();

// Scoring System 
  score1 = createSprite(80,50, 20,20);
  score1.addImage(scoreImg);
  score1.scale = 0.5;

  score2 = createSprite(80,700, 20,20);
  score2.addImage(scoreImg);
  score2.scale = 0.5;

  // Reset button
  resetButton = createSprite(displayWidth/2,displayHeight/2+200,20,20);
  resetButton.addImage(resetButtonImg);
  resetButton.scale = 0.5;
  //console.log()
}

// Function for making them work and display 
function draw() {
  // Backgroud image fixed to the canvas
  image(bgImg,0,-displayHeight*4,displayWidth,displayHeight*5);
  
  // Making the Game State as Start 
if(gameState === "start"){
  // Making the starting screen and start Button to be visible 
  screen.visible = true;
  start.visible = true;
  // making th other thing invisible 
  player.visible = false;
  score1.visible = false;
  score2.visible = false;
  enemies.visible = false;
  bulletsg.visible = false;
  victory.visible = false;
  resetButton.visible = false
  end.visible = false;

if(mousePressedOver(start) || keyWentDown(32))
{
gameState = "play";
}

}

if(gameState === "play"){
  screen.visible = false;
  start.visible = false;
  player.visible = true;
  score1.visible = true;
  score2.visible = true;
  enemies.visible = true;
  bulletsg.visible = true;
  victory.visible = false;
  resetButton.visible = false;
  end.visible = false;
 // Give the player Tank to controlit on X - Axis only
player.x=World.mouseX;

// Bullets will create when space key is pressed 
if(keyWentDown(32) || mousePressedOver(player)){
// Sound to be played 
ShootSound.play();
  // function name made for bullet
createBullet();
}

// created enemies 
enemies1();
// Making the Game State as Defeat (end) 
if(enemies.isTouching(player)){
gameState = "end";
overSound.play();
}
// Making Game State as Victory (Happy Ending)
if(scoreCount === 500){
  gameState = "ending";
}
// Making the enemies destroy when any bullet touch them 
if(bulletsg.isTouching(enemies)){
  // By this enemies get destroy 
  enemies.destroyEach();
  // Bullet also get destroy when it is touching the enemy tank
  bulletsg.destroyEach();
  // At the time of touching the enemy and the bulllet Sound will play 
  boomSound.play();
  // Then Score get Increase by " 10 "  by detriying any 1 enemy 
  scoreCount = scoreCount + 10;
 }

  }

if(gameState === "ending"){
victory.visible = true;
resetButton.visible = true;
end.visible = false;
player.visible = false;
score1.visible = false;
score2.visible = false;
enemies.visible = false;
bulletsg.visible = false;
screen.visible = false;
start.visible = false;

if(mousePressedOver(resetButton)){
  gameState = "start";
  scoreCount = 0;
}
}

if(gameState === "end"){

end.visible = true;
resetButton.visible = true;
victory.visible = false;
player.visible = false;
score1.visible = false;
score2.visible = false;
enemies.visible = false;
bulletsg.visible = false;
screen.visible = false;
start.visible = false;

if(mousePressedOver(resetButton)){
  gameState = "start";
  scoreCount = 0;
}
}

// For making the sprites 
  drawSprites();

  // Writen text
  fill("white");
  text(scoreCount,75,75);
  text(scoreCount,72,730);
  
}
// Function for making multiple bullets
function createBullet() {
 // bullet sprite 
 bullet = createSprite(200,600,20,20);
 // Adding Image to all bullets
 bullet.addImage(bulletImg);
// Giving them scale 
 bullet.scale = 0.2;
  // position of bullet 
   bullet.y = 600;
   // position of the bullets to move it with player 
   bullet.x = player.x;
   // Giving the velocity Y to bullets 
   bullet.velocityY = -10;
 // Giving lifetime to bullets to not disappear 
   bullet.lifetime = 120;
   // adding buulets in bullets Group 
   bulletsg.add(bullet);

   }
  

// Function for making multiple enemies 
  function enemies1(){
    //  Giving the enemies frameCount that they come come from Different position of X- axis
  if(World.frameCount%60===0){
    // Making the sprite for enemy 
 enemy = createSprite(random(20,1300),0,10,10);
 // Giving them scale 
 enemy.scale = 0.5;
// Giving them velocity Y 
   enemy.velocityY = 5;     
// Giving them lifetime
   enemy.lifetime = 100;
   // making the enemies with different Images 
  var rand = Math.round(random(1,6));
  // making their velocity random 
   enemy.velocityY = random(5,10);     
// By using switch case Giving the Different Images to enemy tanks
  switch(rand){
    case 1 : enemy.addImage(t1Img);// Adding the Image in enemy sprite 
    break;
    case 2 : enemy.addImage(t2Img);// Adding the Image in enemy sprite
    break;
    case 3 : enemy.addImage(t3Img);// Adding the Image in enemy sprite
    break;
    case 4 : enemy.addImage(t4Img);// Adding the Image in enemy sprite
    break;
    case 5 : enemy.addImage(t5Img);// Adding the Image in enemy sprite
    break;
    case 6 : enemy.addImage(t6Img);// Adding the Image in enemy sprite
    break;
  }
  // giving them lifetime 
   enemy.lifetime = 300;
   // Adding the enemy in Enemies Group 
  enemies.add(enemy);
  }  
    }
 