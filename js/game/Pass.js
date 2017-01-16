var Pass = function(){};

Pass.prototype = {

    attempt: function(player){
        Ball.freeBallFromPlayer(player);
        openPlayer = this.openPlayer(player);
        var speed = random(300, 500);
        console.log(openPlayer);  
        var callBack = (function(){

        })   
        var xTo = openPlayer.onGrid.x+20;
        var yTo = openPlayer.onGrid.y + Court.floorStart;   
        Ball.pass(openPlayer, xTo, yTo, speed);
    },

    openPlayer: function(playerWithBall){
        rand = random(0,4);
        playerOpen = null;
        var i=0;
        for(var key in Teams.onOffense.active){
            if(Teams.onOffense.active[key] == playerWithBall.id){ continue;}
            if(rand == i){ return Teams.onOffense.active[key]};
            i++;
        }
        if(!player){ this.openPlayer(playerWithBall);}
    },

    endDummy: function(){}

}

Pass = new Pass;