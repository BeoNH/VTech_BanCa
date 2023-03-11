// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  private timeBar: cc.Node;

  private originalWidth: number = 0;

  private score: number;

  start() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.startCountdown(20);
  }

  onLoad() {
    this.timeBar = cc.find("Canvas/timebg-sheet0/timeline");
    this.originalWidth = this.timeBar.width;
  }

  onTouchStart(event: cc.Event.EventTouch) {
    cc.tween(this.node)
      .by(2, { position: cc.v3(0, -100) })
      .by(2, { position: cc.v3(0, 100) })
      .start();
    this.setScore(2);
    this.increaseWidth();
    // const a = cc.find("Canvas/Score").getComponent(cc.RichText);
    // a.string = "alo nghe ro tra loi";
    // console.log(a);
    //console.log(dayCau.instance.typeAction, ".........1");
  }

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
  increaseWidth() {
    const currentWidth = this.timeBar.width;
    const newWidth = currentWidth + 150; // Tăng độ rộng lên 10
    this.timeBar.width = newWidth > this.originalWidth ? this.originalWidth : newWidth; // Giới hạn độ rộng tối đa là originalWidth
  }

  public setScore(newScore: number) {
    this.score = newScore;
    let myScore = cc.find("Canvas/boat-sheet0/Score").getComponent(cc.RichText);
    console.log(myScore);
    myScore.string = this.score.toString();
    //return myScore;
  }
}
