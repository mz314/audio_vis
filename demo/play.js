

$(function () {
    
    canvas_visualizer = new CanvasVisualizer('#v-canvas', {
       divider: 30,
       border:1,
       bordercolor: "#000000",
       bgcolor: "#bababa",
       barcolor: "#ffffff",
       refresh: 24
    });
    
    new AudioVis($('#audio-track').get(0), canvas_visualizer);
    
    $("#play").click(function () {

        $('#audio-track').attr('src', $('#filename').val());
        $('#audio-track').get(0).play();

    });

});
