var BarVisualizer = function (container_selector, parameters) {
    
    
    this.canvas = document.createElement('canvas');
    $(container_selector).append(this.canvas);
    this.parameters = {
        divider: 50,
        bgColor: null,
        barColor: "#0000ff",
        borderSize: 1,
        borderColor: "#ff0000",
        refreshInterval: 50,
        scaleWidth: '500px',
        scaleHeight: '200px'
    };
    
    this.parameters = $.extend(this.parameters, parameters);
    
    $(this.canvas).css('width', this.parameters.scaleWidth);
    $(this.canvas).css('height', this.parameters.scaleHeight);
    
    this.interval = null;
};

BarVisualizer.prototype = new Visualizer();

BarVisualizer.prototype.initialize = function () {
    var cnv = this.canvas;
    this.ctx = cnv.getContext("2d");

    if (this.parameters.bgColor !== null) {
        $(this.canvas).css('background-color', this.parameters.bgColor);
    }

    this.width = this.frequency_data.length;
    this.height = this.frequency_data.length / 4;

    cnv.width = this.width;
    cnv.height = this.height;
};


BarVisualizer.prototype.drawBar = function (x, y, w, h, c) {

    this.ctx.clearRect(x, 0, w + this.parameters.borderSize, this.height);

    if (h === 0) {
        return;
    }

    this.ctx.fillStyle = c;
    this.ctx.fillRect(x, y, w, h);


    this.ctx.strokeStyle = this.parameters.borderColor;
    this.ctx.lineWidth = this.parameters.borderSize;
    this.ctx.strokeRect(x, y, w, h);

};

BarVisualizer.prototype.drawFreqBars = function (frequency_data) {

    var
            w = Math.floor(this.width / (frequency_data.length / this.parameters.divider)),
            x = 0;

    for (var i in frequency_data) {
        if (i % this.parameters.divider !== 0) {
            continue;
        }
        h = frequency_data[i];


        this.drawBar(x, this.height - h, w, h, this.parameters.barColor);
        x += w + this.parameters.borderSize;
    }

};

BarVisualizer.prototype.start = function () {
    var self = this;
    if (this.interval) {
        return;
    }
    this.interval = setInterval(function () {
        self.analyser.getByteFrequencyData(self.frequency_data);
        self.drawFreqBars(self.frequency_data);
    }, this.parameters.refreshInterval);
};

BarVisualizer.prototype.stop = function () {
    var self = this;
    setTimeout(function () {
        if (self.interval) {
            clearInterval(this.interval);
        }
    }, self.parameters.refreshInterval);

};

BarVisualizer.prototype.destroy = function () {
  $(this.canvas).remove();  
};