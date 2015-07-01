/**
 * Created by v.bogoroditskiy.
 */

define(function() {

    function randomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    return randomElement;
});
