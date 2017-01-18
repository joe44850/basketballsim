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
        Grid.occupied = [];        
        Players.createDivs().then(
            ()=>{
                this.getPlay();  
                this.setupOffense();
                this.setupDefense() 
            }
        );       
                     
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

        }   
        else if(this.tryToGetOpen()){

        }
        else{

        }
        
    },

    takeAShot: function(){        
        var diceRoll = random(0,100);
        var likelyToShoot = 100 - this.playerWithBall.pass;
        if(diceRoll <= likelyToShoot|| this.testing ){
            return true;
        }
        return false;
    },

    makeAPass: function(){        
        var diceRoll = random(0,100);
        if(diceRoll <= this.playerWithBall.pass){
            return true;
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
        var gotoX = grid_object.x+"px";
        var gotoY = (Court.floorStart + grid_object.y)+"px";
        player_div = Players.getPlayerDiv(player);
        base_speed = 3000;
        $(player_div).animate({
            top:gotoY,
            left:gotoX
        },{
            duration:base_speed,
            complete: function(){
                if(callBack){ callBack();}
            }
        });
    },

    classEnd: function(){}


}

Play = new Play;