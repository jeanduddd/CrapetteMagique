import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import MenuScreen from "./screens/menu/MenuScreen";
import WaitingScreen from "./screens/waiting/WaitingScreen";
import type {
  GameState,
  Location,
  PlayRequest,
} from "@shared/IPlayCard";
import FullRoomScreen from "./screens/full/FullRoomScreen";
import WonGameScreen from "./screens/won/WonGameScreen";
import LostGameScreen from "./screens/lost/LostGameScreen";
import DefaultWinGameScreen from "./screens/defaultWin/DefaultWinGameScreen";
import Game from "./screens/game/Game";

const SERVER_URL = import.meta.env.PROD ? undefined : "http://localhost:3001"

const socket = io(SERVER_URL, {
  autoConnect: false,
});

export default function App() {
  const [name, setName] = useState<string | null>(
    sessionStorage.getItem("pseudo"),
  );

  const [gameState, setGameState] = useState<GameState | null>(null); // tester avec newGameState

  const [view, setView] = useState<
    "MENU" | "WAITING" | "GAME" | "FULL" | "WON" | "LOST" | "DEFAULT"
  >(() => {
    return gameState ? "GAME" : "MENU";
  });

  const [playerId, setPlayerId] = useState<null | string>(
    sessionStorage.getItem("playerId"),
  );

  const connectToServer = (playerID: string | null, playerName: string) => {
    sessionStorage.setItem("pseudo", playerName);
    socket.auth = { sessionId: playerID, pseudo: name };
    socket.connect();
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const [errorKey, setErrorKey] = useState(0);

  const triggerError = (message: string) => {
    setErrorVisible(false);
    setErrorMessage(message);
    setErrorKey((prev) => prev + 1);
  };

  useEffect(() => {
    const playerId = sessionStorage.getItem("playerId");
    const name = sessionStorage.getItem("pseudo");

    if (playerId && !socket.connected) {
      socket.auth = { sessionId: playerId, pseudo: name };
      socket.connect();
    }

    socket.on("session", (donnees) => {
      sessionStorage.setItem("playerId", donnees.sessionId);
    });

    socket.on("wait", () => {
      setView("WAITING");
    });

    socket.on("updateBoard", (etatRecu: GameState) => {
      setGameState(etatRecu);
      console.log("bien recu");

      setView("GAME");
    });

    socket.on("roomFull", () => {
      setView("FULL");
      sessionStorage.removeItem("playerId");
    });

    socket.on("sessionExpired", () => {
      triggerError("Your session has expired");
      setView("MENU");
    });

    socket.on("moveError", (data) => {
      console.log(data.message);
      triggerError(data.message);
    });

    socket.on("won", () => {
      setView("WON");
      socket?.disconnect();
      sessionStorage.removeItem("sessionId");
      sessionStorage.removeItem("playerId");
      setName("");
      setPlayerId(null);
    });

    socket.on("lost", () => {
      setView("LOST");
      socket?.disconnect();
      sessionStorage.removeItem("sessionId");
      sessionStorage.removeItem("playerId");
      setName("");
      setPlayerId(null);
    });

    socket.on("wonByDefault", () => {
      setView("DEFAULT");
      socket?.disconnect();
      sessionStorage.removeItem("sessionId");
      sessionStorage.removeItem("playerId");
      setName("");
      setPlayerId(null);
    });

    return () => {
      socket.off("session");
      socket.off("wait");
      socket.off("updateBoard");
      socket.off("roomFull");
      socket.off("sessionExpired");
      socket.off("moveError");
      socket.off("won");
      socket.off("lost");
      socket.off("wonByDefault");
    };
  }, []);

  const [origin, setOrigin] = useState<null | Location>(null);
  //const [destination, setDestination] = useState<null | Location>(null);


  const setOriginDrag = (origin: Location) => {
    console.log("origin: ", origin);
    setOrigin(origin);
  };

  const setDestinationDrop = (destination: Location) => {
    console.log("destination: ", destination);
    //setDestination(destination);
    if (origin !== null) {
      const playRequest: PlayRequest = {
        origin: origin,
        destination: destination,
      };
      socket?.emit("playCard", playRequest);
      console.log("I PLAYYY");
    }
  };

  const revealDraw = () => {
    console.log("revealDraw");
    socket?.emit("revealDraw");
  };

  useEffect(() => {
    if (errorMessage === null) return;

    const timerShow = setTimeout(() => setErrorVisible(true), 10);
    const timerVisible = setTimeout(() => setErrorVisible(false), 1000);
    const timerMessage = setTimeout(() => setErrorMessage(null), 4000);

    return () => {
      clearTimeout(timerShow);
      clearTimeout(timerVisible);
      clearTimeout(timerMessage);
    };
  }, [errorKey, errorMessage]);

  const handleClicPlay = () => {
    if (name?.trim() === "" || name === null)
      return triggerError("You must choose a name...");
    setView("WAITING");
    connectToServer(playerId, name);
  };

  const backToMenuAndDisconnect = () => {
    if (socket) {
      socket.disconnect();
    }
    socket.disconnect();
    setView("MENU");
  };

  return (
    <>
      {
        <p
          key={errorKey}
          style={{
            position: "absolute",
            top: "85%",
            left: "50%",
            transform: "translate( -50% , 0)",

            pointerEvents: "none",
            zIndex: 42,
            opacity: errorVisible === true ? 1 : 0,
            transition:
              errorVisible === false
                ? "opacity 3s ease-in-out"
                : "opacity 0.2s ease-out",

            color: "#FFFFFF",
            backgroundColor: "#7F1D1D",
            padding: "12px 30px",
            borderRadius: "30px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.5)",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            fontSize: 20,
          }}
        >
          {errorMessage}
        </p>
      }
      {view === "MENU" && (
        <MenuScreen
          name={name ?? ""}
          handleNameChange={setName}
          handleClick={handleClicPlay}
        ></MenuScreen>
      )}
      {view === "WAITING" && (
        <WaitingScreen handleCancel={backToMenuAndDisconnect}></WaitingScreen>
      )}
      {view === "FULL" && (
        <FullRoomScreen backToMenu={backToMenuAndDisconnect}></FullRoomScreen>
      )}
      {view === "WON" && (
        <WonGameScreen backToMenu={backToMenuAndDisconnect}></WonGameScreen>
      )}
      {view === "LOST" && (
        <LostGameScreen backToMenu={backToMenuAndDisconnect}></LostGameScreen>
      )}
      {view === "DEFAULT" && (
        <DefaultWinGameScreen
          backToMenu={backToMenuAndDisconnect}
        ></DefaultWinGameScreen>
      )}
      {view === "GAME" && (
        <Game
          revealDraw={revealDraw}
          origin={origin}
          setOrigin={setOriginDrag}
          setDestination={setDestinationDrop}
          gameState={gameState}
        ></Game>
      )}
    </>
  );
}
