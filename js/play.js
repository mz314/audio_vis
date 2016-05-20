

$(function () {
    
    clv = new CanvasVisualizer('#v-canvas');
    var vis = new AudioVis($('#audio-track').get(0), clv);
    
    $("#play").click(function () {

        $('#audio-track').attr('src', $('#filename').val());
        $('#audio-track').get(0).play();
        clv.start();


    });

});
