const destroyOnUnload: number[] = [
    SpriteKind.Projectile,
    SpriteKind.Door,
    SpriteKind.OpenDoor,
    SpriteKind.Effect,
    SpriteKind.BrickBlock,
    SpriteKind.BreakableBlock
];

// This is used in Sprite destroy events to prevent
// side effects while a map is unloaded
let inMapUnload = false;

overworld.onMapLoaded(map => {
    tilemap.createSpritesOnTiles(assets.tile_brick_block, SpriteKind.BrickBlock);
    tilemap.createSpritesOnTiles(assets.tile_breakable_block, SpriteKind.BreakableBlock);

    tilemap.createSpritesOnTiles(assets.tile_door_upper_west, SpriteKind.Door);
    tilemap.createSpritesOnTiles(assets.tile_door_upper_east, SpriteKind.Door);
    
    tilemap.createSpritesOnTiles(assets.tile_green_arrow_west, SpriteKind.Cannon);
    tilemap.coverAllTiles(assets.tile_green_arrow_west, assets.tile_rail_vertical);

    tilemap.createSpritesOnTiles(assets.tile_green_arrow_east, SpriteKind.Cannon);
    tilemap.coverAllTiles(assets.tile_green_arrow_east, assets.tile_rail_vertical);

    tilemap.createSpritesOnTiles(assets.tile_green_arrow_north, SpriteKind.Cannon);
    tilemap.coverAllTiles(assets.tile_green_arrow_north, assets.tile_rail_horizontal);

    tilemap.createSpritesOnTiles(assets.tile_green_arrow_south, SpriteKind.Cannon);
    tilemap.coverAllTiles(assets.tile_green_arrow_south, assets.tile_rail_horizontal);


    tilemap.createSpritesOnTiles(assets.tile_orange_arrow_west, SpriteKind.Cannon);
    tilemap.coverAllTiles(assets.tile_orange_arrow_west, assets.tile_rail_vertical);

    tilemap.createSpritesOnTiles(assets.tile_orange_arrow_east, SpriteKind.Cannon);
    tilemap.coverAllTiles(assets.tile_orange_arrow_east, assets.tile_rail_vertical);

    tilemap.createSpritesOnTiles(assets.tile_orange_arrow_north, SpriteKind.Cannon);
    tilemap.coverAllTiles(assets.tile_orange_arrow_north, assets.tile_rail_horizontal);

    tilemap.createSpritesOnTiles(assets.tile_orange_arrow_south, SpriteKind.Cannon);
    tilemap.coverAllTiles(assets.tile_orange_arrow_south, assets.tile_rail_horizontal);


    tilemap.createSpritesOnTiles(assets.tile_character_0, SpriteKind.Crawler);
    tilemap.coverAllTiles(assets.tile_character_0, assets.tile_empty);
    
    tilemap.createSpritesOnTiles(assets.tile_character_1, SpriteKind.Crawler);
    tilemap.coverAllTiles(assets.tile_character_1, assets.tile_empty);
});

overworld.onMapUnloaded(map => {
    inMapUnload = true;

    for (const kind of destroyOnUnload) {
        tilemap.destorySpritesOfKind(kind)
    }

    for (const kind of enemyKinds) {
        tilemap.destorySpritesOfKind(kind);
    }

    inMapUnload = false;
});