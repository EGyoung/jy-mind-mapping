import { BasePlugin } from "../basePlugin";
import { NodeElementRender } from './render'
import type { Node } from '../../types/node'
import React from 'react'

type NodeElementProps = {
    model: Node
}

class NodeElement extends BasePlugin<NodeElementProps> {
    override  pluginName = 'NodeElement'
    override render = (props: NodeElementProps) => {
        return <NodeElementRender nodeData={props.model} ctx={this.ctx} />
    }
}

export { NodeElement }