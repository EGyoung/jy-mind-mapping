import React from 'react'
import { initMindMapping } from './core'
import type { TMindMappingCore } from './core'
import { Container } from './components/container'
import { EventName } from './const/index';
import { defaultConfig } from './const/defaultConfig';
class MindMapping extends React.Component {
    private _mindMapping: TMindMappingCore;
    static mindMapping: TMindMappingCore;
    constructor(props: any) {
        super(props)
        this._mindMapping = initMindMapping({
            config: defaultConfig
        })
        MindMapping.mindMapping = this._mindMapping;
        (window as any).MindMapping = MindMapping.mindMapping
        this._mindMapping.Event.on(EventName.MODEL_CHANGE, () => {
            this._mindMapping.Model.calculateNodePosition()
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
        const WidgetRenderer = this._mindMapping.getWidgetRenders() as any
        if (!data) return null
        return data.map((item) => {
            const { render, model } = item
            const Element = render
            const isSelected = this._mindMapping.Selection.selectedId === model.id

            return (
                <div key={model.id} style={{
                    position: 'absolute', top: model.position.y, left: model.position.x, width: model.width, height: model.height,
                    color: model.color, backgroundColor: model.backgroundColor,
                    border: isSelected ? '1px solid rgb(91, 59, 161)' : '1px solid transparent',
                    borderRadius: 5,
                    textAlign: 'center',
                    lineHeight: `${model.height}px`
                }}>
                    <Element model={model} />
                    <WidgetRenderer model={model} />
                </div>
            )
        })
    }
    override render(): React.ReactNode {
        return (
            <>
                <Container mindMap={this._mindMapping}>
                    {this.getRenderElement()}
                </Container>
            </>
        )
    }
}



export { MindMapping }