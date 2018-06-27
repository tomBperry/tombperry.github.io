let springColour, springThickness;
let sep;
let minSep = 100;
let maxSep = 100;
let dx, dy, theta;


class Ball {
  constructor(n, radii = radius, vx0 = 0, vy0 = 0, trail = false, colour = 255) {
    this.position = createVector((n + 1) * rowSep, height / 2);
    this.eqPos = this.position;
    this.disp = this.position.copy().sub(this.eqPos);
    this.angle = 0
    this.maxAmp = 0;
    this.velocity = createVector(vx0, vy0);
    this.acceleration = zero.copy();
    this.colour = colour;
    this.radius = radii;
    this.mass = PI * this.radius * this.radius;
    if (trail) {
      this.trail = [];
    }
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity.copy());
    this.velocity.mult(damping);
    this.acceleration.mult(0);
  }

  addForce(force) {
    this.acceleration.add(force.copy().div(this.mass));
  }

  show() {
    fill(this.colour);
    stroke(this.colour, 150);
    strokeWeight(2);
    ellipse(this.position.x, this.position.y, 2 * this.radius);
  }

  trails() {
    this.trail.push(this.position.x, this.position.y);
    if (this.trail.length > 2 * trailLength) {
      this.trail.splice(0, 2);
    }

    stroke(this.colour);
    strokeWeight(0.2);
    noFill();
    beginShape();
    for (let i = 0; i < this.trail.length; i += 2) {
      vertex(this.trail[i], this.trail[i + 1]);
    }
    endShape();
  }

  kEnergy() {
    return 0.5 * this.mass * this.velocity.dot(this.velocity);
  }

  amplitude() {
    this.disp.set(this.position.copy().sub(this.eqPos));
    if (this.disp.mag() > this.maxAmp) {
      this.maxAmp = this.disp.mag();
      return this.maxAmp;
    }
  }
}

function distanceSq(a, b) {
  let dx = a.position.x - b.position.x;
  let dy = a.position.y - b.position.y;
  return dx * dx + dy * dy;
}

function showSprings() {
  springThickness = map(abs((balls[0].position.copy().sub(balls[1].position)).mag()),
    minSep, maxSep, 10, 5);
  springColour = map(abs((balls[0].position.copy().sub(balls[1].position)).mag()),
    minSep, maxSep, 0, 100);
  strokeWeight(springThickness);
  stroke(100, springColour, 200, 200);
  line(balls[0].position.x, balls[0].position.y, balls[1].position.x,
    balls[1].position.y);

  for (i = 0; i < balls.length; i++) {
    springThickness = map(abs(balls[i].disp.mag()), 0, balls[i].maxAmp, 10, 5);
    springColour = map(abs(balls[i].disp.mag()), 0, balls[i].maxAmp, 100, 255);
    stroke(springColour, 0, 0, 150);
    strokeWeight(springThickness);
    line(0 + i * width, balls[i].eqPos.y,
      balls[i].position.x, balls[i].position.y);
  }
}

function realtiveSep() {
  sep = abs((balls[0].position.copy().sub(balls[1].position.copy())).mag());

  if (sep > maxSep) {
    maxSep = sep;
  }
  if (sep < minSep) {
    minSep = sep;
  }
}

function calcAngle(n) {
  if(n == N - 1) {
    dx = -width + balls[n].position.x;
    dy = -height/2 + balls[n].position.y;
  } else {
    dx = balls[n + 1].position.x - balls[n].position.x;
    dy = balls[n + 1].position.y - balls[n].position.y;
  }
  return theta = atan(dy / dx);
}
