var ConsoleLogVisualizer = function () {
 
};

ConsoleLogVisualizer.prototype = new Visualizer();


ConsoleLogVisualizer.prototype.start = function () {
    var self = this;
    setInterval(function () {
        self.analyser.getByteFrequencyData(self.frequency_data);
        console.log(self.frequency_data);

    }, 100);
};


