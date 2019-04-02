function secondLargest(array) {    
   let largest = -Infinity,secondLargest = -Infinity;
   for(let i = 0; i < array.length; i++) {
       if(array[i] > largest) {
          largest = array[i];          
       }

   }
   
   for(let i = 0; i < array.length; i++) {
       if((array[i] > secondLargest) && (array[i] != largest)) {
           secondLargest = array[i];
       }

   }
    
  return secondLargest;

}
