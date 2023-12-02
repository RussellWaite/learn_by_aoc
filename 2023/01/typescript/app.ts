import * as fs from 'fs';

function characterByteAsDecimal(x: number) {
    return x - 48;
}

class Totals {
    running: number;
    line: number;
    firstFound: boolean;
    candidate: number;

    constructor() {
        this.running = 0;
        this.clearRun();
    }
    clearRun() {
        this.line = 0;
        this.firstFound = false;
        this.candidate = 0;
    }
    finishLine() {
        this.line += this.candidate;
        this.running += this.line;
        console.log(">", this.line);
        this.clearRun();
    }
}

function part1(data: string) {
    const bytes = fs.readFileSync(data); // read as bytes
    solveForBytes(bytes);
}

function solveForBytes(bytes) {
    let t = new Totals();
    for (const byte of bytes) {
        if (byte >= 48 && byte <= 57) { // 48 to 57 is ascii 0 - 9
            if (!t.firstFound) {
                t.line = 10 * characterByteAsDecimal(byte);
                t.candidate = characterByteAsDecimal(byte);
                t.firstFound = true;
                continue;
            }
            t.candidate = characterByteAsDecimal(byte);
        }

        if (byte == 10) {
            t.finishLine();
        }
    }
    console.log("Result was: ", t.running);
}

function replaceWordsWithNumbers(input: string): string {
    const numerics = [
        ["one", "o1e"], ["two", "t2o"], ["three", "t3e"],
        ["four", "f4r"], ["five", "f5e"], ["six", "s6x"],
        ["seven", "s7n"], ["eight", "e8t"], ["nine", "n9e"]];

    let modified = input;
    for (const [num, fudge] of numerics) {
        modified = modified.replaceAll(num, fudge);
    }
    return modified;
}

function part2(data: string) {
    const contents = fs.readFileSync(data, 'utf-8'); // read as string
    const bytes = Buffer.from(replaceWordsWithNumbers(contents));
    solveForBytes(bytes);
}

// let data: string = "test_input2";
let data: string = "input";
part1(data);
part2(data);

