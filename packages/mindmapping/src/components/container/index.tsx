import React, { useRef } from 'react';
import type { TMindMappingCore } from '../../core'

import './index.less'
const Container = ({ children, mindMap }: { children: any, mindMap: TMindMappingCore }) => {
    const info = useRef(mindMap.Layout.getContainerLayout())
    return (
        <div className='jy-mind-mapping-container'>
            <div className='jy-mind-mapping-entity' style={{ width: info.current.width, height: info.current.height }}>
                <div style={{ width: 0, height: 0, transform: 'translate(0, 50px)' }}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export { Container }