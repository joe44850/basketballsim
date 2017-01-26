var Players = function(){}

Players.prototype = {

  divs: [],
  playing: [],

  createDivs: function(){
    Teams.onOffense.active = [];
    Teams.onDefense.active = [];
    this.removePlayerDivs();
    return new Promise(function(resolve){
      for(var i=0; i<2; i++){
        let team = Teams.playing[i];
        var status = (Teams.onOffense.id == team.id) ? "offense" : "defense";
        
        player_count = 0;
        for(var c=0; c<team.players.length; c++){          
          var player = team.players[c];
          var el = document.createElement("div");
          el.id = "player_"+player.id;
          el.className = status+"-player-container";          
          var lastname = player.name.match(/\s(.*)/)[0];
          el.innerHTML = "<img src='"+player.img+"'></img>"+
                          "<div class='player-caption' style='color:"+team.primaryColor+"'>"+lastname+
                          "<br />"+getInitials(player.position)+"</div>";
          Court.oCourt.append(el); 
          this.randomlyPositionPlayer(player);
          if(status == "offense"){
             Teams.onOffense.active[player.id] = player; 
          }
          else{ Teams.onDefense.active[player.id] = player;}
               
          player_count++;
          if(player_count == 5){ break; }
        }
      }
      return resolve(true);
    }.bind(this));
  },

  removePlayerDivs: function(){
    for(var i=0; i<2;i++){
      let team = Teams.playing[i];
      for(var key in team.players){
        player = team.players[key];
        try{
          var el = document.getElementById('player_'+player.id);
          el.remove();
        }
        catch(e){
          
        }
      }
    }
  },

  randomlyPositionPlayer: function(player){
    var left = random(0, 700);
    var top = random(400,600);
    el = document.getElementById('player_'+player.id);    
    el.style.top = top+"px";
    el.style.left = left+"px";
  }, 

  getPlayerByPosition: function(team, position){
    player = team.active.filter(function(obj){
      obj.position == position;
    });
    return player;
  },

  getPlayerDiv: function(player){    
    try{ return document.getElementById('player_'+player.id);}
    catch(e){}
  },

  getCurrentGrid: function(player){
    var playerDiv = this.getPlayerDiv(player);
    var offset = $(playerDiv).offset();
    var x = offset.left;
    var y = offset.top;    
    var currentGrid = getUnderDiv(x, y);
    //console.log(currentGrid);
  },

  playerIsMoving: function(player){
    if(player.gotoGrid && 
       player.gotoGrid.id != player.onGrid){
         return true;
    }
    else return false;
  }, 

  end: function(){} 

}

Players = new Players;