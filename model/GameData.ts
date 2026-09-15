import { Player } from "./player/player"
import { GameBoard } from "./gameBoard/gameBoard"
import { Deck } from "./cards/cardCollection"

export class GameData{
    protected players: Record<string, Player> = {};
    protected gameBoard: GameBoard
    protected gameStatus: "playing"|"won" = "playing"
    protected winnerId: string|null = null

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

    
    /*
    play a card (Origin Dest)

    throw to the bin --> cad la fin du tour (c'est un sous cas de play a card en soit)

    switch l'affichage de la pioche (si ya la crapette, faire qu'on clique et ca retourne)

    getAcePiles, getRows, getTopCrapette, TopBin, TopDraw
    get player names

    fait une vérif à chaque fois que qqn pose une carte s'il a gagné, à la fin de la fction play a card
    throw une erreur si partie gagnée et qu'on joue encore


    get status
    get id winner
    */
}