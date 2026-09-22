import { Card } from "./card";

export class CardCollection{
    protected cards: Card[] = []

    getCount(): number{
        return this.cards.length
    }
}

export class Deck extends CardCollection {
    symbols: string[] = ["heart", "diamond", "club", "spade"];
    values: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    constructor(cards?: Card[]) {
        super();
        if (cards){
            this.cards = cards
        }
        else{
            for (const i of this.symbols) {
                for (const j of this.values) {
                    this.cards.push(new Card(j, i));
                }
            }
        }
    }


    shuffle():void{
        for (let i = this.cards.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    drawXCards(number : number):Card[]{    
        if (this.cards.length < number) throw new Error("Not enough cards in the deck");
        return this.cards.splice(0, number);
    }
}

export class Crapette extends CardCollection{
    
    constructor(){
        super()
    }

    initialize(cards: Card[]):void{
        this.cards = cards
    }

    enemyAddCard(card: Card):void{
        let topCard:Card|null = this.getTopCardValue()
        if (topCard === null){
            throw new Error("Cannot put this card here")
        }

        if (topCard.symbol === card.symbol && (topCard.value === card.value + 1 || topCard.value === card.value - 1)){
            this.cards.push(card)
        }
        else{
            throw new Error("Cannot put this card here")
        }
    }

    getTopCardValue():Card|null{
        if (this.cards.length === 0){
            return null
        }
        else return this.cards[this.cards.length -1]
    }

    playTopCard():Card{
        const topCard = this.cards.pop()
        if (!topCard){
            throw new Error("there is no card in the crapette");
        }
        return topCard
    }
}

export class Bin extends CardCollection{

    protected played: Boolean = false

    constructor(){
        super()
    }

    resetTurn():void{
        this.played = false
    }

    resetDeck():Card[]{
        if (this.cards.length<=1){
            return this.cards.splice(0, 1);
        }
        else {
            return this.cards.splice(0, this.cards.length-1);
        }
    }

    enemyAddCard(card: Card):void{
        let topCard:Card|null = this.getTopCardValue()
        if (topCard === null){
            throw new Error("Cannot put this card here")
        }
        else{
            if (topCard.symbol === card.symbol && (topCard.value === card.value + 1 || topCard.value === card.value - 1)){
                this.cards.push(card)
            }
            else{
                throw new Error("Cannot put this card here")
            }
        }
    }

    addCard(card:Card):void{
        this.cards.push(card)
    }

    getTopCardValue():Card|null{
        if (this.cards.length === 0){
            return null
        }
        else return this.cards[this.cards.length -1]
    }

    playTopCard():Card{
        if (this.played === true){
            throw new Error("bin already played");
        }
        const topCard = this.cards.pop()
        if (!topCard){
            throw new Error("there is no card in the bin");
        }
        this.played = true
        return topCard
    }

}

export class Draw extends CardCollection{

    private shown = false

    constructor(){
        super()
    }

    initialize(cards: Card[]):void{
        this.cards = cards
    }

    getTopCardValue():Card|null{
        if (this.cards.length === 0 || this.shown === false){
            return null
        }
        else return this.cards[this.cards.length -1]
    }

    playTopCard():Card{
        if (this.shown === false){
            throw new Error("card not shown yet...");
        }
        const topCard = this.cards.pop()
        if (!topCard){
            throw new Error("there is no card in the draw");
        }
        return topCard
    }

    shuffle():void{
        const shuffledCards: Card[] = []
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            shuffledCards.push(this.cards[j])
            this.cards = this.cards.filter((_,index) => index !== j )
        }
        this.cards = shuffledCards
    }

    switchDrawShown():void{
        this.shown = !this.shown
    }

    setDrawShown(bool: boolean):void{
        this.shown = bool
    }

}

export class AcePile extends CardCollection{

    constructor(){
        super()
    }

    addCard(card: Card):void{
        let topCard:Card|null = this.getTopCardValue()
        if (topCard === null){
            this.cards.push(card)
        }
        else{               
            if (topCard !== null && topCard.symbol === card.symbol && topCard.value === card.value - 1){
                this.cards.push(card)
            }
            else{
                throw new Error("Cannot put this card here")
            }
        }
    }

    getTopCardValue():Card|null{
        if (this.cards.length === 0){
            return null
        }
        else return this.cards[this.cards.length -1]
    }
}

export class BoardPile extends CardCollection{

    constructor(){
        super()
    }

    initialize(card: Card):void{
        this.cards.push(card)
    }

    addCard(card: Card):void{
        let topCard:Card|null = this.getTopCardValue()
        if (topCard === null){
            this.cards.push(card)
        }
        else {
            if (topCard !== null && topCard.symbol !== card.symbol && topCard.value === card.value + 1){
                this.cards.push(card)
            }
            else{
                throw new Error("Cannot put this card here")
            }
        }
    }

    getTopCardValue():Card|null{
        if (this.cards.length === 0){
            return null
        }
        else return this.cards[this.cards.length -1]
    }

    playTopCard():Card{
        const topCard = this.cards.pop()
        if (!topCard){
            throw new Error("there is no card in the stack");
        }
        return topCard
    }

    getCards():Card[]|null{
        if (this.cards.length === 0){
            return null
        }
        return this.cards
    }
}