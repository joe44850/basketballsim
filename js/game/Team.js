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
        console.log("Set teams: "+this.onOffense+" "+this.onDefense);
        return resolve(true);
      }.bind(this));
      
  },

  setPlayers: function(){

  } 
  
}

var Teams = new Teams;