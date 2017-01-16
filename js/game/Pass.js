var Pass = function(){};

Pass.prototype = {

    attempt: function(player){
        Ball.freeBallFromPlayer(player);
    }

}