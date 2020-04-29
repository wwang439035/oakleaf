import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import DragAndDrop from "./domains/DragAndDrop/DragAndDrop";
import StyleRenderOverride from "./domains/StyleRenderOverride/StyleRenderOverride.js";
import "./App.css";

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
                                <Link to="/styleOverride">Base Component Style & Render Override</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <Switch>
                    <Route path={"/DragAndDrop"}>
                        <DragAndDrop/>
                    </Route>
                    <Route path={"/styleOverride"}>
                        <StyleRenderOverride/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
