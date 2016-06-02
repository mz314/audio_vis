var VisHelper = {
    componentToHex: function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    },
    rgbToHex: function (r, g, b) {
        return "#" + VisHelper.componentToHex(r) +
                VisHelper.componentToHex(g) +
                VisHelper.componentToHex(b);
    },
    calcAverage: function (array, skip) {
        var
                n = 0,
                sum = 0
                ;
                
        for (var i in array) {
            if (skip && i % 128 !== 0) {
                continue;
            }

            sum += array[i];
            n++;
        }

        return sum / n;
    }

};

