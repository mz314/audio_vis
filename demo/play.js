var vis = null;


var getVisualizer = function (type) {
    var visualizer;
    switch (type) {
        case 'bar':
            visualizer = new BarVisualizer('#v-canvas', {
                divider: 30,
                borderSize: 1,
                borderColor: "#000000",
                bgColor: "#bababa",
                barColor: "#ffffff",
                refreshInterval: 24
            });
            break;
        case 'clog':
            visualizer = new ConsoleLogVisualizer();
            break;
            
        case 'glball':
            visualizer = new GLBallVisualizer('#c-container');
            break;
    }

    return visualizer;
};

var bindDemoSwitch = function () {
    var switcher = $('#visualizer-selector');
    switcher.find('a').click(function (e) {
        e.preventDefault();
        type = $(this).attr('href');
        visualizer = getVisualizer(type);
        vis.setVisualizer(type);

    });
};

$(function () {


    vis = new AudioVis($('#audio-track').get(0), getVisualizer('glball'));

    $("#play").click(function () {

        $('#audio-track').attr('src', $('#filename').val());
        $('#audio-track').get(0).play();

    });

    $('#pause').click(function () {
        $('#audio-track').get(0).pause();
    });

   // bindDemoSwitch();

});
