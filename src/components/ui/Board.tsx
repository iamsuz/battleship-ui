// src/components/Board.tsx

import React, { useState, useEffect } from "react";
import "../styles/Board.css";
import Ship from "./Ship";

type Ship = {
	name: string;
	size: number;
};

type BoardCell = string | null;

interface BoardProps {
	boardSize?: number;
}

const Board: React.FC<BoardProps> = ({ boardSize = 10 }) => {
	const [board, setBoard] = useState<BoardCell[][]>(
		createEmptyBoard(boardSize)
	);
	const [ships, setShips] = useState<Ship[]>([
		{ name: "Carrier", size: 5 },
		{ name: "Battleship", size: 4 },
		{ name: "Cruiser", size: 3 },
		{ name: "Submarine", size: 3 },
		{ name: "Destroyer", size: 2 },
	]);

	const [dragginShip, setDraggingShip] = useState<Ship | null>(null);

	// Create an empty board
	function createEmptyBoard(size: number): BoardCell[][] {
		const board: BoardCell[][] = [];
		for (let i = 0; i < size; i++) {
			const row: BoardCell[] = Array(size).fill(null);
			board.push(row);
		}
		return board;
	}

	// Handle the start og the drag event
	const handleDragStart = (e: React.DragEvent, name: string, size: number) => {
		setDraggingShip({ name, size });
	};

	//Handke dropping a ship on the board
	const handleDrop = (e: React.DragEvent, row: number, col: number) => {
		e.preventDefault();
		if (dragginShip) {
			placeShipOnBoard(dragginShip, row, col);
		}
	};

	//Allow dropping by preventing default behavaiour
	const handleDragover = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const placeShipOnBoard = (ship: Ship, row: number, col: number) => {
		const newBoard = [...board];

		//check if the placement is valid
		if (col + ship.size <= boardSize) {
			for (let i = 0; i < ship.size; i++) {
				newBoard[row][col + i] = ship.name;
			}
			setBoard(newBoard);
		}
	};

	return (
		<div className="board-container">
			{/* Board Grid */}
			<div className="board">
				{board.map((row, rowIndex) =>
					row.map((cell, colIndex) => (
						<div
							key={`${rowIndex}-${colIndex}`}
							className="cell"
							onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
							onDragOver={handleDragover}
						>
							{cell ? <span className="ship">{cell}</span> : null}
						</div>
					))
				)}
			</div>

			{/* Ships Panel */}
			<div className="ship-container">
				{ships.map((ship) => (
					<Ship
						key={ship.name}
						name={ship.name}
						size={ship.size}
						onDragStart={handleDragStart}
					/>
				))}
			</div>
		</div>
	);
};

export default Board;
