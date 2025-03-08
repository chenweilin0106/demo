document.addEventListener('DOMContentLoaded', () => {
    const rollDiceButton = document.getElementById('roll-dice');
    const endTurnButton = document.getElementById('end-turn');
    const playerInfo = document.getElementById('player-info');
    const gameBoard = document.getElementById('game-board');
  
    let currentPlayer = 1;
    const players = [
      { id: 1, position: 0, money: 1500, element: createPlayerElement(1) },
      { id: 2, position: 0, money: 1500, element: createPlayerElement(2) }
    ];
  
    rollDiceButton.addEventListener('click', () => {
      const diceRoll = Math.floor(Math.random() * 6) + 1;
      movePlayer(currentPlayer, diceRoll);
    });
  
    endTurnButton.addEventListener('click', () => {
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      updatePlayerInfo();
    });
  
    function createPlayerElement(playerId) {
      const playerElement = document.createElement('div');
      playerElement.classList.add('player');
      playerElement.id = `player-${playerId}`;
      gameBoard.appendChild(playerElement);
      return playerElement;
    }
  
    function movePlayer(playerId, steps) {
      const player = players.find(p => p.id === playerId);
      let currentStep = 0;
  
      const interval = setInterval(() => {
        if (currentStep < steps) {
          player.position = (player.position + 1) % 40; // Assuming 40 positions on the board
          const cell = document.getElementById(`cell-${player.position}`);
          const rect = cell.getBoundingClientRect();
          player.element.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
          currentStep++;
        } else {
          clearInterval(interval);
          updatePlayerInfo();
        }
      }, 500); // Move every 500ms
    }
  
    function updatePlayerInfo() {
      playerInfo.innerHTML = players.map(player => `
        <div>玩家 ${player.id}: 位置 ${player.position}, 金钱 ${player.money}</div>
      `).join('');
    }
  
    updatePlayerInfo();
  });