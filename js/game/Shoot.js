var Shoot = function(){};
  
  Shoot.prototype = {

  showMake : true,
  soundEffect : null,
  callBack: null,
  scorevalue: 0,
  player: null,
  
  attempt : function(){  
      this.init();
      if(this.makeShot()){
        this.makeShotAnimation().then(()=>{
            return Play.madeShotCallback();
        });
      }
      else{
        this.missShotAnimation().then(()=>{ 
            return Play.missedShotCallback();
          }
        );
      }          
            
  },

  init: function(){
      player = Play.playerWithBall;
      square = player.onGrid;
      this.player = player;
      this.callBack = callBack;      
      Ball.stopDribble();
      Ball.freeBallFromPlayer(player); 
      this.square = square;      
      this.net = "#rim-center";
      this.shotFromX = $(Ball.oBall).position().left;
      this.shotFromY = $(Ball.oBall).position().top;        
      this.shotToX = Court.BasketCenterLeft;
      this.shotToY = Court.BasketCenterTop;
      this.setDistance(this.shotFromX);   
  },

  complete: function(){
    return new Promise(function(resolve){
      return resolve(true);
    });
  },

  makeShot: function(){
    return false;
    pct = (this.square.val == 3) ? this.player.fg3_pct : this.player.fg_pct;
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
      var p = null;
      p = (function(){
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
                jBall.stop();
                var sound = new Audio();
                sound.src = self.soundEffect;
                sound.play();                
              }
            },
            complete: function(){
                return "fee";            
            }
          });        
        });        
      }());
      console.log(p);
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
          jBall.stop().animate({path : new $.path.bezier(params)},{
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
                  Scoreboard.update(self.scorevalue, Teams.onOffense.id);
                  setTimeout(()=>{
                    n = (Teams.onOffense.id != 1) ? 1 : 0;            
                    Teams.setTeams(n); 
                  },1000);
                  self.complete();                
                }
                else if(hitcount==20){
                  jBall.stop();
                  newleft = jBall.position().left+tail;
                  jBall.animate({"top":"160px","left":newleft+"px","opacity":0},300);
                  Court.moveNetBack();
                  var sound = new Audio();
                  sound.src = self.soundEffect;
                  sound.play();
                  Scoreboard.update(self.scorevalue, Teams.onOffense.id);
                  setTimeout(()=>{
                    n = (Teams.onOffense.id != 1) ? 1 : 0;            
                    Teams.setTeams(n);                                 
                  },1000);
                  self.complete();                     
                }
              }
            },
            easing:'swing',
            duration:duration,
            complete: function(){          
              if(hashit){ 
                Court.moveNetBack();                
              }  
              self.complete();           
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

  