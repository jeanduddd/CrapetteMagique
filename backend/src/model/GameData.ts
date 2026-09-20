import { Player } from "./player/player"
import { GameBoard } from "./gameBoard/gameBoard"
import { AcePile, BoardPile, Deck } from "./cards/cardCollection"
import { Card } from "./cards/card";
import { GameState, Location, ZoneName, PileData, CardData } from "@shared/IPlayCard";


export class GameData{
    protected players: Record<string, Player> = {};
    protected gameBoard: GameBoard
    protected gameStatus: "playing"|"won" = "playing"
    protected winnerName: string|null = null

    protected playersTurns: number[]

    constructor(id1: number, nickname1: string, id2: number, nickname2: string, testDeck1?: Deck, testDeck2?: Deck){
        if (!testDeck1 ||!testDeck2){
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
        else{
            const deckPlayer1 = testDeck1
            const boardCards1 = deckPlayer1.drawXCards(4)
            const player1 = new Player(nickname1, id1, deckPlayer1)

            const deckPlayer2 = testDeck2
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

    getRows():(Card[]|null)[]{
        return this.gameBoard.getBoard()
    }

    getPlayerName(playerId: number){
        return this.players[playerId].getName()
    }

    getPlayingPlayerName(){
        return this.players[this.playersTurns[0]]
    }

    showDraw(playerId: number){
        if (playerId !== this.playersTurns[0]){
            if (!this.playersTurns.includes(playerId)){
                throw new Error("This player doesn't exists")
            }
            else{
                throw new Error(`Its not the turn of ${this.players[this.playersTurns[1]].getName()}`)
            }
        }
        this.players[this.playersTurns[0]].switchDraw()
    }

    protected instanciateLocation(zone: ZoneName, idx: number|null):Location{
        const loc: Location = {
            zone: zone,
            index: idx
        }
        return loc
    }


    private safelyToCardDataArray(card: Card | null): CardData[] {
        if (card === null) return [];
        return [{ value: card.value, symbol: card.symbol }];
    }

    private safelyToPileData(cards: (Card | null)[]): PileData[] {
        const list: PileData[] = cards.map(card => {
            
            if (card === null) {
                return {
                    cardNumber: 0,
                    cards: [] 
                };
            }
            return {
                cardNumber: 1,
                cards: [{ value: card.value, symbol: card.symbol }]
            };
        });

        return list;
    }

    private safelyToPileDataFromBoard(rows: (Card[]|null)[]): PileData[] {
        const list: PileData[] = rows.map(row => {
            if (row === null) {
                return {
                    cardNumber: 0,
                    cards: [] 
                };
            }
            return {
                cardNumber: row.length,
                cards: row.map(card => ({ 
                    value: card.value, 
                    symbol: card.symbol 
                }))
            };
        });
        return list;
    }



    getGameState(playerId: number): GameState{
        if (!this.playersTurns.includes(playerId)){
                throw new Error("This player doesn't exists")
        }
        const enemyId = this.playersTurns.filter(id => id !== playerId)[0]

        const myTurn: boolean = playerId === this.playersTurns[0]

        //my cards
        const drawCard: Card|null = this.getTopCard(this.instanciateLocation("DRAW",null),playerId)
        const draw: PileData = {
            cardNumber: 1,
            cards: this.safelyToCardDataArray(drawCard)
        }
        const crapetteCard: Card|null = this.getTopCard(this.instanciateLocation("CRAPETTE",null),playerId)
        const crapette: PileData = {
            cardNumber: 1,
            cards: this.safelyToCardDataArray(crapetteCard)
        }
        const binCard: Card|null = this.getTopCard(this.instanciateLocation("BIN",null),playerId)
        const bin: PileData = {
            cardNumber: 1,
            cards: this.safelyToCardDataArray(binCard)
        }

        //ennemy cards
        const enemyDrawCard: Card|null = this.getTopCard(this.instanciateLocation("DRAW",null),enemyId)
        const enemyDraw: PileData = {
            cardNumber: 1,
            cards: this.safelyToCardDataArray(enemyDrawCard)
        }
        const enemyCrapetteCard: Card|null = this.getTopCard(this.instanciateLocation("CRAPETTE",null),enemyId)
        const enemyCrapette: PileData = {
            cardNumber: 1,
            cards: this.safelyToCardDataArray(enemyCrapetteCard)
        }
        const enemyBinCard: Card|null = this.getTopCard(this.instanciateLocation("BIN",null),enemyId)
        const enemyBin: PileData = {
            cardNumber: 1,
            cards: this.safelyToCardDataArray(enemyBinCard)
        }

        //board
        const acesPiles = this.getAcePiles()
        const aces = this.safelyToPileData(acesPiles)

        const boardPiles = this.getRows()
        const board = this.safelyToPileDataFromBoard(boardPiles)

        return {
            myTurn: myTurn,
            crapette: crapette,
            enemyCrapette: enemyCrapette,
            bin: bin,
            enemyBin: enemyBin,
            draw: draw,
            enemyDraw:enemyDraw,
            aces: aces,
            board: board
        }

        //TODO pb when return empty bin or draw, the size of it is set to 1 instead of 0... :(
    }

    getTopCard(location: Location, playerId: number|null):Card|null{
        const pileId: number|null = location.index
        let card = null
        switch (location.zone) {
            case "BIN":
            case "CRAPETTE":
            case "DRAW":
                if (playerId !== null) card = this.players[playerId].getTopCardValue(location.zone)
                break;
            case "BOARD":
            case "ACE":
                if (pileId !== null) card = this.gameBoard.getTopCardValue(location.zone, pileId)
                break;
            case "THROW":
                break;
            default:
                console.log(location);
                
                throw new Error("you cannot ")       
        }
        return card
    }

    addCard(location: Location, card: Card):void{
        const pileId: number|null = location.index
        switch (location.zone) {
            case "THROW":
                this.players[this.playersTurns[0]].addOnTop(card, location.zone)
                break;
            case "BIN":
            case "CRAPETTE":
                this.players[this.playersTurns[1]].addOnTop(card, location.zone)
                break;
            case "BOARD":
            case "ACE":
                if (pileId !== null) this.gameBoard.addOnTop(card, location.zone, pileId)
                break;
            default:
                throw new Error("location corresponds to nothing...")
        }
    }

    playTopCard(location: Location):Card{
        const pileId: number|null = location.index
        switch (location.zone) {
            case "BIN":
            case "CRAPETTE":
            case "DRAW":
                console.log("on joue la carte de: ", this.getPlayerName(this.playersTurns[0]))
                return this.players[this.playersTurns[0]].playTopValue(location.zone)
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
        const destinationCard = this.getTopCard(destination, this.playersTurns[1]) // ATTENTION ICI
        const destVal = Number(destinationCard?.value);
        const cardVal = Number(card.value);
        if (destination.zone === "DRAW"){
            throw new Error("this card cannot be played here")
        }
        if (destination.zone === "ACE"){
            if (destinationCard !== null){
                if (destinationCard.symbol !== card.symbol || destVal !== (cardVal - 1)){
                    throw new Error("you have to play the same symbol and value + 1")
                }
            }
            else{
                if (cardVal != 1){
                    throw new Error("you have to play an ace in an empty ACE spot")
                }
            }
        }
        if (destination.zone === "BOARD" && destinationCard !== null){
            if (destVal !== (cardVal + 1)){
                throw new Error("you have to play a -1 value card")
            }
            if ((destinationCard.symbol in ["clover", "spade"] && card.symbol in ["clover", "spade"] || (destinationCard.symbol in ["heart", "diamond"] && card.symbol in ["heart", "diamond"]))  ){
                throw new Error("you have to alternate the colors")
            }
        }
        if (destination.zone === "BIN"){
            if (destinationCard?.symbol !== card.symbol || (destVal !== (cardVal + 1) && destVal !== (cardVal - 1))){
                throw new Error("you have to play the same symbol and neighbour value")
            }
        }
        if (destination.zone === "CRAPETTE"){
            // console.log("symbol condition" , destinationCard?.symbol !== card.symbol);
            // console.log('valeur dest', destVal, "valeur origin", cardVal);
            
            // console.log("val + 1 condition", destVal !== (cardVal + 1));
            // console.log("val - 1 condition", destVal !== (cardVal - 1));
            
            if (destinationCard?.symbol !== card.symbol || (destVal !== (cardVal + 1) && destVal !== (cardVal - 1))){
                throw new Error("you have to play the same symbol and neighbour value")
            }
        }
    }




    play(playerId: number, origin: Location, destination: Location){
        if (playerId !== this.playersTurns[0]){
            if (!this.playersTurns.includes(playerId)){
                throw new Error("This player doesn't exists")
            }
            else{
                throw new Error(`Its not the turn of ${this.players[this.playersTurns[1]].getName()}`)
            }
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

        const currentPlayerId = this.playersTurns[0]
        const player = this.players[currentPlayerId]
        
        const originCard = this.getTopCard(origin, currentPlayerId)
        console.log("ON REGARDE LA CARTE DE: ", this.getPlayerName(currentPlayerId));
        if (originCard === null){
            throw new Error("Illegal Move")
        }

        // console.log("dest", destination);
        this.czechMove(originCard, destination)

        this.playTopCard(origin)
        this.addCard(destination,originCard)     
        

        if (origin.zone === "DRAW" && destination.zone === "THROW"){
            this.playersTurns[0] = this.playersTurns[1]
            this.playersTurns[1] = currentPlayerId
            this.players[currentPlayerId].resetforNextTurn()
            //this.players[this.playersTurns[1]].newTurn()
        }

        if (this.players[playerId].hasWon()){
            this.winnerName = this.getPlayerName(playerId)
            this.gameStatus = "won"
        }

    }
}
