//Andie Harty, Thomas Field, Edmund Trang
let food
let snake
let scl = 10
let cols
let rows

function setup() {
  createCanvas(600, 600)
  frameRate(20)
  //grid
  cols = floor(width / scl)
  rows = floor(height / scl)
  snake = new Snake()
  spawn()
}

//random location of food
function spawn() {
  let x = floor(random(cols))
  let y = floor(random(rows))
  food = createVector(x, y)
}

//change direction of movement
function keyPressed() {
    if (keyCode === UP_ARROW) {
      snake.dir(0, -1)
    }
    else if (keyCode === DOWN_ARROW) {
      snake.dir(0, 1)
    }
    else if (keyCode === RIGHT_ARROW) {
      snake.dir(1, 0)
    }
    else if (keyCode === LEFT_ARROW) {
      snake.dir(-1, 0)
    }
}


class Snake {
  constructor() {
    this.body = []
    //snake head
    this.body[0] = createVector(0, 0)
    this.vx = 1
    this.vy = 0
    this.total = 1
  }

  eat(pos) {
    //is snake head touching food
    let d = dist(this.body[0].x, this.body[0].y, pos.x, pos.y);
    if (d == 0) {
      this.total++
      return true;
    }
    else {
      return false;
    }
  }

  dir(x, y) {
    this.vx = x
    this.vy = y
  }

  death() {
    //has snake hit an edge
    let x = this.body[0].x
    let y = this.body[0].y
    if (x < 0 || x > cols || y < 0 || y > rows) {
      return true;
    }
    //has snake hit itself
    for (let i = 1; i < this.body.length; i++) {
      if (this.body[0].x == this.body[i].x && this.body[0].y == this.body[i].y) {
        return true;
      }
    }
    return false;
  }

  move() {
    //shift body segments
    for (let a = 1; a < this.body.length - 1; a++) {
      this.body[a] = this.body[a + 1];
    }
    if (this.total >= 1) {
      this.body[this.total - 1] = createVector(this.body[0].x, this.body[0].y);
    }

    this.body[0].x += this.vx
    this.body[0].y += this.vy
  }

  show() {
    noStroke()
    fill(255)
    //draw body
    for (let b = 1; b < this.body.length; b++) {
      rect(this.body[b].x, this.body[b].y, 1, 1);
    }
    //draw snake head
    rect(this.body[0].x, this.body[0].y, 1, 1)
  }
}

function draw() {
  //scale into grid
  scale(scl)
  background(100)
  if(snake.eat(food)) {
    spawn()
  }
  if(snake.death()) {
    background(0)
    noLoop()
  }
  snake.move()
  snake.show()
  //draw food
  fill(255, 0, 0)
  rect(food.x, food.y, 1, 1)
}
