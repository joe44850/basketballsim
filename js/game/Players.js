var Players = function(){}

Players.prototype = {

  divs: [],
  playing: [],

  createDivs: function(){
    Teams.onOffense.active = [];
    Teams.onDefense.active = [];
    return new Promise(function(resolve){
      for(var i=0; i<2; i++){
        let team = Teams.playing[i];
        var status = (Teams.onOffense.id == team.id) ? "offense" : "defense";
        
        player_count = 0;
        for(var c=0; c<team.players.length; c++){          
          var player = team.players[c];
          var left = random(0, 700);
          var top = random(400,600);
          var el = document.createElement("div");
          el.style.top = top+"px";
          el.style.left = left+"px";
          el.id = "player_"+player.id;
          el.className = status+"-player-container";          
          var lastname = player.name.match(/\s(.*)/)[0];
          el.innerHTML = "<img src='"+player.img+"'></img>"+
                          "<div class='player-caption' style='color:"+team.primaryColor+"'>"+lastname+
                          "<br />"+getInitials(player.position)+"</div>";
          Court.oCourt.append(el); 
          if(status == "offense"){
             Teams.onOffense.active[c] = player; 
          }
          else{ Teams.onDefense.active[c] = player; }
               
          player_count++;
          if(player_count == 5){ break; }
        }
      }
      return resolve(true);
    });
  },

  getPlayerDiv(player){
    return document.getElementById('player_'+player.id);
  },

  end: function(){} 

}

Players = new Players;