import { BaseModule } from "../BaseModule";
import type { Node } from "../../types/node";
import {
  BaseNodeHeight,
  BaseNodeWidth,
  BaseRootHeight,
  BaseRootWidth,
} from "../../const";
import { v4 as uuid } from "uuid";
const DefaultSpace = 30;
class Model extends BaseModule {
  static override readonly type = "Model";
  createRootModel = () => {
    return {
      isRoot: true,
      width: BaseRootWidth,
      height: BaseRootHeight,
      text: "思维导图根节点",
      color: "#000",
      backgroundColor: "pink",
      id: "1",
      position: {
        x: 0,
        y: 0,
      },
      children: [],
      type: "NodeElement",
    } satisfies Node;
  };

  createNormalNodeModel = () => {
    //todo: 生成节点的位置需重新计算
    return {
      isRoot: false,
      width: BaseNodeWidth,
      height: BaseNodeHeight,
      text: "子节点",
      color: "#000",
      backgroundColor: "yellow",
      id: uuid(),
      position: {
        x: 100,
        y: 100,
      },
      children: [],
      type: "NodeElement",
    } satisfies Node;
  };
  /**
  * 
  * (BaseRootHeight - BaseNodeHeight) / 2 +
            node.position.y +
            index * BaseNodeHeight +
            DefaultSpace * index -
            (node.children.length * BaseRootHeight +
              (node.children.length - 1) * DefaultSpace -
              BaseRootHeight) /
              2,
  */
  calculateNodePosition = (node = this.ctx.getConfig()) => {
    // node.
    if (node?.isRoot) {
      const totalHeight =
        node.children.length * BaseNodeHeight +
        Math.max(0, node.children.length - 1) * DefaultSpace;
      node.children.forEach((child, index) => {
        child.position = {
          x: node.position.x + BaseRootWidth + DefaultSpace,
          y:
            node.position.y -
            (BaseRootHeight - BaseNodeHeight) / 2 +
            (BaseNodeHeight + DefaultSpace) * index +
            (BaseRootHeight - totalHeight) / 2 +
            (BaseRootHeight - BaseNodeHeight) / 2,
        };
      });
    }
  };
}

export { Model };
