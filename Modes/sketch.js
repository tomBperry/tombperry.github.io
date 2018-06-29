let balls = [];
let zero, unitx, unity;
let k = [];
let Amp, energy;
let rowSep;
let Restoringforce;

const radius = 2;
const trailLength = 200;

const T = 10;
const c = T/500;
const damping = 1;

const N = 5;

function setup() {
  createCanvas(500, 400);
  colorMode(RGB, 255);

  rowSep = width / (N + 1);
  console.log("c: " + c);

  zero = createVector(0, 0);
  unit = createVector(0, 1);

  for (let n = 0; n < N; n++) {
    balls.push(new Ball(n));
    balls[n].position.add(createVector(0, random(-10,10)));
  }
  balls[1].position.add(0, 10);
}



function draw() {
  background(0);

  // for (let n = 0; n < balls.length; n++) {
     //Amp = balls[n].amplitude();
  // }

  for (let n = 0; n < balls.length; n++) {
    calcForce(n);
    balls[n].addForce(unit.copy().mult(Fn));
  }

  for (let n = 0; n < balls.length; n++) {
    balls[n].update();
    balls[n].show();
    // balls[n].trails();
    energy += balls[n].Energy();
  }
  if (frameCount % 6 == 0) {
    console.log("Energy: " + energy);
  }
  energy = 0;

  // realtiveSep();
  // showSprings();

}
