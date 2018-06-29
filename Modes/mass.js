let springColour, springThickness;
let Fn;
let endPoint;
let kEn, pEn, dx;


class Ball {
  constructor(n, radii = radius, colour = 255) {
    this.position = createVector((n + 1) * rowSep, height / 2);
    this.eqPos = createVector((n + 1) * rowSep, height / 2);
    this.disp = this.position.copy().sub(this.eqPos);
    this.sep = [];
    this.minSep = [];
    this.maxSep = [];
    this.velocity = zero.copy();
    this.acceleration = zero.copy();
    this.colour = colour;
    this.radius = radii;
    this.mass = PI * this.radius * this.radius;
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

  Energy() {
    kEn = 0.5 * this.mass * this.velocity.dot(this.velocity);
    dx = sqrt(this.sep) - rowSep;
    pEn =  T * dx  ;
    return kEn + pEn;
  }

  amplitude() {
    this.disp.set(this.position.copy().sub(this.eqPos));
  }
}

function showSprings() {
  for (i = 0; i < balls.length - 1; i++) {
    springThickness = map(balls[i].sep, balls[i].minSep, balls[i].maxSep, 20, 1);
    springColour = map(balls[i].sep, balls[i].minSep, balls[i].maxSep, 0, 255);

    strokeWeight(springThickness);
    stroke(255, springColour, 255, 200);

    line(balls[i].position.x, balls[i].position.y,
      balls[i + 1].position.x, balls[i + 1].position.y);
  }
  line(0, height / 2, balls[0].position.x, balls[0].position.y);
  line(balls[N - 1].position.x, balls[N - 1].position.y, width, height / 2);
}

function realtiveSep(n) {
  if (n == N - 1) {
    balls[n].sep = endPoint.copy().sub(balls[n].position.copy()).magSq();
  } else {
    balls[n].sep = (balls[n + 1].position.copy().sub(balls[n].position.copy())).magSq();
  }
  if (balls[n].sep > balls[n].maxSep) {
    balls[n].maxSep = balls[n].sep;
  }
  if (balls[n].sep < balls[n].minSep) {
    balls[n].minSep = balls[n].sep;
  }
}

function calcForce(n) {
  if (n == 0) {
    Fn = c * (balls[n + 1].disp.y - 2 * balls[n].disp.y);
  } else if (n == N - 1) {
    Fn = c * (balls[n - 1].disp.y - 2 * balls[n].disp.y);
  } else {
    Fn = c * (balls[n + 1].disp.y + balls[n - 1].disp.y - 2 * balls[n].disp.y);
  }
}
