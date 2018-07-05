let springColour, springThickness;
let dy, theta;

class Ball {
  constructor(n, radii = radius, colour = 255) {
    this.angle = 0

    this.position = createVector((n + 1) * rowSep, height / 2);
    this.velocity = zero.copy();
    this.acceleration = zero.copy();

    this.colour = colour;
    this.radius = radii;
    this.mass = PI * this.radius * this.radius;
  }

  update() {
    this.velocity.add(this.acceleration.copy());
    this.position.add(this.velocity.copy());
    // this.velocity.mult(damping);
    this.acceleration.set(zero);
  }

  addForce(force) {
    this.acceleration.add(force.copy().div(this.mass));
  }

  show() {
    fill(this.colour);
    noStroke();
    // stroke(this.colour, 150);
    // strokeWeight(this.radius);
    ellipse(this.position.x, this.position.y, 2 * this.radius);
  }
}

function calcAngle(n) {
  if (n == N - 1) {
    dy = height / 2 - balls[n].position.y;
  } else {
    dy = balls[n + 1].position.y - balls[n].position.y;
  }
  return theta = atan(dy / rowSep);
}
