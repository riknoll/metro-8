namespace SpriteKind {
    export const Crawler = SpriteKind.create();
}

enemyKinds.push(SpriteKind.Crawler);

class CrawlerState implements EnemyState {
    wall: tiles.Location;
    side: WorldDirection;
    isFalling: boolean;
    timer: number;
    offset: number;

    constructor(public clockwise: boolean, public tickPeriod = 75) {
        this.offset = 0;
    }

    update(sprite: Sprite, target: Sprite) {
        if (this.wall && !tilemap.tileIsWall(this.wall)) {
            this.setFalling(true, sprite);
        }
        else if (!this.wall && !this.isFalling) {
            this.tryGrabWall(sprite)
        }

        if (this.isFalling) return;

        if (Number.isNaN(this.timer)) this.timer = this.tickPeriod;

        this.timer -= game.currentScene().eventContext.deltaTimeMillis;

        if (this.timer < 0) {
            while (this.timer < 0) {
                this.offset++;
                this.timer += this.tickPeriod

                if (this.offset >= tilemap.tileWidth() + 1) {
                    this.offset = 0;
                    this.getNextTarget();
                }
            }

            this.updateSpritePosition(sprite);
        }
    }

    updateSpritePosition(sprite: Sprite) {
        if (this.wall) {
            const left = (this.wall.x >> 3) << 3;
            const top = (this.wall.y >> 3) << 3;

            switch (this.side) {
                case WorldDirection.North:
                    sprite.bottom = top;
                    sprite.x = this.clockwise ? left + this.offset : left + tilemap.tileWidth() - this.offset;
                    break;
                case WorldDirection.East:
                    sprite.left = left + tilemap.tileWidth();
                    sprite.y = this.clockwise ? top + this.offset : top + tilemap.tileWidth() - this.offset
                    break;
                case WorldDirection.South:
                    sprite.top = top + tilemap.tileWidth();
                    sprite.x = this.clockwise ? left + tilemap.tileWidth() - this.offset : left + this.offset
                    break;
                case WorldDirection.West:
                    sprite.right = left;
                    sprite.y = this.clockwise ? top + tilemap.tileWidth() - this.offset : top + this.offset;
                    break;
            }
        }
    }

    getNextTarget() {
        if (!this.wall) return;

        const direction = rotateDirection(this.side, this.clockwise);

        if (tilemap.tileIsWall(tilemap.locationInDirection(tilemap.locationInDirection(this.wall, this.side), direction))) {
            this.wall = tilemap.locationInDirection(tilemap.locationInDirection(this.wall, this.side), direction);
            this.side = rotateDirection(this.side, !this.clockwise)
        }
        else if (tilemap.tileIsWall(tilemap.locationInDirection(this.wall, direction))) {
            this.wall = tilemap.locationInDirection(this.wall, direction);
        }
        else {
            this.side = direction;
        }
    }

    tryGrabWall(sprite: Sprite) {
        const location = tilemap.locationOfSprite(sprite);

        if (tilemap.tileIsWall(location)) {
            sprite.destroy();
            return;
        }
        else if (tilemap.tileIsWall(tilemap.locationInDirection(location, WorldDirection.North))) {
            this.wall = tilemap.locationInDirection(location, WorldDirection.North)
            this.side = WorldDirection.South
        }
        else if (tilemap.tileIsWall(tilemap.locationInDirection(location, WorldDirection.East))) {
            this.wall = tilemap.locationInDirection(location, WorldDirection.East)
            this.side = WorldDirection.West
        }
        else if (tilemap.tileIsWall(tilemap.locationInDirection(location, WorldDirection.South))) {
            this.wall = tilemap.locationInDirection(location, WorldDirection.South)
            this.side = WorldDirection.North
        }
        else if (tilemap.tileIsWall(tilemap.locationInDirection(location, WorldDirection.West))) {
            this.wall = tilemap.locationInDirection(location, WorldDirection.West)
            this.side = WorldDirection.East
        }
        else {
            this.setFalling(true, sprite)
        }

        if (this.wall) {
            this.setFalling(false, sprite)
        }
    }

    setFalling(falling: boolean, sprite: Sprite) {
        if (falling) {
            this.isFalling = true;
            sprite.ay = GRAVITY;
            this.wall = undefined;
        }
        else {
            this.isFalling = false;
            sprite.ay = 0;
            sprite.vy = 0;
        }
    }
}

sprites.onCreated(SpriteKind.Crawler, function (sprite: Sprite) {
    sprite.setImage(img`
        7 7 7 7 7
        7 7 7 7 7
        7 7 7 7 7
        7 7 7 7 7
        7 7 7 7 7
    `);
    const tile = tiles.getTileImage(tilemap.locationOfSprite(sprite));
    
    sprite.data = new CrawlerState(tile.equals(assets.tile_character_0));
    sprite.z = ZDepth.Enemy;
})

scene.onHitWall(SpriteKind.Crawler, function (sprite: Sprite) {
    const state: CrawlerState = sprite.data;

    if (state.isFalling) {
        state.tryGrabWall(sprite)
    }
})