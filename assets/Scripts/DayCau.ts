import { TypeAction } from "./gameManager";
import luoiCau from "./LuoiCau";

const {ccclass, property} = cc._decorator;

@ccclass
export default class dayCau extends cc.Component {
  public static instance: dayCau = null;

  @property(cc.Node)
  objectToStill: cc.Node = null;

  public typeAction: TypeAction = TypeAction.Nghi;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    dayCau.instance = this;
    
    //this.luoiCau = cc.find("hook-sheet0").getPosition();
    this.node.angle = 0;
      if (this.typeAction == TypeAction.Nghi) {
        this.onRotateObj();
      }
      else{
        this.node.stopAllActions();
      }
  }

  protected update(dt: number): void {
    this.drawLine();
    
  }

  drawLine(): void{
    const graphics = this.node.getComponent(cc.Graphics);
      const luoiCauPos = this.node.getChildByName("hook-sheet0").position;

    graphics.lineCap = cc.Graphics.LineCap.ROUND; // đặt kiểu đầu mút vẽ là hình tròn
    graphics.strokeColor = new cc.Color().fromHEX("#FFFFFF");
    graphics.lineWidth = 5;
    graphics.moveTo(0, 0);
    graphics.lineTo(luoiCauPos.x, luoiCauPos.y);
    graphics.stroke();

    //console.log(luoiCauPos.x, "dim neo");
  }

  onRotateObj() {
    cc.tween(this.node)
      .repeatForever(
        cc.sequence(
          cc.rotateBy(1, 40), // lắc lên
          cc.rotateBy(2, -100), // lắc xuống
          cc.rotateBy(1, 60) // lắc lên
        )
      )
      .start();
    //console.log(this.objectToMove.angle, "angle");
  }
}
