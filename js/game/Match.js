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

  createPossession: function(){
    Team.createPlayers().then(()=>{return Play.startPossession()});

  } 
};

Match = new Match;

