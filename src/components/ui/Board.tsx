import React, { useState } from "react";
import "../styles/Board.css";
import Ship from "./Ship";

type Ship = {
	name: string;
	size: number;
	color: string; // Store the ship color
	direction: "horizontal" | "vertical"; // Track ship direction
};

type BoardCell = string | null; // Now storing color instead of ship names

interface BoardProps {
	boardSize: number;
	isAttackBoard: boolean;
}

const Board: React.FC<BoardProps> = ({ boardSize }) => {
	const [board, setBoard] = useState<BoardCell[][]>(
		createEmptyBoard(boardSize)
	);
	const [ships, setShips] = useState<Ship[]>([
		{ name: "Carrier", size: 5, color: "#FF6347", direction: "horizontal" }, // red
		{ name: "Battleship", size: 4, color: "#4682B4", direction: "horizontal" }, // blue
		{ name: "Cruiser", size: 3, color: "#3CB371", direction: "horizontal" }, // green
		{ name: "Submarine", size: 3, color: "#8A2BE2", direction: "horizontal" }, // purple
		{ name: "Destroyer", size: 2, color: "#FFD700", direction: "horizontal" }, // yellow
	]);
	const [placedShips, setPlacedShips] = useState<string[]>([]); // Track placed ships
	const [draggingShip, setDraggingShip] = useState<Ship | null>(null);

	// Create an empty board
	function createEmptyBoard(size: number): BoardCell[][] {
		const board: BoardCell[][] = [];
		for (let i = 0; i < size; i++) {
			const row: BoardCell[] = Array(size).fill(null); // Initialize empty cells
			board.push(row);
		}
		return board;
	}

	// Handle the start of a drag event
	const handleDragStart = (e: React.DragEvent, ship: Ship) => {
		setDraggingShip(ship); // Set the dragging ship
		e.dataTransfer.setData("ship", JSON.stringify(ship));
	};

	// Handle dropping a ship on the board
	const handleDrop = (e: React.DragEvent, row: number, col: number) => {
		e.preventDefault();
		if (draggingShip) {
			placeShipOnBoard(draggingShip, row, col);
			setDraggingShip(null); // Reset the dragging ship after drop
		}
	};

	// Allow dropping by preventing default behavior
	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	// Place the ship on the board (check all cells to prevent overlap)
	const placeShipOnBoard = (ship: Ship, row: number, col: number) => {
		const newBoard = [...board];

		// Check if there's enough space to place the ship (checking for overlap)
		if (!checkSpaceForShip(ship, row, col)) {
			return; // Don't place the ship if there isn't enough space
		}
		console.log("Placing ship on board");
		// Place the ship if the space is clear
		for (let i = 0; i < ship.size; i++) {
			if (ship.direction === "horizontal") {
				newBoard[row][col + i] = ship.color;
			} else {
				newBoard[row + i][col] = ship.color;
			}
		}

		// Update the board and mark the ship as placed
		setBoard(newBoard);
		setPlacedShips((prev) => [...prev, ship.name]);
	};

	// Check if the ship can be placed on the board (based on direction and space)
	const checkSpaceForShip = (ship: Ship, row: number, col: number): boolean => {
		if (ship.direction === "horizontal") {
			if (col + ship.size > boardSize) return false; // Out of bounds check
			for (let i = 0; i < ship.size; i++) {
				if (board[row][col + i] !== null) return false; // Check if the cell is occupied
			}
		} else {
			// vertical
			if (row + ship.size > boardSize) return false; // Out of bounds check
			for (let i = 0; i < ship.size; i++) {
				if (board[row + i][col] !== null) return false; // Check if the cell is occupied
			}
		}
		return true; // Space is clear
	};

	// Toggle the direction of the ship (horizontal/vertical)

	const toggleShipDirection = (ship: Ship) => {
		const updatedShip: Ship = {
			...ship,
			direction: ship.direction === "horizontal" ? "vertical" : "horizontal", // Toggle between horizontal and vertical
		};

		// Update the state correctly
		setShips((prevShips) =>
			prevShips.map((s) => (s.name === ship.name ? updatedShip : s))
		);
	};

	// Render board cells with ship color and ship name on hover
	const renderCell = (rowIndex: number, colIndex: number, cell: BoardCell) => {
		const shipColor = cell;
		return (
			<div
				key={`${rowIndex}-${colIndex}`}
				className="cell"
				onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
				onDragOver={handleDragOver}
				style={{ backgroundColor: shipColor || "#f0f0f0" }} // Use color or default gray
			>
				{shipColor ? (
					<span className="ship-name" title={getShipNameByColor(shipColor)}>
						{/* Show ship name on hover */}
					</span>
				) : null}
			</div>
		);
	};

	// Get the ship name from its color
	const getShipNameByColor = (color: string) => {
		const ship = ships.find((ship) => ship.color === color);
		return ship ? ship.name : "";
	};
	// Handle toggling ship direction
	const handleToggleDirection = (name: string) => {
		const updatedShips: Ship[] = ships.map((ship) =>
			ship.name === name
				? {
						...ship,
						direction:
							ship.direction === "horizontal" ? "vertical" : "horizontal",
				  }
				: ship
		);
		setShips(updatedShips);
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
						direction={ship.direction}
						onDragStart={(e) => handleDragStart(e, ship)}
						onToggleDirection={() => handleToggleDirection(ship.name)}
						isDraggable={!placedShips.includes(ship.name)}
					/>
				))}
			</div>
		</div>
	);
};

export default Board;
