export function part1(data: string): number {
    const lines = data.split('\n');
    const limitRgb = new Rgb();
    limitRgb.red = 12;
    limitRgb.green = 13;
    limitRgb.blue = 14;
    const game = new GameRecord();

    lines.forEach((value, index) => {
        game.addRound(value);
    });

    return game.filterRounds(limitRgb.red, limitRgb.green, limitRgb.blue).reduce((sum, current) => sum + current, 0);
}
export function part2(data: string): number {
    const lines = data.split('\n');
    const game = new GameRecord();

    lines.forEach((value, index) => {
        game.addRound(value);
    });

    return game.sumOfPowerofSets();

}

export class GameRecord {
    rounds: GameRound[] = [];

    addRound(round: string) {
        if (round === undefined || round.length < 7) {
            return;
        }
        const current: GameRound = new GameRound();
        current.parseRound(round, this.rounds?.length ?? 0);
        this.rounds.push(current);
    }

    filterRounds(red: number, green: number, blue: number): number[] {
        const matchingRounds = this.rounds.filter(currentRound => {
            return currentRound.Rgbs.every(rgb => {
                return rgb.blue <= blue && rgb.green <= green && rgb.red <= red;
            });
        });

        return matchingRounds.map(x => x.Index);
    }
    sumOfPowerofSets(): number {
        return this.rounds.reduce((sum, current) => sum + current.powerOfSets(), 0);
    }
}
export class GameRound {
    Rgbs: Rgb[];
    Index: number;

    parseRound(round: string, index: number) {
        if (round === undefined || round.length < 7) {
            return;
        }
        this.Index = index + 1;

        //Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        const sets = round.split(":")[1].split(";");
        for (const set of sets) {
            const colours = set.trim().split(",");
            const rgb = new Rgb();
            for (const colour of colours) {
                const colourCount = colour.trim().split(" ");
                switch (colourCount[1].trim()) {
                    case 'red':
                        rgb.red = parseInt(colourCount[0]);
                        break;
                    case 'green':
                        rgb.green = parseInt(colourCount[0]);
                        break;
                    case 'blue':
                        rgb.blue = parseInt(colourCount[0]);
                        break;
                    default:
                        const errorMessage = `there was something other than red green or blue: ${colourCount[1]}`;
                        throw new Error(errorMessage);
                }
            }
            this.Rgbs.push(rgb);
        }
    }
    powerOfSets(): number {
        const maxRgbs = new Rgb();
        this.Rgbs.forEach(current => {
            maxRgbs.riseToMax(current);
        });
        return maxRgbs.red * maxRgbs.green * maxRgbs.blue;
    }
    constructor() {
        this.Rgbs = [];
    }
}

export class Rgb {
    red: number;
    green: number;
    blue: number;
    constructor() {
        this.red = 0;
        this.green = 0;
        this.blue = 0;
    }
    riseToMax(candidate: Rgb) {
        this.red = Math.max(this.red, candidate.red);
        this.green = Math.max(this.green, candidate.green);
        this.blue = Math.max(this.blue, candidate.blue);
    }
}
