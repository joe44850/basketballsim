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
      BB.cntMain.load("/views/match.html", function(){
        BB.cntMain.css('background-image', 'url(/assets/images/misc/blank.png)');
        BB.cntMain.animate({"opacity":1}, function(){
            Court.init();
            Teams.load("/assets/data/team-bstn-celtics.json")
            .then(()=>{ return Teams.load("/assets/data/team-chrl-hornets.json");})            
            .then(()=>{ return Teams.setTeams(random(0,1))})
            .then(()=>{ return Play.loadOffensePlays()})
            .then(()=>{ return Scoreboard.addTeams()})            
        });          
      });      
    });
  },

  createPossession: function(){
    Ball.destroy();    
    //Team.createPlayers().then(()=>{return Play.startPossession()});

  } 
};

Match = new Match;

