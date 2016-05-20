var VisHelper = {
    componentToHex: function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    },
    rgbToHex: function (r, g, b) {
        return "#" + VisHelper.componentToHex(r) +
                VisHelper.componentToHex(g) +
                VisHelper.componentToHex(b);
    }

};

