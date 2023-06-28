class Player {
    constructor(gameScreen) {
      this.gameScreen = gameScreen;
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
    const projectile = new Projectile(this.gameScreen, this.left + this.width / 2, this.top);
    this.projectiles.push(projectile); // Add the projectile to the array
    projectile.launch();
  }
    destroy(){
      this.element.remove();
    }
    
  }


class Projectile {
  constructor(gameScreen, x, y) {
    this.gameScreen = gameScreen;
    this.width = 5;
    this.height = 20;
    this.top = y - this.height;
    this.left = x - this.width / 2;
    this.speed = 5;
    this.element = document.createElement('div');
    this.element.style.position = 'absolute';
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.backgroundColor = 'red';
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.gameScreen.appendChild(this.element);
  }

  launch() {
    const projectileInterval = setInterval(() => {
      this.top -= this.speed;
      this.updatePosition();

      if (this.top + this.height < 0) {
        clearInterval(projectileInterval);
        this.element.remove();
        this.remove(); // Remove the projectile from the player's array
      }
    }, 16);
  }
  remove() {
    // Implement projectile removal logic
    const index = this.player.projectiles.indexOf(this);
    if (index !== -1) {
      this.player.projectiles.splice(index, 1);
    }
  }
  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }
}








  
  