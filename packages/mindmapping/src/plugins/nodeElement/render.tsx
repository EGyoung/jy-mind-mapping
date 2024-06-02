import type { TMindMappingCore } from '../../core'
import type { Node } from '../../types/node'
import React from 'react'

const NodeElementRender = ({ nodeData }: { nodeData: Node, ctx: TMindMappingCore }) => {
    return (
        <div data-node-id={nodeData.id}>
            {nodeData.text}
        </div>
    )
}

export { NodeElementRender }