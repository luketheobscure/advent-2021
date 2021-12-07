import fs from "fs";

let [numbers, _, ...rawBoards] = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

let boards = rawBoards.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 6)

    resultArray[chunkIndex] ||= [];

    item && resultArray[chunkIndex].push(item.trim().replace(/\s\s/g, ' ').split(' '));

    return resultArray
}, []);

const rotate = (board) => board.reduce((acc, row) => {
    row.forEach((char, i) => {
        acc[i] ? acc[i].push(char) : acc[i] = [char];
    });
    return acc;
}, []);

let checkBoard = (board, numbers) => {
    let matcher = new RegExp(`(\\b${numbers.join("\\b|\\b")}\\b)`, 'g');

    for (const row of board) {
        if (row.join(' ').match(matcher)?.length > 4) {
            return board;
        }
    }
    for (const row of rotate(board)) {
        if (row.join(' ').match(matcher)?.length > 4) {
            return board;
        }
    }
}

let calculateWinner = (board, numbers) => {
    let filtered = board.flat().filter((v) => !numbers.includes(v));
    let sum = filtered.reduce((sum, v) => sum + +v, 0)

    return sum * [...numbers].pop();
}

(function partOne() {
    let done = false;
    numbers.split(',').reduce((acc, number) => {
        if (done) return;

        acc.push(number);
        if (acc.length < 5) return acc;

        for (const board of boards) {
            let winner = checkBoard(board, acc);
            if (winner) {
                console.log('Part 1: ' + calculateWinner(board, acc));
                done = true;
                break;
            }
        }
        return acc;
    }, [])
})();

(function partTwo() {
    let lastWinner;
    let lastNumbers;
    let boardsToCheck = [...boards];
    let acc = []
    let splitNumbers = numbers.split(',')

    while (boardsToCheck.length && acc.length !== splitNumbers.length) {
        for (const number of splitNumbers) {
            acc.push(number);

            for (const board of boardsToCheck) {
                let winner = checkBoard(board, acc);
                if (winner) {
                    boardsToCheck = boardsToCheck.filter(v => v !== board);
                    lastWinner = winner;
                    lastNumbers = [...acc]
                }
            }
        }
    }

    console.log('Part 2: ' + calculateWinner(lastWinner, lastNumbers));
})();
