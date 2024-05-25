import React from 'react';
import ReactDOM from 'react-dom/client';
import { MindMapping } from '@jy/mind-mapping'
const App = () => {
    return (
        <div >
            <MindMapping />
        </div>
    )
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
