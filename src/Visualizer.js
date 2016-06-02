var Visualizer=function() {
};

Visualizer.prototype.setAnalyzer = function(analyser) {
    this.analyser = analyser;
    this.frequency_data = new Uint8Array(this.analyser.frequencyBinCount);
    this.timedomain_data = new Uint8Array(this.analyser.frequencyBinCount);
};

Visualizer.prototype.initialize = function () {
    console.log('Visualizer.prototype.initialize');
};

Visualizer.prototype.start=function () {
    console.log('Visualizer.prototype.start');
};

Visualizer.prototype.stop=function () {
    console.log('Visualizer.prototype.stop');
};

Visualizer.prototype.destroy = function () {
    console.log('Visualizer.prototype.destroy');
};