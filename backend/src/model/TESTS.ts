import { GameData } from "./GameData";
import { Card } from "./cards/card";
import { Deck } from "./cards/cardCollection";
import { Location, ZoneName } from "@shared/IPlayCard";


///USEFULL TEST FUNCTIONS
function displayGameState(){
    console.log("board: ");
    const rows = game.getRows()
    for (const row of rows) {
        console.log(row)
    }
    console.log(game.getAcePiles())
}

function displayHandsState(){
    const crapette: Location = { 
        zone: 'CRAPETTE', 
        index: null
    };
    const draw: Location = { 
        zone: 'DRAW', 
        index: null
    };
    const poubelle: Location = { 
        zone: 'BIN', 
        index: null
    };

    for (const i of [1,2]){
        console.log(`jeu de ${game.getPlayerName(i)}`);
        console.log("crapette:", game.getTopCard( crapette , i));
        console.log("draw:", game.getTopCard( draw , i));
        console.log("poubelle:", game.getTopCard( poubelle , i));
    }
}

function play(playeriD: number, origin: Location, dest: Location){
    try{
        game.play(playeriD,origin,dest)
    }
    catch(e){
        console.log(e);
    }
}

function instanciateLocation(zone: ZoneName, idx: number|null):Location{
    const loc: Location = {
        zone: zone,
        index: idx
    }
    return loc
}

function playATurn(whereToTake: Location, whereToPlay: Location){
    console.log("play");
    console.log("joueur qui joue: ", currentPlayer)
    console.log("à jouer:", game.getTopCard(whereToTake, currentPlayer));
    console.log("où jouer:", game.getTopCard(whereToPlay, currentPlayer));
    play(currentPlayer,whereToTake,whereToPlay)
    displayGameState()
    displayHandsState()
    console.log("End of turn");
    console.log("");
    
}

function showDraw(idx: number){
    game.showDraw(idx)
    console.log("show draw");
    displayHandsState()
    console.log("end");
    console.log();
}


///TESTS
const playersId= [1,2]
let currentPlayer = 1
const deck = new Deck()
const testCards: Card[] = [new Card(1,"diamond"), new Card(3, "spade")]
const finalDeck = testCards.concat(deck.drawXCards(52-testCards.length))
console.log(finalDeck);

const game = new GameData(1,"Jean",2,"David", new Deck ([...finalDeck]), new Deck ([...finalDeck]))

displayGameState()
displayHandsState()
console.log("");
console.log('');



let whereToTake = instanciateLocation("BOARD", 0) 
let whereToPlay = instanciateLocation("ACE", 5)
playATurn(whereToTake,whereToPlay)


whereToTake = instanciateLocation("CRAPETTE", null) 
whereToPlay = instanciateLocation("ACE", 3)
playATurn(whereToTake, whereToPlay)

whereToPlay = instanciateLocation("ACE", 5)
playATurn(whereToTake, whereToPlay)

whereToTake = instanciateLocation("CRAPETTE", null) 
whereToPlay = instanciateLocation("ACE", 5)
playATurn(whereToTake,whereToPlay)

whereToPlay = instanciateLocation("CRAPETTE", null)
playATurn(whereToTake,whereToPlay)

whereToTake = instanciateLocation("DRAW", null)
whereToPlay = instanciateLocation("THROW", null)
playATurn(whereToTake, whereToPlay)

showDraw(1)


playATurn(whereToTake, whereToPlay)

console.log("player qui joue", game.getPlayingPlayerName());

whereToTake = instanciateLocation("CRAPETTE", null) 
whereToPlay = instanciateLocation("ACE", 0)
playATurn(whereToTake,whereToPlay)

currentPlayer = 2
playATurn(whereToTake,whereToPlay)
showDraw(2)
showDraw(2)
showDraw(2)//

whereToTake = instanciateLocation("DRAW", null) 
whereToPlay = instanciateLocation("BOARD", 0)
playATurn(whereToTake,whereToPlay)

showDraw(2)
whereToTake = instanciateLocation("DRAW", null) 
whereToPlay = instanciateLocation("BIN", 0)
playATurn(whereToTake,whereToPlay)

showDraw(2)
whereToTake = instanciateLocation("DRAW", null) 
whereToPlay = instanciateLocation("THROW", 0)
playATurn(whereToTake,whereToPlay)

console.log("player qui joue", game.getPlayingPlayerName());
currentPlayer = 1

whereToTake = instanciateLocation("BIN", null) 
whereToPlay = instanciateLocation("THROW", 0)
playATurn(whereToTake,whereToPlay)

whereToTake = instanciateLocation("BIN", null) 
whereToPlay = instanciateLocation("BIN", 0)
playATurn(whereToTake,whereToPlay)

playATurn(whereToTake,whereToPlay)
