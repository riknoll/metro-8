namespace SpriteKind {
    export const BreakableBlock = SpriteKind.create()
    export const BrickBlock = SpriteKind.create()
}

enum BlockFlag {
    Breakable = 1 << 1
}

sprites.onCreated(SpriteKind.BreakableBlock, function (sprite: Sprite) {
    sprite.data = BlockFlag.Breakable;
    setBlockDurability(sprite, 3)
    sprite.setFlag(SpriteFlag.Ghost, true);
    tiles.setWallAt(tilemap.locationOfSprite(sprite), true);
});

sprites.onCreated(SpriteKind.BrickBlock, function (sprite: Sprite) {
    sprite.data = 0;
    sprite.setFlag(SpriteFlag.Ghost, true);
    tiles.setWallAt(tilemap.locationOfSprite(sprite), true);
});

function getBlockAtLocation(location: tiles.Location) {
    const blocks = sprites.allOfKind(SpriteKind.BreakableBlock);

    for (const block of blocks) {
        if (locationEquals(location, tilemap.locationOfSprite(block))) {
            return block;
        }
    }

    return undefined;
}

function getBlockDurability(block: Sprite) {
    return block.data >> 16;
}

function setBlockDurability(block: Sprite, value: number) {
    block.data = (block.data & 0xffff) | ((value & 0xffff) << 16);
}

function damageBlockAtLocation(location: tiles.Location, value: number, animate: boolean) {
    const block = getBlockAtLocation(location);

    if (!block) return;

    const durability = getBlockDurability(block);
    if (durability < value) {
        setBlockDurability(block, 0);
        block.destroy();
        tilemap.coverTile(location, assets.tile_empty);
        tiles.setWallAt(location, false)
        return;
    }

    if (animate) {
        block.setImage(assets.tile_breakable_block);
        tiles.placeOnTile(block, location);
        animation.runMovementAnimation(block, "m 0 -1 m -1 0 m 0 1 m 1 0", 100);
    }


    setBlockDurability(block, durability - value);
    return;
}