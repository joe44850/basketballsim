var Scoreboard = function(){};

Scoreboard.prototype = {

    scoreElements : [],

    create: function(){
        var el = document.createElement("div");
        el.id = "scoreboard";
        el.innerHTML = "<div id='scoreboard'>"+ 
                            "<div>"+
                                "<span id='team1' class='team-score-name' style='color:"+Team.teams[0].primaryColor+
                                "'>"+Team.teams[0].name+"</span>"+
                                "<span id='teamscore_1' class='digital-score'>0</span>"+
                            "</div>"+
                            "<div>"+
                                "<span id='team2' class='team-score-name' style='color:"+Team.teams[1].primaryColor+
                                "'>"+Team.teams[1].name+"</span>"+   
                                "<span id='teamscore_2' class='digital-score'>0</span>"+                            
                            "</div>"+
                        "</div>";
        Court.oCourt.appendChild(el);
        this.scoreElements[0] = document.getElementById('teamscore_1');
        this.scoreElements[1] = document.getElementById('teamscore_2');        
    },

    update: function(score, teamid){
        currentScore = parseInt(this.scoreElements[teamid].innerHTML);
        score += currentScore;
        this.scoreElements[teamid].innerHTML = score;
    }

}

Scoreboard = new Scoreboard;