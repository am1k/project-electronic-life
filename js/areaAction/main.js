/**
 * @license eLife 1.0 Copyright (c) 2015, Vitaliy Bogoroditskiy All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/am1k/project-electronic-life for details
 */

define(function(require){

        var world = require('./World'),
            Tiger = require('../animals/Tiger'),
            PlantEater = require('../animals/PlantEater'),
            Plant = require('../animals/Plant'),
            Wall = require('./Wall'),
            LifelikeWorld = require('./Lifelike');

        var plan =
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
            '####################################################'];

        var description = {
            '#': Wall,
            '@': Tiger,
            'O': PlantEater,
            '*': Plant
        };

        var valley = new LifelikeWorld(
            plan, description);
        return valley;

    }
);