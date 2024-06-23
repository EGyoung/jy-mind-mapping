import React, { useLayoutEffect, useRef, useState } from 'react';
import type { TMindMappingCore } from '../../core'
import './index.less'
const Container = ({ children, mindMap }: { children: any, mindMap: TMindMappingCore }) => {
    const info = useRef(mindMap.Layout.getContainerLayout())
    const [space, setSpace] = useState({
        top: 0,
        left: 0
    })
    useLayoutEffect(() => {
        if (mindMap.container === null) return
        const top = (mindMap.container.clientHeight - info.current.height) / 2
        const left = (mindMap.container.clientWidth - info.current.width) / 2
        setSpace({
            top,
            left
        })
    }, [mindMap.container])
    const getPosition = () => {
        const height = info.current.height
        const rootWidth = mindMap.getConfig()?.width ?? 0
        return {
            top: height / 2,
            left: rootWidth / 2
        }
    }
    return (
        <div className='jy-mind-mapping-container' data-id={mindMap.id}>
            <div className='jy-mind-mapping-entity' style={{ width: info.current.width, height: info.current.height, padding: `${space.top}px ${space.left}px` }}>
                <div style={{ position: 'relative', ...getPosition() }}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export { Container }