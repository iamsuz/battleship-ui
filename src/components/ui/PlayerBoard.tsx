// PlayerBoard.tsx
import React, { useState } from "react";
import Board from "./Board";
import Ship from "./Ship"; // Assuming Ship.tsx is defined
import ShipType from "../types/Ship"; // Assuming you have a Ship type defined elsewhere

const PlayerBoard: React.FC = () => {
	const [ships, setShips] = useState<ShipType[]>([
		// Initialize ships here
		{ name: "Battleship", size: 4, color: "blue", direction: "horizontal" },
		{ name: "Destroyer", size: 3, color: "green", direction: "vertical" },
	]);
	const [board, setBoard] = useState<(string | null)[][]>(
		Array(10).fill(Array(10).fill(null))
	);
	const [draggingShip, setDraggingShip] = useState<ShipType | null>(null);

	// Handle the start of a drag event
	const handleDragStart = (e: React.DragEvent, ship: ShipType) => {
		e.dataTransfer.setData("ship", JSON.stringify(ship));
		setDraggingShip(ship);
	};

	// Handle dropping a ship on the board
	const handleDrop = (row: number, col: number) => {
		if (draggingShip) {
			placeShipOnBoard(draggingShip, row, col);
			setDraggingShip(null); // Reset the dragging ship after drop
		}
	};

	// Place the ship on the board (check all cells to prevent overlap)
	const placeShipOnBoard = (ship: ShipType, row: number, col: number) => {
		const newBoard = [...board];

		// Check if there's enough space to place the ship (checking for overlap)
		if (!checkSpaceForShip(ship, row, col)) {
			return; // Don't place the ship if there isn't enough space
		}

		// Place the ship if the space is clear
		for (let i = 0; i < ship.size; i++) {
			if (ship.direction === "horizontal") {
				newBoard[row][col + i] = ship.color;
			} else {
				newBoard[row + i][col] = ship.color;
			}
		}

		// Update the board state
		setBoard(newBoard);
	};

	// Check if the ship can be placed on the board (based on direction and space)
	const checkSpaceForShip = (
		ship: ShipType,
		row: number,
		col: number
	): boolean => {
		if (ship.direction === "horizontal") {
			if (col + ship.size > 10) return false; // Out of bounds check
			for (let i = 0; i < ship.size; i++) {
				if (board[row][col + i] !== null) return false; // Check if the cell is occupied
			}
		} else {
			if (row + ship.size > 10) return false; // Out of bounds check
			for (let i = 0; i < ship.size; i++) {
				if (board[row + i][col] !== null) return false; // Check if the cell is occupied
			}
		}
		return true; // Space is clear
	};

	return (
		<div>
			<h3>Player Board</h3>
			<div style={{ display: "flex" }}>
				{ships.map((ship) => (
					<Ship
						key={ship.name}
						name={ship.name}
						size={ship.size}
						color={ship.color}
						direction={ship.direction}
						onDragStart={(e) => handleDragStart(e, ship)}
						onToggleDirection={() => handleToggleDirection(ship.name)}
						isDraggable={!placedShips.includes(ship.name)}
					/>
				))}
			</div>
			<Board grid={board} onDrop={handleDrop} />
		</div>
	);
};

export default PlayerBoard;
