import { BasePlugin } from "../basePlugin";
import { AddNodeWrapperRender } from "./render";
import React from 'react'
import type { Node } from "../../types/node";
import { PluginType } from "../../const";


type AddNodeWrapperProps = {
  model: Node;
};

class AddNodeWrapper extends BasePlugin<AddNodeWrapperProps> {
  override pluginType = PluginType.Decorator
  override pluginName = "AddNodeWrapper";
  override render = (props: AddNodeWrapperProps) => {
    return <AddNodeWrapperRender {...props} ctx={this.ctx} />;
  };
}

export { AddNodeWrapper };
