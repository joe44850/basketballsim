var Rebound = function(){}

Rebound.prototype = {

    callBack : null,
    to: null,
    rebounder: null,
    reboundSquare: null,

    set: function(){
        this.setReboundSquare();
        this.whoGetsRebound();
        this.playerToGetRebound();
        this.movePlayersTowardsBasket();              
    },

    movePlayersTowardsBasket: function(){        
       players = Teams.onDefense.active.filter(function(obj){
           return obj.position == "center" || obj.position == "power forward";
       });      
       for(var key in players){
           if(players[key].id == this.rebounder.id){ continue;}
           Play.playerMoves(players[key], Grid.getSquareNearBasket());
       }
    },

    complete: function(){        
        var player = this.rebounder;
        if(this.to=="defensive"){            
            callBack = (function(){
                Play.givePlayerBall(player);
                Play.changePossession();                
            }).bind(this);
        }
        else{
            callBack = (function(){
                Play.givePlayerBall(player);
                setTimeout(()=>{
                    Play.runPlayLoop(true);
                },250);
            }).bind(this);
        }         
               
        Ball.goToSquare(this.reboundSquare, callBack);        
        
    },

    whoGetsRebound: function(){
        diceRoll1 = random(1,5);
        diceRoll2 = random(6,10);
        let test = true;
        n = random(1,10);
        if(n == diceRoll1 || n == diceRoll2){
             //Teams.setTeams(0);
             this.to = "offensive";
        }
        else{                       
            this.to = "defensive";
        }
        return;
    },    

    playerToGetRebound(){  
        //console.log(Teams.onOffense.active);
        player = null;
        position = "center";        
        team = (this.to == "offensive") ? Teams.onOffense : Teams.onDefense;
        for(var key in team.active){
            player = team.active[key];
            num = player.d_rbd;
            diceRoll = random(1, 100);
            if(diceRoll <= num){ position = player.position;}
        }
        if(!player){
            player = team.filter(function(obj){
                obj.position == "center";
            });
        } 
        this.rebounder = player;
        Move.go(this.rebounder, this.reboundSquare);            
        Play.updatePlayerSquare(this.rebounder, this.reboundSquare); 
        return player;          
    },

    setReboundSquare(){
        this.reboundSquare = Grid.getSquareNearBasket();
    },

    getXTo: function(){

    }

}

Rebound = new Rebound;