import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import DragAndDrop from "./domains/DragAndDrop/DragAndDrop";
import StyleOverride from "./domains/StyleOverride/StyleOverride.js";

function App() {
    return (
        <Router>
            <div className="App">
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/DragAndDrop">Drag And Drop</Link>
                            </li>
                            <li>
                                <Link to="/styleOverride">Base Component Style Override</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <Switch>
                    <Route path={"/DragAndDrop"}>
                        <DragAndDrop/>
                    </Route>
                    <Route path={"/styleOverride"}>
                        <StyleOverride/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
