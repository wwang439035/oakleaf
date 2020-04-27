import React from 'react';
import './App.css';
import BaseComp from "./domains/StyleOverride/BaseComp";
import ChildComp from "./domains/StyleOverride/ChildComp";

function App() {
  return (
    <div className="App">
      <BaseComp/>
      <br/>
      <ChildComp/>
    </div>
  );
}

export default App;
