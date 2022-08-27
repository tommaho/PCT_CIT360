/**
 *
 */

/**
 * Reverse the string str recursively
 * @param str
 */
function reverseString(str){

    if (str.length <= 1) {
        return str;
    } else {

        return str.charAt(str.length - 1 )  + reverseString(str.substring(1, str.length - 1)) + str.charAt(0);
        //last character                    //middle string, recurse                             //first char
    }

}

console.log(reverseString("Banana"));