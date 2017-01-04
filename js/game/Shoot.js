var Shoot = function(){}

Shoot.prototype = {

  showMake : true,
  
  attempt : function(){
    this.shotFromX = $(Ball.oBall).offset().left;
    this.shotFromY = $(Ball.oBall).offset().top;
    this.shotToX = Court.BasketCenterLeft;
    this.shotToY = Court.BasketCenterTop;
    this.newLeft = 25;
    this.shotAttempt();
  },

  shotAttempt : function(){  
      var net = "#rim-center";
      oBall = $(Ball.oBall);
      this.good = true;
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
                Court.moveNetRight();
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
        this.x_to = (Court.jCourt.width()/2)+10;
        oMsg = document.getElementById('msgarea');
        
        [angle1, length1, angle2, length2] = this.shotIsGood();        
        
        oMsg.innerHTML = "Angle1: "+angle1+"<br />Angle 2: "+angle2;
        
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

    shotIsGood: function(){
      this.showMake = true;      
      x_from = $(Ball.oBall).position().left;
      y_from = $(Ball.oBall).position().top;
      this.distance = this.setDistance(x_from);
      
      angle = this.getAngle1(x_from);
      length = this.getLength(x_from);
      length2 = 1 - length;
      //return[290, 1.5, 75, 0.4];
      return [angle, length, 75, length2];

      
    },

    getAngle1: function(x_from){
      if(x_from <= 374){
        range_ratio = 5.342;
        return Math.round((x_from/5.342)+260);
      }
    },

    getLength: function(x_from){      
      len = (374/this.distance)*.75;
      console.log(len);
      return len;
    },

    setDistance(x_from){
      return Math.abs(x_from - 374); 
    },

    getAngle2: function(){
      /* distance = x */
    }
}
  