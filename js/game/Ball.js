var Ball = function(){};

Ball.prototype = {
  
  rotation: 0,
  dribbleState: "off",
  oBall: null,
  oBallS: null,

  dribble : function(stop){  
    if(this.dribbleState == "off"){ return;}
    oBall = $(Ball.oBall);
        
    this.rotation += 20;
    var sound = new Audio();
    n = 1;
    sound.src = "/assets/sounds/bounce-"+n+".mp3";
    currentY = oBall.position().top;  
    toY = currentY+20;        
    jBallS = $(Ball.oBallS); 
    var self = this;
    //Ball.oBallS.style.opacity = ".1";    
    speed = random(50,200);
    speedup = (speed/3).toFixed(0);
    
    jBallS.stop(true, false).animate({"opacity":".8", "queue":false}, speed, 'easeInQuad', function(){
      jBallS.animate({"opacity":".1", "queue":false}, speedup, 'easeOutQuad');
    });
    oBall.stop(true, false).animate({"top":toY+"px", "queue":false}, speed, 'easeInQuad', function(){           
      //oBall.css({transform: 'rotate('+ self.rotate +'deg)'});  
      sound.play();    
    oBall.animate({"top":currentY+"px", "queue":false}, speedup, 'easeOutQuad', function(){ 
          self.dribble();
      });
    });
  },

  pass: function(player, toX, toY, speed, callBack){
    jBallS = $(Ball.OballS);
    oBall = $(Ball.oBall);
    self = Ball;
    $(jBallS).animate(
      {
        left:toX+"px",
        top:toY+"px"
      },
      {
        duration:speed
      });
    $(oBall).animate(
      {
        left:toX+"px",
        top:toY+"px"
      },
      {
        duration:speed,
        complete:function(){
          Play.givePlayerBall(player);
          if(callBack){ callBack();}
        }
      });
  },

  getPosition: function(){
    var oBall = $(Ball.oBall);
    var pos = new Array();
    pos = {
      x: oBall.position().left,
      y: oBall.position().top
    }    
    return pos;
  },

  stopDribble : function(){    
    this.dribbleState = "off";
  },

  startDribble: function(){
    this.stopDribble();    
    this.dribbleState = "on";
    this.dribble();    
  },

  freeBallFromPlayer: function(player){
    
    gridSquare = player.onGrid;

    jBall = $(Ball.oBall);
    this.x = gridSquare.x + Court.floorStartX;    
    this.y = gridSquare.y + Court.floorStart;    
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
        try{ ballParent.appendChild(this.oBall);}
        catch(e){ 
          console.log("Error: "+e);
          console.log(ballParent);
        }
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
      try{ ballParent.appendChild(this.oBallS);}
      catch(e){ console.log("error with the ball parent");}
    }
    else{
      Court.oCourt.appendChild(this.oBallS);
    }
    
  },
  
  destroy : function(){
    el = document.getElementById('ball');
    elS = document.getElementById('ball-shadow');
    try{      
      el.parentNode.removeChild(el);
      elS.parentNode.removeChild(elS);
      this.oBall = null;
      this.oBallS = null;
    }
    catch(e){ }
  }
  
};

Ball = new Ball;

