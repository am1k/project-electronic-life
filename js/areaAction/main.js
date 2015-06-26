define(
    ['./worldModule', '../animals/Tiger', '../animals/PlantEater', '../animals/Plant', './lifelikeWorld'],
    function( world, tiger, plantEater, plant, likeworld ){
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