var Ball = function(){};

Ball.prototype = {

  square : null, 
  
  inbound : function(){
    //change this later, get random number
    //this._randomInbound();
    this._randomInbound();
    this.createBall();
  },

  _randomInbound : function(){
    var square = random(1,167);
    this.xStart = -10;    
    this.yStart = random(Court.floorStart, Court.floorHeight);
    this.square = grid[square];
    this.yTo = this.square.y + Court.floorStart;
    this.xTo = this.square.x;
  },
  count : 35,

  _fixedInbound : function(){
    
    var square = random(1,167);
    this.xStart = -10;    
    this.yStart = random(Court.floorStart, Court.floorHeight);
    this.square = grid[square];
    this.yTo = this.square.y + Court.floorStart;
    this.xTo = this.square.x;
  },
  
  pass : function(callBack){
    /* random pass for now */
    this.stopDribble();
    self = this;
    shadowTo = Ball.yTo+30;
    $(Ball.oBallS).animate({"left":Ball.xTo+"px", "top":shadowTo+"px"}, speed);
    $(Ball.oBall).animate({"left":Ball.xTo+"px","top":Ball.yTo+"px"}, speed, function(){      
      var n = random(1,167);
      var passToSquare = grid[n];
      self.square = passToSquare;      
      var xTo = passToSquare.x;
      var yTo = passToSquare.y + Court.floorStart;
      shadowTo = yTo + 30;
      console.log("Shadowy: "+shadowTo);
      console.log("Bally: "+Ball.yTo);
      speed = random(400,700);
      $(Ball.oBallS).animate({"left":xTo+"px", "top":shadowTo+"px"}, speed);
      $(Ball.oBall).animate({"left":xTo+"px","top":yTo+"px"}, speed, function(){      
        Ball.xTo = xTo;
        Ball.yTo = yTo;
        if(callBack){ callBack();}
      });
    });
    
  },
  
  shoot : function(){
    Ball.stopDribble();    
    Shot = new Shoot(this.square);
    Shot.attempt();
    //put ball in shot position    
  },  
  
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
  
  createBall : function(callBack){
    this.destroyBall();
    this.oBall = document.createElement("img");
    this.oBall.src="/assets/images/sprites/ball.png";
    this.oBall.setAttribute("width", "18");
    this.oBall.setAttribute("height", "18");
    this.oBall.style.position = "absolute";
    this.oBall.style.zIndex="15";
    this.oBall.style.left=this.xStart+"px";
    this.oBall.style.top=this.yStart+"px";
    this.oBall.id="ball";    
    shadowTo = Ball.yTo+30;
    this.createBallShadow();
    Court.oCourt.appendChild(this.oBall);
    speed = random(400,700);
    $(Ball.oBallS).animate({"left":Ball.xTo+"px", "top":shadowTo+"px"}, speed);
    $(Ball.oBall).animate({"left":Ball.xTo+"px","top":Ball.yTo+"px"}, speed, function(){      
      if(callBack){ callBack();}
    });
    
    
  },
  
  createBallShadow : function(){
    
    this.oBallS = document.createElement("img");
    this.oBallS.src="/assets/images/sprites/ball-shadow.png";
    this.oBallS.setAttribute("width", "20");
    this.oBallS.setAttribute("height", "20");
    this.oBallS.style.position = "absolute";
    this.oBallS.style.opacity="0.5";
    this.oBallS.style.zIndex="10";
    this.oBallS.y=this.yStart+30;
    this.oBallS.x=this.xStart;
    this.oBallS.style.left=this.xStart+"px";
    this.oBallS.style.top=this.yStart+"px";
    this.oBallS.id="ball-shadow";
    Court.oCourt.appendChild(this.oBallS);
  },
  
  placeAndShoot : function(){
    this.xTo = 100;
    this.yTo = 300;
    this.createBall(Ball.shotAttempt);
  },
  
  destroyBall : function(){
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

