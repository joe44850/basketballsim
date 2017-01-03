Court = function(){};

Court.prototype = {
  
  init : function(){
    this.getDimensions();
    this.getBasket();
  },
  
  getDimensions : function(){
    this.floorStartX = $("#floor").offset().left;    
    this.floorStart = $("#floor").offset().top;
    this.floorHeight = $("#floor").height() + this.floorStart;
    this.floorWidth = $("#floor").width();     
  },
  
  getBasket : function(){
    this.topAdjust = 45;
    this.leftAdjust = 35;
    //where is the backboard?
    this.backboardLeft = $("#backboard").offset().left;
    this.backboardTop = $("#backboard").offset().top;   
    this.basketCenterLeft = this.backboardLeft + this.leftAdjust;
    this.basketCenterTop = this.backboardTop + this.topAdjust;    
  },
  
  moveNetRight : function(){
    Court.putback = -2;
    $('#net-bottom').css({
     '-moz-transform':'rotate(88deg)',
     '-webkit-transform':'rotate(88deg)',
     '-o-transform':'rotate(88deg)',
     '-ms-transform':'rotate(88deg)',
     'transform':'rotate(88deg)'
    });  
  },
  
  moveNetBack : function(){
    n = Court.putback;
    $('#net-bottom').css({
     '-moz-transform':'rotate('+n+'deg)',
     '-webkit-transform':'rotate('+n+'deg)',
     '-o-transform':'rotate('+n+'deg)',
     '-ms-transform':'rotate('+n+'deg)',
     'transform':'rotate('+n+'deg)'
    });  
  }
  
};

Court = new Court;

