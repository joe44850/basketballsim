var Team = function(){};

Team.prototype = {

  name: "TeamA",
  primaryColor: "#013ADF",
  fontColor: "#FFFF00",

  players: {
      0: {"name": "Paul Grace", "position":1},
      1: {"name": "Simon Ferris", "position": 0},
      2: {"name": "Steve Gerret", "position": 2},
      3: {"name": "Cleon Carter", "position": 4},
      4: {"name": "Prince Fenton", "position":3}
  },

  setPlayers: function(){         
      for(var key in this.players){
          this._place(this.players[key]);
      }
      return new Promise(function(resolve, reject){
          setTimeout(()=>{
              alert("OK!");
              resolve(true);
          },2000);
      });
  },

  finish: function(){
      alert("Finished!");
  },

  _place: function(player){
      
  }

}

Team = new Team;