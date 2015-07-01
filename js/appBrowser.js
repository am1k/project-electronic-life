(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Vitaliy Bogoroditskiy All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/am1k/project-electronic-life for details
 */


function Plant() {
    this.energy = 3 + Math.random() * 4;
}

Plant.prototype = {
    act: function (context) {
        if (this.energy > 20) {
            var space = context.find(' ');
            if (space)
                return {type: 'reproduce', direction: space};
        }
        if (this.energy < 30)
            return {type: 'grow'};
    }
};

module.exports = Plant;

},{}],2:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Vitaliy Bogoroditskiy All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/am1k/project-electronic-life for details
 */


var directions = require('../areaAction/directions'),
    randomElement = require('../elements/randomElement');

function PlantEater() {
    this.energy = 30;
    this.direction = randomElement(Object.keys(directions));
    this.eatCounter = 1;
}
PlantEater.prototype = {
    act: function(view) {
        var space = view.find(' ');
        if (this.energy > 60 && space) {
            return {type: 'reproduce', direction: randomElement(space)};
        }

        var plant = view.findAll('*');
        if (plant.length > 1) {

            if (this.eatCounter >= 0) {
                this.eatCounter = 0;
                return {type: "eat", direction: randomElement(plant)};
            } else {
                this.eatCounter++;
            }
        }

        if (space) {

            var spaces = view.findAll(' ');
            if (spaces.indexOf(this.direction) == -1) {
                this.direction = space;
            }
            return {type: 'move', direction: this.direction};
        }
        else {
            this.direction = 's';
        }
    }
};

module.exports = PlantEater;
},{"../areaAction/directions":5,"../elements/randomElement":15}],3:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Vitaliy Bogoroditskiy All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/am1k/project-electronic-life for details
 */


var directions = require('../areaAction/directions'),
    randomElement = require('../elements/randomElement');

function Tiger() {
    this.energy = 60;
    this.direction = randomElement(Object.keys(directions));
    this.eatCounter = 1;
}
Tiger.prototype = {
    act: function (context) {
        var space = context.find(' ');
        var critter = context.find('O');
        var plant = context.find('*');

        if (critter) {
            var critters = context.findAll('O');
            if (critters.length > 2) {
                return {type: 'move', direction: this.direction};
            }
            else {
                return {type: 'eat', direction: critter};
            }
        }

        if (this.energy > 120 && space) {
            return {type: 'reproduce', direction: randomElement(space)};
        }

        if (space) {
            var spaces = context.findAll(' ');
            if (spaces.indexOf(this.direction) == -1) {
                this.direction = space;
            }
            return {type: 'move', direction: this.direction};
        } else {
            this.direction = 's';
        }

        if (plant) {
            if (this.energy < 10) {
                return {type: 'eat', direction: plant};
            }
        }

    }
};

module.exports = Tiger;
},{"../areaAction/directions":5,"../elements/randomElement":15}],4:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Vitaliy Bogoroditskiy All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/am1k/project-electronic-life for details
 */

  "use strict";
  var world = require('./areaAction/main'),
      active = null;

  function Animated(world) {
    this.world = world;
    var outer = (window.__sandbox ? window.__sandbox.output.div : document.body), doc = outer.ownerDocument;
    var node = outer.appendChild(doc.createElement("div"));
    node.style.cssText = "position: relative; width: intrinsic; width: fit-content;";
    this.pre = node.appendChild(doc.createElement("pre"));
    this.pre.appendChild(doc.createTextNode(world.toString()));
    this.button = node.appendChild(doc.createElement("div"));
    this.button.style.cssText = "position: absolute; bottom: 8px; right: -4.5em; color: white; font-family: tahoma, arial; " +
        "background: #4ab; cursor: pointer; border-radius: 18px; font-size: 70%; width: 3.5em; text-align: center;";
    this.button.innerHTML = "stop";
    var self = this;
    this.button.addEventListener("click", function() { self.clicked(); });
    this.disabled = false;
    if (active) active.disable();
    active = this;
    this.interval = setInterval(function() { self.tick(); }, 333);
  }

  Animated.prototype.clicked = function() {
    if (this.disabled) return;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.button.innerHTML = "start";
    } else {
      var self = this;
      this.interval = setInterval(function() { self.tick(); }, 333);
      this.button.innerHTML = "stop";
    }
  };

  Animated.prototype.tick = function() {
    this.world.turn();
    this.pre.removeChild(this.pre.firstChild);
    this.pre.appendChild(this.pre.ownerDocument.createTextNode(this.world.toString()));
  };

  Animated.prototype.disable = function() {
    this.disabled = true;
    clearInterval(this.interval);
    this.button.innerHTML = "Disabled";
    this.button.style.color = "red";
  };

  window.animateWorld = function() { new Animated(world); };


},{"./areaAction/main":8}],5:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Vitaliy Bogoroditskiy All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/am1k/project-electronic-life for details
 */

