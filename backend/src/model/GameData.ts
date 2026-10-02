import { Player } from "./player/player"
import { GameBoard } from "./gameBoard/gameBoard"
import { AcePile, BoardPile, Deck } from "./cards/cardCollection"
import { Card } from "./cards/card";
import { GameState, Location, ZoneName, PileData, CardData, PlayRequest } from "@shared/IPlayCard";
import { error } from "node:console";


export class GameData{
    protected players: Record<string, Player> = {};
    protected gameBoard: GameBoard
    protected gameStatus: "playing"|"won" = "playing"
    protected winnerId: number|null = null

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

    getWinnerId():number|null{
        return this.winnerId
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
                throw new Error(`Its not your turn`)
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

        const myName = this.players[playerId].getName()
        const enemyName = this.players[enemyId].getName()

        const myTurn: boolean = playerId === this.playersTurns[0]
        const myDrawShown: boolean | null  = this.players[playerId].getDrawShown()
        const enemyDrawShown: boolean | null  = this.players[enemyId].getDrawShown()
        const canSayCrapette: boolean = !myTurn && !this.players[playerId].getAlreadySaidCrapette() && enemyDrawShown !== null && enemyDrawShown
        
        //my cards
        const drawCard: Card|null = this.getTopCard(this.instanciateLocation("DRAW",null),playerId)
        const draw: PileData = {
            cardNumber: myDrawShown === null ? 0 : myDrawShown === false ? -1 : 1,
            cards: this.safelyToCardDataArray(drawCard)
        }
        const crapetteCard: Card|null = this.getTopCard(this.instanciateLocation("CRAPETTE",null),playerId)
        const crapette: PileData = {
            cardNumber: crapetteCard === null ? 0 : 1,
            cards: this.safelyToCardDataArray(crapetteCard)
        }
        const binCard: Card|null = this.getTopCard(this.instanciateLocation("BIN",null),playerId)
        const bin: PileData = {
            cardNumber: binCard === null ? 0 : 1,
            cards: this.safelyToCardDataArray(binCard)
        }

        //ennemy cards
        const enemyDrawCard: Card|null = this.getTopCard(this.instanciateLocation("DRAW",null),enemyId)
        const enemyDraw: PileData = {
            cardNumber: enemyDrawShown === null ? 0 : enemyDrawShown === false ? -1 : 1,
            cards: this.safelyToCardDataArray(enemyDrawCard)
        }
        const enemyCrapetteCard: Card|null = this.getTopCard(this.instanciateLocation("CRAPETTE",null),enemyId)
        const enemyCrapette: PileData = {
            cardNumber: enemyCrapetteCard === null ? 0 : 1,
            cards: this.safelyToCardDataArray(enemyCrapetteCard)
        }
        const enemyBinCard: Card|null = this.getTopCard(this.instanciateLocation("BIN",null),enemyId)
        const enemyBin: PileData = {
            cardNumber: enemyBinCard === null ? 0 : 1,
            cards: this.safelyToCardDataArray(enemyBinCard)
        }

        //board
        const acesPiles = this.getAcePiles()
        const aces = this.safelyToPileData(acesPiles)

        const boardPiles = this.getRows()
        const board = this.safelyToPileDataFromBoard(boardPiles)

        return {
            myName: myName,
            enemyName: enemyName,
            myTurn: myTurn,
            canSayCrapette: canSayCrapette,
            crapette: crapette,
            enemyCrapette: enemyCrapette,
            bin: bin,
            enemyBin: enemyBin,
            draw: draw,
            enemyDraw:enemyDraw,
            aces: aces,
            board: board
        }
    }

    getTopCard(location: Location, playerId: number|null, state: GameData = this):Card|null{
        const pileId: number|null = location.index
        let card = null
        switch (location.zone) {
            case "BIN":
            case "CRAPETTE":
            case "DRAW":
                if (playerId !== null) card = state.players[playerId].getTopCardValue(location.zone)
                break;
            case "BOARD":
            case "ACE":
                if (pileId !== null) card = state.gameBoard.getTopCardValue(location.zone, pileId)
                break;
            case "THROW":
                break;
            default:
                console.log(location);
                throw new Error("This location doesn't exist...")       
        }
        return card
    }

    addCard(location: Location, card: Card, state: GameData = this):void{
        const pileId: number|null = location.index
        switch (location.zone) {
            case "THROW":
                state.players[state.playersTurns[0]].addOnTop(card, location.zone)
                break;
            case "BIN":
            case "CRAPETTE":
                state.players[state.playersTurns[1]].addOnTop(card, location.zone)
                break;
            case "BOARD":
            case "ACE":
                if (pileId !== null) state.gameBoard.addOnTop(card, location.zone, pileId)
                break;
            default:
                throw new Error("This location doesn't exist...")
        }
    }

