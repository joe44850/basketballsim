var Move = function(){}

Move.prototype = {

  prepareForRebound: function(player){    
    square = Grid.getSquareUnderBasket();
    this.go(player, square);
  },

  go: function(player, squareToGoTo, callBack){
    square = squareToGoTo;
    playerDiv = Players.getPlayerDiv(player);    
    y = square.y + Court.floorStart;
    x = square.x;
    $(playerDiv).animate({
      left:x+"px",
      top:y+"px"
    },
    {
      duration:750,
      complete:function(){
        Play.updatePlayerSquare(player, squareToGoTo);
        if(callBack){ callBack();}
      }
    });
  },

  endDummy: function(){}

}

Move = new Move;