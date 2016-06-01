var GLBallVisualizer = function (containerSelector) {
    this.containerSelector = containerSelector;
    this.do_reshape = false;
};

GLBallVisualizer.prototype = new Visualizer();

GLBallVisualizer.prototype.initialize = function () {

    var canv = $(this.containerSelector).find('canvas');
    console.log('ball initialize', canv.width(), canv.height());
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, canv.width() / canv.height(), 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(canv.width(), canv.height());
    this.prev_scale = 0;
    this.interval = null;
    document.body.appendChild(this.renderer.domElement);
    canv.hide();
    this.max_ball = 6;
    this.interval_step = 10;

    ball_geometry = new THREE.SphereGeometry(10, 24, 24);
    ball_material = new THREE.MeshPhongMaterial({color: 0xff0000});
    console.log(ball_geometry);
    this.ball = new THREE.Mesh(ball_geometry, ball_material);
    this.ball.position.z = -100;
    this.scene.add(this.ball);

    box_geometry = new THREE.BoxGeometry(90, 80, 90);
    box_material = new THREE.MeshPhongMaterial({color: 0x00ff00, opacity: 0.4, transparent: true});
    this.box = new THREE.Mesh(box_geometry, box_material);
    this.box.position.z = - 100;
    this.box.rotation.y = 1;
    this.box.rotation.x = 0.1;
    this.scene.add(this.box);
    
    ambient_light = new THREE.AmbientLight(0x404040, 1);
    this.scene.add(ambient_light);

    light = new THREE.PointLight(0xffffff, 1, 0);
    light.position.set(0, 0, 0);
    this.scene.add(light);

    this.render();

};

GLBallVisualizer.prototype.reshape = function () {

    this.analyser.getByteTimeDomainData(this.timedomain_data);
    var sum = 0, n = 0;

    for (var i in this.timedomain_data) {
//        if (i % 128 !== 0) {
//            continue;
//        }
        sum += this.timedomain_data[i];
        n++;
    }

    avg = sum/n;
    scale = 1+(avg % 1)*(this.max_ball-1) ;

  

    this.ball.scale.x = this.ball.scale.y = scale;


};

GLBallVisualizer.prototype.render = function () {
    var self = this;
    requestAnimationFrame(function () {
        self.render();
    });


    this.renderer.render(this.scene, this.camera);
};

GLBallVisualizer.prototype.start = function () {
    var self = this;
    if(!this.interval) {
        this.interval = setInterval(function () {
            self.reshape();
        }, this.interval_step);
    }

};