let balls = [];
let zero, unitx, unity;
let k = [];
let c = [];
let Amp;
let rowSep;
const radius = 2;
const trailLength = 200;

const T = 10;
const damping = 1;

const N = 5;

function setup() {
  createCanvas(500, 400);
  colorMode(RGB, 255);

  rowSep = width / (N + 1);
  const c = T/width

  zero = createVector(0, 0);
  unity = createVector(0, 1);

  for (let n = 0; n < N; n++) {
    balls.push(new Ball(n));
  }
  balls[0].position.add(0, 10);
  // balls[2].position.add(0, -50);
  // balls[0].position.add(0, 40);
}

function draw() {
  background(0);

  // for (let n = 0; n < balls.length; n++) {
     //Amp = balls[n].amplitude();
  // }

  for (let n = 0; n < balls.length; n++) {
    balls[n].update();
    balls[n].show();
    // balls[n].trails();
    // energy += balls[n].kEnergy();
  }

  for (let n = 0; n < balls.length; n++) {
    balls[n].addForce(calcForce(n));
  }

  // realtiveSep();
  // showSprings();



  // for (let i = 0; i < balls.length; i++) {
  //   for (let j = i + 1; j < balls.length; j++) {
  //     if (distanceSq(balls[i], balls[j]) < (balls[i].radius + balls[j].radius) *
  //       (balls[i].radius + balls[j].radius)) {
  //       collide(balls[i], balls[j]);
  //       console.log("Collision!")
  //     }
  //   }
  // }
}
