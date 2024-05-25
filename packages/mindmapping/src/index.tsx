import React from 'react'
import { initMindMapping } from './core'
import type { TMindMappingCore } from './core'
import type { Node } from './types/node'
const MockConfig: Node = {
    type: 'NodeElement',
    width: 100,
    height: 50,
    text: 'MindMapping',
    color: '#000',
    backgroundColor: 'pink',
    id: '1',
    position: {
        x: 0,
        y: 0
    },
    children: [{
        type: 'NodeElement',
        width: 100,
        height: 50,
        text: 'MindMapping',
        color: '#000',
        backgroundColor: 'yellow',
        id: '2',
        position: {
            x: 100,
            y: 0
        },
        children: []
    }, {
        type: 'NodeElement',
        width: 100,
        height: 50,
        text: 'MindMapping',
        color: '#000',
        backgroundColor: 'orange',
        id: '3',
        position: {
            x: 200,
            y: 0
        },
        children: []
    }, {
        type: 'NodeElement',
        width: 100,
        height: 50,
        text: 'MindMapping',
        color: '#000',
        backgroundColor: 'green',
        id: '4',
        position: {
            x: 300,
            y: 0
        },
        children: []
    }]
}

class MindMapping extends React.Component {
    private _mindMapping: TMindMappingCore;
    constructor(props: any) {
        super(props)
        this._mindMapping = initMindMapping({ config: MockConfig })
        this._mindMapping.Event.on('stateChange', () => {
            this.forceUpdate()
        })
    }
    override componentWillUnmount(): void {
        this._mindMapping.destroy()
    }
    private getRenderElement = () => {
        const data = this._mindMapping.getRenderNodesAndModel()
        if (!data) return null
        return data.map((item) => {
            const { render, model } = item
            const Element = render
            return (
                <div key={model.id}>
                    <Element model={model} />
                </div>
            )
        })
    }
    override render(): React.ReactNode {
        return (
            <div>
                {this.getRenderElement()}
            </div>
        )
    }
}

export { MindMapping }