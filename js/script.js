window.addEventListener('load', () => {
  const startButton = document.getElementById('startButton')
  const restartButton = document.getElementById('restart-button')
  let game
  let gameSound

  function startGame() {
    console.log('start game')
    game = new Game()
    game.start()

    let touchStartX = null
    let touchStartY = null

    document.addEventListener('touchstart', event => {
      const touch = event.touches[0]
      touchStartX = touch.clientX
      touchStartY = touch.clientY
    })

    document.addEventListener('touchmove', event => {
      if (touchStartX === null || touchStartY === null) {
        return
      }

      const touch = event.touches[0]
      const touchX = touch.clientX
      const touchY = touch.clientY

      const deltaX = touchX - touchStartX
      const deltaY = touchY - touchStartY

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        game.player.directionX = deltaX > 0 ? 5 : -5
        game.player.directionY = 0
      } else {
        // Vertical swipe
        game.player.directionX = 0
        game.player.directionY = deltaY > 0 ? 5 : -5
      }

      touchStartX = touchX
      touchStartY = touchY
    })

    document.addEventListener('touchend', () => {
      game.player.directionX = 0
      game.player.directionY = 0
    })

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
  })
})
