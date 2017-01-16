var Play = function(){};

Play.prototype = {

    testing:true,
    playToRun:0,
    playerWithBall:null,
    offensePlays: {},   
    pass_count: 1,
    _findParameter :null,

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
       this.makePlayDecision(guardedBy);       
       this.runPlayLoop(false);
    },

    makePlayDecision: function(guardedBy){
        player = this.playerWithBall;        
        var shootBonus = this.pass_count * 5;
        var likelyToMove = player.move;
        var likelyToPass = player.pass;
        var likelyToShoot = 100 - likelyToPass;
        
        /* will player shoot the ball ? */
        //if(!guardedBy){ likelyToShoot+=20}
        diceRoll = random(90, 100);
        if(diceRoll <= likelyToShoot){
            wait = random(10,1000);            
            setTimeout(()=>{  
                Ball.stopDribble();
                Shoot.attempt(player);
            },wait);            
        } 

        /* will player pass the ball ? */
        diceRoll = random(0,100);
        if(this.testing){
            console.log("Should pass...");
            wait = random(10,1000);
            setTimeout(()=>{
                Ball.stopDribble();
                Pass.attempt(player);
            },wait);
        }
    },

    getOffensePlayersOpen: function(){
        this.offensePlayersOpen = [];
        for(var key in this.defensePlayerSquares){

        }
    },

    getGuardedBy: function(player){         
        
    },

    setupOffense: function(){
        /* move players into position, start the offensive play */             
        for(var key in Teams.onOffense.active){
            player = Teams.onOffense.active[key];
            this.setPlayerStart(player);
            var zones = this.activeOffensePlay['players-goto-zone'][player.position];
            if(this.activeOffensePlay['initial-player-with-ball'] == player.position){
                this.givePlayerBall(player);
            }
            gridSquare = Grid.getZoneByPosition(player.position);
            Teams.onOffense.active[key].onGrid = gridSquare;
            Teams.setOffenseDivStyle(player);            
            this.playerMoves(player, gridSquare);
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
        this.playerWithBall = player;
        Ball.create(Players.getPlayerDiv(player));
        Ball.startDribble();
    },

    playerMoves: function(player, grid_object){
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

            }
        });
    },

    classEnd: function(){}


}

Play = new Play;