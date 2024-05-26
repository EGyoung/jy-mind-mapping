import React from 'react';
import ReactDOM from 'react-dom/client';
import { MindMapping } from '@jy/mind-mapping'

const Debugger = ({ ctx }: { ctx: any }) => {
    return (
        <div style={{ display: 'flex' }} >
            <button style={{ width: 50, height: 50 }} onClick={() => {
                ctx().createRootNode()
            }}>创建</button>
        </div>
    )
}

const App = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }} >
            <Debugger ctx={() => MindMapping.mindMapping} />
            <MindMapping />
        </div>
    )
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
