var Pass = function(){};

Pass.prototype = {

    execute: function(){        
        var playerToPassTo = null;
        var currentPlayer = Play.playerWithBall;
        var players = Teams.onOffense.active.filter(function(obj){ return obj.id != currentPlayer.id;});
            for(var key in players){
                if(Play.isPlayerOpen(players[key])){                 
                    playerToPassTo = players[key];
                    if(Players.playerIsMoving(playerToPassTo)){                         
                        continue;
                    }
                    else{
                        
                    }
                    Scoreboard.updatePlayAction("Pass to "+playerToPassTo.name+ "(open)");
                    break;
                }
            }
             /* if nobody is open, but the diceroll is pass, pass to somebody not open */
            if(!playerToPassTo){
                while(true){
                    var rand = random(0, (players.length-1));
                    playerToPassTo = players[rand];
                    if(Players.playerIsMoving(playerToPassTo)){
                        continue;
                    }
                    else{
                        Scoreboard.updatePlayAction("Passing to "+playerToPassTo.name+" in traffic");
                        break;
                    }                    
                }               
            }
            
            var callBack = (function(){                
                Play.runPlayLoop(true);
            }).bind(this);
            Ball.throwToPlayer(playerToPassTo, callBack);
    },    

    endDummy: function(){}

}

Pass = new Pass;