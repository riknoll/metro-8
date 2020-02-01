namespace assets {
    export function playerWalkFrames(left: boolean) {
        return left ? 
            [assets.player_walk5, assets.player_walk6, assets.player_walk7, assets.player_walk8, assets.player_walk9] :
            [assets.player_walk0, assets.player_walk1, assets.player_walk2, assets.player_walk3, assets.player_walk4]
    }

    export function playerIdleFrames(left: boolean) {
        return left ?
            [assets.player_idle5, assets.player_idle6, assets.player_idle7, assets.player_idle8, assets.player_idle9] :
            [assets.player_idle0, assets.player_idle1, assets.player_idle2, assets.player_idle3, assets.player_idle4]
    }

    export function enemyFrames(left: boolean) {
        return left ?
            [assets.jerk0, assets.jerk1, assets.jerk2, assets.jerk3, assets.jerk4] :
            [assets.jerk5, assets.jerk6, assets.jerk7, assets.jerk8, assets.jerk9]
    }

    export function doorFrames(left: boolean) {
        return left ?
            [assets.door5, assets.door6, assets.door7, assets.door8, assets.door9]:
            [assets.door0, assets.door1, assets.door2, assets.door3, assets.door4] 
    }

    export function openDoor(left: boolean) {
        return left ? assets.door9 : assets.door4;
    }

    export function closedDoor(left: boolean) {
        return left ? assets.door5 : assets.door0;
    }

    export function laser(direction: WorldDirection) {
        if (direction === WorldDirection.North) {
            return [
                assets.laser_vertical9, assets.laser_vertical10, assets.laser_vertical11,
                assets.laser_vertical12, assets.laser_vertical13, assets.laser_vertical14,
                assets.laser_vertical15, assets.laser_vertical16, assets.laser_vertical17
            ];
        }
        else if (direction === WorldDirection.East) {
            return [
                assets.laser_horizontal0, assets.laser_horizontal1, assets.laser_horizontal2,
                assets.laser_horizontal3, assets.laser_horizontal4, assets.laser_horizontal5,
                assets.laser_horizontal6, assets.laser_horizontal7, assets.laser_horizontal8
            ];
        }
        else if (direction === WorldDirection.South) {
            return [
                assets.laser_vertical0, assets.laser_vertical1, assets.laser_vertical2,
                assets.laser_vertical3, assets.laser_vertical4, assets.laser_vertical5,
                assets.laser_vertical6, assets.laser_vertical7, assets.laser_vertical8
            ];
        }
        else {
            return [
                assets.laser_horizontal9, assets.laser_horizontal10, assets.laser_horizontal11,
                assets.laser_horizontal12, assets.laser_horizontal13, assets.laser_horizontal14,
                assets.laser_horizontal15, assets.laser_horizontal16, assets.laser_horizontal17
            ];
        }
    }

    export function cannon(direction: WorldDirection) {
        if (direction === WorldDirection.North) {
            return [
                assets.cannon_vertical0, assets.cannon_vertical1,
                assets.cannon_vertical2, assets.cannon_vertical3
            ];
        }
        else if (direction === WorldDirection.East) {
            return [
                assets.cannon_horizontal4, assets.cannon_horizontal5,
                assets.cannon_horizontal6, assets.cannon_horizontal7
            ];
        }
        else if (direction === WorldDirection.South) {
            return [
                assets.cannon_vertical4, assets.cannon_vertical5,
                assets.cannon_vertical6, assets.cannon_vertical7
            ];
        }
        else {
            return [
                assets.cannon_horizontal0, assets.cannon_horizontal1,
                assets.cannon_horizontal2, assets.cannon_horizontal3
            ];
        }
    }

    export function projectileSmallFrames(direction: WorldDirection) {
        if (direction === WorldDirection.North || direction === WorldDirection.South) {
            return [
                assets.projectile_small_vertical0, assets.projectile_small_vertical1,
                assets.projectile_small_vertical2, assets.projectile_small_vertical3
            ];
        }
        else {
            return [
                assets.projectile_small_horizontal0, assets.projectile_small_horizontal1,
                assets.projectile_small_horizontal2, assets.projectile_small_horizontal3
            ];
        }
    }
} 