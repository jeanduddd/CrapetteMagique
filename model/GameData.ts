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
        const boardCards1 = deckPlayer1.drawXCards(4)
        const player1 = new Player(nickname1, id1, deckPlayer1)

        const deckPlayer2 = new Deck()
        const boardCards2 = deckPlayer2.drawXCards(4)
        const player2 = new Player(nickname2, id2, deckPlayer2)

        const boardCards = boardCards1.concat(boardCards2)
        this.gameBoard = new GameBoard(boardCards)

        this.players = {
            [id1]: player1,
            [id2]: player2,
        }
        const C1 = player1.getCrapetteValue()
        const C2 = player2.getCrapetteValue()
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

    getMyTopCard(location: Location):Card|null{
        let card = null
        switch (location.zone) {
            case "BIN":
                card =  this.players[this.playersTurns[0]].getBinValue()
                break;
            case "CRAPETTE":
                card =  this.players[this.playersTurns[0]].getCrapetteValue()
                break;
            case "DRAW":
                card =  this.players[this.playersTurns[0]].getDrawValue()
                break;
            default:
                throw new Error("location corresponds to nothing...")       
        }
        return card
    }

    getTopCardToPlay(location: Location):Card|null{
        let card = null
        switch (location.zone) {
            case "BIN":
                card =  this.players[this.playersTurns[1]].getBinValue()
                break;
            case "CRAPETTE":
                card =  this.players[this.playersTurns[1]].getCrapetteValue()
                break;
            case "DRAW":
                card =  this.players[this.playersTurns[1]].getDrawValue()
                break;
            case "BOARD":
                if (!location.index) throw new Error("Cannot locate the corresponding row")
                card = this.gameBoard.getTopBoard(location.index)
                break;
            case "ACE":
                if (!location.index) throw new Error("Cannot locate the corresponding row")
                card = this.gameBoard.getTopAce(location.index)
                break;
            default:
                throw new Error("location corresponds to nothing...")       
        }
        return card
    }

    playCard(origin:Location, destination:Location):void{
        
        switch (destination.zone) {
            case "THROW":
                this.players[this.playersTurns[0]].playDraw()
                this.players[this.playersTurns[0]].addOnBin(card)
                break;
            case "BIN":
                this.players[this.playersTurns[0]].playBin()
                this.players[this.playersTurns[0]].addOnBin(card)
                break;
            case "CRAPETTE":
                
                break;
            case "BOARD":
                
                break;
            case "ACE":
                
                break;
            default:
                throw new Error("location corresponds to nothing...")       
        }
    }

    initTurn(){
        this.players[this.playersTurns[0]].newTurn()
    }

    czechMove(card: Card, destination: Location){
        const destinationCard = this.getTopCardToPlay(destination)
        if (destination.zone === "DRAW"){
            throw new Error("this card cannot be played here")
        }
        if (destination.zone === "ACE" && destinationCard !== null){
            if (destinationCard.symbol !== card.symbol || destinationCard.value !== (card.value - 1)){
                throw new Error("you have to play the same symbol and value + 1")
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
        if (origin.zone !== "DRAW" && destination.zone === "THROW"){
            const card = this.getTopCard(origin)
            if (card === null) throw new Error("illegal move")
            this.players[playerId].addOnBin(card)
            this.playersTurns[0] = this.playersTurns[1]
            this.playersTurns[1] = playerId
            this.players[playerId].resetforNextTurn()
        }
        if (destination.zone === "THROW"){
            throw new Error("Illegal Move")
        }

        const originCard = this.getTopCard(origin)
        const destinationCard = this.getTopCard(destination)

        if (originCard === null){
            throw new Error("Illegal Move")
        }
        this.czechMove(originCard, destination)





        if (this.players[playerId].hasWon()){
            this.winnerName = this.getPlayerName()
            this.gameStatus = "won"
        }

        
        /*
        Jeu - Jeu 
        Jeu - Ace
        Jeu - Crapette
        Jeu - Poubelle
        Crapette - Jeu 
        Crapette - Crapette
        Crapette - Poubelle
        Crapette - Ace
        Poubelle - Jeu
        Poubelle - Poubelle
        Poubelle - Crapette
        Poubelle - Ace
        Pioche - Crapette
        Pioche - Poubelle
        Pioche - Jeu
        Pioche - Ace
        Pioche - Throw
        */

    }


    /*
    play a card (Origin Dest)

    throw to the bin --> cad la fin du tour (c'est un sous cas de play a card en soit)

    fait une vérif à chaque fois que qqn pose une carte s'il a gagné, à la fin de la fction play a card
    throw une erreur si partie gagnée et qu'on joue encore

    */
}