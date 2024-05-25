import React from 'react';
import ReactDOM from 'react-dom/client';
import { MindMapping } from '@jy/mind-mapping'
const App = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }} >
            <MindMapping />
        </div>
    )
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
