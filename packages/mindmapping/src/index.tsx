import React from 'react'
import { initMindMapping } from './core'
import type { TMindMappingCore } from './core'
import { Container } from './components/container'

class MindMapping extends React.Component {
    private _mindMapping: TMindMappingCore;
    constructor(props: any) {
        super(props)
        this._mindMapping = initMindMapping({})
        this._mindMapping.Event.on('modelChange', () => {
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
                <Debugger ctx={this._mindMapping} />
                <Container mindMap={this._mindMapping}>
                    {this.getRenderElement()}
                </Container>
            </>
        )
    }
}

const Debugger = ({ ctx }: { ctx: TMindMappingCore }) => {
    return (
        <div style={{ display: 'flex' }} >
            <button style={{ width: 50, height: 50 }} onClick={() => {
                ctx.createRootNode()
            }}>创建</button>
        </div>
    )
}

export { MindMapping }