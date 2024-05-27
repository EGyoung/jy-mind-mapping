import { BasePlugin } from "../basePlugin";
import { AddNodeWrapperRender } from "./render";
import type { Node } from "../../types/node";

type AddNodeWrapperProps = {
  model: Node;
};

class AddNodeWrapper extends BasePlugin<AddNodeWrapperProps> {
  override pluginName = "AddNodeWrapper";
  override render = (props: AddNodeWrapperProps) => {
    return <AddNodeWrapperRender />;
  };
}

export { AddNodeWrapper };
