/**
 * Created by v.bogoroditskiy.
 */

require.config({
    baseUrl: "js"
});

requirejs(['animateWorld', 'areaAction/main'],
    function(){
        animateWorld();
    }
);