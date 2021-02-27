var runner, runnerAnimation;

var atmosphere, atmosphereIMG;
var asteroidIMG, asteroid;
var gameAdaptivityScore = 0;
var blackHole, blackHoleIMG;
var fireball, fireballIMG;
var score = 0;
var blackHoleG, fireballG, asteroidG;
var GOIMG;

var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload() {
  runnerAnimation = loadAnimation("runner1.png", "runner2.png");
  atmosphereIMG = loadImage("Space.jpg");
  asteroidIMG = loadImage("IMG_2629-removebg-preview.png");
  blackHoleIMG = loadImage("image-removebg-preview (6).png");
  fireballIMG = loadImage("image-removebg-preview (7).png");
  GOIMG = loadAnimation("gameOver.png");
}

function setup() {
  createCanvas(400, 500);

  atmosphere = createSprite(200, 250, 400, 500);
  atmosphere.addImage("bg", atmosphereIMG);
  atmosphere.scale = 4;

  runner = createSprite(200, 360, 50, 50);
  runner.addAnimation("boyRunning", runnerAnimation);
  runner.addAnimation("gameOver", GOIMG);
  runner.scale = 0.1;

  blackHoleG = createGroup();
  fireballG = createGroup();
  asteroidG = createGroup();
}

function draw() {
  background(220);
  if (gameState === PLAY) {

    atmosphere.velocityY = 5;

    if (atmosphere.y > 300) {
      atmosphere.y = 250;
    }
    if (keyDown("right")) {
      runner.x = runner.x + 4;
    }
    if (keyDown("left")) {
      runner.x = runner.x - 4;
    }


    spawnAsteroids();
    spawnBlackHoles();
    spawnFireballs();
    
   
    
    if (blackHoleG.isTouching(fireballG)) {
      fireballG.destroyEach();
      blackHoleG.destroyEach();
      score = score + 1;
      console.log(score);
    }
    if (asteroidG.isTouching(runner)) {
      gameState = END;
    }
  } else if (gameState === END) {
    asteroidG.setLifetimeEach(-1);
    asteroidG.setVelocityYEach(0);

   
       
    blackHoleG.setLifetimeEach(-1);
     blackHoleG.setVelocityXEach(0);

    // atmosphere.lifetime=-1;
    atmosphere.velocityY = 0;

    runner.depth = asteroid.depth;
    runner.depth = runner.depth + 1;
    runner.scale = 1.5;
    runner.changeAnimation("gameOver", GOIMG);

    runner.x = 200;
    runner.y = 250;

  }
  



  drawSprites();
  fill("white");
  textSize = 20;

  text("Black Hole Score: " + score, 250, 40);
  text("Blocking Asteroid Score: " + gameAdaptivityScore, 250, 60);
  text("Total Score: " + (gameAdaptivityScore+score), 250, 80);
  
}

function spawnAsteroids() {
  if (frameCount % 100 === 0) {

    //The following code is for spawning the asteroids
    asteroid = createSprite(Math.round(random(60, 350)), 0, 50, 50);

    asteroid.addImage("asteroid", asteroidIMG);
    asteroid.scale = 0.25;
    asteroid.velocityY = 6;
    asteroid.depth = runner.depth;
    asteroid.depth = runner.depth + 0.5;
    asteroid.lifetime = 400 / asteroid.velocityY;
    asteroid.debug = true;
    asteroid.setCollider("circle",0,0,100);
    
    
    //The following code is for game adaptivity
    asteroid.velocityY = (5 + gameAdaptivityScore / 2);
    atmosphere.velocityY = (5 + gameAdaptivityScore / 2);

    asteroidG.add(asteroid);

    gameAdaptivityScore = gameAdaptivityScore + 1;


    
    
    
  }
}

function spawnBlackHoles() {

  if (World.frameCount % 150 === 0) {
    blackHole = createSprite(10, 10, 50, 50);
    blackHole.addImage("blackhole", blackHoleIMG);

    blackHole.scale = 0.25;
    blackHole.velocityX=(5+score/2);

    blackHole.lifetime = 400 / blackHole.velocityX;

    blackHole.debug = true;
    blackHole.setCollider("circle",0,0,80)
    
    
    
    blackHoleG.add(blackHole);
    
    

  }
}

function spawnFireballs() {
  if (keyDown("space")) {
    fireball = createSprite(runner.x + 40, runner.y - 20, 30, 30);
    fireball.addImage("fireball", fireballIMG);
    fireball.scale = 0.2;
    fireball.velocityY = -6;
    
    
    fireballG.add(fireball);

  }
}
