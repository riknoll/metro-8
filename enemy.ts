namespace SpriteKind {
    export const EnemyProjectile = SpriteKind.create();
}

enum EnemyProjectileFlag {
    DestroyOnHit = 1,
    DamagesBlocks = 1 << 1,
}
 
interface EnemyState {
    update(target: Sprite, player: Sprite): void;
}

const enemyKinds: number[] = [];

game.onUpdate(function () {
    let current: EnemyState;
    for (const kind of enemyKinds) {
        for (const sprite of sprites.allOfKind(kind)) {
            current = sprite.data;
            current.update(sprite, thePlayer);
        }
    }
})