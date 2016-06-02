var GLBallVisualizer = function (containerSelector, options) {
    this.containerSelector = containerSelector;
    this.do_reshape = false;
    this.options = $.extend({
        width: $(containerSelector).width(),
        height: $(containerSelector).height()
    }, options);
};

GLBallVisualizer.prototype = new Visualizer();

GLBallVisualizer.prototype.initialize = function () {

    this.frame_id = null;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.options.width / this.options.height,
            0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.options.width, this.options.height);
    this.prev_scale = 0;
    this.interval = null;
    $(this.containerSelector).html(this.renderer.domElement);

    this.max_ball = 6;
    this.interval_step = 10;
    this.clock = new THREE.Clock(false);
    this.accum_delta = 0;

    ball_geometry = new THREE.SphereGeometry(10, 24, 24);
    ball_material = new THREE.MeshPhongMaterial({color: 0xff0000});

    this.ball = new THREE.Mesh(ball_geometry, ball_material);
    this.ball.position.z = -100;
    this.scene.add(this.ball);

    box_geometry = new THREE.BoxGeometry(90, 80, 90);
    box_material = new THREE.MeshPhongMaterial({color: 0x00ff00, opacity: 0.4, transparent: true});
    this.box = new THREE.Mesh(box_geometry, box_material);
    this.box.position.z = -100;
    this.box.rotation.y = 1;
    this.box.rotation.x = 0.1;
    this.scene.add(this.box);
    console.log(this.box);
    this.box.userData = {
        rvelocity: new THREE.Vector3(0, 0, 0),
        raccel: new THREE.Vector3(0, 0, 0)
    };

    this.accel_decay = 10000;

    ambient_light = new THREE.AmbientLight(0x404040, 1);
    this.scene.add(ambient_light);

    light = new THREE.PointLight(0xffffff, 1, 0);
    light.position.set(0, 0, 0);
    this.scene.add(light);

    this.render();

};

GLBallVisualizer.prototype.reshape = function (delta) {
    
    
    this.analyser.getByteTimeDomainData(this.timedomain_data);
    this.analyser.getByteFrequencyData(this.frequency_data);
    

    td_avg = VisHelper.calcAverage(this.timedomain_data);
    fd_avg = VisHelper.calcAverage(this.frequency_data);

    console.log(td_avg, fd_avg);

    xtg = 200;
    xtl = 50;
   
    if (fd_avg > xtg) {
        this.box.userData.rvelocity.x = 10; //(fd_avg-xtg);
    } 
    if (fd_avg < xtl) {
        this.box.userData.rvelocity.x = -10;// xtl-fd_avg;
    } 

    this.box.userData.rvelocity.x %= 100;

    scale = 1 + (td_avg % 1) * (this.max_ball - 1);

    this.ball.scale.x = this.ball.scale.y = scale;

    //TODO: add acceleration decay time

    acceleration = this.box.userData.raccel;
    
    
    if (acceleration.length() !== 0) {
        velocity = this.box.userData.rvelocity;
        velocity.x += acceleration.x * delta;
        velocity.y += acceleration.y * delta;
        velocity.z += acceleration.z * delta;
        console.log('ACCELERATE');


    } else {
        velocity = this.box.userData.rvelocity.clone();
        velocity.x*=delta;
        velocity.y*=delta;
        velocity.z*=delta;
    }
//    
    if(Math.abs(velocity.x>1)) {
        //velocity.x = 0;
        acceleration.x = -acceleration.x;
    }
    
    if (velocity.length() !== 0) {
        this.box.geometry.rotateX(velocity.x);
        this.box.geometry.rotateY(velocity.y);
        this.box.geometry.rotateZ(velocity.z);
    }



};

GLBallVisualizer.prototype.render = function () {
    var self = this;
    
    this.frame_id = requestAnimationFrame(function () {
        self.render();
    });

    delta = this.clock.getDelta();
    this.accum_delta += delta;
    if(this.accum_delta>=0.02) {
        this.accum_delta = 0;
        self.reshape(delta);
    }
    

    this.renderer.render(this.scene, this.camera);
};

GLBallVisualizer.prototype.start = function () {

    this.clock.start();
//    if (!this.interval) {
//        this.interval = setInterval(function () {
//            self.reshape();
//        }, this.interval_step);
//    }
};

GLBallVisualizer.prototype.stop = function () {
    this.clock.stop();
};

GLBallVisualizer.prototype.destroy = function () {
    if (this.interval) {
        clearInterval(this.interval);
    }

    if (this.frame_id) {
        cancelAnimationFrame(this.frame_id);
    }

    $(this.renderer.domElement).remove();
};