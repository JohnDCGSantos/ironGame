class Game{
    constructor() {
    this.startScreen = document.getElementById('startScreen');
    this.gameContainer = document.getElementById('gameContainer');
    this.gameScreen = document.getElementById('gameScreen');
    this.gameStats = document.getElementById('gameStats');
    this.scoreElement = document.getElementById('score');
    this.livesElement = document.getElementById('lives');
    this.startButton = document.getElementById('startButton');
    this.restartButton = document.getElementById('restartButton');
    this.gameOverScreen = document.getElementById('gameOverScreen');
    this.width = 700;
    this.height = 800;
    this.player = new Player(this.gameScreen);
    this.obstacles = [];
    this.isColliding = (player, obstacle) => {
        const playerRect = player.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();
        return (
          playerRect.left < obstacleRect.right &&
          playerRect.right > obstacleRect.left &&
          playerRect.top < obstacleRect.bottom &&
          playerRect.bottom > obstacleRect.top
        );
      };
    
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
    const obstacle = new Obstacle(this.gameScreen);
    this.obstacles.push(obstacle); //pushing to the empty array on line 15
  }
  moveObstacles() {
    for (let i = 0; i < this.obstacles.length; i++) {
        const obstacle = this.obstacles[i];
        obstacle.move();
        if (this.isColliding(this.player, obstacle)) {
          this.player.destroy();
          this.obstacles.splice(i, 1); // Remove the obstacle from the array
          i--; // Decrement i to account for the removed obstacle
          this.endGame();
          break;
        }
  
        for (let j = 0; j < this.player.projectiles.length; j++) {
          const projectile = this.player.projectiles[j];
          if (this.isColliding(projectile, obstacle)) {
            this.player.projectiles.splice(j, 1); // Remove the projectile from the array
            j--; // Decrement j to account for the removed projectile
            this.obstacles.splice(i, 1); // Remove the obstacle from the array
            i--; // Decrement i to account for the removed obstacle
            break;
          }
        }
    }
}

  endGame() {
    // Handle game over
  }
} // Call the move method of each obstacle to update its position
    
