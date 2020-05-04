import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './redux/store'
import DndFactory from "./domains/DragAndDrop/DndFactory";
import StyleRenderOverride from "./domains/StyleRenderOverride/StyleRenderOverride.js";
import "./App.css";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App container">
                    <div className="menu">
                        <nav>
                            <ol>
                                <li>Drag And Drop
                                    <ol className="discOption">
                                        <li>
                                            <Link to="/PlainDragAndDrop">Drag and Drop with Plain JS</Link>
                                        </li>
                                        <li>
                                            <Link to="/DragAndDrop">Drag and Drop with React-DND</Link>
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    <Link to="/styleOverride">Base Component Style & Render Override</Link>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="mainPanel">
                        <Switch>
                            <Route path={"/PlainDragAndDrop"}>
                                <DndFactory type="PlainDragAndDrop"/>
                            </Route>
                            <Route path={"/DragAndDrop"}>
                                <DndFactory type="ReactDragAndDrop"/>
                            </Route>
                            <Route path={"/styleOverride"}>
                                <StyleRenderOverride/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
