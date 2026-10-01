import { AcePile, BoardPile } from "../cards/cardCollection"
import { Card } from "../cards/card"
import { ZoneName } from "@shared/IPlayCard"

export class GameBoard{
    protected aceSpots: AcePile[]
    protected boardSpots: BoardPile[]

    constructor(initCards: Card[]){
        this.aceSpots = Array.from({ length: 8 }, () => new AcePile())
        this.boardSpots = Array.from({ length: 8 }, () => new BoardPile())
        if (initCards.length !== 8 ){
            throw new Error("not / to many cards to init the board")
        }
        for (let i = 0; i<initCards.length; i++){
            this.boardSpots[i].initialize(initCards[i])
        }
    }

    getTopCardValue(name: ZoneName, id: number):Card|null{
        let card:Card|null = null
        switch (name) {
            case "ACE":
                if (id >=0 && id <8){
                    card = this.aceSpots[id].getTopCardValue()
                }
                return card
            case "BOARD":
                if (id >=0 && id <8){
                    card = this.boardSpots[id].getTopCardValue()
                }
                return card
            default:
                throw new Error("Illegal Move")
        }
    }

    playTopValue(name: ZoneName, id: number):Card{
        switch (name) {
            case "ACE":
                throw new Error("cannot play from an Ace stack")
            case "BOARD":
                if (id <0 && id >=8){
                    throw new Error("Illegal Move")
                }
                return this.boardSpots[id].playTopCard()
                break;
            default:
                throw new Error("Illegal Move")
        }
    }

    addOnTop(card: Card, name: ZoneName, id: number){
        switch (name) {
            case "ACE":
                if (id >=0 && id <8){
                    this.aceSpots[id].addCard(card)
                }
                break; 
            case "BOARD":
                if (id >=0 && id <8){
                    this.boardSpots[id].addCard(card)
                }
                break;
            default:
                throw new Error("Illegal Move")
        }
    }


    getBoard():(Card[]|null)[]{
        return this.boardSpots.map(boardSpot => {
            const cards = boardSpot.getCards()
            if (cards === null) {
                return null;
            }
            return cards;
            })
    }

    getAces():(Card|null)[]{
        const aces = []
        for (let i = 0; i<8; i++){
            aces.push(this.getTopCardValue("ACE", i))
        }
        return aces
    }

    clone():GameBoard{
        const copy: GameBoard = Object.create(GameBoard.prototype);
        copy.aceSpots = this.aceSpots.map(aceSpot => aceSpot.clone());
        copy.boardSpots = this.boardSpots.map(boardSpot => boardSpot.clone());

        return copy
    }
}