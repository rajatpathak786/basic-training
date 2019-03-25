function secondLargest(array) {
    let arrlength, largest, first, second, secondlargest;    
    let i = 0;
    first = array[i];
    arrlength = array.length;
    for(i; i<(arrlength - 1); i++) {        
        second = array[i + 1];
        if(first > second) {
            largest = first;
            first = largest;
        }else if(second > first) {
            largest = second;
            first = largest;
        }else {
            continue;
        }
    }

    first = array[i];
    for(let i = 0; i<(arrlength - 1); i++) {
        second = array[i + 1];
        if(largest == array[i]) {
            continue;
        }else if(largest == second) {
            continue;
        }else {
            if(first > second) {
                secondlargest = first;
                first = secondlargest;
            }else if(second > first) {
                secondlargest = second;
                first = secondlargest;
            }else {
                continue;
            }
        }        
    }

    return secondlargest;
}
