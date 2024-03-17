import { node } from "../../node_modules/webpack/types";

class StartScreen {
  constructor() {
    this.createStartScreen();
  }
  createStartScreen() {
    const container = document.getElementById("start_ui");
    const ue1 = document.createElement("h1");
    ue1.textContent = "Mensch Ärgere Dich Nicht";
    container?.appendChild(ue1);

    const playerContainer = document.createElement("div");
    playerContainer.id = "playerContainer";
    container?.appendChild(playerContainer);

    const p1 = document.createElement("input");
    const p1Label = document.createElement("label");
    p1Label.textContent = "Spieler 1";
    p1.setAttribute("type", "text");
    p1.id = "playerOne";
    playerContainer.appendChild(p1Label);
    playerContainer.appendChild(p1);

    const p2 = document.createElement("input");
    const p2Label = document.createElement("label");
    p2Label.textContent = "Spieler 2";
    p2.setAttribute("type", "text");
    p2.id = "playerTwo";
    playerContainer.appendChild(p2Label);
    playerContainer.appendChild(p2);

    const p3 = document.createElement("input");
    const p3Label = document.createElement("label");
    p3Label.textContent = "Spieler 3";
    p3.setAttribute("type", "text");
    p3.id = "playerThree";
    playerContainer.appendChild(p3Label);
    playerContainer.appendChild(p3);

    const p4 = document.createElement("input");
    const p4Label = document.createElement("label");
    p4Label.textContent = "Spieler 4";
    p4.setAttribute("type", "text");
    p4.id = "playerFour";
    playerContainer.appendChild(p4Label);
    playerContainer.appendChild(p4);

    const ruleContainerAll = document.createElement("div");
    ruleContainerAll.id = "ruleContainerAll";
    container?.appendChild(ruleContainerAll);
    const ueRules = document.createElement("h2");
    ueRules.textContent = "Zusatzregeln";
    ruleContainerAll.appendChild(ueRules);

    const ruleContainer1 = document.createElement("div");
    ruleContainer1.classList.add("ruleCon");
    const ruleBox1 = document.createElement("input");
    const ruleLabel1 = document.createElement("label");
    ruleLabel1.textContent = "Schlagzwang";
    ruleBox1.type = "checkbox";
    ruleBox1.id = "rule1";
    ruleContainer1.appendChild(ruleLabel1);
    ruleContainer1.appendChild(ruleBox1);

    const ruleContainer2 = document.createElement("div");
    ruleContainer2.classList.add("ruleCon");
    const ruleBox2 = document.createElement("input");
    const ruleLabel2 = document.createElement("label");
    ruleLabel2.textContent = "Friendly Fire";
    ruleBox2.type = "checkbox";
    ruleBox2.id = "rule2";
    ruleContainer2.appendChild(ruleLabel2);
    ruleContainer2.appendChild(ruleBox2);

    const ruleContainer3 = document.createElement("div");
    ruleContainer3.classList.add("ruleCon");
    const ruleBox3 = document.createElement("input");
    const ruleLabel3 = document.createElement("label");
    ruleLabel3.textContent = "Philanthrop";
    ruleBox3.type = "checkbox";
    ruleBox3.id = "rule3";
    ruleContainer3.appendChild(ruleLabel3);
    ruleContainer3.appendChild(ruleBox3);

    const ruleContainer4 = document.createElement("div");
    ruleContainer4.classList.add("ruleCon");
    const ruleBox4 = document.createElement("input");
    const ruleLabel4 = document.createElement("label");
    ruleLabel4.textContent = "Lone Fighter";
    ruleBox4.type = "checkbox";
    ruleBox4.id = "rule4";
    ruleContainer4.appendChild(ruleLabel4);
    ruleContainer4.appendChild(ruleBox4);

    ruleContainerAll.appendChild(ruleContainer1);
    ruleContainerAll.appendChild(ruleContainer2);
    ruleContainerAll.appendChild(ruleContainer3);
    ruleContainerAll.appendChild(ruleContainer4);

    const startButton = document.createElement("button");
    startButton.textContent = "Start";
    startButton.id = "startButton";
    container?.appendChild(startButton);
  }
  changeScreens() {
    const startScreen = document.getElementById("start");
    const gameScreen = document.getElementById("content");
    startScreen!.style.display = "none";
    gameScreen!.style.display = "flex";
    gameScreen!.style.flexDirection = "column";
  }
}

export { StartScreen };
