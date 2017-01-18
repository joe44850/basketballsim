var Move = function(){}

Move.prototype = {

  prepareForRebound: function(player){    
    square = Grid.getSquareUnderBasket();
    this.go(player, square);
  },

  go: function(player, squareToGoTo){
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
      }
    });
  },

  endDummy: function(){}

}

Move = new Move;