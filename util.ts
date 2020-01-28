function rotateDirection(direction: WorldDirection, clockwise: boolean) {
    return ((clockwise ? direction + 1 : direction + 3) % 4) as WorldDirection;
}

function calculateOffset(time: number, start: number, period: number, length: number) {
    return ((time - start) / period) * length;
}

function getFirstWallInDirection(source: tiles.Location, direction: WorldDirection): tiles.Location {
    return tilemap.tileIsWall(source) ? source : getFirstWallInDirection(tilemap.locationInDirection(source, direction), direction) 
}