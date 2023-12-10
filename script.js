//
//  JS File
//  YOU CAN REMOVE ALL OF THIS CODE AND START FRESH
//

//
// Variables
//

document.addEventListener('DOMContentLoaded', function () {
  const cells = document.querySelectorAll('.cell');
  const status = document.querySelector('.status');
  const restartButton = document.getElementById('restartButton');

  // Variables
  let currentPlayer = 'X';
  let gameActive = true;
  let gameState = ['', '', '', '', '', '', '', '', ''];
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let playerXScore = 0;
  let playerOScore = 0;

  // Functions

  function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
      return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkWin();
    checkDraw();
    clickedCell.classList.add('animate-pop')
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }

  function checkWin() {
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (
        gameState[a] !== '' &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        gameActive = false;
        const winner = gameState[a];
        let victoryMessage = '';
        
        if (winner === 'X') {
          victoryMessage = "Player X wins! Congratulations!";
          playerXScore++;
          document.getElementById('playerXScore').textContent = playerXScore;
        } else {
          victoryMessage = "Player O wins! Congratulations!";
          playerOScore++;
          document.getElementById('playerOScore').textContent = playerOScore;
        }
        
        status.textContent = victoryMessage;
        
        const victoryScreen = document.querySelector('.victory-screen');
        const victoryMessageElement = document.querySelector('.victory-message');
        victoryMessageElement.textContent = victoryMessage;
        victoryScreen.style.display = 'block';
        status.textContent = '';

        setTimeout(() => {
          victoryScreen.style.display = 'none';
          handleRestartGame();
        }, 1500);

        
        return;
      }
    }
  }

  function checkDraw() {
    if (!gameState.includes('') && gameActive) {
      gameActive = false;
      status.textContent = "It's a draw!";
    }
  }

  function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
      cell.textContent = '';
    });
  }

  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });

  restartButton.addEventListener('click', handleRestartGame);
});

//
// Bubble Effect Background
//

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      }
    },
    "opacity": {
      "value": 0.5,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 10,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 80,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 300,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 250,
        "size": 0,
        "duration": 2,
        "opacity": 0,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});
//
// Inits & Event Listeners
//

inititialise();
