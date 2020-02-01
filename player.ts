 class PlayerState {
    isFacingLeft: boolean;
    isMoving: boolean;

    charges: number;
    cooldownTimer: number;
    rechargeTimer: number;
}

class PlayerAttributes {
    playerSpeed: number;

    jumpHeight: number;
    jumpVelocity: number;

    maxCharge: number;
    cooldownTime: number;
    rechargeTime: number;
    kickback: number;
    
    projectileSpeed: number;
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
        playerAttributes.playerSpeed = 50;
        playerAttributes.cooldownTime = 100;
        playerAttributes.rechargeTime = 750;
        playerAttributes.kickback = calculateJumpVelocity(1);
        playerAttributes.projectileSpeed = 100;
    }

    thePlayer = sprites.create(assets.player_idle0, SpriteKind.Player);
    thePlayer.z = ZDepth.Player;
    scene.cameraFollowSprite(thePlayer);
    controller.moveSprite(thePlayer, playerAttributes.playerSpeed, 0);

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

    const projectile = sprites.create(img`1`, SpriteKind.Projectile);
    projectile.z = ZDepth.PlayerProjectile;
    projectile.setPosition(player.x, player.y);
    projectile.setFlag(SpriteFlag.AutoDestroy, true);

    if (controller.up.isPressed()) {
        direction = WorldDirection.North;
        projectile.vy = -attrs.projectileSpeed;
    }
    else if (controller.down.isPressed()) {
        direction = WorldDirection.South;
        projectile.vy = attrs.projectileSpeed;

        player.vy = attrs.kickback;
    }
    else if (state.isFacingLeft) {
        direction = WorldDirection.West;
        projectile.vx = -attrs.projectileSpeed;
    }
    else {
        direction = WorldDirection.East;
        projectile.vx = attrs.projectileSpeed;
    }

    animation.runImageAnimation(projectile, assets.projectileSmallFrames(direction), 100, true);
}