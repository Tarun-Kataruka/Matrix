import React, { useState } from 'react';

const Matrix = () => {
    //Initialize the matrix with a 3x3 grid of white boxes
    const initialMatrix = Array(3)
    .fill(null)
    .map(() => Array(3).fill('bg-white'));

    
  const [matrix, setMatrix] = useState(initialMatrix);      //State to store the matrix
  const [clickOrder, setClickOrder] = useState([]);         //State to store the order of clicks 

    //Function to handle the click event
    
  const handleClick = (row, col) => {                       //row and col are the row and column indexes of the clicked box
    if (matrix[row][col] === 'bg-white') {                 //If the clicked box is white change it to green
      const newMatrix = matrix.map((r, i) =>        
        r.map((cell, j) => (i === row && j === col ? 'bg-green-500' : cell))
      );
      setMatrix(newMatrix);                                           //Update the matrix state
      setClickOrder([...clickOrder, { row, col }]);                  //Update the clickOrder state
    }

    //Condition to check if the user has clicked the last box
    if (row === 2 && col === 2) {
        clickOrder.forEach((cell, index) => {               //Iterate through the clickOrder array to change the color of the boxes to orange in the order of clicks
          setTimeout(() => {
            setMatrix(prevMatrix => 
              prevMatrix.map((r, i) =>
                r.map((color, j) => {
                  if (i === cell.row && j === cell.col) {
                    return 'bg-orange-500';
                  }
                  return color;
                })
              )
            );
          }, index * 200); // Delay of 200ms between each color change
        });
      }
    };
  

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black">
      <h1 className="text-white font-bold text-8xl mb-8">Click any box</h1>
      <div className="grid grid-cols-3 gap-1">
        {matrix.map((row, rowIndex) =>
          row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleClick(rowIndex, colIndex)}
              className={`w-28 h-28 border border-gray-400 ${color}`}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default Matrix;