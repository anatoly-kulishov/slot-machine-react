import React from 'react';

import Rollers from "../../templates/Rollers/Rollers";
import {ROLLERS} from "../../constants";
import './App.css';

function App() {
    return (
        <div className="app">
            <Rollers data={ROLLERS} />
        </div>
    );
}

export default App;
