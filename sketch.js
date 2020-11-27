var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage;
var obstacle6 , obstacle1 , obstacle2 , obstacle3 , obstacle4 , obstacle5;
var obg , clg , restart , gameOver , rs , go ;
var jump , die , checkpoint ;
var score=0;
var PLAY=1
var END=0 
var gameState=PLAY
var dr = 0   
var HighScore =0

function preload(){
  trex_running=loadAnimation("trex1.png","trex2.png","trex3.png");        
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  restart = loadImage("restart.png")
  gameOver = loadImage("gameOver-1.png")
  cloudImage=loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  
  jump = loadSound("jump.mp3")
  die = loadSound("die.mp3")
  checkpoint = loadSound("checkPoint.mp3") 
}

function setup() {
  background(220)
  createCanvas(600,200)
  var msg="high"

  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided );
  trex.scale = 0.5;
  //trex.debug=true
  trex.setCollider("circle" ,0 ,0 ,40)
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -5;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))

  // creating groups
  clg = new Group();
  obg = new Group();
  
  rs = createSprite(300,140,20,50);
  rs.addImage(restart)
  rs.scale=0.5
  go = createSprite(300,100,20,50);
  go.addImage(gameOver)
  go.scale=1
}

function draw() {
  //set background color
  background("lightblue");
 
    text("Score : "  + score ,500 ,23) 
    
  
text("High Score=" + HighScore , 380 , 25)
  
  if(gameState===PLAY){
    go.visible=false
    rs.visible=false
    ground.velocityX=-(5 + score/500)

//calculating score
    score=score  + Math.round((getFrameRate()/60)); 
    
   if(dr>HighScore){
     HighScore=dr
   }
    if(score > 0 && score% 500===0){
      checkpoint.play(); 
    }
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    // jump when the space key is pressed        
  if(keyDown("space")&& trex.y >= 160) {
    trex.velocityY = -14;
    jump.play();
  
  }
    
    trex.velocityY = trex.velocityY + 0.8
  
  //Spawn Clouds
    spawnClouds()
    
  //Spawn obstacles
    spawnObstacles();
    if(obg.isTouching(trex)){
    die.play();
      gameState=END
    /*  jump.play();
      trex.velocityY=-13*/
   }
  }
  
  else if (gameState===END){
    go.visible=true
    rs.visible=true
    ground.velocityX=0
    trex.velocityY=0
    //change trex animation
    trex.changeAnimation("collided", trex_collided );
    
    obg.setVelocityXEach(0)
    clg.setVelocityXEach(0)
    obg.setLifetimeEach(-1)
    clg.setLifetimeEach(-1)
    
    if (mousePressedOver(rs)){
      reset()
    }
 
  }
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
 //createingcloud sprites
  if(frameCount  %  60  ===0){
    cloud=createSprite(600, 50, 10, 10);
    cloud.velocityX=-3
    cloud.addImage(cloudImage)
    
    var size=Math.round(random(0,2))
    cloud.scale=size
    var rand=Math.round(random(50,100))
    cloud.y=rand
    
    cloud.lifetime=200 
    clg.add(cloud)
    trex.depth=cloud.depth+5
  }
}

function spawnObstacles (){
  
    if(frameCount  %  60  ===0){
    obstacle=createSprite(600, 165, 20, 10)
    obstacle.velocityX=-(5 + score/500)    
    var r =Math.round(random( 1, 6))
    switch(r) {
      case 1:  obstacle.addImage(obstacle1);
               break;
      case 2:  obstacle.addImage(obstacle2);
               break
      case 3:  obstacle.addImage(obstacle3);
               break;
      case 4:  obstacle.addImage(obstacle4);
               break;
      case 5:  obstacle.addImage(obstacle5);
               break;
      case 6:  obstacle.addImage(obstacle6);
               break;
               default : break
}
      obstacle.scale=0.49
      obstacle.lifetime=120 
      obg.add(obstacle)
      
}
    
}
  
  
  function reset (){
     
    rs.visible=false
    go.visible=false
    
    gameState=PLAY
    dr=score
    console.log(dr)
    score=0
   obg.destroyEach() 
   clg.destroyEach()
  trex.changeAnimation("running")
  
  }
  
  
  
  
  
  
  