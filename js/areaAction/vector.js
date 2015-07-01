/**
 * Created by v.bogoroditskiy.
 */

define(function () {

    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.prototype = {
        plus: function(other) {
            return new Vector(this.x + other.x, this.y + other.y);
        },
        toString: function() {
            return 'VECTOR: X: ' + this.x + ' Y: ' + this.y;
        }
    };

    return Vector;

});