import React from 'react';
import './index.less'
const Container = ({ children }: any) => {
    return (
        <div className='jy-mind-mapping-container'>
            <div className='jy-mind-mapping-entity' style={{ width: 500, height: 500 }}>
                {children}
            </div>
        </div>
    )
}

export { Container }