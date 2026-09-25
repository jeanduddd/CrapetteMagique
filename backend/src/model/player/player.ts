import { PlayerHand } from "../playerHand/playerHand"; 
import { Deck } from "../cards/cardCollection"; 
import { Card } from "../cards/card";
import { ZoneName } from "@shared/IPlayCard";

export class Player{
    protected playerHand: PlayerHand
    protected name: string
    protected id: number

    constructor(name: string, id: number, deck: Deck){
        this.name = name
        this.id = id
        this.playerHand = new PlayerHand(deck)
    }

    getTopCardValue(name: ZoneName):Card|null{
        return this.playerHand.getTopCardValue(name)
    }

    playTopValue(name: ZoneName):Card{
        return this.playerHand.playTopValue(name)
    }

    addOnTop(card: Card, name: ZoneName):void{
        return this.playerHand.addOnTop(card, name)
    }

    switchDraw():void{
        this.playerHand.switchDrawShown()
    }

    resetBin():void{
        this.playerHand.resetBin()
    }    

    getDrawShown():boolean|null{
        return this.playerHand.getDrawShown()
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