// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import gamePlay from "./gamePlay";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Pirana extends cc.Component {
  public static instance: Pirana = null;

  public onDead: boolean = false;

  onCollisionEnter(other: cc.Collider, self: cc.Collider): void {
    //console.log(other.name, other.node.position.y);


    if (other.node.name !== "hook-sheet0") 
    {
        //other.node.removeFromParent(false);
        console.log(other.node.parent.name);
        cc.tween(other.node)
        .call(() => {
          other.node.parent = self.node;
          other.node.getComponent(cc.Sprite).enabled = false;
          other.node.children[0].getComponent(cc.Sprite).enabled = true;})
        .to(1, {position: cc.v3(0,-100)})
        .call(() => {other.node.destroy()})
        .start();
      
        console.log("an thit");

        this.onDead = true;
    }
  }

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    Pirana.instance = this;
  }

  start() {
    //this.onMove();
  }

  // update (dt) {}

  onMove(): void {
    cc.tween(this.node)
      .repeatForever(
        cc.sequence(
          cc.moveTo(8, cc.v2(800, this.node.position.y)),
          cc.callFunc(() => {
            this.node.scaleX *= -1; // đổi chiều scaleX để lật node lại
          }),
          cc.delayTime(1),
          cc.moveTo(8, cc.v2(-800, this.node.position.y)),
          cc.callFunc(() => {
            this.node.scaleX *= -1; // đổi chiều scaleX để lật node lại
          })
        )
      )
      .start();
  }
}
