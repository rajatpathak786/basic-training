function secondLargest(array) {
   var first = array[0] , second = array[1], dfirst = array[0], dsecond = array[1], largest, secondLargest, n = 0, i = 0;
   while((array.length - 1) > n) {
      if(first > second) {
         largest = first;
         second = array[n + 2];
         ++n;        
      } else  {
          largest = second;
          first = array[n + 2];
          ++n;          
      } 
   } 

   while ((array.length - 1) > i) {
      if(array[i] == largest) { 
         dfirst = (dfirst == largest? array[i+2]: dfirst);
         dsecond = (dsecond == largest? array[i+2]: dsecond);
         ++i;
      } else if(dfirst > dsecond) {          
          secondLargest = dfirst;
          dsecond = array[i + 2]; 
          ++i;       
      } else {
          secondLargest = dsecond;
          dfirst = array[i + 2];
          ++i;          
      }

   } 
    
  return secondLargest;
}


