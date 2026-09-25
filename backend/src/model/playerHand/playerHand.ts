import { Crapette, Bin, Draw, Deck } from "../cards/cardCollection"
import { Card } from "../cards/card"
import { ZoneName } from "@shared/IPlayCard"

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

    getTopCardValue(name: ZoneName):Card|null{
        switch (name) {
            case "CRAPETTE":
                return this.crapette.getTopCardValue()
            case "BIN":
                return this.bin.getTopCardValue()
            case "THROW":
                return this.bin.getTopCardValue()
            case "DRAW":
                return this.draw.getTopCardValue()
            default:
                throw new Error ("Illegal move")
        }
    }

    playTopValue(name: ZoneName):Card{
        switch (name) {
            case "CRAPETTE":
                return this.crapette.playTopCard()
            case "BIN":
                return this.bin.playTopCard()
            case "DRAW":
                const card = this.draw.playTopCard()
                if (this.crapette.getCount() === 0){
                    this.draw.setDrawShown(true)
                }
                else{
                    this.draw.setDrawShown(false)
                }
                return card
            default:
                throw new Error ("Illegal move")
        }
    }

    addOnTop(card: Card, name: ZoneName):void{
        switch (name) {
            case "BIN":
                this.bin.enemyAddCard(card)
                break;
            case "THROW":
                this.bin.addCard(card)
                break;
            case "CRAPETTE":
                this.crapette.enemyAddCard(card)
                break;
            default:
                throw new Error ("Illegal move")
        }
    }

    endOfTurn():void{
        this.bin.resetTurn()
        this.draw.setDrawShown(false)
    }

    resetBin():void{
        const drawLength = this.draw.getCount()
        if (drawLength === 0 ){
            const cards = this.bin.resetDeck()
            this.draw.initialize(cards)
        }
    }

    beginingOfTurn():void{
        let cards: Card[] = []
        if (this.draw.getCount() === 0 ){
            cards = this.bin.resetDeck()
            this.draw.initialize(cards)
        }
        if (this.crapette.getCount() === 0 ){
            this.draw.setDrawShown(true)
        }
    }

    switchDrawShown():void{
        this.draw.switchDrawShown()
    }

    getDrawShown(): boolean|null {
        return this.draw.getDrawShown()
    }

    hasWon():boolean{
        if ((this.crapette.getCount() + this.bin.getCount() + this.draw.getCount()) === 0){
            return true
        }
        return false
    }
}