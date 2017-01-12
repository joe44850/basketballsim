var Play = function(){};

Play.prototype = {

    dispatch: function(){
       debug("Dispatch called"); 
    }, 

    possessionSetup: function(){
        this.setupOffense();
        this.setupDefense();
    },

    possessionRun: function(){

    },

    setupOffense: function(){
        /* move players into position, start the possessionRun */
    },

    setupDefense: function(){

    },

    givePlayerBall: function(){

    },

    playerMoves: function(){

    },



}

Play = new Play;