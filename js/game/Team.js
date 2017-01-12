var Team = function(){};

Team.prototype = {

  name: "TeamA",
  primaryColor: "#013ADF",
  fontColor: "#FFFF00",
  ready: false,
  imgdir: "/assets/images/players",
  onOffense : 1,  
  _count : 0,
  players: [],
  defense_players: [],
  teamOnOffense: null,

  teams: {
      0: {
          id:"0", 
          name: "Bstn Celtics",
          primaryColor:"#129C04",
          players: {
                0: {"team":0, id: 0, "name": "Paul Grace", "position":1, "img":"/assets/images/players/team1-01.jpg", "onGrid":null, sht_pct:22, three_pct: 18, rbd:25},
                1: {"team":0, id: 1, "name": "Simon Ferris", "position": 0, "img": "/assets/images/players/team1-02.jpg", "onGrid":null, sht_pct:44, three_pct: 40, rbd:24},
                2: {"team":0, id: 2, "name": "Steve Gerret", "position": 2, "img": "/assets/images/players/team1-03.jpg", "onGrid":null, sht_pct:41, three_pct: 33, rbd:33},
                3: {"team":0, id: 3, "name": "Cleon Carter", "position": 4, "img": "/assets/images/players/team1-04.jpg", "onGrid":null, sht_pct:58, three_pct: 12, rbd:40},
                4: {"team":0, id: 4, "name": "Prince Fenton", "position":3, "img": "/assets/images/players/team1-05.jpg", "onGrid":null, sht_pct:43, three_pct: 20, rdb:60}
          },
        },
      1: {
          id:"1", 
          name: "Chrlt Hornets",
          primaryColor: "#33D1FF",
          players: {
                0: {"team":1, id: 5, "name": "Miles Davis", "position":1, "img":"/assets/images/players/team2-01.png", "onGrid":null, sht_pct:40, three_pct: 33, rbd:22},
                1: {"team":1, id: 6, "name": "Lymon Jackson", "position": 0, "img": "/assets/images/players/team2-02.png", "onGrid":null, sht_pct:12, three_pct: 10, rbd:25},
                2: {"team":1, id: 7, "name": "Brady Gibbs", "position": 2, "img": "/assets/images/players/team2-03.png", "onGrid":null, sht_pct:32, three_pct: 18, rbd:33},
                3: {"team":1, id: 8, "name": "Andrew Jones", "position": 4, "img": "/assets/images/players/team2-04.png", "onGrid":null, sht_pct:42, three_pct: 18, rbd:55},
                4: {"team":1, id: 9, "name": "Kevin Wick", "position":3, "img": "/assets/images/players/team2-05.png", "onGrid":null, sht_pct:30, three_pct: 9, rbd:50}
          },
      }
  },  

  setTeamOnOffense: function(n){
      this.teamOnOffense = this.teams[n];
      Players.onOffense = this.teams[n].players;            
  },

  setTeamOnDefense: function(){
      var n = (this.teamOnOffense.id==0) ? 1 : 0;
      this.teamOnDefense = this.teams[n];     
      Players.onDefense = this.teamOnDefense.players;     
  },

  createPlayers: function(){
      if(!this.teamOnOffense){ this.setTeamOnOffense(random(1,1));}
      this.setTeamOnDefense();
      this._count = 0;
      Players.removePlayersFromGrid();
          return new Promise(function(resolve){
            for(var i=0; i<5; i++){              
                var player = Players.onOffense[i];
                Players.createOffenseSquare(player);
            }
            for(var i=0; i<5; i++){
                var player = Players.onDefense[i];
                Players.createDefenseSquare(player);
            }
            if(i == 5){                  
                return resolve(true);
            }
          }.bind(this));
  },

  createDefense: function(){

  }, 

  setOffense: function(){     
      return new Promise(function(resolve, reject){
          for(var key in Players.onOffense){
              var player = Players.onOffense[key];              
              this._place(player);
          }
          debug("#1 players added",true);
          return resolve(true);
      }.bind(this));
  },

  setDefense: function(){
      return new Promise(function(resolve){
          for(var key in this.defense_players){              
              this._placeDefense(Players.onDefense[key]);
          }
          debug("#2 defenseplayers added", true);
          return resolve(true);
        }.bind(this)
      )
  },

  finish: function(){
      return new Promise(function(resolve, reject){
          debug("#2 finished", true);
      }.bind(this));
  },

  /* offense stuff */
  _place: function(player){
    var el = document.getElementById("player_"+player.id);
    var pos_number = player.position;   
    this.assignPlayerToGrid(player, pos_number);
    if(position[pos_number].name == "point guard"){ 
        Play.givePlayerBall(player, true);
        //Ball.startDribble();
    }    
    this.randomGoToSquare(player);
  },

  assignPlayerToGrid: function(player, n){
      /* tempy */      
      var zone = position[n].zone;           
      var curZone = zones[zone]; 
      var r = null;     
      var num = random(0, (curZone.squares.length-1)); 

      var count = 0;    
      r = Players.getPlayerKeyById(player.id);
      Players.onOffense[r].onGrid = courtGrid[curZone.squares[num]];
  },

  randomGoToSquare: function(player){     
      var el = Players.offenseSquares[player.id];
      var x = player.onGrid.x;
      var y = player.onGrid.y + Court.floorStart;
      pos = [x, y];
      var pos_number = player.position; 
      if(this._count==5){
          var callBack = (function(){
               Play.dispatch();
          }).bind(Play);
          this._count = 0;
          Play.playerMoves(el, pos, callBack);
      }
      else{
          Play.playerMoves(el, pos);
      } 
      this._count++;     
  },

  getGridFromPlayer(player){
      var oPlayer = document.getElementById("player_"+player.id);      
      var x = ($(oPlayer).position().left);
      var y = $(oPlayer).position().top;
      var x_factor = Math.floor(x/30);
      var y_factor = Math.floor((Court.floorStart-y)/30);
      if(x_factor < 0){ x_factor = 0;}
      if(y_factor < 0){ y_factor = 0;}
      var hash = Court.hash[y_factor][x_factor];      
      return courtGrid[hash];
  },

  updatePlayerSquare(player_id, grid_id){      
      Players.onOffense[player_id].onGrid = grid_id;
  },

  /* defense methods */
  _placeDefense: function(){

  }

}

var Team = new Team;