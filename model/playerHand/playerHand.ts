import { Crapette, Bin, Draw, Deck } from "../cards/cardCollection"
import { Card } from "../cards/card"

export class PlayerHand{
    protected crapette: Crapette
    protected bin: Bin
    protected draw: Draw

    constructor(deck: Deck){
        this.crapette = new Crapette()
        this.bin = new Bin()
        this.draw = new Draw()
        
        this.crapette.initialize(deck.drawXCards(13))
        this.draw.initialize(deck.drawXCards(35))
    }

    getCrapetteTopValue(): Card|null{
        return this.crapette.getTopCardValue()
    }

    playCrapette(){
        return this.crapette.playTopCard()
    }

    enemyAddCardCrapette(card: Card){
        this.crapette.enemyAddCard(card)
    }

    getBinTopValue(){
        return this.bin.getTopCardValue()
    }

    playBin(){
        return this.bin.playTopCard()
    }

    addInBin(card: Card){
        this.bin.addCard(card)
    }

    enemyAddCardBin(card: Card){
        this.bin.enemyAddCard(card)
    }

    getDrawTopValue(){
        return this.draw.getTopCardValue()
    }

    playDraw(){
        const card = this.draw.playTopCard()
        if (this.crapette.getCount() === 0){
            this.draw.setDrawShown(true)
        }
        else{
            this.draw.setDrawShown(false)
        }
        return card
    }

    enemyAddCardDraw(card: Card){
        this.bin.enemyAddCard(card)
    }

    endOfTurn(){
        this.bin.resetTurn()
        this.draw.setDrawShown(false)
    }

    beginingOfTurn(){
        let cards: Card[] = []
        if (this.draw.getCount() === 0 ){
            cards = this.bin.resetDeck()
            this.draw.initialize(cards)
            this.draw.shuffle()
        }
        if (this.crapette.getCount() === 0 ){
            this.draw.setDrawShown(true)
        }
    }

    switchDrawShown(){
        this.draw.switchDrawShown()
    }

    hasWon(){
        if ((this.crapette.getCount() + this.bin.getCount() + this.draw.getCount()) === 0){
            return true
        }
        return false
    }
}