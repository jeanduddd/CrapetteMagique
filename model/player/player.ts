import { PlayerHand } from "../playerHand/playerHand"; 
import { Deck } from "../cards/cardCollection"; 

export class Player{
    protected playerHand: PlayerHand
    protected name: string
    protected id: number

    constructor(name: string, id: number, deck: Deck){
        this.name = name
        this.id = id
        this.playerHand = new PlayerHand(deck)
    }

    playCrapette(){
        this.playerHand.playCrapette()
    }

    getCrapetteValue(){
        return this.playerHand.getCrapetteTopValue()
    }

    playBin(){
        this.playerHand.playBin()
    }

    getBinValue(){
        return this.playerHand.getBinTopValue()
    }

    playDraw(){
        this.playerHand.playDraw()
    }

    getDrawValue(){
        return this.playerHand.getDrawTopValue()
    }

    switchDraw(){
        this.playerHand.switchDrawShown()
    }

    resetforNextTurn(){
        this.playerHand.endOfTurn()
    }

    newTurn(){
        this.playerHand.beginingOfTurn()
    }

    hasWon(){
        return this.playerHand.hasWon()
    }

    getName(){
        return this.name
    }
}