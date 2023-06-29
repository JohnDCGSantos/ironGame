

class Player {
    constructor(game, gameScreen, isColliding) {
      this.gameScreen = gameScreen;
      this.game = game;
      this.setGame(game)
      this.width = 50;
      this.height = 80;
      this.top = 700;
      this.left = 322;
      this.directionX = 0;
      this.directionY = 0;
      this.element = document.createElement('img');
      this.element.src = './images/playerShip1_blue.png';
      this.element.style.position = 'absolute';
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.top = `${this.top}px`;
      this.element.style.left = `${this.left}px`;
      this.gameScreen.appendChild(this.element);
      this.projectiles = [];
this.isColliding = isColliding
this.lives = 5
this.score = 0
this.scoreElement =  document.getElementById('Score')
//this.game.scoreElement = document.getElementById('Score');
    this.livesElement = document.getElementById('Lives');
    this.updateScore();
    this.updateLives();
    this.liveDisplay = document.getElementById('Lives');
    this.scoreDisplay = document.getElementById('Score')
   
    }

    setGame(game) {
      this.game = game;
    }
  
    move() {
     
      this.left += this.directionX
      this.top += this.directionY
    
      if (this.left < 10) {
        this.left = 10
      }
      if (this.top < 10) {
        this.top = 10
      }
      // handles right hand side
      if (this.left > this.gameScreen.offsetWidth - this.width - 50) {
        this.left = this.gameScreen.offsetWidth - this.width - 50
      }
  
      // handles bottom side
      if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
        this.top = this.gameScreen.offsetHeight - this.height - 10
      }
      this.updatePosition()
    }

   updatePosition() {
    this.element.style.top = `${this.top}px`
    this.element.style.left = `${this.left}px`
   }

   fireProjectile() {
    const projectile = new Projectile(
      this.gameScreen, 
      this.projectiles,
      this.left + this.width / 2, 
      this.top,
      this.isColliding
      );
    this.projectiles.push(projectile); // Add the projectile to the array
    projectile.launch();
  }
    destroy(){
      this.isDestroyed = true;
  this.element.classList.add('player--destroyed');
  this.decreaseLives(); // Add this line to decrement lives when destroyed
}

  
    
  
 updateScore() {
    /*if (this.scoreElement) {
      if(this.score)
    }*/
    this.game.scoreElement.textContent = `Score: ${this.score}`
  }

  updateLives() {
    if (this.livesElement) {
      if (this.lives <= 0) {
        this.livesElement.textContent = 'Game Over';
        // Add code here to transition to the game over screen or perform any other desired actions
      } else {
        this.livesElement.textContent = `Lives: ${this.lives}`;
      }
    }
  }
    //this.livesElement.textContent = `Lives: ${this.lives}`
  

  updateLivesDisplay() {
    this.liveDisplay.textContent = this.lives;
  }
  decreaseLives() {
    this.lives--;
    this.livesElement.textContent = `Lives: ${this.lives}`
    /*this.updateLives();
    this.updateLivesDisplay();
    if (this.lives <= 0) {
      game.game.endGame();
    }*/
  }
  increaseScore(){
    this.score+=10;
    this.updateScore()
    //this.scoreElement.textContent `Score: ${this.score}`
  }

  decreaseScore(){
    this.score-=5;
    this.updateScore()
  }

  
  
  reset() {
    this.element.classList.remove('destroyed');
    
   
  }
}


class Projectile {
  constructor(gameScreen, projectiles, x, y, isColliding) {
    this.gameScreen = gameScreen;
    this.projectiles = projectiles
    this.width = 5;
    this.height = 10;
    this.top = y - this.height;
    this.left = x - this.width / 2;
    this.speed = 20;
    this.element = document.createElement('div');
    this.element.style.position = 'absolute';
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.backgroundColor = 'red';
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.gameScreen.appendChild(this.element);
    this.isColliding = isColliding
    this.move = this.move.bind(this);
   
  }
  destroy() {
    this.element.remove();
  }
  launch() {
    const projectileInterval = setInterval(() => {
      this.move();

      if (this.top + this.height < 0) {
        clearInterval(projectileInterval);
        this.element.remove();
        this.remove(); // Remove the projectile from the player's array
      }
    }, 16);
  }


  move() {
    this.top -= this.speed;
    this.updatePosition();

    for (let i = 0; i < this.projectiles.length; i++) {
      const projectile = this.projectiles[i];

      if (projectile !== this && this.isColliding(projectile, this)) {
        projectile.destroy();
        this.destroy();
      
        break;
      }
    }
  }


  remove() {
    // Implement projectile removal logic
    const index = this.projectiles.indexOf(this);
    if (index !== -1) {
      this.projectiles.splice(index, 1);
    }
    this.element.remove()
  }
  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    
  }
}







  
  