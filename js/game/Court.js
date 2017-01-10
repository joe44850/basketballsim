Court = function(){};

Court.prototype = {

  hasRun : false,
  
  init : function(){    
      this.getDimensions();
      this.getBasket();
      this.jCourt = $(document.getElementById("court"));
      this.oCourt = document.getElementById("court"); 
      Scoreboard.create();
      this.createCourtGrid();
      this.createHash();
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
    
  },

  createHash : function(){
    this.hash = new Array();
    var rows = 7;
    cols = 25;
    count = 0;
    for(var r=0; r<rows; r++){
      this.hash[r] = new Array();
      for(var c=0; c<cols; c++){        
        this.hash[r][c] = count;        
        if(count == 167){ break;}       
        count++;        
      }
    }
  },

  createCourtGrid: function(){
    oFloor = document.getElementById("floor");
    var x = 0;
    var y = 0;
    index = 0;
    /* install grid from basket, not from floor */    
    for(var key in courtGrid){
      var grid_item = courtGrid[key];  
      if(index<24){
        height = 90;
        y = Court.floorStart;
      }
      else{
        height = 30;
        y = (Court.floorStart + grid_item.y)+30;
      }
      x = grid_item.x - 30;
      var bgcolor = (bgcolor == "#ccc") ?  "#aaa" : "#ccc";
      
      var el = document.createElement("div");
      el.style.position = "absolute";
      el.style.left = x+"px";
      el.style.top = y+"px";
      el.style.width = "30px";
      el.style.height = height+"px";
      el.style.minWidth = "30px";
      el.style.minHeight = "30px";
      x = grid_item.x - 30;      
      el.style.zIndex = 11; 
      el.innerHTML = grid_item.id;     
      el.id = "grid_"+grid_item.id;
      el.style.visibility = "hidden";
      el.backgroundColor = "green";
      index++;
      Court.oCourt.appendChild(el);     
    }
  }
  
};

Court = new Court;

