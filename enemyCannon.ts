namespace SpriteKind {
    export const Cannon = SpriteKind.create();
} 

enemyKinds.push(SpriteKind.Cannon);

enum CannonState {
    Idle,
    Targeting,
    Firing
}

const CANNON_TARGET_SPEED = 50;
const CANNON_FIRE_SPEED = 30;
const CANNON_FIRE_SHOTS = 3;

const CANNON_TARGET_TIME = 1000;
const CANNON_FIRE_PAUSE = 100;

class CannonEnemyState implements EnemyState {
    state: CannonState;
    timer: number;
    count: number;

    min: number;
    max: number;

    moving: WorldDirection;

    constructor(public facing: WorldDirection, location: tiles.Location) {
        this.state = CannonState.Idle;

        if (facing === WorldDirection.East || facing === WorldDirection.West) {
            this.min = getFirstWallInDirection(location, WorldDirection.North).y;
            this.max = getFirstWallInDirection(location, WorldDirection.South).y;
        }
        else {
            this.min = getFirstWallInDirection(location, WorldDirection.West).x;
            this.max = getFirstWallInDirection(location, WorldDirection.East).x;
        }
    }

    update(cannon: Sprite, target: Sprite) {
        if (this.state === CannonState.Idle) {
            if (this.inRange(cannon, target)) {
                this.state = CannonState.Targeting;
                this.timer = CANNON_TARGET_TIME;
            }

            return;
        }

        this.timer -= game.currentScene().eventContext.deltaTimeMillis;

        if (this.timer < 0) {
            this.timer = this.getTimePerShot();

            if (this.state === CannonState.Targeting) {
                this.state = CannonState.Firing;
                this.count = this.getNumberOfShots();
            }
            else {
                this.count--;

                this.createProjectile(cannon);

                if (this.count === 0) {
                    this.state = CannonState.Idle;
                }
            }
            return;
        }

        cannon.vx = 0;
        cannon.vy = 0;

        const speed = this.state === CannonState.Targeting ? CANNON_TARGET_SPEED : CANNON_FIRE_SPEED;

        this.moving = undefined;
        if (this.facing === WorldDirection.East || this.facing === WorldDirection.West) {
            if (cannon.y < target.y) {
                cannon.vy = speed;
                this.moving = WorldDirection.South;
            }
            else if (cannon.y > target.y) {
                cannon.vy = -speed;
                this.moving = WorldDirection.North;
            }
        }
        else {
            if (cannon.x < target.x) {
                cannon.vx = speed;
                this.moving = WorldDirection.East;
            }
            else if (cannon.x > target.x) {
                cannon.vx = -speed;
                this.moving = WorldDirection.West;
            }
        }
    }

    inRange(cannon: Sprite, target: Sprite) {
        switch (this.facing) {
            case WorldDirection.North:
                return target.y < cannon.y && target.right > this.min && target.left < this.max;
            case WorldDirection.East:
                return target.x > cannon.x && target.bottom > this.min && target.top < this.max;
            case WorldDirection.South:
                return target.y > cannon.y && target.right > this.min && target.left < this.max;
            case WorldDirection.West:
                return target.x < cannon.x && target.bottom > this.min && target.top < this.max;
        }
    }

    getNumberOfShots() {
        return CANNON_FIRE_SHOTS;
    }

    getTimePerShot() {
        return CANNON_FIRE_PAUSE;
    }

    createProjectile(source: Sprite) {

    }
}

sprites.onCreated(SpriteKind.Cannon, sprite => {
    const location = tilemap.locationOfSprite(sprite);
    const tile = tiles.getTileImage(location);

    if (tile.equals(assets.tile_orange_arrow_north)) {
        sprite.data = new CannonEnemyState(WorldDirection.North, location);   
    }
    else if (tile.equals(assets.tile_orange_arrow_east)) {
        sprite.data = new CannonEnemyState(WorldDirection.East, location);
    }
    else if (tile.equals(assets.tile_orange_arrow_south)) {
        sprite.data = new CannonEnemyState(WorldDirection.South, location);
    }
    else if (tile.equals(assets.tile_orange_arrow_west)) {
        sprite.data = new CannonEnemyState(WorldDirection.West, location);
    }
    else if (tile.equals(assets.tile_green_arrow_north)) {
        sprite.data = new LaserCannonEnemyState(WorldDirection.North, location);
    }
    else if (tile.equals(assets.tile_green_arrow_east)) {
        sprite.data = new LaserCannonEnemyState(WorldDirection.East, location);
    }
    else if (tile.equals(assets.tile_green_arrow_south)) {
        sprite.data = new LaserCannonEnemyState(WorldDirection.South, location);
    }
    else if (tile.equals(assets.tile_green_arrow_west)) {
        sprite.data = new LaserCannonEnemyState(WorldDirection.West, location);
    }
});