const M = 0;
const N = M + 0;
let balls = [];
let zero, unit;
let k = [0.2, 0.301, 0.2];
let c1, c2;

function setup() {
  zero = createVector(0, 0);
  unit = createVector(1, 0);
  createCanvas(500, 400);
  colorMode(RGB, 255);
  rowNum = floor(width / (2 * radius + 1));


  balls[N + 0] = new Ball(width / 3, height / 2, width / 3 + 100, height / 2, 1 * radius);
  balls[N + 1] = new Ball(2 * width / 3, height / 2, width * 2 / 3, height / 2 + 100, 1 * radius);
}


function draw() {
  background(0);

  for (let n = 0; n < balls.length; n++) {
    balls[n].amplitude();
  }

  c1 = balls[0].disp.copy().mult(-(k[0] + k[1]));
  c1.add(balls[1].disp.copy().mult(k[1]));
  c2 = balls[1].disp.copy().mult(-(k[2] + k[1]));
  c2.add(balls[0].disp.copy().mult(k[1]));

  balls[0].addForce(c1);
  balls[1].addForce(c2);

  realtiveSep();
  showSprings();

  for (let n = 0; n < balls.length; n++) {
    balls[n].bounce();
    balls[n].update();
    balls[n].show();
    balls[n].trails();
    // energy += balls[n].kEnergy();
  }


  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      if (distanceSq(balls[i], balls[j]) < (balls[i].radius + balls[j].radius) *
        (balls[i].radius + balls[j].radius)) {
        collide(balls[i], balls[j]);
        console.log("Collision!")
      }
    }
  }
}