var Vector = require('./vector');

var directions = {
    'n':  new Vector( 0, -1),
    'ne': new Vector( 1, -1),
    'e':  new Vector( 1,  0),
    'se': new Vector( 1,  1),
    's':  new Vector( 0,  1),
    'sw': new Vector(-1,  1),
    'w':  new Vector(-1,  0),
    'nw': new Vector(-1, -1)
};

module.exports = directions;
},{"./vector":9}],6:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Vitaliy Bogoroditskiy All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/am1k/project-electronic-life for details
 */

var Vector = require('./vector');

function Grid(width, height) {
    this.space = new Array(width * height);
    this.width = width;
    this.height = height;
}

Grid.prototype = {
    isInside: function (vector) {
        return vector.x >= 0 && vector.x < this.width &&
            vector.y >= 0 && vector.y < this.height;
    },
    forEach: function (f, context) {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var value = this.space[x + y * this.width];
                if (value != null)
                    f.call(context, value, new Vector(x, y));
            }
        }
    },
    get: function (vector) {
        return this.space[vector.x + this.width * vector.y];
    },
    set: function (vector, value) {
        this.space[vector.x + this.width * vector.y] = value;
    }
};

module.exports = Grid;
},{"./vector":9}],7:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Vitaliy Bogoroditskiy All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/am1k/project-electronic-life for details
 */


var World = require('./world'),
    elementFromChar = require('../elements/elementFromChar'),
    View = require('./view');

function LifelikeWorld(map, legend) {
    World.call(this, map, legend);
}

LifelikeWorld.prototype = Object.create(World.prototype);

LifelikeWorld.prototype.letAct = function(critter, vector) {
    var action = critter.act(new View(this, vector));
    var handled = action &&
        action.type in actionTypes &&
        actionTypes[action.type].call(this, critter,
            vector, action);
    if (!handled) {
        critter.energy -= 0.2;
        if (critter.energy <= 0)
            this.grid.set(vector, null);
    }

};

var actionTypes = Object.create(null);

actionTypes = {

    grow: function(critter) {
        critter.energy += 0.5;
        return true;
    },

    move: function(critter, vector, action) {
        var dest = this.checkDestination(action, vector);
        if (dest == null ||
            critter.energy <= 1 ||
            this.grid.get(dest) != null)
            return false;
        critter.energy -= 1;
        this.grid.set(vector, null);
        this.grid.set(dest, critter);
        return true;
    },

    eat: function(critter, vector, action) {
        var dest = this.checkDestination(action, vector);
        var atDest = dest != null && this.grid.get(dest);
        if (!atDest || atDest.energy == null)
            return false;
        critter.energy += atDest.energy;
        this.grid.set(dest, null);
        return true;
    },

    reproduce: function(critter, vector, action) {
        var baby = elementFromChar(this.legend,
            critter.originChar);
        var dest = this.checkDestination(action, vector);
        if (dest == null ||
            critter.energy <= 2 * baby.energy ||
            this.grid.get(dest) != null)
            return false;
        critter.energy -= 2 * baby.energy;
        this.grid.set(dest, baby);
        return true;
    }

};

