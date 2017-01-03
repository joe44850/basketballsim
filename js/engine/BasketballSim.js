/*subject to change! */
var BasketballSim = function(){};

BasketballSim.prototype = {
  
  initGame : function(){
    this.cntBody = $("#container-body");
    this.cntMain = $("#container-main");    
    this.cntTop = $("#container-top");
    this.cntMiddle = $("#container-middle");
    this.cntBottom = $("#container-bottom");
    
    this.cntMain.animate({"opacity":1}, function(){
      BB.cntTop.html("<img src='/assets/images/buttons/start-game.png' onclick=\"Match.startMatch();\" />");
      BB.cntTop.animate({"left":"20px"});
    });
  }
  
  
};

BB = new BasketballSim;
BB.initGame();
