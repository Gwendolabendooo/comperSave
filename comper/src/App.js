import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Themes from './views/Themes';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Themes />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;