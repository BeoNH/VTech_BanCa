// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import dayCau from "./DayCau";
import Pirana from "./Pirana";
import gamePlay from "./gamePlay";
import timeBar from "./timeBarControl";
// import gameManager, { TypeAction } from "./gameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class luoiCau extends cc.Component {
  public static instance: luoiCau = null;

  private moveDistance: number = 1500;
  private moveTimeSpeed: number = 2;
  public startPos: cc.Vec3;
  private isRunning: boolean = false;
  //public luoCauPos: cc.Vec3 = this.node.position;

  onLoad() {
    luoiCau.instance = this;
    this.startPos = this.node.position;
  }

  onTouchStart(event: cc.Event.EventTouch) {
    // console.log(".............1");
    dayCau.instance.stopRotate();
  }
  
  onTouchEnd(event: cc.Event.EventTouch) {
    if (!this.isRunning) {
      this.isRunning = true

      cc.tween(this.node)
        .by(this.moveTimeSpeed, { position: cc.v3(0, -this.moveDistance) })
        .by(this.moveTimeSpeed, { position: cc.v3(0, this.moveDistance) })
        .call(() =>{ dayCau.instance.startRotate();})
        .call(() => {this.isRunning = false;})
        .start();

      // console.log(".........2");
    }
  }

  onCallBack(): void {
    this.node.stopAllActions();
    this.node.getComponent(cc.Collider).enabled = false;

    cc.tween(this.node)
      .to(this.moveTimeSpeed, { position: this.startPos })
      .call(()=> {this.node.getComponent(cc.Collider).enabled = true;})
      .call(() =>{ dayCau.instance.startRotate();})
      .call(() => {this.isRunning = false;})
      .call(() => {
        if(!Pirana.instance.onDead){
          this.node.destroyAllChildren();
          gamePlay.instance.currentEnemyCount --;
          gamePlay.instance.score++;
          timeBar.instance.increaseWidth();
        }
        else{
          Pirana.instance.onDead = false;
        }
      })
      .start();
    // console.log("........len");
  }
}
