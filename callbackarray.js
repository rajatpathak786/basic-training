const fs = require('fs');
let arr = [], i = 0, l = 5, y = 0, x = 0;
for ( i; i < l; i++) {
  arr[i] = ('file'+(i + 1)+'.txt');  
}
sync(arr[0]);
function sync(asd) { 
  fs.readFile(asd, function (err, data) {
    if (err) console.error('file location not found');
    else {
      console.log('=============');
      console.log(data.toString());
      console.log(data.toString());
      if (y < l - 1) {  
        ++y;
        sync(arr[y]);
      } else {
        console.log('=============');  
      }
    }    
  });
} 





