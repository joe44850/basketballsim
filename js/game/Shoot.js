var Shoot = function(square){
  this.square = square;
}

Shoot.prototype = {

  showMake : true,
  soundEffect : null,
  callBack: null,
  scorevalue: 0,
  player: null,
  
  attempt : function(square, player, callBack){
      this.player = player;
      this.callBack = callBack;      
      Ball.stopDribble();
      Ball.freeBallFromPlayer();  
      setTimeout(()=>{
        this.square = square;      
        this.net = "#rim-center";
        this.shotFromX = $(Ball.oBall).position().left;
        this.shotFromY = $(Ball.oBall).position().top;        
        this.shotToX = Court.BasketCenterLeft;
        this.shotToY = Court.BasketCenterTop;
        this.setDistance(this.shotFromX);         
        this.good = true;
        if(this.makeShot()){
          this.makeShotAnimation();
        }
        else{
          this.missShotAnimation();
        }
      },200);     
            
  },

  makeShot: function(){
    pct = (this.square.val == 3) ? this.player.three_pct : this.player.sht_pct;
    n = random(0,100);
    if(n <= pct){
      this.scorevalue = this.square.val;
      return true;
    }
    else{
      this.scorevalue = 0;
      return false;
    }
  },

  missShotAnimation: function(){
    var rim = "#rim";
        jBall = $(Ball.oBall);        
        this.soundEffect = "/assets/sounds/shot-miss.mp3";
        //setup collision animation:
        var hashit = false;
        var hitcount = 0;
        var self = this;
        var tail = self.square.tail;
        var duration = (this.square.val==3) ? 2500 : 1800;
        
        arc_array = this.getShotArc();
        yTo = this.shotFromY-50;
        xTo = arc_array['x_to']+random(2,10);
       
        jBall.stop(true, false).animate({"top":yTo+"px"}, function(){
          var params = {
            start:{
              x : arc_array['x_from'], 
              y : arc_array['y_from'], 
              angle : arc_array['angle1'], 
              length: arc_array['length1']},
            end:{
              x : xTo, 
              y : arc_array['y_to'], 
              angle : arc_array['angle2'],           
              length: arc_array['length2']}
          };             
          jBall.animate({path : new $.path.bezier(params)},{            
            easing:'swing',
            duration:duration,
            step:function(now,fx){ 
              var collides = jBall.overlaps(rim);
              if(collides.hits.length==1){ 
                debug("Should rebound now", true);
                jBall.stop();
                var sound = new Audio();
                sound.src = self.soundEffect;
                sound.play();
                return Rebound.get(self.callBack); 
              }
            },
            complete: function(){
              debug("Should rebound now", true);
              Rebound.get(self.callBack);                      
            }
          });
          //oBall.animate({"top":y+"px","left":x+"px"});
        });

  },

  makeShotAnimation : function(){
        var net = "#rim-center";
        jBall = $(Ball.oBall);        
        this.soundEffect = "/assets/sounds/swish1.mp3";
        //setup collision animation:
        var hashit = false;
        var hitcount = 0;
        var self = this;
        var tail = self.square.tail;
        var duration = (this.square.val==3) ? 2500 : 1800;
        
        arc_array = this.getShotArc();
        yTo = this.shotFromY-50;
        jBall.animate({"top":yTo+"px"}, function(){
          var params = {
            start:{
              x : arc_array['x_from'], 
              y : arc_array['y_from'], 
              angle : arc_array['angle1'], 
              length: arc_array['length1']},
            end:{
              x : arc_array['x_to'], 
              y : arc_array['y_to'], 
              angle : arc_array['angle2'],           
              length: arc_array['length2']}
          };             
          jBall.animate({path : new $.path.bezier(params)},{
            step:function(now,fx){ 
              
              if(hashit===false){
                var collides = jBall.overlaps(net);              
                if(collides.hits.length==1){ 
                  if(self.square.x < 374){ Court.moveNetRight();}
                  else{ Court.moveNetLeft();}
                  hashit=true; 
                  hitcount++;
                }            
              }
              else{
                hitcount++;
                var collides = jBall.overlaps(net);
                if(hitcount==13 && self.showMake){               
                  jBall.stop();
                  newleft = jBall.position().left+tail;
                  jBall.animate({"top":"160px","left":newleft+"px","opacity":0},300);
                  Court.moveNetBack();
                  var sound = new Audio();
                  sound.src = self.soundEffect;
                  sound.play();  
                  Scoreboard.update(self.scorevalue, Team.teamOnOffense.id);
                  setTimeout(()=>{
                    n = (Team.teamOnOffense.id != 1) ? 1 : 0;            
                    Team.setTeamOnOffense(n); 
                    if(self.callBack){
                        self.callBack();
                    }                                
                  },1000);
                                   
                }
                else if(hitcount==20){
                  jBall.stop();
                  newleft = jBall.position().left+tail;
                  jBall.animate({"top":"160px","left":newleft+"px","opacity":0},300);
                  Court.moveNetBack();
                  var sound = new Audio();
                  sound.src = self.soundEffect;
                  sound.play();
                  Scoreboard.update(self.scorevalue, Team.teamOnOffense.id);
                  setTimeout(()=>{
                    n = (Team.teamOnOffense.id != 1) ? 1 : 0;            
                    Team.setTeamOnOffense(n);                                 
                    self.callBack();
                  },1000);                  
                }
              }
            },
            easing:'swing',
            duration:duration,
            complete: function(){          
              if(hashit){ Court.moveNetBack();}         
             
            }
          });
          //oBall.animate({"top":y+"px","left":x+"px"});
        });
     
    },
    
    getShotArc : function(){  
        this.y_to = 140;  
        this.x_to = (Court.jCourt.width()/2)+this.square.xAdj;          
        [angle1, length1, angle2, length2] = this.shotIsGood();
        let retval = Array();
        retval['x_from'] = this.shotFromX;
        retval['y_from'] = this.shotFromY-50; 
        retval['y_to'] = this.y_to;
        retval['x_to'] = this.x_to;      
        retval['angle1'] = angle1;
        retval['length1'] = length1;
        retval['angle2'] = angle2;
        retval['length2'] = length2;
        return retval;
    },

    updateMessage(msg){
      oMsg = document.getElementById('msgarea');
      oMsg.innerHTML = msg;
    },

    shotIsGood: function(){
      this.showMake = this.square.showMake;             
      angle = this.square.angle1;
      angle2 = this.square.angle2;
      length = random(this.square.range1[0], this.square.range1[1]);
      length2 = this.square.range2;
      retval = [angle, length, 75, length2];
      return retval;
    },

    setDistance: function(x_from){
      this.distance =  Math.abs(x_from - 374);
      return this.distance;
    },

    getDistance(){
      return this.distance;
    },

    getAngle2: function(){
      /* distance = x */
    }
}
var Shoot = new Shoot;

  