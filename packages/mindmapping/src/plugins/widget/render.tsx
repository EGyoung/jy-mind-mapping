import { AddSvg } from "./addSvg"
import React from 'react';


const AddNodeWrapperRender = () => {
    return (
        <div style={{
            position: 'absolute',
            border: 'none',
            lineHeight: 0,
            top: 0,
            left: '50%',
            transform: 'translate(-50%, -100%)'
        }}>
            {AddSvg}
        </div>
    )
}

export { AddNodeWrapperRender }