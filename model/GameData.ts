import { Player } from "./player/player"
import { GameBoard } from "./gameBoard/gameBoard"
import { BoardPile, Deck } from "./cards/cardCollection"
import { Card } from "./cards/card";
import { Location } from "./IPlayCard";


export class GameData{
    protected players: Record<string, Player> = {};
    protected gameBoard: GameBoard
    protected gameStatus: "playing"|"won" = "playing"
    protected winnerName: string|null = null

    protected playersTurns: number[]

    constructor(id1: number, nickname1: string, id2: number, nickname2: string){
        const deckPlayer1 = new Deck()
        deckPlayer1.shuffle()
        const boardCards1 = deckPlayer1.drawXCards(4)
        const player1 = new Player(nickname1, id1, deckPlayer1)

        const deckPlayer2 = new Deck()
        deckPlayer2.shuffle()
        const boardCards2 = deckPlayer2.drawXCards(4)
        const player2 = new Player(nickname2, id2, deckPlayer2)

        const boardCards = boardCards1.concat(boardCards2)
        this.gameBoard = new GameBoard(boardCards)

        this.players = {
            [id1]: player1,
            [id2]: player2,
        }
        const C1 = player1.getTopCardValue("CRAPETTE")
        const C2 = player2.getTopCardValue("CRAPETTE")
        if (C1 && C2 && C1.value >= C2.value){
            this.playersTurns = [id1, id2]
        }
        else {
            this.playersTurns = [id2, id1]
        }
    }

    getStatus():string{
        return this.gameStatus
    }

    getWinnerName():string|null{
        return this.winnerName
    }

    getAcePiles():(Card|null)[]{
        return this.gameBoard.getAces()
    }

    getRows():BoardPile[]{
        return this.gameBoard.getBoard()
    }

    getPlayerName(){
        return this.players[this.playersTurns[0]].getName()
    }

    showDraw(){
        this.players[this.playersTurns[0]].switchDraw()
    }

    getTopCard(location: Location, playerId: number|null):Card|null{
        const pileId: number|null = location.index
        let card = null
        switch (location.zone) {
            case "BIN":
            case "CRAPETTE":
            case "DRAW":
                if (playerId !== null) card = this.players[this.playersTurns[playerId]].getTopCardValue(location.zone)
                break;
            case "BOARD":
            case "ACE":
                if (pileId !== null) card = this.gameBoard.getTopCardValue(location.zone, pileId)
                break;
            default:
                throw new Error("location corresponds to nothing...")       
        }
        return card
    }

    addCard(location: Location, card: Card):void{
        const pileId: number|null = location.index
        switch (location.zone) {
            case "THROW":
                this.players[this.playersTurns[this.playersTurns[0]]].addOnTop(card, location.zone)
                break;
            case "BIN":
            case "CRAPETTE":
                this.players[this.playersTurns[this.playersTurns[1]]].addOnTop(card, location.zone)
                break;
            case "BOARD":
            case "ACE":
                if (pileId !== null) this.gameBoard.addOnTop(card, location.zone, pileId)
                break;
            default:
                throw new Error("location corresponds to nothing...")
        }
        throw new Error("Illegal Move")
    }

    playTopCard(location: Location):Card{
        const pileId: number|null = location.index
        switch (location.zone) {
            case "BIN":
            case "CRAPETTE":
            case "DRAW":
                return this.players[this.playersTurns[this.playersTurns[0]]].playTopValue(location.zone)
            case "BOARD":
                if (pileId !== null) return this.gameBoard.playTopValue(location.zone, pileId)
                break;
            default:
                throw new Error("location corresponds to nothing...")
        }
        throw new Error("Illegal Move")
    }

    initTurn(){
        this.players[this.playersTurns[0]].newTurn()
    }

    czechMove(card: Card, destination: Location){
        const destinationCard = this.getTopCard(destination, this.playersTurns[0])
        if (destination.zone === "DRAW"){
            throw new Error("this card cannot be played here")
        }
        if (destination.zone === "ACE"){
            if (destinationCard !== null){
                if (destinationCard.symbol !== card.symbol || destinationCard.value !== (card.value - 1)){
                    throw new Error("you have to play the same symbol and value + 1")
                }
            }
            else{
                if (card.value != 1){
                    throw new Error("you have to play an ace in an empty ACE spot")
                }
            }
        }
        if (destination.zone === "BOARD" && destinationCard !== null){
            if (destinationCard.value !== (card.value + 1)){
                throw new Error("you have to play a lower card")
            }
            if ((destinationCard.symbol in ["clover", "spade"] && card.symbol in ["clover", "spade"] || (destinationCard.symbol in ["heart", "diamond"] && card.symbol in ["heart", "diamond"]))  ){
                throw new Error("you have to alternate the colors")
            }
        }
        if (destination.zone === "BIN"){
            if (destinationCard?.symbol !== card.symbol || (destinationCard.value !== card.value + 1 && destinationCard.value !== card.value - 1)){
                throw new Error("you have to play the same symbol and neighbour value")
            }
        }
        if (destination.zone === "CRAPETTE"){
            if (destinationCard?.symbol !== card.symbol || (destinationCard.value !== card.value + 1 && destinationCard.value !== card.value - 1)){
                throw new Error("you have to play the same symbol and neighbour value")
            }
        }
    }




    play(playerId: number, origin: Location, destination: Location){
        if (playerId !== this.playersTurns[0]){
            if (playerId ! in this.playersTurns){
                throw new Error("This player doesn't exists")
            }
            throw new Error(`Its not the turn of ${this.players[playerId].getName()}`)
        }
        // if (origin.zone === "THROW"){
        //     throw new Error("Illegal Move")
        // }
        if (origin.zone !== "DRAW" && destination.zone === "THROW"){
            throw new Error('Illegal move')
        }
        if (origin.zone === "ACE" ){
            throw new Error("Illegal Move")
        }
        // if (destination.zone === "DRAW"){
        //     throw new Error('Illegal move')
        // }

        const currentPlayer = this.playersTurns[0]
        const player = this.players[playerId]
        
        const originCard = this.getTopCard(origin, currentPlayer)
        if (originCard === null){
            throw new Error("Illegal Move")
        }
        this.czechMove(originCard, destination)

        this.addCard(destination,originCard,)
        this.playTopCard(origin)
        

        if (origin.zone === "DRAW" && destination.zone === "THROW"){
            this.playersTurns[0] = this.playersTurns[1]
            this.playersTurns[1] = playerId
            this.players[playerId].resetforNextTurn()
        }

        if (this.players[playerId].hasWon()){
            this.winnerName = this.getPlayerName()
            this.gameStatus = "won"
        }

    }

}