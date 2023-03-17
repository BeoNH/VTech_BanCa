// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import dayCau from "./DayCau";
import DayCau from "./DayCau";
// import gameManager, { TypeAction } from "./gameManager";
import luoiCau from "./LuoiCau";

const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {
  // LIFE-CYCLE CALLBACKS:
  private check: number;

  onCollisionEnter(other: cc.Collider, self: cc.Collider): void {
    if (self.node !== other.node && other.node.name == "hook-sheet0") {
      this.node.stopAllActions();
      // Khi obj1 va chạm với obj2
      luoiCau.instance.onCallBack();

      // let angleFish = (Math.atan2(-other.node.y + self.node.y, -other.node.x + self.node.x) * 180) /Math.PI;
      // console.log(angleFish);
      // if(angleFish < 90){
      //   self.node.angle = angleFish;
      // }else{
      //   self.node.angle = -angleFish;
      // }
      self.node.angle = 90 * self.node.scaleX;

      self.node.parent = other.node;
      self.node.setPosition(0, 0);
    }
  }

  start() {
    this.onMove();
  }

  // update (dt) {}

  onMove(): void {
    let randMove = Math.random() * (10 - 7) + 7;
    if (this.node.position.x == -800) {
      cc.tween(this.node)
        .repeatForever(
          cc.sequence(
            cc.moveTo(randMove, cc.v2(800, this.node.position.y)),
            cc.callFunc(() => {
              this.node.scaleX *= -1; // đổi chiều scaleX để lật node lại
            }),
            cc.moveTo(randMove, cc.v2(-800, this.node.position.y)),
            cc.callFunc(() => {
              this.node.scaleX *= -1; // đổi chiều scaleX để lật node lại
            })
          )
        )
        .start();
    } else {
      cc.tween(this.node)
        .repeatForever(
          cc.sequence(
            cc.callFunc(() => {
              this.node.scaleX *= -1; // đổi chiều scaleX để lật node lại
            }),
            cc.moveTo(randMove, cc.v2(-800, this.node.position.y)),
            cc.callFunc(() => {
              this.node.scaleX *= -1; // đổi chiều scaleX để lật node lại
            }),
            cc.moveTo(randMove, cc.v2(800, this.node.position.y))
          )
        )
        .start();
    }
  }
}
