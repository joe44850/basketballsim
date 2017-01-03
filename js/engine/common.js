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


