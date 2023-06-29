window.addEventListener('load', () => {
  const startButton = document.getElementById('startButton')
  const restartButton = document.getElementById('restart-button')
  
  
  
  let game
 let gameSound
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
            game.player.directionX = -5
            break
          case 'ArrowUp':
            game.player.directionY = -5
            break
          case 'ArrowRight':
            game.player.directionX = 5
            break
          case 'ArrowDown':
            game.player.directionY = 5
            break
        }
      } else if (key === ' ') {
        game.player.fireProjectile()
        playShootSound()
      
      //console.log(game.player.directionX, game.player.directionY);
      }
      });

      function playShootSound() {
        const shootSound = new Audio('./sounds/laser_shooting_sfx.wav');
        shootSound.currentTime = 0; // Rewind the sound to the beginning
        shootSound.play();
      }
  
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
  //function restartGame() {
    //console.log('Restart game');
    //game.restartGame();
    //restartButton.addEventListener('click', restartGame);
  // Remove the existing event listener for the restart button
  //restartButton.removeEventListener('click', restartGame);
  //}
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
  gameSound = new Audio('./sounds/S31-Night Prowler.ogg')
  gameSound.muted = true;
  startButton.addEventListener('click', function () {
    startGame()
    gameSound.muted = false; // Unmute the audio on user interaction
  gameSound.play();
  })

  
  restartButton.addEventListener('click', ()=> {
    location.reload()
  });
  const audioElement = document.createElement('audio');

// Set the source file of the audio
audioElement.src = './sounds/SpaceAtmosphere.mp3';

// Set any additional attributes or properties
//audioElement.autoplay = true; // Autoplay the audio
//audioElement.loop = true; // Loop the audio
//audioElement.volume = 0.5; // Set the volume (0.0 to 1.0)

// Append the audio element to the start screen or desired container
const startScreen = document.getElementById('startScreen'); // Replace 'startScreen' with your start screen element ID
startScreen.appendChild(audioElement);


})
