var Match = function(){};

Match.prototype = {
  inProgress : false,
  timer : 1500,
  counter : 0,
  playOptions: ["pass", "shoot", "dribble", "pass", "dribble", "pass","dribble","pass","shoot"],
  pause: true,

  startMatch : function(){
    this.initMatch();
  },
  
  initMatch : function(){
    BB.cntMain.animate({"opacity":0}, function(){
      //animation complete:
      BB.cntMain.load("/views/match2.html", function(){
        BB.cntMain.css('background-image', 'url(/assets/images/misc/blank.png)');
        BB.cntMain.animate({"opacity":1}, function(){
          Court.init();
        });          
      });      
    });
  },

  play: function(){
    this.count_max = random(1,5);
    this.inProgress = (this.inProgress) ? false : true;
    if(this.inProgress){
      this.inbound();
    }
    else{
      Ball.stopDribble();
    }
  },

  _play : function(){
    this.timer = random(500,2500);
    var n = random(0, this.playOptions.length-1);
    self = this;
    callBack = this.playOptions[n];
    setTimeout(()=>{
      switch(callBack){
        case "dribble":
          console.log("Dribble!");
          self.dribble();
          break;
        case "stopDribble":
          self.stopDribble();
          console.log("Stop");
          break;
        case "shoot":
          console.log("Shooting");
          self.shoot();
          break;
        case "pass":
          console.log("Pass!");
          self.pass();
          break;
      }
    },this.timer);
  },

  shoot : function(){-
    Ball.shoot();
  },

  inbound: function(){
    Ball.inbound();     
    setTimeout(()=>{
      this.dribble();
    }, 500);           
  },

  shotResult: function(make){
    if(make){ alert("Shot made!");}
  },

  pass: function(){
    this.counter++;
    Ball.dribble();
    if(this.counter >= this.count_max){
      this.counter = 0;
      setTimeout(()=>{
        Ball.stopDribble();
        Ball.shoot();
      },1000);      
    }
    else{      
      var passBack = (function(){
        this._passBack();
      }).bind(this);
      setTimeout(()=>{
        Ball.pass(passBack);
      },1500);
    }       
  },

  _passBack : function(){
    this.counter++;
    Ball.dribble();
    var pass = (function(){
      this.pass();
    }).bind(this);
    setTimeout(function(){
      Ball.pass(pass);
    },2500);
  },

  stopDribble: function(){
    this.timer=500;
    Ball.stopDribble();
    setTimeout(()=>{
      this._play();
    }, this.timer);
  },

  dribble: function(){    
    Ball.dribble();
    setTimeout(()=>{
      this.pass();
    }, this.timer);
  },

  rebound: function(){

  }


  
};

Match = new Match;

