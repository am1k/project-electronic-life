/**
 * Created by v.bogoroditskiy.
 */

define(function(require){

        var world = require('./world'),
            Tiger = require('../animals/Tiger'),
            PlantEater = require('../animals/PlantEater'),
            Plant = require('../animals/Plant'),
            Wall = require('./wall'),
            LifelikeWorld = require('./lifelike');

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