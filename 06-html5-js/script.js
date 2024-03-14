const game = {
  canvas: document.getElementById("canvas1"),
  ctx: null,
  paddle: null,
  ball: null,
  score: 0,
  gameOver: false,

  init() {
    this.ctx = this.canvas.getContext("2d");
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.draw();
    this.gameLoop();
  },

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.paddle.draw();
    this.ball.draw();
    this.drawScore();
  },

  gameLoop() {
    if (!this.gameOver) {
      this.update();
      this.draw();
      requestAnimationFrame(this.gameLoop.bind(this));
    }
  },

  update() {
    this.paddle.update();
    this.ball.update();
    this.checkCollision();
    if (this.ball.y + this.ball.radius > this.canvas.height) {
      this.gameOver = true;
      this.showGameOverPopup();
    }
  },

  drawScore() {
    this.ctx.font = "24px Georgia, 'Times New Roman', Times, serif";
    this.ctx.fillStyle = "#8b4513";
    this.ctx.fillText("Score: " + this.score, this.canvas.width - 100, 30);
  },

  checkCollision() {
    if (
      this.ball.y + this.ball.radius > this.paddle.y &&
      this.ball.x > this.paddle.x &&
      this.ball.x < this.paddle.x + this.paddle.width
    ) {
      this.ball.dy = -this.ball.dy;
      this.score++;
    }
  },

  showGameOverPopup() {
    document.getElementById("finalScore").textContent = this.score;
    document.getElementById("gameOverPopup").style.display = "flex";
    document.getElementById("retryButton").addEventListener("click", () => {
      this.restartGame();
    });
  },

  restartGame() {
    if (!this.gameOver) {
      return;
    }
    this.score = 0;
    this.gameOver = false;
    this.ball.resetSpeed();
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height / 2;
    this.paddle.x = (this.canvas.width - this.paddle.width) / 2;
    document.getElementById("gameOverPopup").style.display = "none";
    this.gameLoop();
  },
};

class Paddle {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 15;
    this.x = (game.canvas.width - this.width) / 2;
    this.y = game.canvas.height - this.height - 10;
    this.speed = 7;
    this.moveRight = false;
    this.moveLeft = false;
    this.cornerRadius = 7;
    this.floatOffset = 5;
  }

  draw() {
    this.game.ctx.beginPath();
    this.game.ctx.moveTo(this.x + this.cornerRadius, this.y);
    this.game.ctx.arcTo(
      this.x + this.width,
      this.y,
      this.x + this.width,
      this.y + this.height,
      this.cornerRadius
    );
    this.game.ctx.arcTo(
      this.x + this.width,
      this.y + this.height,
      this.x,
      this.y + this.height,
      this.cornerRadius
    );
    this.game.ctx.arcTo(
      this.x,
      this.y + this.height,
      this.x,
      this.y,
      this.cornerRadius
    );
    this.game.ctx.arcTo(
      this.x,
      this.y,
      this.x + this.width,
      this.y,
      this.cornerRadius
    );
    this.game.ctx.closePath();

    this.game.ctx.fillStyle = "#8b4513";
    this.game.ctx.fill();
  }

  update() {
    if (this.moveRight && this.x + this.width < this.game.canvas.width) {
      this.x += this.speed;
    } else if (this.moveLeft && this.x > 0) {
      this.x -= this.speed;
    }

    const floatingAmplitude = 5;
  }
}

class Ball {
  constructor(game) {
    this.game = game;
    this.radius = 10;
    this.x = this.game.canvas.width / 2;
    this.y = this.game.canvas.height / 2;
    this.initialSpeed = 3;
    this.dx = this.initialSpeed;
    this.dy = -this.initialSpeed;
  }

  draw() {
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.game.ctx.fillStyle = "#8b4513";
    this.game.ctx.fill();
    this.game.ctx.closePath();
  }

  update() {
    if (
      this.x + this.radius > this.game.canvas.width ||
      this.x - this.radius < 0
    ) {
      this.dx = -this.dx;
    }
    if (this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    if (this.y + this.radius > this.game.canvas.height) {
      // Game Over
    }
    this.x += this.dx;
    this.y += this.dy;
  }

  resetSpeed() {
    this.dx = this.initialSpeed;
    this.dy = -this.initialSpeed;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key == "Right" || e.key == "ArrowRight") {
    game.paddle.moveRight = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    game.paddle.moveLeft = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key == "Right" || e.key == "ArrowRight") {
    game.paddle.moveRight = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    game.paddle.moveLeft = false;
  }
});

game.init();
