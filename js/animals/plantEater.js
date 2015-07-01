/**
 * @license eLife 1.0 Copyright (c) 2015, Vitaliy Bogoroditskiy All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/am1k/project-electronic-life for details
 */

define(function(require) {

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

        return PlantEater;
    }
);