var Play = function(){};

Play.prototype = {

    testing:true,
    playToRun:0,
    playerWithBall:null,
    offensePlays: {},   
    pass_count: 1,
    _findParameter :null,
    decidedOnPlay: null,

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
        if(this.takeAShot()){
            Shoot.attempt(this.playerWithBall);
        }
        else if(this.makeAPass()){
            this.executePass();
        }   
        else if(this.tryToGetOpen()){

        }
        else{
            var msg = this.playerWithBall.name+" with the ball...";
            Scoreboard.updatePlayAction(msg);
            setTimeout(()=>{
                this.runPlayLoop(true);
            },1000);
        }
        
    },

    takeAShot: function(){   
        if(this.testing){ return false; }     
        var diceRoll = random(0,100);
        var likelyToShoot = 100 - this.playerWithBall.pass;
        if(diceRoll <= likelyToShoot ){
            return true;
        }
        return false;
    },

    makeAPass: function(){ 
        if(this.testing){return true;}
        var playerToPassTo = null;       
        var diceRoll = random(0,100);
        if(diceRoll <= this.playerWithBall.pass){ return true;}        
        else return false;
    },

    executePass: function(){
        console.log("Execute pass!");
        var playerToPassTo = null;
        var currentPlayer = this.playerWithBall;
        var players = Teams.onOffense.active.filter(function(obj){ return obj.id != currentPlayer.id;});
            for(var key in players){
                if(this.isPlayerOpen(players[key])){ 
                    playerToPassTo = players[key];
                    break;
                }
            }
             /* if nobody is open, but the diceroll is pass, pass to somebody not open */
            if(!playerToPassTo){                
                var rand = random(0, (players.length-1));
                playerToPassTo = players[rand];
            }
            console.log(playerToPassTo);
            var callBack = (function(){
                this.givePlayerBall(playerToPassTo);
                this.runPlayLoop(false);
            }).bind(this);
            Ball.throw(playerToPassTo.onGrid, callBack);
    },

    isPlayerOpen: function(player){
        for(var key in Teams.onDefense.active){
            var defensePlayer = Teams.onDefense.active[key];
            var isGuarded = false;
            for(var gridKey in player.onGrid.guarded){
                if(defensePlayer.onGrid == player.onGrid.guarded[gridKey]){ isGuarded = true;} 
            }
            if(!isGuarded){ return true;}
        }
        return false;
    },

    tryToGetOpen: function(){        
        var diceRoll = random(0,100);
        if(diceRoll <= this.playerWithBall.pass){
            return true;
        }
        return false;
    },    

    getOffensePlayersOpen: function(){
        this.offensePlayersOpen = [];
        for(var key in this.defensePlayerSquares){

        }
    },

    missedShotCallback: function(){
        debug("Uh oh, MISSED!", true);
    },

    madeShotCallback: function(){
        debug("Hey, made the shot!");
    },

    getGuardedBy: function(player){         
        
    },

    setupOffense: function(){
        var c = 0;
        /* move players into position, start the offensive play */             
        for(var key in Teams.onOffense.active){
            callBack = null;
            if(c==4){
                callBack = (function(){
                    this.runPlayLoop(true);
                }).bind(this);
            }
            player = Teams.onOffense.active[key];
            this.setPlayerStart(player);
            var zones = this.activeOffensePlay['players-goto-zone'][player.position];
            if(this.activeOffensePlay['initial-player-with-ball'] == player.position){
                this.givePlayerBall(player);
            }
            gridSquare = Grid.getZoneByPosition(player.position);
            Teams.onOffense.active[key].onGrid = gridSquare;
            Teams.setOffenseDivStyle(player);            
            this.playerMoves(player, gridSquare,callBack);
            c++;
        }
        //console.log(Teams.onOffense.active);
        //console.log(this.offensePlayerSquares);
    },

    updatePlayerSquare: function(player, gridSquare){
        if(Teams.onOffense.active[player.id]){
            Teams.onOffense.active[player.id].onGrid = gridSquare;
        }              
        else if(Teams.onDefense.active[player.id]){
            Teams.onDefense.active[player.id].onGrid = gridSquare;
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
            this.playerMoves(player, gridSquare);
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
        this.activeOffensePlay = this.offensePlays[n];        
    },

    getZone: function(zones){

    },

    runOffensivePlay: function(n){
        
    },

    completeOffensivePlay: function(){

    }, 

    givePlayerBall: function(player){
        //console.log(player);
        return new Promise(function(resolve){
            this.playerWithBall = player;
            Ball.create(Players.getPlayerDiv(player));
            Ball.startDribble();
            return resolve(true);
        }.bind(this));
        
    },

    playerMoves: function(player, grid_object, callBack){
        var gotoX = grid_object.x;
        var gotoY = (Court.floorStart + grid_object.y);
        player_div = Players.getPlayerDiv(player);        
        fromY = $(player_div).position().top;
        fromX = $(player_div).position().left;
        distanceY = Math.abs(fromY - gotoY);
        distanceX = Math.abs(fromX - gotoX);        
        if(distanceY>500 || distanceX>500){ speed = 3000;}
        else if(distanceY>400 || distanceX>400){ speed = 2700;}
        else if(distanceY>300 || distanceX>300){ speed = 2600;}
        else if(distanceY>200 || distanceX>200){ speed = 2500;}
        else if(distanceY>100 || distanceX>100){ speed = 1800;}
        else if(distanceY>50 || distanceX>50){ speed = 500;}
        else if(distanceY<50 && distanceX<50){ speed = 250;}
        else speed = 500;        
       
        self = this;
        $(player_div).animate({
            top:gotoY+"px",
            left:gotoX+"px"
        },{
            duration:speed,
            complete: function(){
                self.updatePlayerSquare
                if(callBack){ callBack();}
            }
        });
    },

    classEnd: function(){}


}

Play = new Play;