Court = function(){};

Court.prototype = {
  
  init : function(){
    this.getDimensions();
    this.getBasket();
    this.jCourt = $(document.getElementById("court"));
    this.oCourt = document.getElementById("court");
  },
  
  getDimensions : function(){
    this.floorStartX = $("#floor").position().left;    
    this.floorStart = $("#floor").offset().top-50;    
    this.floorHeight = $("#floor").height() + this.floorStart;
    this.floorWidth = $("#floor").width();  
    this.floorHalf = this.floorWidth/2;   
  },
  
  getBasket : function(){
    this.topAdjust = 45;
    this.leftAdjust = 35;
    //where is the backboard?
    this.backboardLeft = $("#backboard").position().left;
    this.backboardTop = $("#backboard").position().top;   
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

  moveNetLeft : function(){
    Court.putback = -2;
    $('#net-bottom').css({
     '-moz-transform':'rotate(300deg)',
     '-webkit-transform':'rotate(300deg)',
     '-o-transform':'rotate(300deg)',
     '-ms-transform':'rotate(300deg)',
     'transform':'rotate(300deg)'
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

