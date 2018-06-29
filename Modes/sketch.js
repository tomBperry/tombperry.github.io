let balls = [];
let zero, unitx, unity;
let k = [];
let Amp, energy;
let rowSep, c;
let Restoringforce;

const radius = 1;
const trailLength = 5;

const T = 10;
const damping = 1;

const N = 300;
const M = 1;

function setup() {
  createCanvas(500, 400);
  colorMode(RGB, 255);

  rowSep = width / (N + 1);
  c = T / width;
  const A = 200/M;

  zero = createVector(0, 0);
  unit = createVector(0, 1);

  for (let n = 0; n < N; n++) {
    balls.push(new Ball(n));

    for (let i = 1; i <= M; i++) {
      balls[n].position.y = balls[n].position.y +
        A * sin(2*i * PI * balls[n].position.x / width);
    }
  }
}



function draw() {
  background(0);

  for (let n = 0; n < balls.length; n++) {
    balls[n].amplitude();
  }

  for (let n = 0; n < balls.length; n++) {
    calcForce(n);
    balls[n].addForce(unit.copy().mult(Fn));
  }

  for (let n = 0; n < balls.length; n++) {
    balls[n].update();
    balls[n].show();
    balls[n].trails();
    energy += balls[n].Energy();
  }
  if (frameCount % 60 == 0) {
    console.log("Energy: " + energy);
  }
  energy = 0;

  // realtiveSep();
  showSprings();

}
