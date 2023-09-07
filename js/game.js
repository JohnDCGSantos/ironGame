class Game {
  constructor() {
    this.startScreen = document.getElementById('startScreen')
    this.gameContainer = document.getElementById('gameContainer')
    this.gameScreen = document.getElementById('gameScreen')
    this.gameStats = document.getElementById('gameStats')
    this.scoreElement = document.getElementById('Score')
    this.livesElement = document.getElementById('Lives')
    this.startButton = document.getElementById('startButton')
    this.restartButton = document.getElementById('restart-button')
    this.gameOverScreen = document.getElementById('gameOverScreen')
    this.stopObstacleCreation = this.stopObstacleCreation.bind(this)

    this.player = new Player(this, this.gameScreen, this.isColliding.bind(this))
    this.width = 350
    this.height = 600
    this.obstacles = []
    this.score = 0
    this.player.updateLives()
    this.player.updateScore()
    this.coinSound = new Audio('./sounds/coin01.wav')
    this.hitSound = new Audio('./sounds/select.wav')
    this.overSound = new Audio('./sounds/GameOver.wav')
    this.isGameOver = false
  }

  start() {
    this.gameScreen.style.width = `${this.width}px`
    this.gameScreen.style.height = `${this.height}px`
    this.startScreen.style.display = 'none'
    this.gameScreen.style.display = 'block'
    this.gameOverScreen.style.display = 'none'

    this.generateObstacle()

    this.gameLoop()
  }

  gameLoop() {
    this.update()

    if (this.isGameOver) {
      return // Stop the game loop
    }
    requestAnimationFrame(() => this.gameLoop()) // Call the move method of the player on each game loop iteration
    //console.log(this.animatedID)
  }

  update() {
    console.log('Update')
    this.player.move()
    this.moveObstacles()
  }

  generateObstacle() {
    setInterval(() => {
      const obstacle = new Obstacle(this.gameScreen)
      this.obstacles.push(obstacle)
    }, 1000)
  }

  moveObstacles() {
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i]
      obstacle.move()

      if (this.isColliding(this.player, obstacle)) {
        this.hitSound.currentTime = 0 // Rewind the sound to the beginning
        this.hitSound.play()
        this.player.decreaseScore()
        this.player.destroy()
        obstacle.destroy() // Destroy the obstacle
        this.obstacles.splice(i, 1)
        i--
        if (this.player.lives <= 0) {
          this.overSound.currentTime = 0 // Rewind the sound to the beginning
          this.overSound.play()
          this.endGame()
          //this.updateScore()
        } // Decrement i to account for the removed obstacle
        break
      }

      for (let j = 0; j < this.player.projectiles.length; j++) {
        const projectile = this.player.projectiles[j]
        if (this.isColliding(projectile, obstacle)) {
          this.coinSound.currentTime = 0 // Rewind the sound to the beginning
          this.coinSound.play()
          obstacle.destroy()
          projectile.destroy()
          this.player.projectiles.splice(j, 1)
          this.player.increaseScore()
          break
        }
      }
    }
    this.obstacles = this.obstacles.filter(obstacle => !obstacle.isDestroyed)
  }

  isColliding(player, obstacle) {
    const playerRect = player.element.getBoundingClientRect()
    const obstacleRect = obstacle.element.getBoundingClientRect()
    return (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    )
  }

  endGame() {
    this.gameScreen.style.display = 'none'

    this.gameContainer.style.display = 'none'
    this.gameOverScreen.style.display = 'block'
    this.gameOverScreen.style.width = '100vw' // Set the desired width
    this.gameOverScreen.style.height = '100vh'
    console.log('Game Over!')
    this.isGameOver = true
    this.stopObstacleCreation()
    this.player.destroy()
    const scoreText = document.createElement('p')
    scoreText.innerText = `Score: ${this.player.score}`

    const restartButton = document.getElementById('restart-button')
    restartButton.parentNode.insertBefore(scoreText, restartButton)
    this.scoreText = scoreText
    this.scoreText.style.width = '100%'
    this.scoreText.style.height = '30%'
    this.scoreText.style.color = 'red'
    this.scoreText.style.fontSize = '30px'

    this.gameOverScreen.appendChild(scoreText)
    this.update

    this.hideElement(this.gameScreen)
    this.showElement(this.gameOverScreen)
    this.hideElement(this.startScreen)
  }

  restartGame() {
    this.isGameOver = false
    this.player.reset()
    this.stopObstacleCreation()
    this.hideElement(this.gameOverScreen)
    this.showElement(this.gameScreen)
    this.generateObstacle()
  }

  stopObstacleCreation() {
    clearInterval(this.obstacleInterval)
  }

  hideElement(element) {
    element.style.display = 'none'
  }

  showElement(element) {
    element.style.display = 'flex'
  }
}
