/**
 * @license eLife 1.0 Copyright (c) 2015, Vitaliy Bogoroditskiy All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/am1k/project-electronic-life for details
 */

define(function(require) {

    var Grid = require('./Grid'),
        Vector = require('./Vector'),
        directions = require('./directions'),
        View = require('./View'),
        charFromElement = require('../elements/charFromElement'),
        elementFromChar = require('../elements/elementFromChar');


    function World(map, legend) {
        var grid = new Grid(map[0].length, map.length);
        this.grid = grid;
        this.legend = legend;

        map.forEach(function(line, y) {
            for (var x = 0; x < line.length; x++)
                grid.set(new Vector(x, y),
                    elementFromChar(legend, line[x]));
        });
    }

    World.prototype = {
        toString: function() {
            var output = '';
            for (var y = 0; y < this.grid.height; y++) {
                for (var x = 0; x < this.grid.width; x++) {
                    var element = this.grid.get(new Vector(x, y));
                    output += charFromElement(element);
                }
                output += '\n';
            }
            return output;
        },
        turn: function() {
            var acted = [];
            this.grid.forEach(function(critter, vector) {
                if (critter.act && acted.indexOf(critter) == -1) {
                    acted.push(critter);
                    this.letAct(critter, vector);
                }
            }, this);
        },
        letAct: function(critter, vector) {
            var action = critter.act(new View(this, vector));
            if (action && action.type == 'move') {
                var dest = this.checkDestination(action, vector);
                if (dest && this.grid.get(dest) == null) {
                    this.grid.set(vector, null);
                    this.grid.set(dest, critter);
                }
            }
        },
        checkDestination: function(action, vector) {
            if (directions.hasOwnProperty(action.direction)) {
                var dest = vector.plus(directions[action.direction]);
                if (this.grid.isInside(dest))
                    return dest;
            }
        }
    };

    return World;

});