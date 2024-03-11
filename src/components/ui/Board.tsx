// src/components/Board.tsx

import React, { useState, useEffect } from "react";
import "../styles/Board.css";
import Ship from "./Ship";

type Ship = {
	name: string;
	size: number;
	color: string;
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
		{ name: "Carrier", size: 5, color: "#FF6347" }, // red
		{ name: "Battleship", size: 4, color: "#4682B4" }, // blue
		{ name: "Cruiser", size: 3, color: "#3CB371" }, // green
		{ name: "Submarine", size: 3, color: "#8A2BE2" }, // purple
		{ name: "Destroyer", size: 2, color: "#FFD700" }, // yellow
	]);

	//Track placed ships
	const [placedShips, setPlacedShips] = useState<string[]>([]);
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
	const handleDragStart = (
		e: React.DragEvent,
		name: string,
		size: number,
		color: string
	) => {
		if (placedShips.includes(name)) return; //This will prevent palacing same ship twice
		setDraggingShip({ name, size, color });
	};

	//Handke dropping a ship on the board
	const handleDrop = (e: React.DragEvent, row: number, col: number) => {
		e.preventDefault();
		if (dragginShip) {
			placeShipOnBoard(dragginShip, row, col);
			setDraggingShip(null);
		}
	};

	//Allow dropping by preventing default behavaiour
	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const placeShipOnBoard = (ship: Ship, row: number, col: number) => {
		if (col + ship.size > boardSize) return; //check if the placement is valid

		const newBoard = [...board];

		//Check if there is enough space to place the ship on
		for (let i = 0; i < ship.size; i++) {
			if (newBoard[row][col + i] !== null) {
				return; //Block placement if the any cell is occupied
			}
			newBoard[row][col + i] = ship.color;
		}

		setBoard(newBoard);
		setPlacedShips((prev) => [...prev, ship.name]);
		//check if the placement is valid
		// if (col + ship.size <= boardSize) {
		// 	for (let i = 0; i < ship.size; i++) {
		// 		newBoard[row][col + i] = ship.name;
		// 	}
		// 	setBoard(newBoard);
		// }
	};

	//Render board cells with ship color and ship anme on hover

	const renderCell = (rowIndex: number, colIndex: number, cell: BoardCell) => {
		const shipColor = cell;
		return (
			<div
				key={`${rowIndex}-${colIndex}`}
				className="cell"
				onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
				onDragOver={handleDragOver}
				style={{ backgroundColor: shipColor }}
			>
				{shipColor ? (
					<span
						className="ship-name"
						title={getShipNameByColor(shipColor)}
					></span>
				) : null}
			</div>
		);
	};

	const getShipNameByColor = (color: string) => {
		const ship = ships.find((ship) => ship.color === color);
		return ship ? ship.name : "";
	};

	return (
		<div className="board-container">
			{/* Board Grid */}
			<div className="board">
				{board.map((row, rowIndex) =>
					row.map((cell, colIndex) => renderCell(rowIndex, colIndex, cell))
				)}
			</div>

			{/* Ships Panel */}
			<div className="ship-container">
				{ships.map((ship) => (
					<Ship
						key={ship.name}
						name={ship.name}
						size={ship.size}
						color={ship.color}
						onDragStart={handleDragStart}
						isDraggable={!placedShips.includes(ship.name)} // Disable dragging for placed ships
					/>
				))}
			</div>
		</div>
	);
};

export default Board;
