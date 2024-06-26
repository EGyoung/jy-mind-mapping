import type { TMindMappingCore } from "../../core";
import type { Node } from '../../types/node'
import React from 'react';
import { CreateIcon } from "./createIcon";
const commonStyle = {
    position: 'absolute',
    border: 'none',
    lineHeight: 0,
    cursor: 'pointer',
} satisfies React.CSSProperties;

const divConfigs = {
    top: {
        top: 0,
        left: '50%',
        transform: 'translate(-50%, -100%)'
    },
    bottom: {
        bottom: '0px',
        left: '50%',
        transform: 'translate(-50%, 100%) rotate(180deg)'
    },
    left: {
        top: '50%',
        transform: 'translate(-72%, -50%) rotate(-90deg)',
        left: 0
    },
    right: {
        top: '50%',
        transform: 'translate(72%, -50%) rotate(90deg)',
        right: 0
    }
} satisfies Record<string, React.CSSProperties>;



const AddNodeWrapperRender = ({ model, ctx }: { model: Node, ctx: TMindMappingCore }) => {
    const isSelected = ctx.Selection.selectedId === model.id
    if (!isSelected) {
        return null
    }
    return (
        <div>
            {Object.entries(divConfigs).map(([direction, style]) => (
                <CreateIcon onClick={() => ctx.createNode(model.id, direction)} key={direction} style={{ ...commonStyle, ...style }} />
            ))}
        </div>

    )
}


export { AddNodeWrapperRender }