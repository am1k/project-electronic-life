require.config({
    baseUrl: "js"
});

//require([
//        "animateworld"
//    ],
//    function(Animateworld) {
//
//    });

requirejs(['animateWorld', 'areaAction/main'],
    function(animate, valley){
        animateWorld();
    }
);