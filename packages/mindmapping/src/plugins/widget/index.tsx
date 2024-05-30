import { BasePlugin } from "../basePlugin";
import { AddNodeWrapperRender } from "./render";
import React from 'react'
import type { Node } from "../../types/node";

type AddNodeWrapperProps = {
  model: Node;
};

class AddNodeWrapper extends BasePlugin<AddNodeWrapperProps> {
  override  pluginType = 'Widget'
  override pluginName = "AddNodeWrapper";
  override render = (props: AddNodeWrapperProps) => {
    return <AddNodeWrapperRender />;
  };
}

export { AddNodeWrapper };
