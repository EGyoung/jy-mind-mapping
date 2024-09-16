import { BasePlugin } from "@jy/mind-mapping/plugins/basePlugin";
import React from 'react'
import type { Node } from '@jy/mind-mapping/types/node'
import { PluginType } from "@jy/mind-mapping/const";
import { Lines } from "./line";

type LinePluginProps = {
  model: Node;
};

class LinePlugin extends BasePlugin<LinePluginProps> {
  override pluginType = PluginType.Widget
  override pluginName = "LinePlugin";
  override render = (props: LinePluginProps) => {
    return <Lines ctx={this.ctx}  {...props} />
  };
}

export { LinePlugin };
