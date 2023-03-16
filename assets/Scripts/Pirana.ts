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
    const rect1 = other.node.getBoundingBoxToWorld();
    const rect2 = self.node.getBoundingBoxToWorld();
    //console.log(self.name, self.node.position);

    if (cc.Intersection.rectRect(rect1, rect2) && other.node.name != "hook-sheet0") 
    {
        other.node.removeFromParent(false);
        this.onDead = true;
        this.swapDead(other.node);
    }
  }

  swapDead(dead: cc.Node) {
    // Tìm file ảnh mới trong assets
    cc.resources.load("Images/dead1", cc.SpriteFrame, (err, spriteFrame) => {
      // Thay đổi ảnh hiện tại trong component sprite
      dead.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      console.log(spriteFrame.name);
      cc.tween(dead)
        .to(1, { position: cc.v3(0, -100) })
        .call(() => {console.log("bi an mat");})
        .call(() => {
          dead.destroy();
          gamePlay.instance.currentEnemyCount--;
          console.log(this.onDead);

        })
        .start();
    });
  }

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    Pirana.instance = this;
  }

  start() {
    this.onMove();
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
