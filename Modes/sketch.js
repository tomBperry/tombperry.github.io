const M = 0;
const N = M + 0;
let balls = [];
let zero, unit;
let k = [1, 1, 1];
let c1, c2;

function setup() {
  zero = createVector(0);
  unit = createVector(1, 0);
  createCanvas(300, 200);
  rowNum = floor(width / (2 * radius + 1));


  balls[N + 0] = new Ball(width / 3, width / 3, height / 2, 1 * radius);
  balls[N + 1] = new Ball(2 * width / 3, width * 2 / 3 + 10, height / 2, 1 * radius);
  // balls[N + 2] = new Ball(width * (0.3), height / 2, 5, 0, true, 0.9 * radius);
}


function draw() {
  background(0);

  c1 = -(k[0] + k[1]) * (balls[0].displacement) + k[1] * (balls[1].displacement);
  c2 = -(k[1] + k[2]) * (balls[1].displacement) + k[1] * (balls[0].displacement);
  balls[0].addForce(unit.copy().mult(c1));
  balls[1].addForce(unit.copy().mult(c2));

  for (let n = 0; n < balls.length; n++) {
    // balls[n].bounce();
    balls[n].update();
    balls[n].amplitude();
    balls[n].show();
    //balls[n].trails();
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

  // showSprings();
}
// Random bouncing
