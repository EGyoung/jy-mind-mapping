import { BaseModule } from "../BaseModule";
import type { Node } from "../../types/node";
import {
  BaseNodeHeight,
  BaseNodeWidth,
  BaseRootHeight,
  BaseRootWidth,
} from "../../const";
import { v4 as uuid } from "uuid";

class Model extends BaseModule {
  static override readonly type = "Model";
  createRootModel = () => {
    return {
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
}

export { Model };
