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
      
      angle = this.getAngle1(x_from);
      length = this.getLength(x_from);
      return [angle1, .5, 73, .4];

      if(this.x_from <= 10){
        l = random(.6, .9);              
        return [290, l, 73, .4];
      }     
      if(this.x_from <= 50){
        return [280, .6, 88, .4];
      }
      else if(this.x_from <= 150){
        return [280, random(.4,.8), 100, .4];
      }
      else if(this.x_from <= 200){
        return [280, random(.4,1.2), 100, .5];
      }
      else if(this.x_from <= 250){        
        this.x_to -= 13;
        return [280, random(.8,1.5), 110, .8];
      }
      else if(this.x_from <= 300){        
        this.x_to -= 13;
        return [300, random(1.5,3), 110, 1];
      }
      else if(this.x_from <= 350){        
        this.x_to -= 13;
        this.showMake = false;
        return [320, random(4,6), 110, .3];
      }
      else if(this.x_from <= 370){        
        this.x_to -= 15;
        this.showMake = false;
        return [0, random(8,16), 110, .3];
      }
      else if(this.x_from <= 390){        
        this.x_to -= 17;
        this.showMake = false;
        return [40, random(6,10), 40, .3];
      }
      else if(this.x_from <= 420){        
        this.x_to -= 30;
        this.newLeft = 5;  
        this.showMake = true;      
        l = random(4,5);        
        return [55, l, 40, 1];
      }
      else if(this.x_from <= 440){        
        this.x_to -= 57;
        this.newLeft = 5;  
        this.showMake = true;      
        l = random(2.1, 3); 
        console.log(l);       
        return [60, l, 40, 1];
      }
      else if(this.x_from <= 460){        
        this.x_to -= 65;
        this.newLeft = 0;  
        this.showMake = true;      
        l = random(2.6, 2.8); 
        console.log(l);       
        return [60, l, 40, 1];
      }
      else if(this.x_from <= 480){        
        this.x_to -= 90;
        this.newLeft = -5;  
        this.showMake = true;      
        l = random(2.1, 2.3); 
        console.log(l);       
        return [60, l, 40, 1];
      }
      else if(this.x_from <= 500){        
        this.x_to -= 16;
        this.newLeft = -5;  
        this.showMake = true;      
        l = random(1.7, 2.1); 
        console.log(l);       
        return [60, l, 240, .4];
      }
      else if(this.x_from <= 550){        
        this.x_to -= 16;
        this.newLeft = -5;  
        this.showMake = true;      
        l = random(1.3, 1.8); 
        console.log(l);       
        return [60, l, 247, .4];
      }
      else if(this.x_from <= 600){        
        this.x_to -= 16;
        this.newLeft = -5;  
        this.showMake = true;      
        l = random(.9, 1.5); 
        console.log(l);       
        return [60, l, 247, .4];
      }
      else if(this.x_from <= 650){        
        this.x_to -= 16;
        this.newLeft = -5;  
        this.showMake = true;      
        l = random(.7, 1.3); 
        console.log(l);       
        return [60, l, 247, .4];
      }
      else if(this.x_from <= 700){        
        this.x_to -= 14;
        this.newLeft = -5;  
        this.showMake = true;      
        l = random(.5, 1.1); 
        console.log(l);       
        return [60, l, 247, .4];
      }
      return [280, .6, 88, .4];
    },

    getAngle1: function(x_from){
      if(x_from <= 374){
        range_ratio = 5.342;
        return Math.round(x_from/5.342+290);
      }
    },

    getLength: function(x_from){

    },

    getAngle2: function(){
      /* distance = x */
    }
}
  