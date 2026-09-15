import { AcePile, BoardPile } from "../cards/cardCollection"
import { Card } from "../cards/card"

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

    getTopAce(id: number){
        let card:Card|null = null
        if (id >=0 && id <8){
            card = this.aceSpots[id].getTopCardValue()
        }
        return card
    }

    addOnAce(id:number, card: Card){
        if (id >=0 && id <8){
            this.aceSpots[id].addCard(card)
        }
    }

    getTopBoard(id: number):Card|null{
        let card:Card|null = null
        if (id >=0 && id <8){
            card = this.boardSpots[id].getTopCardValue()
        }
        return card
    }

    getBoard(){
        return this.boardSpots
    }

    addOnBoard(id:number, card: Card){
        if (id >=0 && id <8){
            this.boardSpots[id].addCard(card)
        }
    }

    playFromBoard(id: number){
        if (id >=0 && id <8){
            this.boardSpots[id].playTopCard()
        }
    }

    /*
    add on Ace
    add on Board
    get top ace
    get top Board
    get board (pr l'affichage)
    
     */
}