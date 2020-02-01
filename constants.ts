namespace SpriteKind {
    export const Door = SpriteKind.create()
    export const OpenDoor = SpriteKind.create()
    export const Effect = SpriteKind.create()
    export const RechargeSprite = SpriteKind.create()
}

enum ZDepth {
    Door = 1,
    Block,
    Enemy,
    PlayerProjectile,
    Player,
    EnemyProjectile,
    Effect,
}

const GRAVITY = 200;

