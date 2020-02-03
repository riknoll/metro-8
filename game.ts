function startGame() {
    if (thePlayer) return;
    
    createNewPlayer();
    
    game.onUpdate(function () {
        updatePlayerState(thePlayer, playerState, playerAttributes);
        updateEnemies();
    });

    controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        doPlayerJump();
    });
} 