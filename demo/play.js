

$(function () {
    
    canvas_visualizer = new CanvasVisualizer('#v-canvas', {
       divider: 30,
       borderSize:1,
       borderColor: "#000000",
       bgColor: "#bababa",
       barColor: "#ffffff",
       refreshInterval: 24
    });
    
    new AudioVis($('#audio-track').get(0), canvas_visualizer);
    
    $("#play").click(function () {

        $('#audio-track').attr('src', $('#filename').val());
        $('#audio-track').get(0).play();

    });

});
