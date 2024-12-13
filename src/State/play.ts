import { Player } from "../Components/player";
import { GameCube } from "../Components/gamecube";
import { GameBoard } from "../Components/gameboard";
import { Figure } from "../Components/figure";
import { GameBoardUi } from "../View/gameboardview";
import { GameRules } from "./gamerules";
import { StartScreen } from "../View/startscreen";

class Play {
  public players: Player[];
  private currentPlayerIndex: number;
  public gameCube: GameCube;
  public gameBoard: GameBoard;
  private gameBoardUi: GameBoardUi;
  private gamePhase: number;
  private gameRules: GameRules;
  private startScreen: StartScreen;
  public schlagzwang: boolean;
  public friendlyFire: boolean;
  public philanthrop: boolean;
  public loneFighter: boolean;

  constructor(startScreen: StartScreen) {
    this.gameBoard = new GameBoard();
    this.players = [];
    this.currentPlayerIndex = 0;
    this.gameCube = new GameCube();
    this.gameBoardUi = new GameBoardUi();
    this.createNewGame();
    this.gamePhase = 0;
    this.gameRules = new GameRules();
    this.startScreen = startScreen;
    this.schlagzwang = false;
    this.friendlyFire = false;
    this.philanthrop = false;
    this.loneFighter = false;
  }

  createNewGame(): void {
    this.gameBoardUi.createGrid();
  }

  addPlayer(player: Player): void {
    this.players.push(player);
  }

  checkExtraRules(): void {
    // Abfrage der Zusatzregeln über Checkboxes, 
    const rule1 = document.getElementById("rule1") as HTMLInputElement;
    const rule2 = document.getElementById("rule2") as HTMLInputElement;
    const rule3 = document.getElementById("rule3") as HTMLInputElement;
    const rule4 = document.getElementById("rule4") as HTMLInputElement;
    if (rule1.checked) {
      this.schlagzwang = true;
    }
    if (rule2.checked) {
      this.friendlyFire = true; 
    }
    if (rule3.checked) {
      this.philanthrop = true; 
    }
    if (rule4.checked) {
      this.loneFighter = true; 
    }
  }

  playGame(): void {
    this.startScreen.changeScreens();
    this.gameBoardUi.updateGameboardPlayerBank(this.players);
    this.checkExtraRules();
    this.updateCurrentPlayerDisplay();
    const grid = document.getElementById("playField") as HTMLDivElement;
    grid.addEventListener("click", (e) => {
      this.checkGamePhase(e.target);
      this.gameBoardUi.updateGameBoardUi(this.gameBoard);
    });
  }

  checkGamePhase(element: EventTarget | null) {
    let idNum: number | null;
    const currentPlayer = this.getCurrentPlayer();
    console.log("player ", currentPlayer);
    this.gameBoardUi.updateGameBoardUi(this.gameBoard);

    // TODO: Spielphase wird jetzt durch gameRules gesteuert
    
    if (
      this.gameRules.getGamePhase() === 0 &&
      (element as HTMLElement).id === "gameCube"
    ) {
      this.rollDice();
      // TODO: Überprüft, ob die gewürfelte Zahl eine Bewegung erlaubt.
    
      if (this.gameRules.checkCanMoveOnThrow(this.gameCube, currentPlayer)) {
        this.gameBoardUi.highlightFiguresToMove(currentPlayer);
        this.gameRules.setGamePhaseTwo(); // TODO: Wechsel in Spielphase 2, da jetzt die Figur bewegt werden kann
        this.gameRules.resetNoFigureOnFieldAttempts(); // TODO: Zurücksetzen des Zählers für Fehlwürfe ohne Figuren auf dem Feld
      } else if (this.gameRules.getNoFigureOnFieldAttempts() < 2) {
        // TODO: Wenn keine Figur bewegt werden kann und weniger als 2 Fehlversuche
        this.gameRules.addNoFigureOnFieldAttempts();
      } else {
        // TODO: Bei zu vielen Fehlversuchen wird der Zug beendet
        this.gameRules.resetNoFigureOnFieldAttempts();
        this.nextTurn();
      }
    }
    // Spielphase 1 = Figur bewegen
    else if (this.gameRules.getGamePhase() === 1) {
      idNum = this.getChosenFigureId(currentPlayer, element as HTMLDivElement);
      if (typeof idNum == "number") {
        // TODO: moveCurrentPlayerFigure berücksichtigt jetzt auch loneFighter-Regel und den 6er-Wurf
        if (this.moveCurrentPlayerFigure(currentPlayer.myFigures[idNum])) {
          this.gameBoardUi.updateGameboardPlayerBank(this.players);
          this.gameBoardUi.updateGameBoardPlayerEndzone(
            this.getCurrentPlayer()
          );
          this.nextTurn();
          this.gameRules.setGamePhaseOne(); // TODO: Zurück auf Spielphase 1 (Würfeln)
          this.gameBoardUi.unlightFiguresToMove(currentPlayer);
        }
      }
    }
    if (currentPlayer.checkAllFiguresInEndzone()) {
      console.log(`Player ${currentPlayer.color} has won`);
      this.endGame();
    }
  }

