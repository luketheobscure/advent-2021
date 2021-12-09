import fs from "fs";
let input = fs.readFileSync('./input.txt', 'utf8').trim().split(',');

const countFish = function (days) {
    let fishCounts = new Array(9).fill(0);
    input.forEach(fish => fishCounts[fish] = ++fishCounts[fish])

    for (let day = 0; day < days; day++) {
        let tomorrowsCount = new Array(9).fill(0);
        for (let index = 8; index >= 0; index--) {
            if (index === 0) {
                tomorrowsCount[8] = fishCounts[index]
                tomorrowsCount[6] = tomorrowsCount[6] + fishCounts[index];
            } else {
                tomorrowsCount[index - 1] = fishCounts[index];
            }
        }

        fishCounts = tomorrowsCount;
    }

    return fishCounts.reduce((acc, v) => acc + v, 0);
};

console.log(`Part 1: ${countFish(80)}`);
console.log(`Part 1: ${countFish(256)}`);
