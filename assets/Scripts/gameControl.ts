// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import gameManager from "./gameManager";

const {ccclass, property} = cc._decorator;
const { audioEngine } = cc;

@ccclass
export default class gameControl extends cc.Component {
  @property(cc.AudioClip) audio: cc.AudioClip = null;

  private count: number = 0;
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.node.on("click", this.mainMenu, this);
    this.node.on("clickSound", this.controlSound, this);
  }

  start() {
    cc.audioEngine.playMusic(this.audio, true);
  }

  // update (dt) {}

  mainMenu(): void {
    cc.director.loadScene("NewScene");
  }

  controlSound(): void {
    const buttonClick = cc.find("Canvas/BtnSound").getComponent(cc.Button);
    buttonClick.transition = cc.Button.Transition.SPRITE;

    if (buttonClick) {
      this.count ++;
      //console.log(this.count)
      if (buttonClick.normalSprite) {
        const saveSprite = buttonClick.normalSprite;
        buttonClick.normalSprite = buttonClick.pressedSprite;
        buttonClick.pressedSprite = saveSprite;
        if (this.count % 2) {
          cc.audioEngine.pauseMusic();
        } else {
          cc.audioEngine.resumeMusic();
        }
      } 
    }
  }

  playGame(): void {
    cc.director.loadScene("gamePlay");

    //this.time = 60;
    gameManager.instance.setScore(0);
  }
}
