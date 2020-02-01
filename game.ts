function startGame() {
    createNewPlayer();
    
    game.onUpdate(function () {
        updatePlayerState(thePlayer, playerState, playerAttributes);
        updateEnemies();
    });
} 