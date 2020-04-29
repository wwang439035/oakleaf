import React from 'react';
import BaseComp from "./BaseComp";
import ChildComp from "./ChildComp";

function StyleRenderOverride() {
    return (
        <div style={ { width: '50%', padding: '0 25%' } }>
            <h2>Base Component Style & Render Override</h2>
            <br/>
            <h3>Base Component</h3>
            <BaseComp/>
            <br/><br/>
            <h3>Inherited Component</h3>
            <ChildComp/>
        </div>
    );
}

export default StyleRenderOverride;
