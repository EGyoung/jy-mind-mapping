import { BaseModule } from "../BaseModule";
import type { Node } from "../../types/node";
import { BaseRootHeight, BaseRootWidth } from "../../const";

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
}

export { Model };
