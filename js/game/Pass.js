var Pass = function(){};

Pass.prototype = {

    attempt: function(player){
        Ball.freeBallFromPlayer(player);
        openPlayer = this.openPlayer(player);
        if(typeof openPlayer === "undefined"){ 
            debug("Undefined...");
            setTimeout(()=>{
                this.attempt(player);
            },1000);            
        }
        var speed = this.getSpeed(openPlayer);
                
        var xTo = openPlayer.onGrid.x+20;
        var yTo = openPlayer.onGrid.y + Court.floorStart;        
        //Ball.pass(openPlayer, xTo, yTo, speed, callBack);
        var oBall = Ball.oBall;
        $(oBall).stop().animate({
            left:xTo+"px",
            top:yTo+"px"
        },
        {
            duration:speed,
            complete:function(){
               Play.givePlayerBall(openPlayer).then(()=>{
                   debug("Passed to "+openPlayer.name, true);
                   Play.runPlayLoop(true);
               });
            }
        });
    },

    openPlayer: function(playerWithBall){
        rand = random(0,4);
        playerOpen = null;
        var i=0;
        for(var key in Teams.onOffense.active){
            if(Teams.onOffense.active[key].id == playerWithBall.id){ continue;}
            if(rand == i){ 
                playerOpen = Teams.onOffense.active[key];
                break;
            }
            i++;
        }
        if(playerOpen==null|| typeof playerOpen === "undefined"){ 
            this.openPlayer(playerWithBall);
        }
        else{ console.dir(playerOpen);return playerOpen;}
    },

    getSpeed: function(openPlayer){
        var ball = $(Ball.oBall);
        var xTotal = Math.abs(openPlayer.onGrid.x - ball.position().left);
        var yTotal = Math.abs(openPlayer.onGrid.y+Court.floorStart - ball.position().top);
        var total = xTotal + yTotal;
        if(total < 200){ return 300;}
        else if(total < 400){ return 400;}
        else if(total < 600){ return 800;}
        else return 1000;
        
    },

    endDummy: function(){}

}

Pass = new Pass;