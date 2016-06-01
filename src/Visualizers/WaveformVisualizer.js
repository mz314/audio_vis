var WaveformVisualizer = function () {

};

WaveformVisualizer.prototype = new Visualizer();


WaveformVisualizer.prototype.initialize = function () {
    var cnv = this.canvas.get(0);
    this.ctx = cnv.getContext("2d");

    if (this.parameters.bgColor !== null) {
        $(this.canvas).css('background-color', this.parameters.bgColor);
    }

};

WaveformVisualizer.prototype.start = function () {
    var self = this;
    setInterval(function () {
        self.analyser.getByteTimeDomainData(self.timedomain_data);
        console.log(self.timedomain_data);

    }, 100);
};

WaveformVisualizer.prototype.constructor = WaveformVisualizer;
