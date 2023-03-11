// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import gameManager from "./gameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameControl extends cc.Component {

  private time: number;
  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    this.node.on("click", this.mainMenu, this);
  }

  start() {}

  // update (dt) {}
  mainMenu(): void {
    cc.director.loadScene("NewScene");
  }

  controlSound(): void {
    const buttonClick = this.node.getComponent(cc.Button);
    if (buttonClick.normalSprite && buttonClick) {
      buttonClick.pressedSprite;
    } else {
      buttonClick.normalSprite;
    }
  }

  playGame(): void {
    cc.director.loadScene("gamePlay");

    this.time = 60;
    gameManager.instance.setScore(0);
  }
}
