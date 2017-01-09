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
  players: [],
  teamOnOffense: null,

  teams: {
      0: {
          id:"0", 
          name: "Bstn Celtics",
          primaryColor:"#129C04",
          players: {
                0: {"team":0, id: 0, "name": "Paul Grace", "position":1, "img":"/assets/images/players/team1-01.jpg", "onGrid":null, sht_pct:52, three_pct: 48},
                1: {"team":0, id: 1, "name": "Simon Ferris", "position": 0, "img": "/assets/images/players/team1-02.jpg", "onGrid":null, sht_pct:44, three_pct: 40},
                2: {"team":0, id: 2, "name": "Steve Gerret", "position": 2, "img": "/assets/images/players/team1-03.jpg", "onGrid":null, sht_pct:41, three_pct: 33},
                3: {"team":0, id: 3, "name": "Cleon Carter", "position": 4, "img": "/assets/images/players/team1-04.jpg", "onGrid":null, sht_pct:58, three_pct: 12},
                4: {"team":0, id: 4, "name": "Prince Fenton", "position":3, "img": "/assets/images/players/team1-05.jpg", "onGrid":null, sht_pct:43, three_pct: 20}
          },
        },
      1: {
          id:"1", 
          name: "Chrlt Hornets",
          primaryColor: "#33D1FF",
          players: {
                0: {"team":1, id: 0, "name": "Miles Davis", "position":1, "img":"/assets/images/players/team2-01.png", "onGrid":null, sht_pct:40, three_pct: 33},
                1: {"team":1, id: 1, "name": "Lymon Jackson", "position": 0, "img": "/assets/images/players/team2-02.png", "onGrid":null, sht_pct:52, three_pct: 50},
                2: {"team":1, id: 2, "name": "Brady Gibbs", "position": 2, "img": "/assets/images/players/team2-03.png", "onGrid":null, sht_pct:32, three_pct: 18},
                3: {"team":1, id: 3, "name": "Andrew Jones", "position": 4, "img": "/assets/images/players/team2-04.png", "onGrid":null, sht_pct:42, three_pct: 18},
                4: {"team":1, id: 4, "name": "Kevin Wick", "position":3, "img": "/assets/images/players/team2-05.png", "onGrid":null, sht_pct:30, three_pct: 9}
          },
      }
  },  

  setTeamOnOffense: function(n){
      this.teamOnOffense = this.teams[n];
      this.players = this.teams[n].players;      
  },

  setDefenseTeam: function(){

  },

  createPlayers: function(){
      if(!this.teamOnOffense){ this.setTeamOnOffense(0);}
      this._count = 0;
      this.removePlayersFromGrid();
          return new Promise(function(resolve){
            for(var i=0; i<5; i++){              
                var player = this.players[i];
                let el = document.createElement("div");
                el.id = "player_"+player.id;
                el.className = "player-container";              
                el.style.left = (random(10,720))+"px";
                el.style.top = (random(400,450))+"px";                          
                var lastname = player.name.match(/\s(.*)/)[0];
                el.innerHTML = "<img src='"+player.img+"'></img>"+
                                "<div class='player-caption' style='color:"+this.teamOnOffense.primaryColor+"'>"+lastname+
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
        //Ball.startDribble();
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