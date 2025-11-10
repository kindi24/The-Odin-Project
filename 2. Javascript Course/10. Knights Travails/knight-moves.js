export default class knightTravails {

    knightPaths(start, end) {
        const boardSize = 8;

        const knightMoves = [
            [1, 2], [1, -2], [-1, 2], [-1, -2],
            [2, 1], [2, -1], [-2, 1], [-2, -1]
        ];

        const isValid = (x, y) => {
            return x >= 0 && x < boardSize && y >= 0 && y < boardSize;
        };

        const queue = [[start, []]];

        const visited = new Set();
        visited.add(`${start[0]},${start[1]}`);

        const isEnd = (pos) => pos[0] === end[0] && pos[1] === end[1];

        while (queue.length > 0) {
            const [currentPos, path] = queue.shift();
            const [currentX, currentY] = currentPos;

            if (isEnd(currentPos)) {
                return [...path, currentPos];
            }

            for (const [dx, dy] of knightMoves) {
                const nextX = currentX + dx;
                const nextY = currentY + dy;
                const nextPos = [nextX, nextY];
                const nextPosKey = `${nextX},${nextY}`;

                if (isValid(nextX, nextY) && !visited.has(nextPosKey)) {
                    visited.add(nextPosKey);
                    queue.push([nextPos, [...path, currentPos]]);
                }
            }
        }

        return null;
    }

    knightMoves(start, end) {
    const path = this.knightPaths(start, end);

    if (path) {
        const moves = path.length - 1;

        console.log(`From [${start}] to [${end}], you made it in ${moves} moves!`);
        console.log("---");
        console.log("Here is your path:");

        path.forEach((pos, index) => {
            if (index < path.length - 1) console.log(`Move ${index}: [${path[index + 1]}]`);       
        });
        console.log("\n");
        } else {
            console.log(`No path found from [${start}] to [${end}]. \n`);
        }
    }

}