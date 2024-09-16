import type { TMindMappingCore } from '@jy/mind-mapping/core';
import type { Node } from '@jy/mind-mapping/types/node';
import React from 'react'
interface Point {
    x: number;
    y: number
}
const Lines = ({ ctx }: { ctx: TMindMappingCore }) => {
    const model = ctx.getRenderNodesAndModel()
    console.log(model, 'model ???');
    const getPoint2 = (currentModel: Node) => {
        if (!model) return { x: 0, y: 0 }
        const parent = ctx.getParentNode(currentModel.id)

        return {
            x: (parent?.position.x ?? 0) + (currentModel?.width ?? 0) / 2,
            y: (parent?.position.y ?? 0)
        }
    }
    const getTop = (model: Node) => {
        const parent = ctx.getParentNode(model.id)
        console.log(parent, model.position, 'top???');
        return (model.position.y - (parent?.height ?? 0) / 2) + model.height / 2 - 10
    }
    return <div style={{ position: 'absolute', top: 0, left: 0 }}>
        {   // model.position.y - rootHeight / 2
            model?.map((item) => {
                const model = item.model
                if (model.isRoot) return null
                const position = model.position
                const y = position.y - (model.height / 2)
                return (
                    <div style={{ zIndex: 999, position: 'absolute', top: getTop(item.model) }}>
                        {/* todo 暂时先这么写 目前只有一层 */}
                        <Line p1={{ ...(ctx.getParentNode(item.model?.id)?.position ?? { x: 0, y: 0 }) }} p2={{ x: position.x, y }} />
                    </div>
                )
            })
        }
    </div>

}

interface ILine {
    p1: Point,
    p2: { x: number, y: number }
}
const Line = ({ p1, p2 }: ILine) => {
    console.log(p1, p2, "??/");
    return (
        <svg >
            <path d={`M${p1.x} ${p1.y}  ${p2.x} ${Math.max(p2.y, 0)}`} stroke="black" fill="none" />
        </svg>
    )
}

export { Lines }