// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
// export enum EnumStateGame {
//   Play,
//   Win,
//   Lose,
//   Menu,
// }
// export enum TypeAction {
//   Nghi,
//   ThaCau,
//   KeoCau,
// }

@ccclass
export default class gameManager extends cc.Component {
  public static instance: gameManager = null;

  public score: number;

  //public OnStateChange: EventListenerOrEventListenerObject;

  onload(): void {
    gameManager.instance = this;
  }

  public setScore(newScore: number) {
    this.score = newScore;
    let myScore = cc.find("Canvas/boat-sheet0/Score").getComponent(cc.RichText);
    console.log(myScore);
    myScore.string = this.score.toString();
  }
}
