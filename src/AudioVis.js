var AudioVis = function (audio, visualizer) {
    var self = this;

    this.setVisualizer = function (visualizer) {
        var do_start = false;
        if (self.visualizer) {
            self.visualizer.stop();
            self.visualizer.destroy();
            if (!self.audio.paused) {
                do_start = true;
            }
        }

        self.visualizer = visualizer;
        self.visualizer.setAnalyzer(this.analyser);
        self.visualizer.initialize();
        if(do_start) {
            self.visualizer.start();
        }
    };

    this.audio = audio;

    if (window.AudioContext) {
        this.ctx = new window.AudioContext();
    } else {
        this.ctx = new window.webkitAudioContext();
    }

    this.analyser = self.ctx.createAnalyser();

    this.source = self.ctx.createMediaElementSource(self.audio);

    this.source.connect(this.analyser);
    this.analyser.connect(self.ctx.destination);

    this.setVisualizer(visualizer);

    $(this.audio).on('play', function () {
        self.visualizer.start();
    });

    $(this.audio).on('pause', function () {
        self.visualizer.stop();
    });

};