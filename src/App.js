import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import BouncingBall from './components/BouncingBall';
import LowestPrice from './components/LowestPrice';


function App() {

  return (
    <div
      className="h-screen w-screen flex justify-center bg-gray-200 p-2">
      <div
        className="flex flex-col items-center justify-center w-full">
        <div
          className="flex flex-col h-1/3 w-2/3">
          <LowestPrice />
        </div>
        <div
          className="flex w-full h-2/3" >
          <BouncingBall />
        </div>
      </div>
    </div>
  );
}

export default App;