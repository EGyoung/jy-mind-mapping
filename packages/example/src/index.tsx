import React from 'react';
import ReactDOM from 'react-dom/client';
import { MindMapping } from '@jy/mind-mapping'
const App = () => {
    return (
        <div>
            <h1>Hello World</h1>
            <Temp />
            <MindMapping />
        </div>
    )
}

class Temp extends React.Component {
    override render() {
        return (
            <div>
                <h1>Temp3111</h1>
            </div>
        )
    }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
