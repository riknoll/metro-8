enum DoorFlags {
    FacingLeft = 1 << 9
}

sprites.onCreated(SpriteKind.Door, sprite => {
    const info = getDoorInfo(tilemap.locationInDirection(tilemap.locationOfSprite(sprite), WorldDirection.South))
    sprite.data = info;
    sprite.z = ZDepth.Door;

    openCloseDoor(sprite, false, false);
});


function getDoorInfo(location: tiles.Location) {
    const tile = tiles.getTileImage(location);

    if (tile.equals(assets.tile_door_lower_west_pink)) {
        return 1;
    }
    else if (tile.equals(assets.tile_door_lower_west_orange)) {
        return 2;
    }
    else if (tile.equals(assets.tile_door_lower_west_green)) {
        return 3;
    }
    else if (tile.equals(assets.tile_door_lower_east_pink)) {
        return 1 | DoorFlags.FacingLeft;
    }
    else if (tile.equals(assets.tile_door_lower_east_orange)) {
        return 2 | DoorFlags.FacingLeft;
    }
    else if (tile.equals(assets.tile_door_lower_east_green)) {
        return 3 | DoorFlags.FacingLeft;
    }

    return 0;
}

function getIdOfDoor(door: Sprite) {
    return (door.data as number) & 0xff;
}

function doorIsFacingLeft(door: Sprite) {
    return !!((door.data as number) & DoorFlags.FacingLeft);
}

function getDoorLocation(door: Sprite) {
    return tiles.getTileLocation(
        tilemap.screenCoordinateToTile(door.x),
        tilemap.screenCoordinateToTile(door.y - 4)
    );
}

function getDoorWithId(id: number) {
    for (const sprite of sprites.allOfKind(SpriteKind.Door)) {
        if (getIdOfDoor(sprite) === id) {
            return sprite;
        }
    }

    return undefined;
}

function openCloseDoor(door: Sprite, open: boolean, animate: boolean) {
    if (door) {
        const facingLeft = doorIsFacingLeft(door);
        if (animate) {
            const frames = assets.doorFrames(facingLeft);

            if (!open) {
                frames.reverse();
            }

            animation.runImageAnimation(door, frames, 70, false);
        }
        else if (open) {
            door.setImage(assets.openDoor(facingLeft))
        }
        else {
            door.setImage(assets.closedDoor(facingLeft))
        }

        // Gotta do this before turning the wall on or the sprite
        // will get bumped out of the way
        if (!open) {
            door.setFlag(SpriteFlag.Ghost, true);
            door.setKind(SpriteKind.Door);
        }

        const location = getDoorLocation(door);

        tiles.setWallAt(location, !open);
        tiles.setWallAt(tilemap.locationInDirection(location, WorldDirection.South), !open);

        if (open) {
            door.setFlag(SpriteFlag.Ghost, false);
            door.setKind(SpriteKind.OpenDoor);
        }
    }
}

function openCloseDoorWithId(id: number, open: boolean, animate: boolean) {
    openCloseDoor(getDoorWithId(id), open, animate)
}

function getDoorAtLocation(location: tiles.Location) {
    const tile = tiles.getTileImage(location);

    // Door location is mapped to the upper tile
    if (!tile.equals(assets.tile_door_upper_west) && !tile.equals(assets.tile_door_upper_east)) {
        location = tilemap.locationInDirection(location, WorldDirection.North);
    }

    const doors = sprites.allOfKind(SpriteKind.Door).concat(sprites.allOfKind(SpriteKind.OpenDoor));

    for (const door of doors) {
        if (locationEquals(location, getDoorLocation(door))) {
            return door;
        }
    }

    return undefined;
}