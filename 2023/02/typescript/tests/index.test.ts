import { GameRound, part1, part2 } from '../index';
import * as fs from 'fs';

function getTestInput(): string {
    const contents = fs.readFileSync('tests/test_input', 'utf-8');
    return contents;
}
function getRealInput(): string {
    const contents = fs.readFileSync('tests/input', 'utf-8');
    return contents;
}
describe('Day 2 Avent of Code - bloody elves causing chaos again', () => {
    test('part 1 with test input = 8', () => {
        expect(part1(getTestInput())).toBe(8);
    });
    test('part 2 with test input = 2286', () => {
        expect(part2(getTestInput())).toBe(2286);
    });
    test('GameRound can parse string', () => {
        const roundAsString = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";
        const sut: GameRound = new GameRound();
        sut.parseRound(roundAsString, 1);

        expect(sut.Rgbs[0].blue).toBe(3);
        expect(sut.Rgbs[0].red).toBe(4);
        expect(sut.Rgbs[1].red).toBe(1);
        expect(sut.Rgbs[1].green).toBe(2);
        expect(sut.Rgbs[1].blue).toBe(6);
        expect(sut.Rgbs[2].green).toBe(2);

    });
    test('part 1 with real input = 2545', () => {
        expect(part1(getRealInput())).toBe(2545);
    });
    test('part 2 with real input = 78111', () => {
        expect(part2(getRealInput())).toBe(78111);
    });
});

