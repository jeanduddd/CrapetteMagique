import { AcePile, BoardPile } from "../cards/cardCollection"
import { Card } from "../cards/card"
import { ZoneName } from "../IPlayCard"

export class GameBoard{
    protected aceSpots: AcePile[]
    protected boardSpots: BoardPile[]

    constructor(initCards: Card[]){
        this.aceSpots = Array.from({ length: 8 }, () => new AcePile())
        this.boardSpots = Array.from({ length: 8 }, () => new BoardPile())
        if (initCards.length !== 8 ){
            throw new Error("not / to many cards to init the board")
        }
        for (let i = 0; i<initCards.length-1; i++){
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

    playTopValue(name: ZoneName, id: number){
        switch (name) {
            case "ACE":
                throw new Error("cannot play from an Ace stack")
            case "BOARD":
                if (id >=0 && id <8){
                    this.boardSpots[id].playTopCard()
                }
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


    getBoard():BoardPile[]{
        return this.boardSpots
    }

    getAces():(Card|null)[]{
        const aces = []
        for (let i = 0; i<8; i++){
            aces.push(this.getTopCardValue("ACE", i))
        }
        return aces
    }

    

    /*
    add on Ace
    add on Board
    get top ace
    get top Board
    get board (pr l'affichage)
    
     */
}