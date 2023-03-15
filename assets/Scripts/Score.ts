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

  onLoad() {
    this.setNewScore();
    this.setHighScore();
  }

  start() {}

  // update (dt) {}

  public setNewScore() {
    let myScore = cc.find("Canvas/ControlScore/Score").getComponent(cc.RichText);
    let newScore = parseInt(cc.sys.localStorage.getItem("score")) || 0;
    myScore.string = newScore.toString();
  }

  public setHighScore() {
    let myScore = cc.find("Canvas/ControlScore/HighScore").getComponent(cc.RichText);
    
    let oldScore = cc.sys.localStorage.getItem("highScore");
    let newScore = cc.sys.localStorage.getItem("score");
    if(oldScore == null){
        oldScore = newScore;
        cc.sys.localStorage.setItem("highScore", newScore.toString());
    }else{
        if(newScore> oldScore){
            oldScore = newScore;
            cc.sys.localStorage.setItem("highScore", newScore.toString());   
        }
    }
    myScore.string = oldScore.toString();

  }
}
