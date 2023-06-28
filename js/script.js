window.addEventListener('load', () => {
  const startButton = document.getElementById('startButton')
  const restartButton = document.getElementById('restart-button')
  let game

  function startGame() {
    console.log('start game')

    game = new Game()
    game.start()
  
    document.addEventListener('keydown', event => {
    const key = event.key
    const possibleKeystrokes = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown' ]
      if (possibleKeystrokes.includes(key)) {
        // Update player's directionX and directionY based on the key pressed
        switch (key) {
          case 'ArrowLeft':
            game.player.directionX = -1
            break
          case 'ArrowUp':
            game.player.directionY = -1
            break
          case 'ArrowRight':
            game.player.directionX = 1
            break
          case 'ArrowDown':
            game.player.directionY = 1
            break
        }
      } else if (key === ' ') {
        game.player.fireProjectile()
      
      
      //console.log(game.player.directionX, game.player.directionY);
      }
      });
  
    document.addEventListener('keyup', event => {
      const key = event.key
      const possibleKeystrokes = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown']

      if (possibleKeystrokes.includes(key)) {
        // Update player's directionX and directionY based on the key pressed
        switch (key) {
          case 'ArrowLeft':
          case 'ArrowRight':
            game.player.directionX = 0
            break
          case 'ArrowUp':
          case 'ArrowDown':
            game.player.directionY = 0
            break
        }
      }
    })

    /*document.addEventListener('DOMContentLoaded', () => {
      // ...existing code...
    
      const gameOverScreen = document.getElementById('gameOverScreen');
      gameOverScreen.addEventListener('click', () => {
        game.restartGame();
      });
    
      // ...existing code...
    });*/
  }
  function restartGame() {
    console.log('Restart game');
    game.restartGame();
    restartButton.addEventListener('click', restartGame);
  // Remove the existing event listener for the restart button
  restartButton.removeEventListener('click', restartGame);
  }
    /*console.log('Restart game');

    // Reset game screen
    const gameScreen = document.getElementById('gameScreen');
    gameScreen.innerHTML = '';

    // Show game container
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.style.display = 'flex';

    // Hide game over screen
    const gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.style.display = 'none';

    // Reset game instance
    game = null;

    // Start the game
    startGame();
  }*/

  startButton.addEventListener('click', function () {
    startGame()
  })
  
  restartButton.addEventListener('click', ()=> {
    location.reload()
  });
})
