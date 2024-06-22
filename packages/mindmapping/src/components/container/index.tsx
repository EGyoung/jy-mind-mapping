import React, { useRef } from 'react';
import type { TMindMappingCore } from '../../core'
import './index.less'
const Container = ({ children, mindMap }: { children: any, mindMap: TMindMappingCore }) => {
    const info = useRef(mindMap.Layout.getContainerLayout())
    const getPosition = () => {
        const height = info.current.height
        const rootHeight = mindMap.getConfig()?.height ?? 0
        return {
            top: (height - rootHeight) / 2
        }
    }
    return (
        <div className='jy-mind-mapping-container' data-id={mindMap.id}>
            <div className='jy-mind-mapping-entity' style={{ width: info.current.width, height: info.current.height }}>
                <div style={{ position: 'relative', ...getPosition() }}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export { Container }