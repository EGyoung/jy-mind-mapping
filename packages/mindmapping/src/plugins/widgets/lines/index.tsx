import { BasePlugin } from "@jy/mapping/plugins/basePlugin";
import React from 'react'
import type { Node } from '@jy/mapping/types/node'
import { PluginType } from "@jy/mapping/const";
import { Line } from "./line";

type LinePluginProps = {
  model: Node;
};

class LinePlugin extends BasePlugin<LinePluginProps> {
  override pluginType = PluginType.Widget
  override pluginName = "LinePlugin";
  override render = (props: LinePluginProps) => {
    return <Line  {...props} />
  };
}

export { LinePlugin };
