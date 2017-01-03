var GameLoader = function(){};
var BASEURL = getBaseURL();

GameLoader.prototype = {
  loadGameFiles: function() {
    this.getFiles();
  },
  cb_loadGameFiles: function(data) {
    var JSonObject = JSON.parse(data);  
    var head = document.getElementsByTagName("head")[0];
    var scripthtml = "";
    var d = new Date();
    var n = d.getTime();
    for(i=0;i<JSonObject.files.length;i++){
      var col = JSonObject.files[i];
      var filename = col["file"];
      
      var type = col["type"];
      if(type=="js"){
        var script = document.createElement("script");
        script.type="text/javascript";         
        script.src=filename+"?d="+n;
        script.async = false;
        head.appendChild(script);
      }
      else if(type=="css"){
        var link = document.createElement("link");
        link.href=filename+"?d="+n;
        link.rel="stylesheet";
        link.async = false;
        link.type="text/css";
        head.appendChild(link);
      }
      //scripthtml = "<script type='text/javascript' src='"+filename+"'></script>";
      //head.innerHTML+=scripthtml;
      
    };    
       
  },
  getFiles: function() {
    var data_file = BASEURL + "js/engine/gamefiles.json";
    Ajax.getPageContents(data_file, this.cb_loadGameFiles);
  },
  initGame : function(){
    BasketballSim = new BasketballSim();
  }

};

function getBaseURL() {
  var url = location.href;  // entire url including querystring - also: window.location.href;
  var baseURL = url.substring(0, url.indexOf('/', 14));

  if (baseURL.indexOf('http://localhost') != -1) {
    return baseURL + "/";
    // Base Url for localhost
    var url = location.href;  // window.location.href;
    var pathname = location.pathname;  // window.location.pathname;
    var index1 = url.indexOf(pathname);
    var index2 = url.indexOf("/", index1 + 1);
    var baseLocalUrl = url.substr(0, index2);
    return  baseLocalUrl + "/";
  }
  else {
    // Root Url for domain name
    return  baseURL + "/";
  }
}

var Ajax = {
  getPageContents: function(url, callBack) {
    var http_request = new XMLHttpRequest();
    try {
      // Opera 8.0+, Firefox, Chrome, Safari
      http_request = new XMLHttpRequest();
    } catch (e) {
      // Internet Explorer Browsers
      try {
        http_request = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          http_request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          // Something went wrong
          alert("Your browser broke!");
          return false;
        }
      }
    }
    http_request.onreadystatechange = function() {
      if (http_request.readyState == 4) {
        // Javascript function JSON.parse to parse JSON data
        if (typeof callBack != "undefined") {
          var data = http_request.responseText;
          callBack(data);
        }
      }
    };
    http_request.open("GET", url, true);
    http_request.send();
  }

};

//create new game

