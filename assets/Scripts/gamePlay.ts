import dayCau from "./DayCau";
import DayCau from "./DayCau"
import luoiCau from "./LuoiCau";
//import { _decorator, Component, Node, Prefab, instantiate } from "cc";


const {ccclass, property} = cc._decorator;

@ccclass
export default class gamePlay extends cc.Component {
  public static instance: gamePlay = null;

  @property(cc.Prefab)
  enemyList: cc.Prefab[] = [];

  @property(cc.Prefab)
  piranaPfb: cc.Prefab = null;

  public currentEnemyCount: number = 0;
  public score: number = 0;

  private collisionManager: cc.CollisionManager;

  start() {
    this.node.on(
      cc.Node.EventType.TOUCH_START,
      (ev) => luoiCau.instance.onTouchStart(ev),
      this
    );
    this.node.on(
      cc.Node.EventType.TOUCH_END,
      (ev) => luoiCau.instance.onTouchEnd(ev),
      this
    );
  }

  onLoad() {
    // Get reference to the collision manager once
    gamePlay.instance = this;

    this.collisionManager = cc.director.getCollisionManager();
    this.collisionManager.enabled = true;
    this.collisionManager.enabledDebugDraw = true;
    this.collisionManager.enabledDrawBoundingBox = true;
  }

  protected update(dt: number): void {
    //this.spawnEnemy(10);
    this.setScore();
    this.spawnPirana();
  }

  spawnEnemy(max: number) {
    if (this.currentEnemyCount < max) {
      let randomNumber = Math.floor(Math.random() * this.enemyList.length);
      let newEnemy = cc.instantiate(this.enemyList[randomNumber]);
      cc.Canvas.instance.node.addChild(newEnemy);

      let randY = Math.random() * (50 + 850) - 850;
      let randX = Math.random() < 0.5 ? -800 : 800;
      newEnemy.setPosition(randX, randY);

      this.currentEnemyCount++;
    }
  }

  spawnPirana(){
    if(this.score == 5){
      let newPirana = cc.instantiate(this.piranaPfb);
      cc.Canvas.instance.node.addChild(newPirana);

      newPirana.setPosition(-700, 150);
    }

  }

  public setScore() {
    let myScore = cc.find("Canvas/boat-sheet0/Score").getComponent(cc.RichText);
    myScore.string = this.score.toString();
    let newScore = parseInt(cc.sys.localStorage.getItem("score")) || 0;
    newScore = this.score;
    cc.sys.localStorage.setItem("score", newScore.toString());
  }
}   
