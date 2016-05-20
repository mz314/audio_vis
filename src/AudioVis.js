var AudioVis = function (audio, visualizer) {
    
    var self = this;
    this.audio = audio;

    this.ctx = new AudioContext();
    this.analyser = self.ctx.createAnalyser();

    this.source = self.ctx.createMediaElementSource(self.audio);

    this.source.connect(this.analyser);
    this.analyser.connect(self.ctx.destination);

    

    this.visualizer = visualizer;
    this.visualizer.setAnalyzer(this.analyser);
    this.visualizer.initialize();
    

    this.audio.onplay = function () {
        self.visualizer.start();
    };

    this.audio.onpause = function () {
        self.visualizer.stop();
    };

};