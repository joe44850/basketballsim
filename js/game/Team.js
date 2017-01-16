var Teams = function(){};

Teams.prototype = {
  
  ready: false,  
  onOffense: null,
  onDefense: null,
  playing: [],
  teamFiles: {
      0: "/assets/data/1.json",
      1: "/assets/data/2.json"
  },
  
  load: function(teamFile){      
      var self = this;
      var res;      
      var res = ajax({
          url:teamFile,
          contentType:"application/json"
      }).then(
          function(data){
              Teams.playing.push(data);
              return new Promise(function(resolve){ return resolve(true);});          
          }
      );  
      return res;    
  },

  setTeams: function(n){
      return new Promise(function(resolve){
        this.onOffense = this.playing[n];
        this.onDefense = (n==1) ? this.playing[0] : this.playing[1];       
        return resolve(true);
      }.bind(this));
      
  },
  
  setOffenseDivStyle: function(player){
    if(!player){
        for(var i=0; i<this.onOffense.active.length;i++){
        var player = this.onOffense.active[i];
        var el = document.getElementById('player_'+player.id);
        el.className = "offense-player-container";
        }
    }
    else{
        var el = document.getElementById('player_'+player.id);
        el.className = "offense-player-container";
    }
  },

  setDefenseDivStyle: function(player){
    if(!player){
        for(var i=0; i<this.onDefense.active.length;i++){
            var player = this.onDefense.active[i];
            var el = document.getElementById('player_'+player.id);
            el.className = "defense-player-container";
        }
    }
    else{
        var el = document.getElementById('player_'+player.id);
        el.className = "defense-player-container";
    }

  },

  endClass: function(){}
  
}

var Teams = new Teams;