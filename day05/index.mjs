import fs from "fs";
let input = fs.readFileSync('./input.txt', 'utf8').trim().split('\n').map(line => line.replace(' -> ', ',').split(',').map(v => +v));

let internalPoints = ([x1, y1, x2, y2], diagonals = false) => {
    const points = [];

    if (x1 === x2) {
        const [minY, maxY] = [y1, y2].sort((a, b) => a - b);

        for (let i = minY; i <= maxY; i++) {
            points.push([x1, i]);
        }
        return points
    }

    if (y1 === y2) {
        const [minX, maxX] = [x1, x2].sort((a, b) => a - b);

        for (let i = minX; i <= maxX; i++) {
            points.push([i, y1]);
        }
        return points
    }

    if (diagonals) {
        let xdown = x1 > x2
        let ydown = y1 > y2
        let y = y1
        if (xdown) {
            for (let x = x1; x >= x2; x--) {
                points.push([x, y]);
                ydown ? y-- : y++
            }
        } else {
            for (let x = x1; x <= x2; x++) {
                points.push([x, y]);
                ydown ? y-- : y++
            }
        }
    }
    return points

}

let addPoint = (point, map) => {
    map[point] ||= 0;
    map[point] += 1
};

(function partOne() {
    let map = {};
    input.forEach((point) => {
        let points = internalPoints(point);
        points.forEach((point) => addPoint(point.join(), map))
    });

    console.log(`Part 1: ${Object.values(map).filter(v => v > 1).length}`);
})();

(function partTwo() {
    let map = {};
    input.forEach((point) => {
        let points = internalPoints(point, true);
        points.forEach((point) => addPoint(point.join(), map))
    });

    console.log(`Part 2: ${Object.values(map).filter(v => v > 1).length}`);
})();
