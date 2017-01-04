var Shoot = function(square){
  this.square = square;
}

Shoot.prototype = {

  showMake : true,
  soundEffect : null,
  
  attempt : function(){
    this.shotFromX = $(Ball.oBall).offset().left;
    this.shotFromY = $(Ball.oBall).offset().top;
    this.shotToX = Court.BasketCenterLeft;
    this.shotToY = Court.BasketCenterTop;
    this.newLeft = (this.square.x>374) ? -25 : 25;
    this.shotAttempt();
  },

  shotAttempt : function(){
       
      var net = "#rim-center";
      oBall = $(Ball.oBall);
      this.good = true;
      if(this.good){ this.soundEffect = "/assets/sounds/swish1.mp3";}
      //setup collision animation:
      var hashit = false;
      var hitcount = 0;
      var self = this;
      
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
                newleft = oBall.position().left+self.newLeft;
                oBall.animate({"top":"160px","left":newleft+"px","opacity":0},300);
                Court.moveNetBack();
                var sound = new Audio();
                sound.src = self.soundEffect;
                sound.play();
              }
              else if(hitcount==40){
                 oBall.stop();
                 newleft = oBall.position().left+self.newLeft;
                 oBall.animate({"top":"160px","left":newleft+"px","opacity":0},300);
                 Court.moveNetBack();
                 var sound = new Audio();
                 sound.src = self.soundEffect;
                 sound.play();
              }
            }
          },
          easing:'swing',
          duration:1800,
          complete: function(){          
            if(hashit){ Court.moveNetBack();}     
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
      //return[290, 1.5, 75, 0.4];
      
      this.updateMessage("Angle1:"+angle+" Length1:"+length+" Angle2:"+angle2+" Length2:"+length2+" ");
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

    getLength: function(x_from){      
      len = ((374/this.distance)*.75).toFixed(2);
      console.log(len);
      return len;
    },

    setDistance: function(x_from){
      return Math.abs(x_from - 374); 
    },

    getAdjustment: function(angle, x_from){
      /* the lower the distance, the greater adjustment we must make to the angle */
      adjustment = 348 - angle - 20;
      return adjustment;
    },

    getAngle2: function(){
      /* distance = x */
    }
}
  