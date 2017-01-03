var Match = function(){};

Match.prototype = {
  
  startMatch : function(){
    this.initMatch();
  },
  
  initMatch : function(){
    BB.cntMain.animate({"opacity":0}, function(){
      //animation complete:
      BB.cntMain.load("/views/match2.html", function(){
        BB.cntMain.css('background-image', 'url(/assets/images/misc/blank.png)');
        BB.cntMain.animate({"opacity":1}, function(){
          Court.init();
        });          
      });      
    });
  }
  
};

Match = new Match;

