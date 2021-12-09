import fs from "fs";
let input = fs.readFileSync('./input.txt', 'utf8').trim().split(',').map(v => +v);

function median(numbers) {
    const sorted = numbers.sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    return (sorted.length % 2 !== 0) ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

const mean = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

const calculateSteadyFuel = (numbers, target) => numbers.reduce((fuel, crab) =>
    fuel + Math.abs(crab - target)
    , 0)

const calculateIncreasingFuel = (numbers, target) => numbers.reduce((fuel, crab) => {
    for (let step = 1; step <= Math.abs(crab - target); step++) {
        fuel += step;
    }
    return fuel;
}, 0)

console.log(`Day 1: ${calculateSteadyFuel(input, median(input))}`)
console.log(`Day 2: ${calculateIncreasingFuel(input, Math.floor(mean(input)))}`)
