import React from 'react';
import BaseComp from "./BaseComp";
import ChildComp from "./ChildComp";

function StyleOverride() {
  return (
    <div>
      <BaseComp/>
      <br/>
      <ChildComp/>
    </div>
  );
}

export default StyleOverride;
