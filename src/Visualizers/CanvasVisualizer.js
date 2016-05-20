var CanvasVisualizer = function (canvas_selector, parameters) {
    this.canvas_selector = canvas_selector;
    this.canvas = $(canvas_selector);
    this.parameters = {
        divider: 50,
        bgcolor: "#aaaaaa",
        barcolor: "#0000ff",
        border: 1,
        bordercolor: "#ff0000",
        refresh: 50,
        minfreq: 0,
        maxfreq: 100
    };


    this.parameters = $.extend(this.parameters, parameters);

};

CanvasVisualizer.prototype = new Visualizer();

CanvasVisualizer.prototype.initialize = function () {
    var cnv = this.canvas.get(0);

    this.width = this.frequency_data.length;//+(this.frequency_data.length*this.parameters.border);
    this.height = this.frequency_data.length/4;

    cnv.width = this.width;
    cnv.height = this.height;

    this.ctx = cnv.getContext("2d");
    this.ctx.restore();
    this.ctx.fillStyle = this.parameters.bgcolor;
    this.ctx.fillRect(0, 0, this.width, this.height);
    
};


CanvasVisualizer.prototype.drawBar = function (x, y, w, h, c) {

    this.ctx.fillStyle = this.parameters.bgcolor;
    this.ctx.fillRect(x, 0, w+this.parameters.border, this.height);
    
    if(h === 0) {
        return;
    }
 
    
    this.ctx.fillStyle = c;
    this.ctx.fillRect(x, y, w, h);
    

    this.ctx.strokeStyle = this.parameters.bordercolor;
    this.ctx.lineWidth = this.parameters.border;
    this.ctx.strokeRect(x,y,w,h);
    
};

CanvasVisualizer.prototype.drawFreqBars = function (frequency_data) {

    var
            w = Math.floor(this.width / (frequency_data.length / this.parameters.divider)),
            x = 0;

    for (var i in frequency_data) {
        if (i % this.parameters.divider !== 0) {
            continue;
        }
        h = frequency_data[i];


        this.drawBar(x, this.height - h, w, h, this.parameters.barcolor);
        x += w+this.parameters.border;
    }

};

CanvasVisualizer.prototype.start = function () {
    var self = this;
    setInterval(function () {
        self.analyser.getByteFrequencyData(self.frequency_data);
        self.drawFreqBars(self.frequency_data);
    }, this.parameters.refresh);
}; 