function random(min,max){  
  if(min < 1 && max < 1){    
    n = (Math.random() * (max, min)+min).toFixed(4);
    if(n > max){ return max;}
    return n;
  }
  else if(min % 1 !== 0 || max % 1 !==0){    
    n = random(min*10, max*10);    
    n *= .1;
    if(n > max){ n = max;}    
    return n;
  }
  n = Math.floor(Math.random() * (max - min + 1)) + min;
  if(n > max){ return max;}
  return n;
}

function debug(msg, append){
  var el;
  el = document.getElementById('debug');
  if(!el){    
    el = document.createElement('div');
    el.id = 'debug';
    el.innerHTML = "<i></i>";
    document.body.append(el);
  }
  if(append){
    msg = el.innerHTML+"<div>"+msg+"</div>";
  }
  el.innerHTML = "<div>"+msg+"</div>";
}

ajax = function(options){
  return new Promise(function(resolve,reject){
    $.ajax(options)
    .done(resolve)
    .fail(reject)
  });
}

jsonLoader = function(url){
  var res;      
      var res = ajax({
          url:url,
          contentType:"application/json"
      }).then(
          function(data){
              return new Promise(function(resolve){ return resolve(true);});          
          }
      );  
  return res;
}

getInitials = function(str, separator){
  if(!separator){ separator = "";}
  var str_array = str.split(" ");
  var retval = "";
  var reg = new RegExp(/^[a-zA-Z]/);
  for(var i=0; i<str_array.length; i++){
    mystring = str_array[i];

    first_letter = reg.exec(mystring)[0];
    retval+=first_letter+separator;
  }
  return retval;
}

inArray = function(needle, haystack){
  try{    
    for(var i=0; i<haystack.length; i++){
      val = haystack[i];         
      if(needle == val){ return true;}
    }
  }
  catch(e){
    console.log(e);
  }
  return false;
}

getUnderDiv = function(x, y){
      var element, elements = [];
      var old_visibility = [];
      while (true) {
          element = document.elementFromPoint(x, y);          
          if (!element || element === document.documentElement) {
              break;
          }            
          elements.push(element);
          old_visibility.push(element.style.visibility);
          element.style.visibility = 'hidden'; // Temporarily hide the element (without changing the layout)
      }
      for (var k = 0; k < elements.length; k++) {
          elements[k].style.visibility = old_visibility[k];
      }
      elements.reverse();
      let retval = []; 
      for(let i=0; i<elements.length; i++){          
          let el = elements[i];
          console.log(el.id);
          retval.push(el);          
      }  
      //console.dir(retval);     
      return retval[0];
  }


