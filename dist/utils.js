"use strict";
function randInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}
function str_binarySearch(arr, x) {
    let l = 0;
    let r = arr.length - 1;
    while (l <= r) {
        let m = l + Math.floor((r - l) / 2);
        let res = -1000; //some random value assigned because if res is already 0 then
        //it will always return 0
        if (x == arr[m])
            res = 0;
        // Check if x is present at mid
        if (res == 0)
            return m;
        // If x greater, ignore left half
        if (str_greatherThan(x, arr[m]))
            l = m + 1;
        // If x is smaller, ignore right half
        else
            r = m - 1;
    }
    return -1;
}
function str_greatherThan(a, b) {
    return a.localeCompare(b) > 0;
}
