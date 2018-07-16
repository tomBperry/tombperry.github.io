let balls = [];
let zero, unit;
let rowSep;
let Fn, f0;
let mouseToggle = 0;

const radius = 4;
const T = 20;
const damping = 0.999;
const N = 1000;
const M = 1;


function setup() {
  createCanvas(1536, 770);
  colorMode(RGB, 255);
  const A = 0.5 * height / M
  rowSep = width / (N + 1);;
  zero = createVector();
  unit = createVector(0, 1);

  for (let n = 0; n < N; n++) {
    balls.push(new Ball(n));

    //     for (let i = 0; i <= M; i++) {
    //       balls[n].position.y = balls[n].position.y +
    //         A * sin(i * PI * balls[n].position.x / width);
    //     }
  }

}

function draw() {
  background(0);

  if (mouseToggle) {
    for (let i = 0; i < balls.length; i++) {
      dx2 = balls[i].position.x - mouseX;
      dy2 = balls[i].position.y - mouseY;
      dx2 = dx2 * dx2;
      dy2 = dy2 * dy2;
      if (dx2 + dy2 < balls[i].radius * balls[i].radius) {
        balls[i].dragged = true;
        break;
      }
    }
  }


  for (let n = 0; n < balls.length; n++) {
    balls[n].angle = calcAngle(n);
  }
  dy = balls[0].position.y - (height / 2);
  theta0 = dy / rowSep;

  f0 = T * (sin(balls[0].angle) - sin(theta0)); //T * (balls[0].angle - theta0);
  balls[0].addForce(unit.copy().mult(f0));

  for (let n = 1; n < balls.length; n++) {
    Fn = T * (sin(balls[n].angle) - sin(balls[n - 1].angle)); // T * (balls[n].angle - balls[n - 1].angle);
    balls[n].addForce(unit.copy().mult(Fn));
  }

  for (let n = 0; n < balls.length; n++) {
    balls[n].update();
    balls[n].show();

    if (mouseToggle) {
      if (balls[n].dragged == true) {
        balls[n].position.y = mouseY;
        console.log("Mouse: " + n);
      }
    }
  }
}

function mousePressed() {
  if (mouseToggle) {
    mouseToggle = 0;
    for (let ball of balls) {
      ball.dragged = 0;
    }
  } else {
    mouseToggle = 1;
  }
}
