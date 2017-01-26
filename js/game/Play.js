var Play = function(){};

Play.prototype = {

    testing:true,
    playToRun:0,
    playerWithBall:null,
    offensePlays: {},   
    pass_count: 0,
    _findParameter :null,
    decidedOnPlay: null,
    interrupt:null,

    loadOffensePlays: function(){      
      var self = this;
      var res;      
      var res = ajax({
          url:"/assets/data/offensive_plays.json",
          contentType:"application/json"
      }).then(
          function(data){              
              self.offensePlays = data.offensive_plays;              
              return new Promise(function(resolve){ return resolve(true);});          
          }
      );  
      return res;
    },

    dispatch: function(){
       debug("Dispatch called"); 
    }, 

    possessionSetup: function(){
        this.pass_count = 0;
        Scoreboard.updatePlayAction(Teams.onOffense.name+" possession...");     
        Grid.occupied = [];        
        Players.createDivs().then(
            ()=>{
                this.getPlay();  
                this.setupOffense();
                this.setupDefense() 
            }
        );     
    },

    changePossession: function(){  
        setTimeout(()=>{
            tempO = Teams.onOffense;
            Teams.onOffense = Teams.onDefense;
            Teams.onDefense = tempO;
            this.possessionSetup();
        },2000);     
        
    },

    /* this loop runs until the ball has been shot, stolen, or play has stopped */
    runPlayLoop: function(playContinues){  
       if(!playContinues){ return false;}
       guardedBy = this.getGuardedBy(this.playerWithBall);
       this.decidedOnPlay = null;
       this.makePlayDecision(guardedBy);       
    },

    makePlayDecision: function(guardedBy){   
        debug(this.interrupt);       
        this.moveOffensivePlayers();
        var playerOpen = this.isPlayerOpen(this.playerWithBall);     
        var timeToThink;
        if(playerOpen){ timeToThink = 50 * (random(1,5));}
        else{ timeToThink = 250 * (random(1,8));} 
        if(this.interrupt){ timeToThink = 10;}
        Move.attemptToGuardPlayer(this.playerWithBall);     
        
        setTimeout(()=>{
            if(this.takeAShot(playerOpen)){
                Shoot.attempt(this.playerWithBall);
            }
            else if(this.makeAPass()){ 
                this.pass_count++;            
                Pass.execute();
            }   
            else if(this.tryToGetOpen()){
                Move.attemptToGetOpen(this.playerWithBall, guardedBy);
            }
            else{
                
                var msg = this.playerWithBall.name+" with the ball...";
                Scoreboard.updatePlayAction(msg);
                setTimeout(()=>{
                    this.runPlayLoop(true);
                },1000);
            }
        }, timeToThink);   
    },

    moveOffensivePlayers: function(){
        if(this.pass_count == 0){ return;}
        var cur = this.activeOffensePlay["players-goto-zone"][this.pass_count];
        if(cur){
            for(var key in cur){
                var player = PlayerPositions.getPlayerByPosition(key, "offense");
                var gridSquare = Grid.getZoneByName(cur[key]);
                Move.go(player, gridSquare);
            }
        }
    },

    takeAShot: function(playerOpen){  
        this.playerWithBall.shootingBonus = 0;
        if(!this.playerWithBall.pass){ this.playerWithBall.pass = 50;} 
        var modifier = 100 - this.playerWithBall.pass;
        if(!playerOpen){ modifier = -30;}          
        var diceRoll = random(0,100);
        if(this.playerWithBall.hotzones){
            for(var key in this.playerWithBall.hotzones){
                if(this.playerWithBall.hotzones[key] == this.playerWithBall.onGrid.sector){
                    console.log("player likes this area!");
                    modifier+=15;
                    this.playerWithBall.shootingBonus = 15;
                }
            }
        }   
        if(this.interrupt=="shoot"){ return true;}

        var likelyToShoot = (this.pass_count * 5)+modifier;            
        if(diceRoll <= likelyToShoot ){
            return true;
        }
        return false;
    },

    makeAPass: function(){
        if(Ball.isMoving){ return false}; 
        var bonus = 0;
        switch(this.pass_count){
            case 0:
            bonus = 25;
            break;

            case 1:
            bonus = 10;
            break;

            default:
            break;
        }
        var likelyToPass = this.playerWithBall.pass + bonus;            
        var playerToPassTo = null;       
        var diceRoll = random(0,100);
        if(diceRoll <= this.playerWithBall.pass){ return true;}        
        else return false;
    },

    isPlayerOpen: function(thisPlayer){
        for(var key in Teams.onDefense.active){
            var defensePlayer = Teams.onDefense.active[key];            
            for(var gridKey in thisPlayer.onGrid.guarded){
                if(defensePlayer.onGrid.id == thisPlayer.onGrid.guarded[gridKey]){ return false;} 
            }
        }
        return true;
    },

    tryToGetOpen: function(isOpen){ 
        if(isOpen){ return false;}       
        var diceRoll = random(0,100);
        if(diceRoll <= this.playerWithBall.move+20){
            return true;
        }
        return false;
    },    

    getOffensePlayersOpen: function(){
        this.offensePlayersOpen = [];
        for(var key in this.defensePlayerSquares){

        }
    }, 

    movePlayerWithoutBall: function(){

    },

    getGuardedBy: function(player){         
        
    },

    setupOffense: function(){
        var c = 0;
        /* move players into position, start the offensive play */             
        for(var key in Teams.onOffense.active){
            var gridSqare = null;
            callBack = null;
            if(c==4){
                callBack = (function(){
                    this.runPlayLoop(true);
                }).bind(this);
            }
            player = Teams.onOffense.active[key];
            this.setPlayerStart(player);
            var zoneName = this.activeOffensePlay['players-goto-zone'][0][player.position];
            if(this.activeOffensePlay['initial-player-with-ball'] == player.position){
                this.givePlayerBall(player);
            }
            if(!zoneName){
                gridSquare = Grid.getZoneByPosition(player.position);                
            }
            else{
                gridSquare = Grid.getZoneByName(zoneName);                
            }
            Teams.onOffense.active[key].onGrid = gridSquare;
            Teams.setOffenseDivStyle(player);            
            Move.go(player, gridSquare,callBack);
            c++;
        }
        //console.log(Teams.onOffense.active);
        //console.log(this.offensePlayerSquares);
    },

    updatePlayerSquare: function(player, gridSquare){
        if(Teams.onOffense.active[player.id]){
            Teams.onOffense.active[player.id].onGrid = gridSquare;
            Teams.onOffense.active[player.id].gotoGrid = null;
        }              
        else if(Teams.onDefense.active[player.id]){
            Teams.onDefense.active[player.id].onGrid = gridSquare;
            Teams.onDefense.active[player.id].gotoGrid = null;
        }
    }, 

    updatePlayerGotoSquare: function(player, gridSquare){        
        if(Teams.onOffense.active[player.id]){
            Teams.onOffense.active[player.id].gotoGrid = gridSquare;
        }              
        else if(Teams.onDefense.active[player.id]){
            Teams.onDefense.active[player.id].gotoGrid = gridSquare;
        }
        
    },   

    setupDefense: function(){
        for(var key in Teams.onDefense.active){
            player = Teams.onDefense.active[key];
            this.setPlayerStart(player);             
            _findParameter = player.position;            
            var _object = Teams.onOffense.active.filter(function(obj){                                            
                return obj.position === _findParameter;
            });
            playerToGuardGrid = _object[0].onGrid;                
            gridSquare = Grid.getGuardSquare(playerToGuardGrid, player); 
            Teams.setDefenseDivStyle(player);
            Teams.onDefense.active[key].onGrid = gridSquare;
            Move.go(player, gridSquare);
        }
    },

    setPlayerStart: function(player){
        if(!player){return;}
        try{
            player_div = Players.getPlayerDiv(player);
            player_div.style.left = random(0,700)+"px";
            player_div.style.top = random(400, 600)+"px";
        }
        catch(e){

        }
        
    },

    getPlay: function(){
        var n = this.offensePlays.length-1;
        var r = random(0, n);
        this.activeOffensePlay = this.offensePlays[r];        
    },

    getZone: function(zones){

    },

    runOffensivePlay: function(n){
        
    },

    completeOffensivePlay: function(){

    }, 

    givePlayerBall: function(player, callBack){
        //console.log(player);
        return new Promise(function(resolve){
            this.playerWithBall = player;
            Ball.create(Players.getPlayerDiv(player));
            Ball.startDribble();
            if(callBack){
                setTimeout(()=>{
                    callBack();
                },200);
            }
            return resolve(true);
        }.bind(this));
        
    },  

    setInterrupt(cmd){
        this.interrupt = cmd;
    },

    classEnd: function(){}


}

Play = new Play;