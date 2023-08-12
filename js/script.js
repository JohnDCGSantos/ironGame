window.addEventListener('load', () => {
  const startButton = document.getElementById('startButton');
  const restartButton = document.getElementById('restart-button');
  let game;
  let gameSound;
  
  function startGame() {
    
    console.log('start game');
    game = new Game();
    game.start();
    
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
    }else if (key === ' ') {
           game.player.fireProjectile();
           playShootSound();
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
  }

  startButton.addEventListener('click', function () {
  startGame();
  gameSound.muted = false; // Unmute the audio on user interaction
  gameSound.play();
  })
  gameSound = new Audio('./sounds/S31-Night Prowler.ogg')
  gameSound.muted = true;
  
  
  restartButton.addEventListener('click', ()=> {
  location.reload()
  });
  
})