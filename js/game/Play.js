var Play = function(){};

Play.prototype = {

    playerWithBall: null,
    haltAction : false,
    playSequence: [],
    currentAction: null,

    startPossession:function(){
        return new Promise(function(resolve){
            Team.setPlayers().then(()=>{                
                return resolve(true);
            });
        }.bind(this));
        
    },

    dispatch: function(){
        /* decided what to do */
        var callBack = (function(val){  
            setTimeout(()=>{
                Team.createPlayers();
                this.startPossession(); 
            });      
        }).bind(this);
        this.playerMovesAndShoots(callBack);
    },

    run: function(){
        
    },

    action: function(){
        setTimeout(()=>{                
        if(this.haltAction){
            Ball.stopDribble();
            return resolve(true);
        }
        else{
            this.playerMovesAndShoots();
        }
        },00 );
    },

    liveSquare : null,

    tipOff : function(){
        return new Promise(function(resolve){
          Team.onOffense = 0;   
          debug("Tipoff!");
          return resolve(true);   
        }.bind(this));
    },

    /* this is not a pass, this is if the ref hands the player a ball,
    or during the initial team setup on offense begins */
    givePlayerBall: function(player, dribble){ 
        gridSquare = Team.playerSquares[player.id];       
        this.playerWithBall = player;
        this.playerWithBallSquare = gridSquare;        
        this.liveSquare = player.onGrid;    
        Ball.create(this.playerWithBallSquare); 
        if(dribble){
            Ball.startDribble();
        }                       
    },

    playerMoves: function(playerSquare, goTo, callBack){
        speed = 2000;
        xTo = goTo[0];
        yTo = goTo[1];
        $(playerSquare).animate({
            "left":xTo+"px",
            "top":yTo+"px"
        },
        {
            duration: speed, 
            queue: false,           
            complete: function(){
                if(callBack){ callBack();}
            }
        });
    },

    playerMovesAndShoots(callBack){
        speed = random(1000,2000);
        goToSquare = courtGrid[random(1,167)];
        xTo = goToSquare.x;
        yTo = (goToSquare.y + Court.floorStart);
        self = this;
        $(self.playerWithBallSquare).animate({
            "left":xTo+"px",
            "top": yTo+"px"
        }, speed, function(){
            self.liveSquare = goToSquare;
            self.haltAction=true;
            Ball.stopDribble();            
            Shoot.attempt(self.liveSquare, self.playerWithBall, callBack);            
        }); 
    },

    /* main offense actions */
    pass: function(callBack){
        var t = random(1,3)*1000;
        Ball.stopDribble();
        Ball.freeBallFromPlayer();
        var num = random(0,4);
        player = Team.players[num];
        squareToPassTo = Team.playerSquares[num];
        var x_to = $(squareToPassTo).position().left;
        var y_to = $(squareToPassTo).position().top;
        $(Ball.oBall).animate({
            "left":x_to+"px",
            "top":y_to+"px"
        }, function(){                  
            Play.liveSquare = player.onGrid;
            Ball.startDribble();
            setTimeout(()=>{
                callBack();
            },t);
            
        });
    },

    

    end: function(){
        debug("Game over");
    }

}

Play = new Play;