var Shoot = function(){}

Shoot.prototype = {
  
  attempt : function(){
    this.shotFromX = $(Ball.oBall).offset().left;
    this.shotFromY = $(Ball.oBall).offset().top;
    this.shotToX = Court.BasketCenterLeft;
    this.shotToY = Court.BasketCenterTop;
    this.shotAttempt();
  },

  shotAttempt : function(){  
      var net = "#rim-center";
      oBall = $(Ball.oBall);
      this.good = true;
      //setup collision animation:
      var hashit = false;
      var hitcount = 0;
      
      yTo = Ball.yTo-50; 
      arc_array = this.getShotArc();
      oBall.animate({"top":yTo+"px"}, function(){     
        top = x_to/2;
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
              //console.log(collides.hits.length);
              if(collides.hits.length==1){ 
                Court.moveNetRight();
                hashit=true; 
                hitcount++;
              }            
            }
            else{
              hitcount++;
              var collides = oBall.overlaps(net);            
              if(hitcount==13){
                oBall.stop();
                newleft = oBall.offset().left+25;
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
        x_from = Ball.xTo;
        y_from = Ball.yTo-50;      
        y_to = Court.basketCenterTop+92;
        x_to = Court.basketCenterLeft+38;
        oMsg = document.getElementById('msgarea');  
        
        angle1 = 280;
        angle2 = 88;
        
        oMsg.innerHTML = "Angle1: "+angle1+"<br />Angle 2: "+angle2;
        
        retval = Array();
        retval['x_from'] = x_from;
        retval['y_from'] = y_from;
        retval['y_to'] = y_to;
        retval['x_to'] = x_to;
        retval['angle1'] = angle1;
        retval['length1'] = .7;
        retval['angle2'] = angle2;
        retval['length2'] = .8;
        return retval;
    }
}
  