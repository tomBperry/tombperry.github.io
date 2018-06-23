const M = 10;
const N = M + 0;

let balls = [];

let energy = 0;

let fps;
let avgFPS = 60;
let count = 0;

let timesLagged = 0;
let mouseToggled = true;
let wall_x, wall_y;


function setup() {
  createCanvas(700, 200);
  rowNum = floor(width / (2 * radius + 1));

  for (let n = 0; n < N; n++) {
    if (n < N - M) { // Need to change if using for kinematics (add no of free particles)
      balls[n] = new Ball(n);
    } else {
      balls[n] = new Ball(n, 0, 0, 0, 0, true, 2 * radius, 151);
    }
  }

  balls[N + 0] = new Ball(-1, width * (0.3), height / 2, 0, 0, true, 3 * radius);
  balls[N + 1] = new Ball(-1, width * (0.3), height / 2, 5, 0, true, 0.9 * radius);
  balls[N + 2] = new Ball(-1, width * (0.5), height / 2, 0, 0, true, 2 * radius);

}
// Bouncing randomly???/

function draw() {
  background(0);

  for (let n = 0; n < balls.length; n++) {
    balls[n].bounce();
    balls[n].move();
    energy += balls[n].kEnergy();
    if (n >= balls.length - M) {
      balls[n].show();
      balls[n].trails();
    }
  }

  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      if (distanceSq(balls[i], balls[j]) < (balls[i].radius + balls[j].radius) * (balls[i].radius + balls[j].radius)) {
        collide(balls[i], balls[j]);
      }
    }
  }
}
