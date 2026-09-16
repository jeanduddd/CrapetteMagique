import { PlayerHand } from "../playerHand/playerHand"; 
import { Deck } from "../cards/cardCollection"; 
import { Card } from "../cards/card";

export class Player{
    protected playerHand: PlayerHand
    protected name: string
    protected id: number

    constructor(name: string, id: number, deck: Deck){
        this.name = name
        this.id = id
        this.playerHand = new PlayerHand(deck)
    }

    playCrapette():Card{
        return this.playerHand.playCrapette()
    }

    getCrapetteValue():Card|null{
        return this.playerHand.getCrapetteTopValue()
    }

    playBin():Card{
        return this.playerHand.playBin()
    }

    getBinValue():Card|null{
        return this.playerHand.getBinTopValue()
    }

    playDraw():Card{
        return this.playerHand.playDraw()
    }

    getDrawValue():Card|null{
        return this.playerHand.getDrawTopValue()
    }

    switchDraw():void{
        this.playerHand.switchDrawShown()
    }

    resetforNextTurn():void{
        this.playerHand.endOfTurn()
    }

    newTurn():void{
        this.playerHand.beginingOfTurn()
    }

    hasWon():boolean{
        return this.playerHand.hasWon()
    }

    getName():string{
        return this.name
    }
}