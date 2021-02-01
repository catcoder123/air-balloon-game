var sky, skyImg, balloon, balloonImg, blackCloud, blackCloudImg, invisibleGround, blackCloudGroup
var upperGround, gameState="play", score = 0, goldCoin, bronzeCoin, goldCoinImg, bronzeCoinImg, goldCoinGroup, bronzeCoinGroup
var bird, birdImg, birdGroup, life = 3, gameOver, restart, gameOverImg, restartImg , lifeImg


function preload(){
  skyImg = loadImage("./images/sky.jpeg");
  balloonImg = loadImage("./images/balloon.png")
  blackCloudImg = loadImage("./images/cloud.png");
  goldCoinImg = loadImage("./images/gcoin.png");
  bronzeCoinImg = loadImage("./images/bcoin.png")
  birdImg = loadImage("./images/bird.png");
  gameOverImg = loadImage("./images/game over.png")
// restartImg = loadImage("./images/download (1).png")
  lifeImg = loadImage("./images/heart.png")
}


function setup() {
  createCanvas(displayWidth,displayHeight-200);
  sky = createSprite(displayWidth/2, displayHeight/2);
  balloon = createSprite(150, displayHeight/3);
  balloon.debug=true
  balloon.setCollider("circle",0,-25,55)

  sky.addImage(skyImg)
  sky.velocityX=-8
  sky.x=sky.width/2

  balloon.addImage(balloonImg)



  invisibleGround = createSprite(displayWidth/2, displayHeight-200, displayWidth, 20);
  upperGround = createSprite(displayWidth/2, 0,displayWidth,20);
  invisibleGround.visible=false
  upperGround.visible=false

  gameOver= createSprite(displayWidth/2, displayHeight/2 -200 )
 // restart= createSprite(displayWidth/2, displayHeight/2 +200)
  gameOver.visible=false
  //restart.visible=false

  blackCloudGroup=new Group()
  birdGroup=new Group()
  goldCoinGroup= new Group()
  bronzeCoinGroup=new Group()
}

function draw(){
  background(0)
  

  if (gameState==="play") {
    if (sky.x<600) {
      sky.x=sky.width/2
    } 
    
    if (keyDown('space')){
      balloon.velocityY=-12 
    }
    balloon.velocityY=balloon.velocityY+0.5

    spawnBronzeCoins();
    spawnGoldCoins();
    spawnBird();
    spawnBlackClouds();

    if (blackCloudGroup.isTouching(balloon)) {
     life = life - 1
     blackCloudGroup.destroyEach()
    }
    if (birdGroup.isTouching(balloon)) {
      life = life - 1
      birdGroup.destroyEach()
    }
    if (bronzeCoinGroup.isTouching(balloon)) {
      score = score +1;
      bronzeCoinGroup.destroyEach();
    }
    if (goldCoinGroup.isTouching(balloon)) {
      score = score +3;
      goldCoinGroup.destroyEach();
    }

    if (life===0) {
      gameState="end"
     }


  } else if(gameState === "end") {
    gameOver.visible = true;
    gameOver.addImage(gameOverImg)
   // restart.visible = true;
    //restart.addImage(restartImg)
    
    sky.velocityX = 0;

    bronzeCoinGroup.setVelocityXEach(0);
    goldCoinGroup.setVelocityXEach(0);
    birdGroup.setVelocityXEach(0);
    blackCloudGroup.setVelocityXEach(0)
    
    birdGroup.setLifetimeEach(-1);
    blackCloudGroup.setLifetimeEach(-1)
    bronzeCoinGroup.setLifetimeEach(-1);
    goldCoinGroup.setLifetimeEach(-1);
    
  }
  balloon.collide(invisibleGround);
  balloon.collide(upperGround);
  drawSprites();
  fill('black');
  textSize(22)
  text("you have collected :"+score,displayWidth/2+200,30)

  for (var i = 0; i < life; i++){             
    image(lifeImg,30+(i*70),30,40,40)
  }
}

function spawnGoldCoins() {
  if (frameCount % 305 === 0) {
    goldCoin = createSprite(displayWidth,120,40,10);
    goldCoin.y = Math.round(random(30,displayHeight-30));
    goldCoin.addImage(goldCoinImg);
    goldCoin.scale = 0.2;
    goldCoin.velocityX = -5;
  
    goldCoin.lifetime = displayWidth/5;
    
    
    goldCoinGroup.add(goldCoin);
  }
  
}
function spawnBronzeCoins() {
  if (frameCount % 290 === 0) {
    bronzeCoin = createSprite(displayWidth,120,40,10);
    bronzeCoin.y = Math.round(random(30, displayHeight));
    bronzeCoin.addImage(bronzeCoinImg);
    bronzeCoin.scale = 0.2;
    bronzeCoin.velocityX = -5;
  
    bronzeCoin.lifetime = displayWidth/5;
    bronzeCoinGroup.add(bronzeCoin);
  }
  
}

function spawnBird() {
  if (frameCount % 300 === 0) {
    bird = createSprite(displayWidth,120,40,10);
    bird.y = Math.round(random(30,displayHeight-30));
    bird.addImage(birdImg);
    bird.scale = 0.2;
    bird.velocityX = -(6+1.5*score/50);
  
    bird.lifetime = displayWidth/bird.velocityX;
    
    
    birdGroup.add(bird);
  }
  
}
function spawnBlackClouds() {
  if (frameCount % 320 === 0) {
    blackCloud = createSprite(displayWidth,120,40,10);
    blackCloud.y = Math.round(random(30,displayHeight-30));
    blackCloud.addImage(blackCloudImg);
    blackCloud.scale = 0.4;
    blackCloud.velocityX = -(6+score/50);
  
    blackCloud.lifetime = displayWidth/blackCloud.velocityX;
    
  
    blackCloudGroup.add(blackCloud);
  }
  
}
