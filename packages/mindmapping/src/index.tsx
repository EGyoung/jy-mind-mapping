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
        const DecoratorRender = this._mindMapping.getDecoratorRenders() as any
        if (!data) return null
        return data.map((item) => {
            const { render, model } = item
            const Element = render
            const isSelected = this._mindMapping.Selection.selectedId === model.id
            const parentNode = this._mindMapping.getParentNode(model.id)
            console.log(parentNode, model.id, model.position, 'parentNode');
            return (
                <div key={model.id} style={{
                    position: 'absolute',
                    top: model.position.y - (parentNode?.height ?? 0) / 2,
                    left: model.position.x - (parentNode?.width ?? 0) / 2,
                    width: model.width,
                    height: model.height,
                    color: model.color,
                    backgroundColor: model.backgroundColor,
                    border: isSelected ? '1px solid rgb(91, 59, 161)' : '1px solid transparent',
                    borderRadius: 5,
                    textAlign: 'center',
                    lineHeight: `${model.height}px`,
                    boxSizing: 'border-box',
                }}>
                    <Element model={model} />
                    <DecoratorRender model={model} />
                </div>
            )
        })
    }
    override render(): React.ReactNode {
        const Widget = this._mindMapping.getWidgetRenders() as any
        return (
            <>
                <Container mindMap={this._mindMapping}>
                    {this.getRenderElement()}
                    {
                        Widget && <Widget />
                    }
                </Container>
            </>
        )
    }
}



export { MindMapping }