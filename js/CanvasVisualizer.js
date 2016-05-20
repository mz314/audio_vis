var CanvasVisualizer = function (canvas_selector) {
    this.canvas_selector = canvas_selector;
    this.canvas = $(canvas_selector);
};

CanvasVisualizer.prototype = Visualizer.prototype;

CanvasVisualizer.prototype.initialize = function () {
    var cnv = this.canvas.get(0);
    
    this.bgcolor = '#aaaaaa';
    this.width = 1024;
    this.height = 256;
 
    cnv.width=this.width;
    cnv.height=this.height;
  
    this.ctx = cnv.getContext("2d");
    this.imgdata = this.ctx.createImageData(this.width, this.height);
    this.ctx.putImageData(this.imgdata, 0, 0);
    this.ctx.restore();
    this.ctx.fillStyle = this.bgcolor;
    this.ctx.fillRect(0, 0, this.width, this.height);
    console.log(this.canvas);
};


CanvasVisualizer.prototype.drawBar = function (x, y, w, h, c) {
     
    this.ctx.fillStyle = this.bgcolor;
    this.ctx.fillRect(x, 0, w, this.height);

    this.ctx.fillStyle = c;

    this.ctx.fillRect(x, y, w, h);
};

CanvasVisualizer.prototype.drawFreqBars = function (frequency_data) {

    var
            divider = 1,
            w = Math.floor(this.width / (frequency_data.length / divider)),
            x = 0;
    
    for (var i in frequency_data) {
        if (i % divider != 0) {
            continue;
        }
        h = frequency_data[i];
       
        
        this.drawBar(x, this.height-h, w, h, '#ff0000');
        x += w;
    }

};

CanvasVisualizer.prototype.start = function () {
    var self = this;
    setInterval(function () {
        self.analyser.getByteFrequencyData(self.frequency_data);
        self.drawFreqBars(self.frequency_data);


    }, 100);
};