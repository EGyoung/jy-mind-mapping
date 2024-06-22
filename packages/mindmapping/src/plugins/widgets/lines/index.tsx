import { BasePlugin } from "../../basePlugin";
import React from 'react'
import type { Node } from "../../../types/node"
import { PluginType } from "../../../const";

type LinePluginProps = {
  model: Node;
};

class LinePlugins extends BasePlugin<LinePluginProps> {
  override pluginType = PluginType.Widget
  override pluginName = "AddNodeWrapper";
  override render = (props: LinePluginProps) => {
    return <></>
  };
}

export { LinePlugins };
