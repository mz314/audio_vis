

$(function () {
    
    visualizer = new BarVisualizer('#v-canvas', {
       divider: 30,
       borderSize:1,
       borderColor: "#000000",
       bgColor: "#bababa",
       barColor: "#ffffff",
       refreshInterval: 24
    });
    
    // var visualizer = new WaveformVisualizer();
    
    new AudioVis($('#audio-track').get(0), visualizer);
    
    $("#play").click(function () {

        $('#audio-track').attr('src', $('#filename').val());
        $('#audio-track').get(0).play();

    });
    
    $('#pause').click(function () {
       $('#audio-track').get(0).pause();
    });

});
