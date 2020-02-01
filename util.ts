function rotateDirection(direction: WorldDirection, clockwise: boolean) {
    return ((clockwise ? direction + 1 : direction + 3) % 4) as WorldDirection;
}

function calculateOffset(time: number, start: number, period: number, length: number) {
    return ((time - start) / period) * length;
}

function getFirstWallInDirection(source: tiles.Location, direction: WorldDirection): tiles.Location {
    return tilemap.tileIsWall(source) ? source : getFirstWallInDirection(tilemap.locationInDirection(source, direction), direction) 
}

function calculateJumpVelocity(jumpHeight: number) {
    return -Math.sqrt((GRAVITY << 1) * jumpHeight);
}

function deltaTime() {
    return game.currentScene().eventContext.deltaTimeMillis;
}

function locationEquals(a: tiles.Location, b: tiles.Location) {
    return a.x === b.x && a.y === b.y;
}