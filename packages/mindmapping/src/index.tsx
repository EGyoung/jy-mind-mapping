import React from 'react'
import { initMindMapping } from './core'
import type { TMindMappingCore } from './core'

class MindMapping extends React.Component {
    private _mindMapping: TMindMappingCore;
    constructor(props: any) {
        super(props)
        this._mindMapping = initMindMapping()
        this._mindMapping.Event.on('stateChange', () => {
            this.forceUpdate()
        })
    }
    override componentWillUnmount(): void {
        this._mindMapping.destroy()
    }
    override render(): React.ReactNode {
        return (
            <div>
                <h1>MindMapping</h1>
            </div>
        )
    }
}

export { MindMapping }