var Scoreboard = function(){};

Scoreboard.prototype = {

    scoreElements : [], 
    teamNameElements: [],   

    create: function(){
        var el = document.createElement("div");
        el.id = "scoreboard";
        el.innerHTML = "<div id='scoreboard'>"+ 
                            "<div id='scoreboard-action'>"+
                            "Info..."+
                            "</div>"+
                            "<div>"+
                                "<span id='team0' class='team-score-name'></span>"+
                                "<span id='teamscore_0' class='digital-score'>0</span>"+
                            "</div>"+
                            "<div>"+
                                "<span id='team1' class='team-score-name'></span>"+   
                                "<span id='teamscore_1' class='digital-score'>0</span>"+                            
                            "</div>"+                            
                        "</div>";
        Court.oCourt.appendChild(el);
        this.scoreElements[0] = document.getElementById('teamscore_0');
        this.scoreElements[1] = document.getElementById('teamscore_1'); 
        this.teamNameElements[0] = document.getElementById('team0');
        this.teamNameElements[1] = document.getElementById('team1');      
    },

    update: function(score, teamid){
        currentScore = parseInt(this.scoreElements[teamid].innerHTML);
        score += currentScore;
        this.scoreElements[teamid].innerHTML = score;
    },

    updatePlayAction: function(msg){
        $("#scoreboard-action").animate({
            opacity:0
        },{
            duration:250,
            complete(){
                $(this).html(msg);
                $(this).animate({opacity:1}, 250);
            }
        });
    },

    addTeams: function(){
        return new Promise(
            function(resolve){
                this.teamNameElements[0].style.color = Teams.playing[0].text_color;
                this.teamNameElements[1].style.color = Teams.playing[1].text_color;
                this.teamNameElements[0].innerHTML = Teams.playing[0].city+" "+Teams.playing[0].name;
                this.teamNameElements[1].innerHTML = Teams.playing[1].city+" "+Teams.playing[1].name;
                return resolve(true);
            }.bind(this)
        );     
    },

    scoreDialogue: function(){
        msg = Play.playerWithBall.name+" "+Play.playerWithBall.onGrid.description;
        this.updatePlayAction(msg);
    },

    dummy: null

}

Scoreboard = new Scoreboard;