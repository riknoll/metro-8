namespace SpriteKind {
    export const Laser = SpriteKind.create();
}

class LaserCannonEnemyState extends CannonEnemyState {
    constructor(direction: WorldDirection, location: tiles.Location) {
        super(direction, location);
    }

    getNumberOfShots() {
        return 1;
    }

    getTimePerShot() {
        return 1000;
    }

    createProjectile(source: Sprite) {

    }
}