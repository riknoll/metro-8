 class PlayerState {
    isFacingLeft: boolean;
    isMoving: boolean;

    charges: number;
    cooldownTimer: number;
    rechargeTimer: number;
}

class PlayerAttributes {
    jumpHeight: number;
    jumpVelocity: number;

    maxCharge: number;
    cooldownTime: number;
    rechargeTime: number;
    kickback: number;
}

let thePlayer: Sprite;
let playerState: PlayerState;
let playerAttributes: PlayerAttributes;

function createNewPlayer() {
    if (thePlayer) {
        thePlayer.destroy();
    }

    if (!playerAttributes) {
        playerAttributes = new PlayerAttributes();
        playerAttributes.jumpHeight = 16;
        playerAttributes.jumpVelocity = calculateJumpVelocity(playerAttributes.jumpHeight);

        playerAttributes.maxCharge = 10;
        playerAttributes.cooldownTime = 100;
        playerAttributes.rechargeTime = 750;
        playerAttributes.kickback = calculateJumpVelocity(1);
    }

    thePlayer = sprites.create(assets.player_idle0, SpriteKind.Player);
    thePlayer.z = ZDepth.Player;

    playerState = new PlayerState();
    playerState.isFacingLeft = true;
    playerState.isMoving = false;
    playerState.cooldownTimer = 0;
    playerState.rechargeTimer = 0;
    playerState.charges = playerAttributes.maxCharge;
}


function updatePlayerState(player: Sprite, state: PlayerState, attrs: PlayerAttributes) {
    let didUpdate = false;

    if (controller.left.isPressed() && !state.isFacingLeft) {
        state.isFacingLeft = true;
        didUpdate = true
    }
    else if (controller.right.isPressed() && state.isFacingLeft) {
        state.isFacingLeft = false;
        didUpdate = true;
    }

    if (state.isMoving && player.vx === 0) {
        state.isMoving = false;
        didUpdate = true;
    }
    else if (!state.isMoving && player.vx) {
        state.isMoving = true;
        didUpdate = true;
    }

    if (didUpdate) {
        animation.runImageAnimation(player,
            state.isMoving ? assets.playerWalkFrames(state.isFacingLeft) : assets.playerIdleFrames(state.isFacingLeft),
            100,
            true
        );
    }

    state.cooldownTimer -= deltaTime();
    state.rechargeTimer -= deltaTime();

    if (state.cooldownTimer <= 0 && state.rechargeTimer <= 0) {
        if (controller.B.isPressed()) {
            state.charges--;

            firePlayerProjectile(player, state, attrs)

            if (state.charges === 0) {
                state.cooldownTimer = 0;
                state.rechargeTimer = attrs.rechargeTime;
                state.charges = attrs.maxCharge;
            }
            else {
                state.cooldownTimer = attrs.cooldownTime;
            }
        }
        else {
            state.cooldownTimer = 0;
        }
    }
}

function firePlayerProjectile(player: Sprite, state: PlayerState, attrs: PlayerAttributes) {
    let direction: WorldDirection;

    if (controller.up.isPressed()) {
        direction = WorldDirection.North;
    }
    else if (controller.down.isPressed()) {
        direction = WorldDirection.South;
    }
    else if (state.isFacingLeft) {
        direction = WorldDirection.West;
    }
    else {
        direction = WorldDirection.East;
    }

    
}