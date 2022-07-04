const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;

var chao;

var corda

var melanca,melancaImg

var link

var backgroundImg

var neeko,neekoImg

var cut

var idle 

var sad 

var eat

var soundair

var eatsound

var cutsound

var sadsound

var soundfund

var ballon


function preload(){
  melancaImg = loadImage('images/melon.png');
  backgroundImg = loadImage('images/background.png');
  neekoImg = loadImage('images/rabbit1.png');
  idle = loadAnimation('images/rabbit1.png','images/rabbit2.png','images/rabbit3.png','images/rabbit1.png')
  sad = loadAnimation('images/sad_1.png','images/sad_2.png','images/sad_3.png')
  eat = loadAnimation('images/eat.png','images/eat2.png','images/eat3.png','images/eat4.png','images/eat.png')
  soundair = loadSound('sounds/air.wav');
  eatsound = loadSound('sounds/eating_sound.mp3');
  cutsound = loadSound('sounds/rope_cut.mp3');
  sadsound = loadSound('sounds/sad.wav');
  soundfund = loadSound('sounds/sound1.mp3');  
  eat.looping = false
  sad.looping = false
  

}


function setup(){
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 



  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  var options = {
    isStatic: true
  }

 soundfund.play();  
 soundfund.setVolume(0.50);
  chao = Bodies.rectangle(250,690,500,20,options);
  World.add(world,chao);

  corda = new Rope(5,{x:250,y:30})
  corda2 = new Rope(5,{x:100,y:170})
  corda3 = new Rope(5,{x:300,y:170})


 melanca = Bodies.circle(300,300,20)
 
 
 Composite.add(corda.body,melanca)
 link = new Link(corda,melanca)
 link2 = new Link(corda2,melanca)
 link3 = new Link(corda3,melanca)

 idle.frameDelay = 20
 eat.frameDelay = 20
 sad.frameDelay = 20 
 

 neeko = createSprite(400,638)
 neeko.addAnimation('idle',idle);
 neeko.addAnimation('sad',sad);
 neeko.addAnimation('eat',eat);
 neeko.scale = 0.2

 cut = createImg('images/cut_button.png')
 cut.position(250,20);
 cut.size(50,50);
 cut.mouseClicked(drop);
 
 cut2 = createImg('images/cut_button.png')
 cut2.position(100,180);
 cut2.size(50,50);
 cut2.mouseClicked(drop2);
 
 cut3 = createImg('images/cut_button.png')
 cut3.position(300,175);
 cut3.size(50,50);
 cut3.mouseClicked(drop3);

 ballon = createImg('images/balloon.png')
 ballon.size(150,100);
 ballon.mouseClicked(air);
 ballon.position(10,300);

 bott = createImg('images/mute.png')
 bott.size(50,50)
 bott.position(450,10)
 bott.mouseClicked(mut)
}

function draw(){
  background(50);
  Engine.update(engine);

  rect(chao.position.x,chao.position.y,500,20);
   image(backgroundImg,0,0,500,700)
   if(melanca!=null){
    push()
    imageMode(CENTER)
    image(melancaImg,melanca.position.x,melanca.position.y,60,60)  
    pop()
   }
  corda.show();
  corda2.show();
  corda3.show();
  if(melanca!=null&&melanca.position.y>=650){
    neeko.changeAnimation('sad')
    sadsound.play();  
  
  }
  
  
  if(collison(melanca,neeko)===true){
    setTimeout(()=>{
      neeko.changeAnimation('idle')

    },2000)
    neeko.changeAnimation('eat')
    eatsound.play();
    
  } 
  
  drawSprites()
} 

function drop(){
 corda.break()
 link.break()
 link=null
 cutsound.play();


}

function collison(body,sprite){
 if(melanca!=null){
   var distance = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    
   
 
    if(distance<=80){
  World.remove(world,melanca)
  melanca=null
  return true
 
}
else{
  return false
}
 }
}
function air(){
Matter.Body.applyForce(melanca,{x:0,y:0},{x:0.01,y:0})
soundair.play()
soundair.setVolume(0.30)

}
function mut(){
 if(soundfund.isPlaying()){
    soundfund.pause(0)  
 }else{
 soundfund.play();
 }


}
function drop2(){
 corda2.break()
 link2.break()
 link2=null
 cutsound.play();

 
}
function drop3(){
  corda3.break()
  link3.break()
  link3=null
  cutsound.play();
}