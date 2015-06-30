    var lifelikeWorld = require('./lifelikeWorld'),
        Tiger = require('../animals/Tiger'),
        PlantEater = require('../animals/PlantEater'),
        Plant = require('../animals/Plant'),
        world = require('./worldModule');

    var valley = new lifelikeWorld.LifelikeWorld(
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
        '#': world.Wall,
        '@': Tiger,
        'O': PlantEater,
        '*': Plant
    }
    );

    module.exports = valley.toString();

    setInterval(function() { console.log(valley.toString()); }, 2000);