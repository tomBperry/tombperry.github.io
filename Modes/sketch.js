let balls = [];
let zero, unitx, unity;
let k = [];
let c = [];
let Amp;
let rowSep;
const radius = 2;
const trailLength = 200;
let Fxn, Fyn, Fx0, Fy0;

const T = 10;
const damping = 1;

const N = 5;

function setup() {
  createCanvas(500, 400);
  colorMode(RGB, 255);

  rowSep = width / (N + 1);;

  zero = createVector(0, 0);
  unitx = createVector(1, 0);
  unity = createVector(0, 1);

  for (let n = 0; n < N; n++) {
    balls.push(new Ball(n));
  }
  balls[N-1].velocity.add(0, 1);
  // balls[2].position.add(0, -50);
  // balls[0].position.add(0, 40);
}

function draw() {
  background(0);

  for (let n = 0; n < balls.length; n++) {
    //Amp = balls[n].amplitude();
    balls[n].angle = calcAngle(n);
  }


  dx = balls[0].position.x;
  dy = (height/2)-balls[0].position.y;
  theta0 = atan(-dy/dx);

  Fx0 = T * (sin(balls[0].angle)-sin(theta0));
  Fy0 = T * (cos(balls[0].angle)-cos(theta0));

  // balls[0].addForce(unitx.copy().mult(Fxn));
  balls[0].addForce(unity.copy().mult(Fyn));

  for (let n = 1; n < balls.length; n++) {
    Fyn = T * (sin(balls[n].angle) - sin(balls[n - 1].angle));
    Fxn = T * (cos(balls[n].angle) - cos(balls[n - 1].angle))

    // balls[n].addForce(unitx.copy().mult(Fxn));
    balls[n].addForce(unity.copy().mult(Fyn));
  }

  for (let n = 0; n < balls.length; n++) {
    balls[n].update();
    balls[n].show();
    // balls[n].trails();
    // energy += balls[n].kEnergy();
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
