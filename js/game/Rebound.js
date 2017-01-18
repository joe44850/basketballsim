var Rebound = function(){}

Rebound.prototype = {

    callBack : null,
    to: null,
    rebounder: null,

    set: function(){
        this.whoGetsRebound();
        this.playerToGetRebound();        
    },

    get : function(callBack){ 
         this.callBack =  callBack;       
         /* 1 in 4 chances for offensive rebound */
         
         this.animate();        
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

    animate: function(){
        if(this.to == "offensive"){
            this.playerToGetRebound();
            this.getReboundSquare();            
            var grid = this.rebounder.onGrid;            
            var gridTo = this.getReboundSquare();
            Play.updatePlayerSquare(this.rebounder, gridTo);
            var xTo = gridTo.x;
            var ballXTo = gridTo.x + 20;
            var yTo = (gridTo.y + Court.floorStart);
            var ballYTo = (gridTo.y + Court.floorStart)-30;
            var player_square = "player_"+this.rebounder.id;
            var self = this;
            $("#"+player_square).animate(
                {
                    left:xTo,
                    top:yTo
                },
                {
                    duration:1000
                }
            );
            $(Ball.oBall).animate({
                left:ballXTo,
                top:ballYTo
            },{
                duration:1200,
                complete: function(){                    
                    Play.givePlayerBall(self.rebounder).then(()=>{
                        setTimeout(()=>{
                            Play.runPlayLoop(true);
                        },2000);
                    });                    
                }
            });    
        }
        else{
            setTimeout(
                ()=>{
                    Play.possessionSetup();
                },2000
            );
        }         
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
        return player;          
    },

    getReboundSquare(){
        return Grid.getSquareNearBasket();
    },

    getXTo: function(){

    }

}

Rebound = new Rebound;