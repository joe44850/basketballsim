var Play = function(){};

Play.prototype = {

    playerWithBall: null,
    haltAction : false,

    startPossession:function(){
        return new Promise(function(resolve){
            Team.setPlayers().then(()=>{                
                return resolve(true);
            });
        }.bind(this));
        
    },

    dispatch: function(){
        debug("Done setting players", true);
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
    givePlayerBall: function(player){         
        this.playerWithBall = player.id;
        this.playerWithBallSquare = Team.playerSquares[player.id];        
        this.liveSquare = player.onGrid;    
        Ball.create(this.playerWithBallSquare);        
    },

    playerMoves: function(playerSquare, goTo, callBack){
        speed = 2000;
        xTo = goTo[0];
        yTo = goTo[1];
        $(playerSquare).animate({
            "left":xTo+"px",
            "top":yTo+"px"
        },speed, function(){
            if(callBack){ callBack();}
        });
    },

    playerMovesAndShoots(){
        speed = random(1000, 2000);
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
            Shoot.attempt(self.liveSquare);            
        }); 
    },

    /* main offense actions */
    pass: function(){
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
            console.log(Play.liveSquare);            
            Play.liveSquare = player.onGrid;
            Ball.startDribble();
            setTimeout(()=>{
                Ball.stopDribble();
                Shoot.attempt(Play.liveSquare);
            },5000);
            
        });
    },

    

    end: function(){
        debug("Game over");
    }

}

Play = new Play;