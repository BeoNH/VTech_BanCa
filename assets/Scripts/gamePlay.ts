import dayCau from "./DayCau";
import DayCau from "./DayCau"
import luoiCau from "./LuoiCau";
//import { _decorator, Component, Node, Prefab, instantiate } from "cc";


const {ccclass, property} = cc._decorator;

@ccclass
export default class gamePlay extends cc.Component {
  @property(cc.Prefab)
  enemyList: cc.Prefab[] = [];

  @property(cc.Node)
  prePosList: cc.Node[] = [];

  private collisionManager: cc.CollisionManager;


  start() {
    this.node.on(
      cc.Node.EventType.TOUCH_START,
      (ev) => luoiCau.instance.onTouchStart(ev),
      this
    );
    this.node.on(
      cc.Node.EventType.TOUCH_END,
      (ev)=>luoiCau.instance.onTouchEnd(ev),
      this
    );


  }

  onLoad() {
    // Get reference to the collision manager once
    this.collisionManager = cc.director.getCollisionManager();
    this.collisionManager.enabled = true;
    this.collisionManager.enabledDebugDraw = true;
    this.collisionManager.enabledDrawBoundingBox = true;


    this.spawnEnemy();
    this.spawnEnemy();
    this.spawnEnemy();
    this.spawnEnemy();
  }

  protected update(dt: number): void {
    //this.spawnEnemy();
  }






  spawnEnemy() {
    // randomly select an enemy prefab from the list
    const randomIndex = Math.floor(Math.random() * this.enemyList.length);
    const randomEnemyPrefab = this.enemyList[randomIndex];
    // create a new enemy instance
    const newEnemy = cc.instantiate(randomEnemyPrefab);

    let randomIndexPos = Math.floor(Math.random() * this.prePosList.length);
    const randomPrePos = this.prePosList[randomIndexPos];
        
    // add the enemy to the scene
    cc.director.getScene().addChild(newEnemy);
    newEnemy.setPosition(randomPrePos.position);
    

    cc.tween(newEnemy).to(1, { position: cc.v3(0,0) }).start();

    console.log(newEnemy.name, newEnemy.getPosition().x,newEnemy.getPosition().y,"sinh ra");

    if(newEnemy.isValid){
      this.scheduleOnce(() => {
          newEnemy.destroy();
          console.log(newEnemy.name, "bi xoa");
        }, 10);
    }
    // if (cc.director.loadScene("NewScene")) {
    //   newEnemy.destroy();
    //   console.log(newEnemy.name, "bi xoa 2");
    // }
      
  }
}   
