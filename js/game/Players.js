var Players = function(){}

Players.prototype = {

  divs: [],
  playing: [],

  createDivs: function(){
    return new Promise(function(resolve){
      for(var i=0; i<2; i++){
        let team = Teams.playing[i];
        var css_style = (Teams.onOffense.id == team.id) ? "offense" : "defense";
        
        player_count = 0;
        console.dir(team);
        for(var c=0; c<team.players.length; c++){          
          var player = team.players[c];
          var left = random(0, 700);
          var top = random(300,600);
          var el = document.createElement("div");
          el.style.top = top+"px";
          el.style.left = left+"px";
          el.className = css_style+"-player-container";          
          var lastname = player.name.match(/\s(.*)/)[0];
          el.innerHTML = "<img src='"+player.img+"'></img>"+
                          "<div class='player-caption' style='color:"+team.primaryColor+"'>"+lastname+
                          "</div>";
          Court.oCourt.append(el);          
          player_count++;
          if(player_count == 5){ break; }
        }
      }
      return resolve(true);
    });
  }

  

}

Players = new Players;