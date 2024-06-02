import { AddSvg } from "./addSvg"
import React from 'react';
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



const AddNodeWrapperRender = () => {
    return (
        <>
            {Object.entries(divConfigs).map(([key, style]) => (
                <div key={key} style={{ ...commonStyle, ...style } as any}>
                    {AddSvg}
                </div>
            ))}
        </>

    )
}

export { AddNodeWrapperRender }