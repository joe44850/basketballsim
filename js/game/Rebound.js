var Rebound = function(){}

Rebound.prototype = {

    callBack : null,

    get : function(callBack){ 
         this.callBack =  callBack;       
         /* 1 in 4 chances for offensive rebound */
         if(this.whoGetsRebound() == "offensive"){
             Play.dispatch();
         } 
         else{
            if(callBack){ callBack();}
         }        
        
    },

    whoGetsRebound: function(){
        diceRoll1 = random(1,5);
        diceRoll2 = random(6,10);
        n = random(1,10);
        if(n == diceRoll1 || n == diceRoll2){
             Team.setTeamOnOffense(Team.teamOnOffense.id);
             return "offensive";
        }
        else{
            n = (Team.teamOnOffense.id == 0) ? 1 : 0;
            Team.setTeamOnOffense(n);
            return "defensive";
        }
        
    }

}

Rebound = new Rebound;