var AudioVis = function (audio, visualizer) {
    
    var self = this;
    this.audio = audio;

    this.ctx = new AudioContext();
    this.analyser = self.ctx.createAnalyser();

    this.source = self.ctx.createMediaElementSource(self.audio);

    this.source.connect(this.analyser);
    this.analyser.connect(self.ctx.destination);

    this.frequency_data = new Uint8Array(self.analyser.frequencyBinCount);

    this.visualizer = visualizer;
    this.visualizer.setAnalyzerData(this.analyser, this.frequency_data);
    this.visualizer.initialize();
    console.log(self.frequency_data, self.frequency_data.length);

    this.audio.onplay = function () {
        self.visualizer.start();
    };

    this.audio.onpause = function () {
        self.visualizer.stop();
    };

};