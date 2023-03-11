// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class timeBar extends cc.Component {

  private timeBar: cc.Node;
  private originalWidth: number = 0;
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.timeBar = cc.find("Canvas/timebg-sheet0/timeline");
    this.originalWidth = this.timeBar.width;
  }

  start() {
    //this.startCountdown(20); // timeLine chạy
  }

  // update (dt) {}

  startCountdown(duration: number) {
    // Bắt đầu trừ dần độ rộng của time bar
    const intervalId = setInterval(() => {
      const currentWidth = this.timeBar.width;
      if (currentWidth > 0) {
        const newWidth =
          currentWidth -
          (this.originalWidth * cc.director.getDeltaTime()) / duration;
        this.timeBar.width = newWidth < 0 ? 0 : newWidth;
      } else {
        clearInterval(intervalId);
      }
    }, 10);
  }

  //them mau timeBar . . . . . . .
  increaseWidth() {
    const currentWidth = this.timeBar.width;
    const newWidth = currentWidth + 50; // Tăng độ rộng lên 10
    this.timeBar.width =
      newWidth > this.originalWidth ? this.originalWidth : newWidth; // Giới hạn độ rộng tối đa là originalWidth
  }
}