    playTopCard(location: Location, state: GameData = this):Card{
        const pileId: number|null = location.index
        switch (location.zone) {
            case "BIN":
            case "CRAPETTE":
            case "DRAW":
                console.log("on joue la carte de: ", state.getPlayerName(state.playersTurns[0]))
                return state.players[state.playersTurns[0]].playTopValue(location.zone)
            case "BOARD":
                if (pileId !== null) return state.gameBoard.playTopValue(location.zone, pileId)
                break;
            default:
                throw new Error("This location doesn't exist...")
        }
        throw new Error("Illegal Move")
    }

    initTurn(){
        this.players[this.playersTurns[0]].newTurn()
    }

    czechMove(card: Card, destination: Location, state: GameData = this){
        const destinationCard = state.getTopCard(destination, state.playersTurns[1]) // ATTENTION ICI
        const destVal = Number(destinationCard?.value);
        const cardVal = Number(card.value);
        if (destination.zone === "DRAW"){
            throw new Error("Cannot place a card there")
        }
        if (destination.zone === "ACE"){
            if (destinationCard !== null){
                if (destinationCard.symbol !== card.symbol || destVal !== (cardVal - 1)){
                    throw new Error("Must be the next card of this symbol")
                }
            }
            else{
                if (cardVal != 1){
                    throw new Error("Must be an ace in an empty ace spot")
                }
            }
        }

        if (destination.zone === "BOARD" && destinationCard !== null){
            if (destVal !== (cardVal + 1)){
                throw new Error("Must be one value lower")
            }
            if ((["club", "spade"].includes(destinationCard.symbol) && ["club", "spade"].includes(card.symbol) || (["heart", "diamond"].includes(destinationCard.symbol) && ["heart", "diamond"].includes(card.symbol)))){
                throw new Error("Must alternate the colors")
            }
        }
        if (destination.zone === "BIN"){
            if (destinationCard?.symbol !== card.symbol || (destVal !== (cardVal + 1) && destVal !== (cardVal - 1))){
                throw new Error("Must be the same symbol and neighbour value")
            }
        }
        if (destination.zone === "CRAPETTE"){
            if (destinationCard?.symbol !== card.symbol || (destVal !== (cardVal + 1) && destVal !== (cardVal - 1))){
                throw new Error("Must be the same symbol and neighbour value")
            }
        }
    }
    
    hasMissedCrapette(playerId: number):boolean {

        if (playerId !== this.playersTurns[0]) throw new Error("Can't say crapette... You're playing")
        const drawShown = this.players[playerId].getDrawShown()
        if (drawShown === null || drawShown === false) throw new Error("Can't say crapette, draw not shown")

        this.players[this.playersTurns[1]].setAlreadySaidCrapette(true)
        
        const topCrapette = this.players[playerId].getTopCardValue("CRAPETTE")
        if (topCrapette === null) return false;

        const initialState = this.clone()

        console.log("begin the detection process");
        
        return this._crapetteSolver(playerId,initialState, 0, new Set());
    }

    _crapetteSolver(playerId: number, state: GameData, depth: number, history: Set<string>):boolean {
        
        if (depth > 10) return false;

        console.log("depth: ",depth)
        console.log("player id :",playerId);
        if (depth === 0) console.dir(state, { depth: null, colors: true });
        

        const topCrapette = state.getTopCard(this.instanciateLocation("CRAPETTE",null),playerId,state)
        console.log("crapette: ", topCrapette);
        
        if (topCrapette === null) return false;

        if (this._canCardBePlayedAnywhere(topCrapette, state)) {
            return true;
        }

        const movableCards: { card: Card; origin: Location }[] = []
        
        for (let i = 0; i < 8; i++){
            const card = state.getTopCard(this.instanciateLocation("BOARD",i), playerId, state)
            if (card !== null) movableCards.push({ card: card, origin: this.instanciateLocation("BOARD",i) })
        }
        
        const enemyId = state.playersTurns[1]

        for (let item of movableCards){
            const validDestinations = this._getValidDestinations(item.card, state, enemyId)

            for (let dest of validDestinations){

                const simulatedState = this._applySimulatedMove(item, dest, state);
                const stateSignature = JSON.stringify(simulatedState);
                if (history.has(stateSignature)) {
                    continue; 
                }
                history.add(stateSignature);

                const isMoveToCenter = dest.zone === "ACE";
                const newDepth = isMoveToCenter ? depth : depth + 1;

                if (this._crapetteSolver(playerId, simulatedState, newDepth, history)) {
                    return true;
                }
            }

        }
        return false
    }

