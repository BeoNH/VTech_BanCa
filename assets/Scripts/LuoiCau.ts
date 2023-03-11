// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import dayCau from "./DayCau";
import gameManager, { TypeAction } from "./gameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class luoiCau extends cc.Component {
  public static instance: luoiCau = null;

  private moveDistance: number = 1500;
  private moveTimeSpeed: number = 2;
  public startPos: cc.Vec3;
  //public luoCauPos: cc.Vec3 = this.node.position;

  onLoad() {
    luoiCau.instance = this;
    this.startPos = this.node.position;
  }

  protected update(dt: number): void {
    //this.onCheckMoveOut();
    //this.onFishingEnd();
  }

  onTouchStart(event: cc.Event.EventTouch) {
    if (dayCau.instance.typeAction == TypeAction.Nghi) {
      dayCau.instance.typeAction = TypeAction.ThaCau;

      cc.tween(this.node)
        .by(this.moveTimeSpeed, { position: cc.v3(0, -this.moveDistance) })
        .by(this.moveTimeSpeed, { position: cc.v3(0, this.moveDistance) })
        .start();

      console.log(dayCau.instance.typeAction, ".........1");
    }
  }

  onTouchEnd(event: cc.Event.EventTouch){

    console.log(dayCau.instance.typeAction, ".........5");
  }

  onCheckMoveOut(): void {
    if (dayCau.instance.typeAction == TypeAction.ThaCau) {
      const render = this.node.getComponent(cc.RenderComponent);
      if (render && render.enabled) {
        const checkNode = this.node.getBoundingBox();
        const visibleSize = cc.view.getVisibleSize();
        const visibleOrigin = cc.view.getVisibleOrigin();
        if (!cc.Intersection.rectRect(
            checkNode,
            cc.rect(visibleOrigin.x,visibleOrigin.y,visibleSize.width,visibleSize.height)
          )) {
          this.onCallBack();
        }
      }
    }
    //console.log(dayCau.instance.typeAction, "........4");
  }

  onFishingEnd(): void {
    if (
      this.node.position >= this.startPos &&
      dayCau.instance.typeAction == TypeAction.KeoCau
    ) {
      dayCau.instance.typeAction = TypeAction.Nghi;
    }
    console.log(dayCau.instance.typeAction, "........3");
  }

  onCallBack(): void {
    this.node.stopAllActions();

    dayCau.instance.typeAction = TypeAction.KeoCau;
    cc.tween(this.node)
      .to(this.moveTimeSpeed, { position: this.startPos })
      .start();
    console.log(dayCau.instance.typeAction, "........2");
  }
}
