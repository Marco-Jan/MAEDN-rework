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

    const p1Label = document.createElement("label");
    p1Label.setAttribute("for", "playerOne");
    p1Label.textContent = "Spieler 1";
    const p1 = document.createElement("input");
    p1.type = "text";
    p1.id = "playerOne";

    playerContainer.appendChild(p1Label);
    playerContainer.appendChild(p1);

    const p2Label = document.createElement("label");
    p2Label.setAttribute("for", "playerTwo");
    p2Label.textContent = "Spieler 2";
    const p2 = document.createElement("input");
    p2.type = "text";
    p2.id = "playerTwo";

    playerContainer.appendChild(p2Label);
    playerContainer.appendChild(p2);

    const p3Label = document.createElement("label");
    p3Label.setAttribute("for", "playerThree");
    p3Label.textContent = "Spieler 3";
    const p3 = document.createElement("input");
    p3.type = "text";
    p3.id = "playerThree";

    playerContainer.appendChild(p3Label);
    playerContainer.appendChild(p3);

    const p4Label = document.createElement("label");
    p4Label.setAttribute("for", "playerFour");
    p4Label.textContent = "Spieler 4";
    const p4 = document.createElement("input");
    p4.type = "text";
    p4.id = "playerFour";

    playerContainer.appendChild(p4Label);
    playerContainer.appendChild(p4);

    const ruleContainerAll = document.createElement("div");
    ruleContainerAll.id = "ruleContainerAll";
    container?.appendChild(ruleContainerAll);

    const ueRules = document.createElement("h2");
    ueRules.textContent = "Zusatzregeln";
    ruleContainerAll.appendChild(ueRules);

    const createRuleElement = (labelText: string | null, id: string) => {
      const ruleCon = document.createElement("div");
      ruleCon.classList.add("ruleCon");

      const ruleLabel = document.createElement("label");
      ruleLabel.textContent = labelText;
      ruleLabel.setAttribute("for", id);

      const ruleBox = document.createElement("input");
      ruleBox.type = "checkbox";
      ruleBox.id = id;

      ruleCon.appendChild(ruleLabel);
      ruleCon.appendChild(ruleBox);
      return ruleCon;
    };

    ruleContainerAll.appendChild(createRuleElement("Schlagzwang", "rule1"));
    ruleContainerAll.appendChild(createRuleElement("Friendly Fire", "rule2"));
    ruleContainerAll.appendChild(createRuleElement("Philanthrop", "rule3"));
    ruleContainerAll.appendChild(createRuleElement("Lone Fighter", "rule4"));

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