module.exports = LifelikeWorld;
},{"../elements/elementFromChar":14,"./view":10,"./world":12}],8:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Vitaliy Bogoroditskiy All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/am1k/project-electronic-life for details
 */

        var Tiger = require('../animals/Tiger'),
            PlantEater = require('../animals/PlantEater'),
            Plant = require('../animals/Plant'),
            Wall = require('./wall'),
            LifelikeWorld = require('./lifelike');

        var valley = new LifelikeWorld(
            ['####################################################',
                '# @               ####         ****              ###',
                '#   *  @  ##                 ########       OO    ##',
                '#   *    ##        O O                 ****       *#',
                '#       ##*                        ##########     *#',
                '#      ##***  *         ****                     **#',
                '#* **  #  *  ***      #########                  **#',
                '#* **  #      *               #   *              **#',
                '#     ##              #   O   #  ***          ######',
                '#*            @       #       #   *        O  #    #',
                '#*                    #  ######                 ** #',
                '#####        ****          ***                  ** #',
                '#***#   O                        @         O  @@   #',
                '# O #     ##  ##  ##  ##               ###      *  #',
                '#***#*         #              *       #####  O     #',
                '##  #*  O   O  #  #    ***  ***        ###      ** #',
                '###               #   *****                    ****#',
                '####################################################'],

            {
                '#': Wall,
                '@': Tiger,
                'O': PlantEater,
                '*': Plant
            }
        );


        module.exports = valley;




},{"../animals/Plant":1,"../animals/PlantEater":2,"../animals/Tiger":3,"./lifelike":7,"./wall":11}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Vitaliy Bogoroditskiy All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/am1k/project-electronic-life for details
 */

var directions = require('./directions'),
    charFromElement = require('../elements/charFromElement'),
    randomElement = require('../elements/randomElement');

function View(world, vector) {
    this.world = world;
    this.vector = vector;
}

View.prototype = {
    look: function(dir) {
        var target = this.vector.plus(directions[dir]);
        if (this.world.grid.isInside(target))
            return charFromElement(this.world.grid.get(target));
        else
            return '#';
    },
    findAll: function(ch) {
        var found = [];
        for (var dir in directions)
            if (this.look(dir) == ch)
                found.push(dir);
        return found;
    },
    find: function(ch) {
        var found = this.findAll(ch);
        if (found.length == 0) return null;
        return randomElement(found);
    }
};

module.exports = View;
},{"../elements/charFromElement":13,"../elements/randomElement":15,"./directions":5}],11:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Vitaliy Bogoroditskiy All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/am1k/project-electronic-life for details
 */

function Wall() {}

module.exports = Wall;
},{}],12:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Vitaliy Bogoroditskiy All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/am1k/project-electronic-life for details
 */

var Grid = require('./grid'),
    Vector = require('./vector'),
    directions = require('./directions'),
    View = require('./view'),
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

module.exports = World;
},{"../elements/charFromElement":13,"../elements/elementFromChar":14,"./directions":5,"./grid":6,"./vector":9,"./view":10}],13:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Vitaliy Bogoroditskiy All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/am1k/project-electronic-life for details
 */

function charFromElement(element) {
    if (element == null)
        return ' ';
    else
        return element.originChar;
}

module.exports = charFromElement;
},{}],14:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Vitaliy Bogoroditskiy All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/am1k/project-electronic-life for details
 */

function elementFromChar(legend, ch) {
    if (ch == ' ')
        return null;
    var element = new legend[ch]();
    element.originChar = ch;
    return element;
}

module.exports = elementFromChar;
},{}],15:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Vitaliy Bogoroditskiy All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/am1k/project-electronic-life for details
 */

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

module.exports = randomElement;
},{}]},{},[4]);
