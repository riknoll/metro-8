namespace myTiles {
    //% blockIdentity=images._tile
    export const tile0 = img`
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
    `
}
overworld.loadMap(overworld.createMap(tiles.createTilemap(
    hex`14000f000202020202020202020202020202020202020202020101010101010101010101010101010101010802010101010101010101010101010101010101080201010101010101010101010101010101010108020101010101010101010101010101010901010802010d01010101010101010101010101010e01080201010101010101010101010101010101010108020a0a0a0a0a0a0a0a0a0a010101010a0a0a0a08020a0a0a0a0a0a0a0a0a0a010101010a0a0a0a08020a0a0a010101010101010101010a0a0a0a0a08020a0a010101010101010101010a0a0a0a0a0a080707070707010101010101010a0a010707070707030101010101010101010101010101010101010604010101010101010101010101010101010101050707070707070707070707070707070707070707`,
    img`
                2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
                2 . . . . . . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . . . . . . 2
                2 2 2 2 2 . . . . . . . . . . 2 2 2 2 2
                . . . . . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . . . . . .
                2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            `,
    [myTiles.tile0, assets.tile_empty, assets.tile_wall_0, assets.tile_door_upper_west, assets.tile_door_lower_west_pink, assets.tile_door_lower_east_orange, assets.tile_door_upper_east, assets.tile_wall_1, assets.tile_wall_2, assets.tile_brick_block, assets.tile_breakable_block, assets.tile_number_1, assets.tile_number_2, assets.tile_character_0, assets.tile_character_1],
    TileScale.Eight
)))