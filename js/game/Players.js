var Players = function(){}

Players.prototype = {

  /* actual players from player-json file*/
  onOffense: [],

  onDefense: [],

  /* the divs created that contain player info, including x y coords */
  offenseSquares: [],

  defenseSquares: [],

  createOffenseSquare: function(player){
    let el = document.createElement("div");
        el.id = "player_"+player.id;
        el.className = "player-container";              
        el.style.left = (random(10,720))+"px";
        el.style.top = (random(400,450))+"px";                          
        var lastname = player.name.match(/\s(.*)/)[0];
        el.innerHTML = "<img src='"+player.img+"'></img>"+
                        "<div class='player-caption' style='color:"+Team.teamOnOffense.primaryColor+"'>"+lastname+
                        "</div>";
        Court.oCourt.append(el);
        this.offenseSquares[player.id] = el;
  },

  createDefenseSquare: function(player){
    
    let el = document.createElement("div");
        el.id = "player_"+player.id;
        el.className = "defense-player-container";              
        el.style.left = (random(10,720))+"px";
        el.style.top = (random(400,450))+"px";                          
        var lastname = player.name.match(/\s(.*)/)[0];
        el.innerHTML = "<img src='"+player.img+"'></img>"+
                        "<div class='defense-player-caption' style='color:"+Team.teamOnDefense.primaryColor+"'>"+lastname+
                        "</div>";
        Court.oCourt.append(el);
        this.defenseSquares[player.id] = el;
  },

  removePlayersFromGrid: function(){
       return new Promise(function(resolve){
          Ball.destroy(); 
          for(let key in this.offenseSquares){
            el = this.offenseSquares[key];
            el.parentNode.removeChild(el);
          }
          for(let key in this.defenseSquares){
            el = this.defenseSquares[key];
            el.parentNode.removeChild(el);
          }
          this.offenseSquares = [];
          this.defenseSquares = [];
          return resolve(true);
      }.bind(this));
  },

  getPlayerKeyById(player_id){
    var count = 0;
    for(var key in Players.onOffense){          
        if(Players.onOffense[key].id == player_id){
            return count;            
        }
        count++;
    }
    count = 0;
    for(var key in Players.onDefense){
      if(Players.onOffense[key].id == player_id){
          return count;
      }
      count++;
    }
  }

}

Players = new Players;