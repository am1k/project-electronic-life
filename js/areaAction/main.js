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



