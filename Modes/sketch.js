let balls = [];
let zero, unitx, unity;
let k = [];
let c = [];
let Amp, energy;
let rowSep;
const radius = 3;
const trailLength = 200;
let Fxn, Fyn, Fx0, Fy0;

const T = 20;
const damping = 1;

const N = 50;

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
  balls[25].position.add(0, 10);

  balls[0].colour = color(255, 0, 0);
  balls[N-1].colour = color(255, 0, 0);
  // balls[2].position.add(0, -50);
  // balls[0].position.add(0, 40);
}

function draw() {
  background(0);

  for (let n = 1; n < balls.length; n++) {
    balls[n].update();
    balls[n].angle = calcAngle(n);
    //Amp = balls[n].amplitude();
  }


  dx = balls[0].position.x;
  dy = (height/2)-balls[0].position.y;
  theta0 = atan(dy/dx);

  Fy0 = T * (sin(balls[0].angle)-sin(theta0));
  // Fx0 = T * (cos(balls[0].angle)-cos(theta0));

  // balls[0].addForce(unitx.copy().mult(Fxn));
  //balls[0].addForce(unity.copy().mult(Fyn));

  for (let n = 1; n < balls.length-1; n++) {
    Fyn = T * (sin(balls[n].angle) - sin(balls[n - 1].angle));
    // Fxn = T * (cos(balls[n].angle) - cos(balls[n - 1].angle))

    // balls[n].addForce(unitx.copy().mult(Fxn));
    balls[n].addForce(unity.copy().mult(Fyn));
  }

  for (let n = 0; n < balls.length; n++) {
    // balls[n].update();
    balls[n].show();
    // balls[n].trails();
    energy += balls[n].kEnergy();
  }
  // realtiveSep();
  // showSprings();

  console.log(energy);
  energy = 0;

}
