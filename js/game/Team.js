var Team = function(){};

Team.prototype = {

  name: "TeamA",
  primaryColor: "#013ADF",
  fontColor: "#FFFF00",
  ready: false,
  imgdir: "/assets/images/players",
  onOffense : 1,
  playerSquares : [],
  _count : 0,

  teams: {
      0: {"id":1, "name": "Boston Celtics"},
      1: {"id":2, "name": "Charlotte Hornets"}
  },

  players: {
      0: {"team":1, id: 0, "name": "Paul Grace", "position":1, "img":"/assets/images/players/team1-01.jpg", "onGrid":null},
      1: {"team":1, id: 1, "name": "Simon Ferris", "position": 0, "img": "/assets/images/players/team1-02.jpg", "onGrid":null},
      2: {"team":1, id: 2, "name": "Steve Gerret", "position": 2, "img": "/assets/images/players/team1-03.jpg", "onGrid":null},
      3: {"team":1, id: 3, "name": "Cleon Carter", "position": 4, "img": "/assets/images/players/team1-04.jpg", "onGrid":null},
      4: {"team":1, id: 4, "name": "Prince Fenton", "position":3, "img": "/assets/images/players/team1-05.jpg", "onGrid":null}
  },

  createPlayers: function(){
      this._count = 0;
      this.removePlayersFromGrid();
          return new Promise(function(resolve){
            for(var i=0; i<5; i++){              
                var player = this.players[i];
                let el = document.createElement("div");
                el.id = "player_"+player.id;
                el.className = "player-container";              
                el.style.left = (random(10,720))+"px";
                el.style.top = (random(700,900))+"px";                          
                var lastname = player.name.match(/\s(.*)/)[0];
                el.innerHTML = "<img src='"+player.img+"'></img>"+
                                "<div class='player-caption'>"+lastname+
                                "</div>";
                Court.oCourt.append(el);
                this.playerSquares.push(el);
            }
            if(i == 5){                  
                return resolve(true);
            }
          }.bind(this));
  },

  removePlayersFromGrid: function(){
       return new Promise(function(resolve){
          Ball.destroy(); 
          for(var key in this.playerSquares){
            el = this.playerSquares[key];
            el.parentNode.removeChild(el);
          }
          this.playerSquares = [];
          return resolve(true);
      }.bind(this));
  },

  setPlayers: function(){     
      return new Promise(function(resolve, reject){
          for(var key in this.players){
             this._count++;
             this._place(this.players[key]);
          }
          debug("#1 players added",true);
          return resolve(true);
      }.bind(this));
  },

  finish: function(){
      return new Promise(function(resolve, reject){
          debug("#2 finished", true);
      }.bind(this));
  },

  _place: function(player){
    var el = document.getElementById("player_"+player.id);
    var pos_number = player.position;   
    this.assignPlayerToGrid(player, pos_number);
    if(position[pos_number].name == "point guard"){ 
        Play.givePlayerBall(this.players[player.id]);
        Ball.startDribble();
    }    
    this.randomGoToSquare(player);
  },

  assignPlayerToGrid: function(player, n){
      /* tempy */
      var zone = position[n].zone;      
      var curZone = zones[zone];      
      var num = random(0, (curZone.squares.length-1));      
      this.players[player.id].onGrid = courtGrid[curZone.squares[num]];
  },

  randomGoToSquare: function(player){
      var el = this.playerSquares[player.id];
      var x = player.onGrid.x;
      var y = player.onGrid.y + Court.floorStart;
      pos = [x, y];
      var pos_number = player.position; 
      if(this._count==5){
          var callBack = (function(){
               Play.dispatch();
          }).bind(Play);
          Play.playerMoves(el, pos, callBack);
      }
      else{
          Play.playerMoves(el, pos);
      }      
  }

}

var Team = new Team;