    _applySimulatedMove(item: { card: Card; origin: Location } , destination: Location, state: GameData): GameData{
        const newState: GameData = state.clone()

        try{
            console.log((item));
            console.log("card: ", newState.getTopCard(destination, this.playersTurns[1],newState) ,"destination: ", destination);
                      
            newState.playTopCard(item.origin, newState)
            newState.addCard(destination,item.card, newState) 
        }
        catch{}

        return newState 
    }

    _getValidDestinations(card: Card, state: GameData, enemyId: number): Location[]{
        const destinationList: Location[] = []
        for (let i = 0; i < 8; i++){
            const dest = this.instanciateLocation("BOARD",i)
            try{
                this.czechMove(card, dest, state)
                destinationList.push(dest)
            }
            catch {
                continue
            }
        }
        for (let i = 0; i < 8; i++){
            const dest = this.instanciateLocation("ACE",i)
            try{
                this.czechMove(card, dest, state)
                destinationList.push(dest)
            }
            catch {
                continue
            }
        }
        try{
            const dest = this.instanciateLocation("CRAPETTE",null)
            this.czechMove(card, dest , state)
            destinationList.push(dest)
        }
        catch {}
        try{
            const dest = this.instanciateLocation("BIN",null)
            this.czechMove(card, dest , state)
            destinationList.push(dest)
        }
        catch {}

        return destinationList
    }

    _canCardBePlayedAnywhere(card:Card, state: GameData):boolean{
        for (let i = 0; i < 8; i++){
            try {
                this.czechMove(card, this.instanciateLocation("ACE",i), state)
                return true
            }
            catch {
                continue
            }
        }
        for (let i = 0; i < 8; i++){
            try {
                this.czechMove(card, this.instanciateLocation("BOARD",i), state)
                return true
            }
            catch {
                continue
            }
        }
        try{
            const dest = this.instanciateLocation("CRAPETTE",null)
            this.czechMove(card, dest , state)
        }
        catch {}
        try{
            const dest = this.instanciateLocation("BIN",null)
            this.czechMove(card, dest , state)
        }
        catch {}
        return false
    }

    setGameAfterCrapette(){
        const playingId = this.playersTurns[0]

        this.players[this.playersTurns[1]].setAlreadySaidCrapette(false)
        this.players[this.playersTurns[1]].resetBin()
        this.playersTurns[0] = this.playersTurns[1]
        this.playersTurns[1] = playingId
        this.players[playingId].resetforNextTurn()
    }


    play(playerId: number, origin: Location, destination: Location){
        if (playerId !== this.playersTurns[0]){
            if (!this.playersTurns.includes(playerId)){
                throw new Error("This player doesn't exists")
            }
            else{
                throw new Error(`Its not your turn`)
            }
        }
        // if (origin.zone === "THROW"){
        //     throw new Error("Illegal Move")
        // }
        if (origin.zone !== "DRAW" && destination.zone === "THROW"){
            throw new Error('You can only throw your draw')
        }
        if (origin.zone === "ACE" ){
            throw new Error("Cannot play a card from an ace spot")
        }
        // if (destination.zone === "DRAW"){
        //     throw new Error('Illegal move')
        // }

        const currentPlayerId = this.playersTurns[0]
        const player = this.players[currentPlayerId]
        
        const originCard = this.getTopCard(origin, currentPlayerId)
        console.log("ON REGARDE LA CARTE DE: ", this.getPlayerName(currentPlayerId));
        if (originCard === null){
            throw new Error("No origin to play ?")
        }

        // console.log("dest", destination);
        this.czechMove(originCard, destination)

        this.playTopCard(origin)
        this.addCard(destination,originCard)     
        

        if (origin.zone === "DRAW" && destination.zone === "THROW"){
            this.players[this.playersTurns[1]].setAlreadySaidCrapette(false)
            this.players[this.playersTurns[1]].resetBin()
            this.playersTurns[0] = this.playersTurns[1]
            this.playersTurns[1] = currentPlayerId
            this.players[currentPlayerId].resetforNextTurn()
        }

        if (destination.zone !== "THROW"){
            this.players[currentPlayerId].resetBin()
        }

        if (this.players[playerId].hasWon()){
            this.winnerId = playerId
            this.gameStatus = "won"
        }
    }

    clone(): GameData{
        const copy: GameData = Object.create(GameData.prototype);
        copy.winnerId = this.winnerId
        copy.gameStatus = this.gameStatus
        copy.playersTurns = []
        for (let players of this.playersTurns){
            copy.playersTurns.push(players)
        }
        copy.players = {};
        for (const [playerId, player] of Object.entries(this.players)) {
            copy.players[playerId] = player.clone();
        }
        copy.gameBoard = this.gameBoard.clone()

        return copy
    }
}