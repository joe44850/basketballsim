var Ball = function(){};

Ball.prototype = {
  
  rotation: 0,
  dribbleState: "off",

  dribble : function(stop){  
    if(this.dribbleState == "off"){ return;}
    oBall = $(Ball.oBall);
        
    this.rotation += 20;
    var sound = new Audio();
    n = random(1,3);
    sound.src = "/assets/sounds/bounce-"+n+".mp3";
    currentY = oBall.position().top;  
    toY = currentY+20;        
    jBallS = $(Ball.oBallS); 
    var self = this;
    //Ball.oBallS.style.opacity = ".1";
    degree = 20*(random(1,3));
    speed = random(100,300);
    
    jBallS.animate({"opacity":".8", "queue":false}, speed, 'easeInQuad', function(){
      jBallS.animate({"opacity":".1", "queue":false}, speed, 'easeOutQuad');
    });
    oBall.animate({"top":toY+"px", "queue":false}, speed, 'easeInQuad', function(){           
      //oBall.css({transform: 'rotate('+ self.rotate +'deg)'});  
      sound.play();    
      oBall.animate({"top":currentY+"px", "queue":false}, speed, 'easeOutQuad', function(){ 
          if(stop){
            self.rotation = 0;
            oBall.animate().stop();
            Play.dispatch();            
          }  
          else{
            self.dribble();
          }
      });
    });
  },


  stopDribble : function(){
    $("#ball").animate().stop();
    $("#ball-shadow").animate().stop();
    this.dribbleState = "off";
  },

  startDribble: function(){
    this.dribbleState = "on";
    this.dribble();
  },

  freeBallFromPlayer: function(){
    jBall = $(Ball.oBall);
    this.x = Play.liveSquare.x + Court.floorStartX;    
    this.y = Play.liveSquare.y + Court.floorStart;    
    this.create();
  },
  
  create : function(ballParent){
    return new Promise(function(resolve){
      this.destroy();
      this.oBall = document.createElement("img");
      this.oBall.src="/assets/images/sprites/ball.png";     
      this.oBall.id="ball"; 
      
      if(!ballParent){
        Court.oCourt.appendChild(this.oBall);
        this.ballX = (this.x) ? this.x : 500;
        this.ballY = (this.y) ? this.y : 800;         
        this.oBall.style.left=this.ballX+"px";
        this.oBall.style.top=this.ballY+"px";
      }
      else{        
        this.ballX = 0;
        this.ballY = 10; 
        this.oBall.style.left="0px";
        this.oBall.style.top="10px";
        ballParent.appendChild(this.oBall);
      }
      this.createShadow(ballParent);      
      return resolve(true);
    }.bind(this));    
  },
  
  createShadow : function(ballParent){    
    this.oBallS = document.createElement("img");
    this.oBallS.src="/assets/images/sprites/ball-shadow.png";
    this.oBallS.setAttribute("width", "20");
    this.oBallS.setAttribute("height", "20");
    this.oBallS.style.position = "absolute";
    this.oBallS.style.opacity="0.5";
    this.oBallS.style.zIndex="10";
    this.ballShadowY=this.ballY+25;
    this.ballShadowX=this.ballX;
    this.oBallS.style.left=this.ballShadowX+"px";
    this.oBallS.style.top=this.ballShadowY+"px";
    this.oBallS.id="ball-shadow";
    if(ballParent){
      ballParent.appendChild(this.oBallS);
    }
    else{
      Court.oCourt.appendChild(this.oBallS);
    }
    
  },
  
  destroy : function(){
    try{
      oBall = document.getElementById('ball');
      $(oBall).animate.stop();
      oBall.parentNode.removeChild(oBall);
      this.oBall = "";
    }
    catch(e){}
    try{
      oBallS = document.getElementById('ball-shadow');
      $(oBallS).animate().stop();
      oBallS.parentNode.removeChild(oBallS);
      this.oBallS = "";
    }
    catch(e){}
  }
  
};

Ball = new Ball;

