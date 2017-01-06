var Ball = function(){};

Ball.prototype = {
  
  dribble : function(){
    if(!this.oBall){      
      this.inbound(Ball.Dribble);
    }
    var sound = new Audio();
    n = random(1,3);
    sound.src = "/assets/sounds/bounce-"+n+".mp3";
    
    currentY = Ball.yTo;
    toY = currentY+20;
    oBall = $(Ball.oBall);
    jBallS = $(Ball.oBallS);
    oBall.animate().stop();
    jBallS.animate().stop();
    //Ball.oBallS.style.opacity = ".1";
    speed = random(50,300);
    jBallS.animate({"opacity":".5","width":"31px"}, speed, function(){
      jBallS.animate({"opacity":".1","width:":"40px"}, speed);
    });
    oBall.animate({"top":toY+"px"}, speed, 'easeInQuad', function(){   
      sound.play();    
      oBall.animate({"top":currentY+"px"}, speed, 'easeOutQuad', function(){         
        if(Ball.stopDribbling){          
          if(Ball.shootBall){ Ball.shotAttempt();}
          return;
        }
        else{ Ball.dribble(); }
      });
    });
  },

  stopDribble : function(){
    oBall = $(Ball.oBall);
    oBall.animate().stop();
  },
  
  create : function(callBack){
    return new Promise(function(resolve, reject){
      this.destroy();
      this.oBall = document.createElement("img");
      this.oBall.src="/assets/images/sprites/ball.png";
      this.oBall.setAttribute("width", "18");
      this.oBall.setAttribute("height", "18");
      this.oBall.style.position = "absolute";
      this.oBall.style.zIndex="15";
      this.oBall.style.left="100px";
      this.oBall.style.top="200px";
      this.oBall.id="ball"; 
      this.ballX = 100;
      this.ballY = 200; 
      Court.oCourt.appendChild(this.oBall);
      this.createShadow();
      return resolve(true);
    }.bind(this));    
  },
  
  createShadow : function(){    
    this.oBallS = document.createElement("img");
    this.oBallS.src="/assets/images/sprites/ball-shadow.png";
    this.oBallS.setAttribute("width", "20");
    this.oBallS.setAttribute("height", "20");
    this.oBallS.style.position = "absolute";
    this.oBallS.style.opacity="0.5";
    this.oBallS.style.zIndex="10";
    this.ballShadowY=this.ballY+5;
    this.ballShadowX=this.ballX+5;
    this.oBallS.style.left=this.ballShadowX+"px";
    this.oBallS.style.top=this.ballShadowY+"px";
    this.oBallS.id="ball-shadow";
    Court.oCourt.appendChild(this.oBallS);
  },
  
  destroy : function(){
    try{
      oBall = document.getElementById('ball');
      oBall.parentNode.removeChild(oBall);
      this.oBall = "";
    }
    catch(e){}
    try{
      oBallS = document.getElementById('ball-shadow');
      oBallS.parentNode.removeChild(oBallS);
      this.oBallS = "";
    }
    catch(e){}
  }
  
};

Ball = new Ball;

