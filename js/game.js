class Game{
    constructor(gameScreen) {
    this.startScreen = document.getElementById('startScreen');
    this.gameContainer = document.getElementById('gameContainer');
    this.gameScreen = document.getElementById('gameScreen');
    this.gameStats = document.getElementById('gameStats');
    this.scoreElement = document.getElementById('Score');
    this.livesElement = document.getElementById('lives');
    this.startButton = document.getElementById('startButton');
    this.restartButton = document.getElementById('restart-button');
    this.gameOverScreen = document.getElementById('gameOverScreen');
    this.width = 700;
    this.height = 800;
    this.player = new Player(this, this.gameScreen, this.isColliding.bind(this));
    

    this.obstacles = [];
    /*this.isColliding = (player, obstacle) => {
        const playerRect = player.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();
        return (
          playerRect.left < obstacleRect.right &&
          playerRect.right > obstacleRect.left &&
          playerRect.top < obstacleRect.bottom &&
          playerRect.bottom > obstacleRect.top
        );
      };*/
    
    }
   
    start() {
        
        
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.height = `${this.height}px`;
       
    this.startScreen.style.display = 'none';
    this.gameScreen.style.display = 'block';
    this.generateObstacle()
    
    this.gameLoop()
}

    gameLoop() {
      this.update()
      this.moveObstacles()
    requestAnimationFrame(() => this.gameLoop())  // Call the move method of the player on each game loop iteration
    //console.log(this.animatedID)
    
}
update(){
console.log('Update')
this.player.move()


}
generateObstacle() {
  setInterval(() => {
    const obstacle = new Obstacle(this.gameScreen);
    this.obstacles.push(obstacle);
  }, 1000);//pushing to the empty array on line 15
  }
  moveObstacles() {
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();
      
      if (this.isColliding(this.player, obstacle)) {
        this.player.destroy();
        obstacle.destroy(); // Destroy the obstacle
        this.obstacles.splice(i, 1);
        i--;
        if (this.player.lives <= 0) {
        this.endGame();
        } // Decrement i to account for the removed obstacle
        break;
      }
      
      for (let j = 0; j < this.player.projectiles.length; j++) {
        const projectile = this.player.projectiles[j];
  
        if (this.isColliding(projectile, obstacle)) {
          obstacle.destroy();
          projectile.destroy();
          this.player.projectiles.splice(j, 1);
          break;
        }
      }
    }
    this.obstacles = this.obstacles.filter(obstacle => !obstacle.isDestroyed);
  }
  
  isColliding(player, obstacle) {
    const playerRect = player.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();
    return (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    );
  }
  
  endGame() {
    this.gameScreen.style.display = 'none';
    this.gameOverScreen.style.display = 'block'
    this.endGame();

  }
   /* restartGame() {
      this.player.reset();
  this.player.updateScore();
  this.player.updateLives();
  this.gameOverScreen.style.display = 'none';
  this.gameScreen.style.display = 'block';
  this.start();*/
}









  
    // Handle game over
  
    // Handle game over


// Call the move method of each obstacle to update its position
    
