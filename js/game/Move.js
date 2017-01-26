var Move = function(){}

Move.prototype = {

  prepareForRebound: function(player){    
    square = Grid.getSquareUnderBasket();
    this.go(player, square);
  },

  go: function(player, squareToGoTo, callBack){
    Play.updatePlayerGotoSquare(player, squareToGoTo);
    var square = squareToGoTo;        
    var playerDiv = Players.getPlayerDiv(player);    
    var y = square.y + Court.floorStart;
    var x = square.x;
    var speed = this.getSpeed(player, square);    
    $(playerDiv).animate({
      left:x+"px",
      top:y+"px"
    },
    {
      duration:speed,
      complete:function(){ 
        Play.updatePlayerSquare(player, square);       
        if(callBack){ callBack();}
      }
    });
  },

  getSpeed: function(player, squareToGoTo){
    if(!player.speed){ player.speed = 40;}
    player.speed = 50;
    var speed = 800;
    var [distanceX, distanceY] = this.getDistance(player, squareToGoTo);
    var slow_modifier = (100 - player.speed)*35;    
    if(distanceY>500 || distanceX>500){ speed = 2000;}
    else if(distanceY>400 || distanceX>400){ speed = 2000;}
    else if(distanceY>300 || distanceX>300){ speed = 1400;}
    else if(distanceY>200 || distanceX>200){ speed = 1200;}
    else if(distanceY>100 || distanceX>100){ speed = 500; slow_modifier=500;}
    else if(distanceY>50 || distanceX>50){ speed = 200; slow_modifier=500;}
    else if(distanceY<50 && distanceX<50){ speed = 100; slow_modifier=500;}    
    speed+=slow_modifier;
    return speed;
  },

  getDistance: function(player, squareToGoTo){
        var gotoX = squareToGoTo.x;
        var gotoY = (Court.floorStart + squareToGoTo.y);
        var player_div = Players.getPlayerDiv(player);        
        var fromY = $(player_div).position().top;
        var fromX = $(player_div).position().left;
        var distanceY = Math.abs(fromY - gotoY);
        var distanceX = Math.abs(fromX - gotoX);
        return [distanceX,distanceY];
  },

  attemptToGetOpen: function(player){
    var goToGrid = Grid.getSquareInSector(player.onGrid);
    var callBack = (function(){
      Play.runPlayLoop(true);
    }).bind(this);
    this.go(Play.playerWithBall, goToGrid, callBack);
    this.attemptToGuardPlayer(player);
  },

  attemptToGuardPlayer(playerToGuard){
    var guardedBy = PlayerPositions.getPlayerByPosition(playerToGuard.position, "defense");
    var goToGrid = (playerToGuard.gotoGrid) || playerToGuard.onGrid;
    var squareToGoTo = Grid.getGuardSquare(goToGrid, guardedBy);
    // console.log("goto grid: "+goToGrid);
    var delay = 0;
    var playerSpeed = (player.speed) || 50;
    var guardedBySpeed = (guardedBy.speed) || 50;
    if(playerSpeed > guardedBySpeed){
      delay = 0;
    }
    setTimeout(()=>{
      Move.go(guardedBy, squareToGoTo);
    },delay);
  },

  endDummy: function(){}

}

Move = new Move;