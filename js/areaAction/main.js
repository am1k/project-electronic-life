define(function(require){

        var world = require('./worldModule'),
            tiger = require('../animals/Tiger'),
            plantEater = require('../animals/PlantEater'),
            plant = require('../animals/Plant'),
            likeworld = require('./lifelikeWorld');

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
            '#': world.Wall,
            '@': tiger.Tiger,
            'O': plantEater.PlantEater,
            '*': plant.Plant
        };

        var valley = new likeworld.LifelikeWorld(
            plan, description);
        return valley;

    }
);