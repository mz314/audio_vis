var AudioVis = function (audio, visualizer) {
    console.log('audiovis init');
    var self = this;
    this.audio = audio;
    
    if(window.AudioContext) {
        this.ctx = new window.AudioContext();
    } else {
        this.ctx = new window.webkitAudioContext();
    }
    
     
    this.analyser = self.ctx.createAnalyser();

    this.source = self.ctx.createMediaElementSource(self.audio);

    this.source.connect(this.analyser);
    this.analyser.connect(self.ctx.destination);

    this.visualizer = visualizer;
    this.visualizer.setAnalyzer(this.analyser);
    this.visualizer.initialize();
    
    this.audio.onplay = function () {
        console.log('onplay');
        self.visualizer.start();
    };

    this.audio.onpause = function () {
        self.visualizer.stop();
    };

};