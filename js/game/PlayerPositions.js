var Positions = function(){};

Positions.prototype = {

    types: {
        "point guard": { "squares":[], "initial":[{"min":126, "max":137},{"min":151,"max":152}]},
        "shooting guard": { "squares": [], "initial":[{"min":72, "max":78},{"min":88,"max":95},{"min":96, "max":119},{"min":120,"max":143}]},
        "power forward": { "squares": [], "initial":[{"min":30, "max":42},{"min":54,"max":65},{"min":78,"max":88}]},
        "center": {"squares":[], "initial":[{"min":33, "max":40},{"min":57,"max":64},{"min":88,"max":64}]},
        "small forward": {"squares":[], "initial":[{"min":72, "max":78},{"min":88,"max":95},{"min":96, "max":119},{"min":120,"max":143}]}
    },

    getSquaresByPosition: function(position){
        return new Promise(function(resolve){

        });
    }

}