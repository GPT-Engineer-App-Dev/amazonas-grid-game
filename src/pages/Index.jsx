import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const initialBoard = [
  ["", "", "", "P1", "", "", "P1", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["P1", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "P2"],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "P2", "", "", "P2", "", ""],
];

const Index = () => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("P1");

  const handleCellClick = (row, col) => {
    if (selectedPiece) {
      const [selectedRow, selectedCol] = selectedPiece;
      if (isValidMove(selectedRow, selectedCol, row, col)) {
        const newBoard = board.map((r) => r.slice());
        newBoard[selectedRow][selectedCol] = "";
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);
        setSelectedPiece(null);
        setCurrentPlayer(currentPlayer === "P1" ? "P2" : "P1");
      }
    } else if (board[row][col] === currentPlayer) {
      setSelectedPiece([row, col]);
    }
  };

  const isValidMove = (startRow, startCol, endRow, endCol) => {
    if (board[endRow][endCol] !== "") return false;
    if (startRow !== endRow && startCol !== endCol) return false;
    if (startRow === endRow) {
      const step = startCol < endCol ? 1 : -1;
      for (let col = startCol + step; col !== endCol; col += step) {
        if (board[startRow][col] !== "") return false;
      }
    } else {
      const step = startRow < endRow ? 1 : -1;
      for (let row = startRow + step; row !== endRow; row += step) {
        if (board[row][startCol] !== "") return false;
      }
    }
    return true;
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setSelectedPiece(null);
    setCurrentPlayer("P1");
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>El Juego de las Amazonas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-9 gap-1">
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={cn(
                    "w-10 h-10 border flex items-center justify-center",
                    selectedPiece &&
                      selectedPiece[0] === rowIndex &&
                      selectedPiece[1] === colIndex &&
                      "bg-blue-200"
                  )}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell && (
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        cell === "P1" ? "bg-red-500" : "bg-green-500"
                      )}
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      <div className="flex space-x-4">
        <Button onClick={resetGame}>Reset Game</Button>
        <div>Current Turn: {currentPlayer}</div>
      </div>
    </div>
  );
};

export default Index;