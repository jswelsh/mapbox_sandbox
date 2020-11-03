/* function number_swap(numX, numY) {
    document.write(numX, numY)
    numX = numX + numY;
    numY = numX - numY;
    numX = numX - numY;
    document.write(numX, numY)
} */

/* 
function number_swap(numX, numY) {
    document.write(numX, numY)
    numX += numY;
    numY = numX - numY;
    numX -= numY;
    document.write(numX, numY)
}
 */
//could use bit wise? 
//need to inverse the combonation of bits
//XOR

function number_swap(numX, numY) {
    document.write("[", numX, numY, "-")
    numX ^= numY;// 0111 ^  1000 = 1111  | 011 ^ 110 = 101
    numY ^= numX;// 1000 ^ 1111 = 0111   | 110 ^ 101 = 011
    numX ^= numY;// 1111 ^ 0111 = 1000   | 101 ^ 011 = 110
    document.write(numX, numY, "]")
}

number_swap(7,8)
number_swap(3,6)
number_swap(8,7)