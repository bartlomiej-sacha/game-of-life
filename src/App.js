import React, {useState} from 'react';
import Canvas from './components/Canvas/Canvas';

function App() {
  const [canvasSize, setCanvasSize] = useState(600);
  const [boardSize, setBoardSize] = useState(20);

  return (
    <div className="root">
      <Canvas
        canvasSize={canvasSize}
        boardSize={boardSize}
        step={canvasSize / boardSize}
      />
    </div>
  );
}

export default App;
