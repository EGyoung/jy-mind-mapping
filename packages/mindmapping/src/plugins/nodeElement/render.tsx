import type { Node } from '../../types/node'
import React from 'react'

const NodeElementRender = ({ nodeData }: { nodeData: Node }) => {
    return (
        <div style={{
            position: 'absolute', top: nodeData.position.y, left: nodeData.position.x, width: nodeData.width, height: nodeData.height,
            color: nodeData.color, backgroundColor: nodeData.backgroundColor,
        }}>
            {nodeData.text}
        </div>
    )
}

export { NodeElementRender }