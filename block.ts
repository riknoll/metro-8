namespace SpriteKind {
    export const BreakableBlock = SpriteKind.create()
    export const BrickBlock = SpriteKind.create()
}

enum BlockFlag {
    Breakable = 1 << 1
}

sprites.onCreated(SpriteKind.BreakableBlock, function (sprite: Sprite) {
    sprite.data = BlockFlag.Breakable;
    sprite.setFlag(SpriteFlag.Ghost, true);
});

sprites.onCreated(SpriteKind.BrickBlock, function (sprite: Sprite) {
    sprite.data = 0;
    sprite.setFlag(SpriteFlag.Ghost, true);
});

function getBlockDurability(block: Sprite) {
    return block.data >> 16;
}

function setBlockDurability(block: Sprite, value: number) {
    block.data = (block.data & 0xffff) | ((value & 0xffff) << 16);
}

function damageBlock(block: Sprite, value: number): boolean {
    const durability = getBlockDurability(block);
    if (durability < value) {
        setBlockDurability(block, 0);
        return true;
    }
    setBlockDurability(block, durability - value);
    return false;
}