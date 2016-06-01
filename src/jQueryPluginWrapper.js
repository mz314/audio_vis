(function ($) {

    $.fn.audioVis = function (visualizer) {
        new AudioVis($(this).get(0), visualizer);

    };

    $.audioVis = function () {
        console.log('$.audioVis() entrypoint');
    };



}(jQuery));