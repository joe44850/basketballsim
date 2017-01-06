var Shoot = function(square){
  this.square = square;
}

Shoot.prototype = {

  showMake : true,
  soundEffect : null,
  
  attempt : function(callback){
    this.net = "#rim-center";
    this.shotFromX = $(Ball.oBall).offset().left;
    this.shotFromY = $(Ball.oBall).offset().top;
    this.shotToX = Court.BasketCenterLeft;
    this.shotToY = Court.BasketCenterTop;
    this.setDistance(this.shotFromX);  
    this.good = true;
    if(this.good){
      this.makeShotAnimation(callback);
    }      
  },

  makeShotAnimation : function(callback){
      var net = "#rim-center";
      oBall = $(Ball.oBall);
      
      if(this.good){ this.soundEffect = "/assets/sounds/swish1.mp3";}
      //setup collision animation:
      var hashit = false;
      var hitcount = 0;
      var self = this;
      var tail = self.square.tail;
      var duration = (this.square.val==3) ? 2500 : 1800;

      yTo = Ball.yTo-50; 
      arc_array = this.getShotArc();
      oBall.animate({"top":yTo+"px"}, function(){     
        top = this.x_to/2;
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
        oBall.animate({path : new $.path.bezier(params)},{
          step:function(now,fx){
            if(hashit===false){
              var collides = oBall.overlaps(net);              
              if(collides.hits.length==1){ 
                if(self.square.x < 374){ Court.moveNetRight();}
                else{ Court.moveNetLeft();}
                hashit=true; 
                hitcount++;
              }            
            }
            else{
              hitcount++;
              var collides = oBall.overlaps(net);
              if(hitcount==13 && self.showMake){               
                oBall.stop();
                newleft = oBall.position().left+tail;
                oBall.animate({"top":"160px","left":newleft+"px","opacity":0},300);
                Court.moveNetBack();
                var sound = new Audio();
                sound.src = self.soundEffect;
                sound.play();
              }
              else if(hitcount==20){
                 oBall.stop();
                 newleft = oBall.position().left+tail;
                 oBall.animate({"top":"160px","left":newleft+"px","opacity":0},300);
                 Court.moveNetBack();
                 var sound = new Audio();
                 sound.src = self.soundEffect;
                 sound.play();
              }
            }
          },
          easing:'swing',
          duration:duration,
          complete: function(){          
            if(hashit){ Court.moveNetBack();}
            if(callback){
              callback(true);
            }
            return true;     
          }
        });
        //oBall.animate({"top":y+"px","left":x+"px"});
      });
    },
    
    getShotArc : function(){
        this.x_from = Ball.xTo;
        this.y_from = Ball.yTo-50;      
        this.y_to = 140;  
        this.x_to = (Court.jCourt.width()/2)+this.square.xAdj;        
        [angle1, length1, angle2, length2] = this.shotIsGood();
        retval = Array();
        retval['x_from'] = this.x_from;
        retval['y_from'] = this.y_from;
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
      x_from = $(Ball.oBall).position().left;
      y_from = $(Ball.oBall).position().top;  
      angle = this.square.angle1;
      angle2 = this.square.angle2;
      length = random(this.square.range1[0], this.square.range1[1]);
      length2 = this.square.range2;
      return [angle, length, 75, length2];
    },

    getAngle1: function(x_from){
      if(x_from <= 374){
        range_ratio = 5.342;
        var angle =  (x_from/5.342).toFixed(2);
        var adjusted_angle = this.getAdjustment(angle, x_from);
        return adjusted_angle;
      }
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


  