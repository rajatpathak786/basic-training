function flatten(unflatObject) {
  const toReturn = {};      
  for (let i in unflatObject) {                            
    if (typeof unflatObject[i] == 'object' ) { 	               
      const flatObject = flatten(unflatObject[i]);    
      for (let x in flatObject) {
	toReturn[i + '.' + x] = flatObject[x];                 
      }

    } else {             
        toReturn[i] = unflatObject[i];  
      }

  }

      return toReturn;
}

