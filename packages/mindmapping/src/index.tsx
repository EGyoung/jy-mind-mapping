import React from 'react'
import { initMindMapping } from './core'
import type { TMindMappingCore } from './core'
import { Container } from './components/container'
import { EventName } from './const/index';

class MindMapping extends React.Component {
    private _mindMapping: TMindMappingCore;
    static mindMapping: TMindMappingCore;
    constructor(props: any) {
        super(props)
        this._mindMapping = initMindMapping({})
        MindMapping.mindMapping = this._mindMapping
        this._mindMapping.Event.on(EventName.MODEL_CHANGE, () => {
            this.forceUpdate()
        })

        this._mindMapping.Event.on(EventName.NODE_SELECTED, (node) => {
            console.log('node selected', node)
            this.forceUpdate()
        })
    }
    override componentDidMount(): void {
        this._mindMapping.onLoaded()
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
            <>
                {/* <Debugger ctx={this._mindMapping} /> */}
                <Container mindMap={this._mindMapping}>
                    {this.getRenderElement()}
                </Container>
            </>
        )
    }
}



export { MindMapping }