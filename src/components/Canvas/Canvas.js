import React, {useRef, useEffect, Fragment} from 'react';
import {deepCopy} from '../../utils/utils';

const Canvas = ({canvasSize, boardSize, step}) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const cellsArrayRef = useRef(null);
  const refInput = useRef(null);

  const generateCells = () => {
    const cellsArray = [];
    let y = 0;

    for (let i = 0; i < boardSize; i++) {
      cellsArray[i] = [];
      let x = 0;
      for (let j = 0; j < boardSize; j++) {
        cellsArray[i][j] = {
          x: x,
          y: y,
          sideLength: step,
          state: 0,
        };
        x += step;
      }
      y += step;
    }
    return cellsArray;
  };

  const updateCells = () => {
    const nextGenArray = deepCopy(cellsArrayRef.current);

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        let state = getAdjacentCellsState(i, j);
        if (cellsArrayRef.current[i][j].state === 1) {
          state === 2 || state === 3
            ? (nextGenArray[i][j].state = 1)
            : (nextGenArray[i][j].state = 0);
        } else {
          state === 3
            ? (nextGenArray[i][j].state = 1)
            : (nextGenArray[i][j].state = 0);
        }
      }
    }
    cellsArrayRef.current = nextGenArray;
    drawCells(cellsArrayRef.current);
  };

  const getAdjacentCellsState = (x, y) => {
    let livingCells = 0 - cellsArrayRef.current[x][y].state;

    if (x === 0 || x === 19) {
      return;
    }
    if (y === 0 || y === 19) {
      return;
    }

    for (let i = x - 1; i < x + 2; i++) {
      for (let j = y - 1; j < y + 2; j++) {
        livingCells += cellsArrayRef.current[i][j].state;
      }
    }
    return livingCells;
  };

  const drawCells = cells => {
    clearCanvas();
    cells.forEach(cellRow => {
      cellRow.forEach(cell => {
        drawCell(cell);
      });
    });
  };

  const drawCell = cell => {
    if (cell.state === 1) {
      contextRef.current.fillStyle = '#000';
      contextRef.current.fillRect(
        cell.x,
        cell.y,
        cell.sideLength,
        cell.sideLength,
      );
    } else {
      contextRef.current.strokeRect(
        cell.x,
        cell.y,
        cell.sideLength,
        cell.sideLength,
      );
    }
  };

  const handleClick = e => {
    changeCellState(e);
    clearCanvas();
    drawCells(cellsArrayRef.current);
  };

  const changeCellState = ({clientX, clientY}) => {
    cellsArrayRef.current[Math.floor(clientY / step)][
      Math.floor(clientX / step)
    ].state = 1;
  };

  const clearCanvas = () => {
    contextRef.current.fillStyle = '#fff';
    contextRef.current.fillRect(0, 0, canvasSize * 2, canvasSize * 2);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasSize * 2;
    canvas.height = canvasSize * 2;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;

    contextRef.current = context;
    cellsArrayRef.current = generateCells();
    drawCells(cellsArrayRef.current);
  }, []);

  const runGame = () => {
    setInterval(() => {
      updateCells();
    }, refInput.current.value);
  };

  const makeGun = () => {
    cellsArrayRef.current[8][13].state = 1;
    cellsArrayRef.current[8][14].state = 1;
    cellsArrayRef.current[9][12].state = 1;
    cellsArrayRef.current[10][11].state = 1;
    cellsArrayRef.current[11][11].state = 1;
    cellsArrayRef.current[12][11].state = 1;
    cellsArrayRef.current[13][12].state = 1;
    cellsArrayRef.current[14][13].state = 1;
    cellsArrayRef.current[14][14].state = 1;
    cellsArrayRef.current[11][15].state = 1;
    cellsArrayRef.current[9][16].state = 1;
    cellsArrayRef.current[13][16].state = 1;
    cellsArrayRef.current[10][17].state = 1;
    cellsArrayRef.current[11][17].state = 1;
    cellsArrayRef.current[12][17].state = 1;
    cellsArrayRef.current[11][18].state = 1;
    drawCells(cellsArrayRef.current);
  };

  return (
    <Fragment>
      <canvas ref={canvasRef} onClick={handleClick} />
      <div
        style={{
          height: '100px',
          width: '600px',
          display: 'flex',
          justifyContent: 'center',
          flexGrow: 1,
        }}
      >
        <button
          style={{
            flexGrow: 1,
          }}
          onClick={runGame}
        >
          start
        </button>
        <button style={{}} onClick={makeGun}>
          make a gun!
        </button>
        <input
          style={{
            textAlign: 'center',
          }}
          type="text"
          ref={refInput}
          defaultValue="100"
        />
      </div>
    </Fragment>
  );
};

export default Canvas;
