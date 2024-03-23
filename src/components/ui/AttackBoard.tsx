import React, { useState } from "react";
import "../styles/Board.css";

type BoardCell = "hit" | "miss" | null;

interface AttackBoardProps {
	boardSize: number;
}

const AttackBoard: React.FC<AttackBoardProps> = ({ boardSize }) => {
	const [board, setBoard] = useState<BoardCell[][]>(
		createEmptyBoard(boardSize)
	);

	//Create an empty board
	function createEmptyBoard(size: number): BoardCell[][] {
		const board: BoardCell[][] = [];
		for (let i = 0; i < size; i++) {
			const row: BoardCell[] = Array(size).fill(null);
			board.push(row);
		}
		return board;
	}

	const handleAttack = (row: number, col: number) => {
		if (board[row][col] !== null) return; // Already attacked cell

		const isHit = Math.random() < 0.5; // Simulated hit/miss logic
		const newBoard = [...board];
		newBoard[row][col] = isHit ? "hit" : "miss";
		setBoard(newBoard);
	};

	const renderCell = (rowIndex: number, colIndex: number, cell: BoardCell) => {
		let cellColor = "#f0f0f0";
		if (cell === "hit") cellColor = "red";
		if (cell === "miss") cellColor = "lightblue";

		return (
			<div
				key={`${rowIndex}-${colIndex}`}
				className="cell"
				style={{ backgroundColor: cellColor }}
				onClick={() => handleAttack(rowIndex, colIndex)}
			/>
		);
	};

	return (
		<div className="board-container">
			<div className="board">
				{board.map((row, rowIndex) =>
					row.map((cell, colIndex) => renderCell(rowIndex, colIndex, cell))
				)}
			</div>
		</div>
	);
};

export default AttackBoard;
