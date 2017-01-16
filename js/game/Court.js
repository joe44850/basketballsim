Court = function(){};

Court.prototype = {

  hasRun : false,
  gridContainer: null,
  floorStart: null,
  floorStartx: null,
  floorHeight: null,
  floorWidth: null,
  
  init : function(){    
      this.getDimensions();
      this.getBasket();
      this.jCourt = $(document.getElementById("court"));
      this.oCourt = document.getElementById("court"); 
      Scoreboard.create();
      this.createCourtGrid();
      this.createHash();
      return new Promise(function(resolve, reject){     
          return resolve(true);
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
 
  createHash : function(){
    this.hash = new Array();
    this.gridHash = new Array();
    var rows = 7;
    cols = 25;
    count = 0;
    for(var r=0; r<rows; r++){
      this.hash[r] = new Array();
      for(var c=0; c<cols; c++){        
        this.hash[r][c] = count;
        this.gridHash[count] = new Array(r,c);        
        if(count == 167){ break;}       
        count++;        
      }
    }
  },

  getAdjacentSquares(gridsquare){

  },

  createCourtGrid: function(){
    oFloor = document.getElementById("floor");
    var x = 0;
    var y = 0;
    index = 0;
    /* install grid from basket, not from floor */ 
    var el = document.createElement("div");
    el.id = "grid-container";
    el.style.position = "absolute";
    el.style.top = "140px";
    el.style.left = 0;
    el.style.visibility = "hidden";
    el.style.zIndex = 10;
    el.style.width=800;
    el.style.height=500;
    el.style.opacity = ".5";
    el.style.border="1px solid red";
    Court.oCourt.appendChild(el);
    this.gridContainer = el;

    for(var key in courtGrid){
      var grid_item = courtGrid[key];  
      if(index<24){
        height = 90;
        y = 0;
      }
      else{
        height = 30;
        y = grid_item.y+30;
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
      el.style.border = "1px solid #eee";
      el.style.fontSize = ".5em";
      x = grid_item.x - 30;      
      el.style.zIndex = 11; 
      el.innerHTML = grid_item.id;     
      el.id = "grid_"+grid_item.id;
      
      el.backgroundColor = "green";
      index++;
      this.gridContainer.appendChild(el);     
    }
  },

  showGrid: function(){
    var vis = this.gridContainer.style.visibility;
    vis = (vis=="hidden") ? "visible" : "hidden";
    this.gridContainer.style.visibility = vis;
  }
  
};

Court = new Court;

