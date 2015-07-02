/**
 * @license eLife 1.0 Copyright (c) 2015, Vitaliy Bogoroditskiy All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/am1k/project-electronic-life for details
 */

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

module.exports = Vector;
