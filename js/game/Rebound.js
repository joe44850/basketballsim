var Rebound = function(){}

Rebound.prototype = {

    callBack : null,
    to: null,

    get : function(callBack){ 
         this.callBack =  callBack;       
         /* 1 in 4 chances for offensive rebound */
         this.whoGetsRebound();
         this.animate();
        
    },

    whoGetsRebound: function(){
        diceRoll1 = random(1,5);
        diceRoll2 = random(6,10);
        let test = true;
        n = random(1,10);
        if(n == diceRoll1 || n == diceRoll2 || test){
             //Teams.setTeams(0);
             this.to = "offensive";
        }
        else{
            n = (Team.teamOnOffense.id == 0) ? 1 : 0;
            Team.setTeamOnOffense(n);
            this.to = "defensive";
        }
        return;
    },

    animate: function(){
        if(this.to == "offensive"){
            this.playerToGetRebound();
            this.getReboundSquare();
            var grid = this.rebounder.onGrid;            
            var xTo = this.getReboundSquare();
            var ballXTo = xTo + 20;
            var yTo = (grid.y + Court.floorStart);
            var ballYTo = (grid.y + Court.floorStart)-30;
            var player_square = "player_"+this.rebounder.id;
            var self = this;
            $("#"+player_square).animate(
                {
                    left:xTo,
                    top:yTo
                },
                {
                    duration:400
                }
            );
            $(Ball.oBall).animate({
                left:ballXTo,
                top:ballYTo
            },{
                duration:400,
                complete: function(){ 
                    grid = Play.getPlayerGridSquare(self.rebounder);
                    Play.givePlayerBall(self.rebounder);
                }
            });    
        }
        else{
            if(this.callBack){ this.callBack();}
        }         
    },

    playerToGetRebound(){  
        //console.log(Teams.onOffense.active);
        obj = Teams.onOffense.active.filter(function(obj){
            return obj.position == "center";
        });  
        this.rebounder = obj[0];
        return obj[0];          
    },

    getReboundSquare(){
        var grid = this.rebounder.onGrid;
        console.log(grid);
        var x;
        var ballPos = Ball.getPosition();        
        if(grid.x > Court.floorHalf){
            x = (ballPos.x - grid.x) / 2;
        }
        else{
            x = (ballPos.x + grid.x) / 2;
        }
        return x;
    },

    getXTo: function(){

    }

}

Rebound = new Rebound;