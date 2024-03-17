import React from "react";
import "../styles/Ship.css";

interface ShipProps {
	name: string;
	size: number;
	color: string;
	direction: "horizontal" | "vertical";
	onDragStart: (
		e: React.DragEvent,
		name: string,
		size: number,
		color: string,
		direction: "horizontal" | "vertical"
	) => void;
	isDraggable: boolean;
	onToggleDirection: () => void; // Allow each ship to toggle its direction
}

const Ship: React.FC<ShipProps> = ({
	name,
	size,
	color,
	direction,
	onDragStart,
	isDraggable,
	onToggleDirection,
}) => {
	return (
		<div className="ship-item">
			<div
				className="ship-header"
				style={{ backgroundColor: color }}
				title={`Drag to place ${name}`}
			>
				<strong>{name}</strong> ({size} cells)
			</div>
			{/* Render the Ship Grid */}
			<div
				className="ship-grid"
				style={{
					display: "flex",
					flexDirection: direction === "horizontal" ? "row" : "column",
				}}
			>
				{new Array(size).fill(null).map((_, index) => (
					<div
						key={index}
						className="grid-cell"
						style={{ backgroundColor: color }}
					/>
				))}
			</div>
			<button onClick={onToggleDirection} className="toggle-direction-btn">
				Toggle Direction
			</button>
		</div>
	);
};

export default Ship;