  endGame(): void {
    this.gameRules.setEndGame(); // TODO: Spielende-Phase gesetzt
  }

  getChosenFigureId(
    currentPlayer: Player,
    element: EventTarget
  ): number | null {
  
    let figureId = null;

    if ((element as HTMLDivElement).classList.contains(`${currentPlayer.color}Figure1`)) {
      return (figureId = 0);
    } else if ((element as HTMLDivElement).classList.contains(`${currentPlayer.color}Figure2`)) {
      return (figureId = 1);
    } else if ((element as HTMLDivElement).classList.contains(`${currentPlayer.color}Figure3`)) {
      return (figureId = 2);
    } else if ((element as HTMLDivElement).classList.contains(`${currentPlayer.color}Figure4`)) {
      return (figureId = 3);
    }
    return figureId;
  }

  getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  nextTurn(): void {
    if (!this.gameRules.handleGameCube6(this.gameCube)) {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }
    this.updateCurrentPlayerDisplay(); // Neue Anzeige bei jedem Spielerwechsel
  }

  rollDice(): void {
    this.gameCube.rollCube();
    this.gameBoardUi.gameCubeUi.showGameCubeNum(this.gameCube.rolledNum);
  }

  moveCurrentPlayerFigure(figureToMove: Figure): boolean {
    const currentPlayer = this.getCurrentPlayer();
    const rolledNum = this.gameCube.getRolledNum();
    const targetPos = rolledNum + figureToMove.position;

    // TODO: Hier wird überprüft, ob figurToMove auf das Feld kann, Endzone erreicht oder ob mit einer 6 
    // herausgesetzt werden darf, insbesondere unter Berücksichtigung der loneFighter-Regel.
    if (
      figureToMove.isOnField &&
      targetPos <= 40 &&
      figureToMove.getMaxDistance(targetPos)
    ) {
      this.gameBoard.moveFigure(figureToMove, rolledNum);
      figureToMove.moveOnPlayerBoard(rolledNum);
      return true;
    } else if (
      figureToMove.isOnField &&
      targetPos > 40 &&
      figureToMove.getMaxDistance(targetPos)
    ) {
      figureToMove.moveOnPlayerBoard(rolledNum);
      figureToMove.setIsInEndzone();
      figureToMove.removeFromField();
      this.gameBoard.moveFigure(figureToMove, rolledNum);
      return true;
    } else if (!figureToMove.isOnField && rolledNum === 6 && this.loneFighter) {
      // NEU: LoneFighter-Regel, die es erlaubt, bei einer 6 auch dann eine Figur rauszubringen, 
      // wenn alle anderen Figuren noch nicht auf dem Feld sind
      const currentPlayer = this.getCurrentPlayer();
      if (
        currentPlayer.getFiguresOnBank().length === 4 &&
        currentPlayer.checkNumberInEndzone() +
          currentPlayer.getFiguresOnBank().length ===
          4
      ) {
        figureToMove.placeOnField();
        this.gameBoard.placeFigure(currentPlayer, figureToMove);
        return true;
      } else {
        console.log("Fehler moveCurrentPlayerFigure");
        return false;
      }
    } else if (!figureToMove.isOnField && rolledNum === 6) {
      // TODO: Standardfall für das Herausbringen bei einer 6
      figureToMove.placeOnField();
      this.gameBoard.placeFigure(currentPlayer, figureToMove);
      return true;
    } else {
      console.log("Fehler moveCurrentPlayerFigure");
      return false;
    }
  }

  isGameEnd(player: Player): boolean {
    return player.checkAllFiguresInEndzone();
  }


  updateCurrentPlayerDisplay(): void {
    const currentPlayer = this.getCurrentPlayer();
    const playerColor = currentPlayer.color; // "red", "blue", "green", "yellow"
  
    const currentPlayerBox = document.getElementById("currentPlayerBox");
    const currentPlayerText = document.getElementById("currentPlayerText");
  
    if (currentPlayerBox && currentPlayerText) {
      // Entferne vorherige Farbklassen
      currentPlayerBox.classList.remove("redPlayer", "bluePlayer", "greenPlayer", "yellowPlayer");
      // Füge nach Spieler die passende Klasse hinzu
      currentPlayerBox.classList.add(`${playerColor}Player`);
      
      // Passe Text an,Spielernamen statt der Farbe ausgeben.
      currentPlayerText.innerHTML = `Spieler ${playerColor} ist dran`;
      
      // TODO:: Animation erneut triggern (indem du kurz die Animation-Property entfernst und neu hinzufügst)
      currentPlayerBox.style.animation = "none";
    
      currentPlayerBox.offsetHeight;
      currentPlayerBox.style.animation = "fadeInScale 0.8s forwards";
    }
  }
}

export { Play };
