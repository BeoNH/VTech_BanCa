// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import dayCau from "./DayCau";
import DayCau from "./DayCau";
import gameManager, { TypeAction } from "./gameManager";
import luoiCau from "./LuoiCau";

const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {
  //this.node.runAction(cc.moveTo(1, Player.Instance.objectToMove.getPosition()));

  // LIFE-CYCLE CALLBACKS:

  private _scoreCount: number;

  onCollisionEnter(other: cc.Collider, self: cc.Collider): void {
    const rect1 = other.node.getBoundingBoxToWorld();
    const rect2 = self.node.getBoundingBoxToWorld();
    //console.log(self.name, self.node.position);
    
    if (
      cc.Intersection.rectRect(rect1, rect2) &&
      other.node.name == "hook-sheet0"
    ) {
      // Khi obj1 va chạm với obj2
      luoiCau.instance.onCallBack();

      cc.tween(self.node)
        .to(2, {
          angle: 100,
          position: DayCau.instance.objectToStill.position,
        })
        .start();

      this.onCheckDestroy(self.node);
    }
  }

  onCheckDestroy(node: cc.Node): void {
    if (dayCau.instance.typeAction == TypeAction.Nghi) {
      this._scoreCount ++;
      gameManager.instance.setScore(this._scoreCount);
      node.destroy();
    }
  }
}
