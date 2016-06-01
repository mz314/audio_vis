var Visualizer=function() {
};

Visualizer.prototype.setAnalyzer = function(analyser) {
    this.analyser = analyser;
    this.frequency_data = new Uint8Array(this.analyser.frequencyBinCount);
    this.timedomain_data = new Uint8Array(this.analyser.frequencyBinCount);
};

Visualizer.prototype.initialize = function () {
    
};

Visualizer.prototype.start=function () {
    
};

Visualizer.prototype.stop=function () {
    console.log('stop');
};