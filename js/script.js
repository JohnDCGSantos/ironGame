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
      const possibleKeystrokes = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown']
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
    })

    function playShootSound() {
      const shootSound = new Audio('./sounds/laser_shooting_sfx.wav')
      shootSound.currentTime = 0 // Rewind the sound to the beginning
      shootSound.play()
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
    startGame()
    gameSound.muted = false // Unmute the audio on user interaction
    gameSound.play()
  })
  gameSound = new Audio('./sounds/S31-Night Prowler.ogg')
  gameSound.muted = true

  restartButton.addEventListener('click', () => {
    location.reload()
  })

  document.addEventListener('touchstart', handleTouchStart)
  document.addEventListener('touchend', handleTouchEnd)

  let touchStartX = 0
  let touchStartY = 0
  let shooting = false

  function handleTouchStart(event) {
    const touch = event.touches[0] // Get the first touch point
    touchStartX = touch.clientX
    touchStartY = touch.clientY
  }

  function handleTouchEnd(event) {
    const touch = event.changedTouches[0] // Get the first touch point that ended
    const touchEndX = touch.clientX
    const touchEndY = touch.clientY

    // Calculate the difference in touch coordinates
    const deltaX = touchEndX - touchStartX
    const deltaY = touchEndY - touchStartY

    // Adjust player's direction based on the touch gesture
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > 0) {
        game.player.directionX = 5 // Swipe right
      } else {
        game.player.directionX = -5 // Swipe left
      }
      game.player.directionY = 0 // Reset vertical direction
    } else {
      // Vertical swipe
      if (deltaY > 0) {
        game.player.directionY = 5 // Swipe down
      } else {
        game.player.directionY = -5 // Swipe up
      }
      game.player.directionX = 0 // Reset horizontal direction
    }

    // Check for a tap gesture to simulate shooting
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      if (!shooting) {
        game.player.fireProjectile()
        playShootSound()
        shooting = true

        // Set a timeout to reset the shooting state after a delay
        setTimeout(() => {
          shooting = false
        }, 500) // Adjust the delay as needed
      }
    }
  }
})
