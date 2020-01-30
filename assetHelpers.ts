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

    export function cannon(direction: WorldDirection) {
        if (direction === WorldDirection.North) {
            return 
        }
        else if (direction === WorldDirection.East) {

        }
        else if (direction === WorldDirection.South) {

        }
        else {

        }
    }
} 