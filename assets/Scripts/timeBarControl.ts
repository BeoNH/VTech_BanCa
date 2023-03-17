// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import gameControl from "./gameControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class timeBar extends cc.Component {
  public static instance: timeBar;

  private timeBar: cc.Node;
  private originalWidth: number = 0;
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.timeBar = cc.find("Canvas/timebg-sheet0/timeline");
    this.originalWidth = this.timeBar.width;

    timeBar.instance = this;
  }

  update(dt) {
    //this.startCountdown(30);
  }

  startCountdown(duration: number) {
    // Bắt đầu trừ dần độ rộng của time bar
    const currentWidth = this.timeBar.width;
    if (currentWidth > 0) {
      const newWidth =
        currentWidth -
        (this.originalWidth * cc.director.getDeltaTime()) / duration;
      this.timeBar.width = newWidth < 0 ? 0 : newWidth;
    } else {
      gameControl.instance.mainMenu();
    }
  }

  //them mau timeBar . . . . . . .
  increaseWidth() {
    const currentWidth = this.timeBar.width;
    const newWidth = currentWidth + 50; // Tăng độ rộng lên 10
    this.timeBar.width =
      newWidth > this.originalWidth ? this.originalWidth : newWidth; // Giới hạn độ rộng tối đa là originalWidth
  }
}
