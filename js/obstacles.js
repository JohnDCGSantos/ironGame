class Obstacle {
    constructor(gameScreen) {
      this.gameScreen = gameScreen

      this.left = Math.random() * (gameScreen.offsetWidth - this.width);
// Set random initial position along the top edge
      this.top = 0
      this.width = 40
      this.height = 60
      this.element = document.createElement('img')
      this.speed = 5;
      this.element.src = './images/enemyRed4.png';
      this.element.style.position = 'absolute'
  
      this.element.style.width = `${this.width}px`
      this.element.style.height = `${this.height}px`
  
      this.element.style.top = `${this.top}px`
      this.element.style.left = `${this.left}px`
  
      this.gameScreen.appendChild(this.element)
       this.isDestroyed = false;
      this.resetPosition();
    }
  
    resetPosition() {
      this.element.style.left = `${Math.random() * (this.gameScreen.offsetWidth - this.width)}px`;
      this.element.style.top = '0';
    }
    move() {
        const currentTop = parseInt(this.element.style.top, 10);
        const newTop = currentTop + this.speed;
         this.element.style.top = `${newTop}px`;

         if (newTop > this.gameScreen.offsetHeight) {
            this.resetPosition();
          }
        }
        destroy() {
          this.element.remove();
          this.isDestroyed = true;
        }
      }

      
