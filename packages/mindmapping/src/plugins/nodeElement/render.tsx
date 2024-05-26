import type { TMindMappingCore } from '../../core'
import type { Node } from '../../types/node'
import React from 'react'

const NodeElementRender = ({ nodeData, ctx }: { nodeData: Node, ctx: TMindMappingCore }) => {
    const isSelected = ctx.Selection.selectedId === nodeData.id
    return (
        <div
            data-node-id={nodeData.id}
            style={{
                position: 'absolute', top: nodeData.position.y, left: nodeData.position.x, width: nodeData.width, height: nodeData.height,
                color: nodeData.color, backgroundColor: nodeData.backgroundColor,
                border: isSelected ? '1px solid red' : '1px solid transparent',
                borderRadius: 5,
                textAlign: 'center',
                lineHeight: `${nodeData.height}px`
            }}>
            {nodeData.text}
        </div>
    )
}

export { NodeElementRender }