Court = function(){};

Court.prototype = {

  hasRun : false,
  
  init : function(){    
      this.getDimensions();
      this.getBasket();
      this.jCourt = $(document.getElementById("court"));
      this.oCourt = document.getElementById("court"); 
      Scoreboard.create();
      return new Promise(function(resolve, reject){     
      if(this.createZoneMatrix()){
          return resolve(true);
        }
      }.bind(this));
    
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
  },

  createZoneMatrix: function(){ 
    return new Promise(function(resolve, reject){
      for(var key in zones){
        zone = zones[key];
        min_x = zone.x[0] - 1;
        max_x = zone.x[1] - 1;
        min_y = zone.y[0] - 1;
        max_y = zone.y[1] - 1;
        var sql = "select id from courtGrid where (x > "+min_x+" && x < "+max_x+" && y > "+min_y+" && y < "+max_y+")";
        res = jsonsql.query(sql, courtGrid);      
        for(var res_key in res){
          zones[key]["squares"].push(res[res_key].id);
        }
      }
      console.log("#1 Initialize court");
      this.hasRun = true;      
    });  
    
  }
  
};

Court = new Court;

