const radius = 5;
const trailLength = 200;

const xDot0 = 0.1;
const yDot0 = 0.1;

const wallDamping = 1;
const collisionDamping = 1;
const damping = 1;

let rowNum;
let energy = 0;
let wall_x, wall_y;
let springColour, springThickness;


class Ball {
  constructor(x0, x = 0, y = 0, radii = radius, vx0 = 0, vy0 = 0, trail = false, colour = 255) {
    this.position = createVector(x, y);
    this.eqPos = createVector(x0, height/2);
    this.displacement = this.position.x - this.eqPos.x;
    this.velocity = createVector(vx0, vy0);
    this.maxAmp = 0;
    this.acceleration = zero.copy();
    this.colour = colour;
    this.radius = radii;
    this.mass = PI * this.radius * this.radius;
    if (trail) {
      this.trail = [];
    }
  }

  update() {
    this.displacement = this.position.x - this.eqPos.x;
    this.velocity.add(this.acceleration);
    this.velocity.mult(damping);
    this.position.add(this.velocity);
    this.acceleration.set(zero);
  }

  addForce(force) {
    this.acceleration.add(force.div(this.mass))
  }

  show() {
    //noStroke();
    fill(this.colour);
    stroke(this.colour);
    strokeWeight(2);
    //noFill();
    ellipse(this.position.x, this.position.y, 2 * this.radius);
  }

  trails() {
    this.trail.push(this.position.x, this.position.y);
    if (this.trail.length > 2 * trailLength) {
      this.trail.splice(0, 2);
    }

    stroke(this.colour);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let i = 0; i < this.trail.length; i += 2) {
      vertex(this.trail[i], this.trail[i + 1]);
    }
    endShape();
  }

  bounce() {

    wall_x = width - this.radius;
    wall_y = height - this.radius

    if (this.position.x > wall_x) {
      let widthOverlap = this.position.x - wall_x;
      if (abs(this.velocity.x) < 0.5) {
        this.velocity.x = this.velocity.x - 0.1;
      }
      this.velocity.x = -wallDamping * abs(this.velocity.x);
    }

    if (this.position.x < this.radius) {
      let lowerWidthOverlap = this.position.x - this.radius;
      this.velocity.x = wallDamping * abs(this.velocity.x);
    }

    if (this.position.y > wall_y) {
      let heightOverlap = this.position.y - height + this.radius;
      if (abs(this.velocity.y) < 0.5) {
        this.velocity.y = this.velocity.y - 0.1;
      }
      this.velocity.y = -wallDamping * abs(this.velocity.y);
    }

    if (this.position.y < this.radius) {
      let lowerWidthOverlap = this.position.y - this.radius;
      this.velocity.y = wallDamping * abs(this.velocity.y);;
    }
  }

  kEnergy() {
    return 0.5 * this.mass * this.velocity.dot(this.velocity);
  }

  amplitude() {
    if (this.displacement > this.maxAmp) {
      this.maxAmp = this.displacement;
      // console.log(this.maxAmp);
    }
  }

}


function collide(a, b) {

  let unitDisp = b.position.copy().sub(a.position.copy());
  unitDisp.normalize();

  let VaVbDiff = a.velocity.copy().sub(b.velocity.copy());
  let vDiff = VaVbDiff.mag();

  let theta = abs(p5.Vector.angleBetween(unitDisp, VaVbDiff));

  let ma = a.mass;
  let mb = b.mass;

  let vVcm = a.velocity.copy().mult(ma);
  vVcm.add(b.velocity.copy().mult(mb));
  vVcm.div(ma + mb);

  let vaTemp = unitDisp.copy().mult(-vDiff * mb / (ma + mb) * collisionDamping);
  let vbTemp = unitDisp.copy().mult(vDiff * ma / (ma + mb) * collisionDamping);

  a.velocity.set(vaTemp.add(vVcm));
  b.velocity.set(vbTemp.add(vVcm));
}

function distanceSq(a, b) {
  let dx = a.position.x - b.position.x;
  let dy = a.position.y - b.position.y;
  return dx * dx + dy * dy;
}

function showSprings() {
  for (i = 0; i < 2; i++) {
    springThickness = map(abs(balls[i].displacement), 0, balls[i].maxAmp, 10, 1);
    springColour = map(abs(balls[i].displacement),0, balls[i].maxAmp, 100, 255);
    stroke(springColour, 100, 100);
    strokeWeight(springThickness);
    // console.log(springColour);
    // console.log(springThickness);
    line(balls[i].eqPos, height / 2, balls[i].position.x, height / 2);
  }

  // line(balls[0].position.x, height/2, balls[1].position.x, height/2);
}
