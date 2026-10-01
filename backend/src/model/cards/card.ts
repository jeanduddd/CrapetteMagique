export class Card {
    value: number;
    symbol: string;

    constructor(value: number, symbol: string) {
        this.value = value;
        this.symbol = symbol;
    }

    clone():Card{
        const copy = new Card(this.value, this.symbol);
        return copy;
    }
}