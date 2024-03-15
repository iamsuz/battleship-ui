// src/components/Ship.tsx

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
}

const Ship: React.FC<ShipProps> = ({
	name,
	size,
	color,
	direction,
	onDragStart,
	isDraggable,
}) => {
	return (
		<div
			className="ship-item"
			draggable={isDraggable}
			onDragStart={(e) => onDragStart(e, name, size, color, direction)}
			style={{ backgroundColor: color }}
			title={`Drag to place ${name}`}
		>
			{name} ({size} cells)
		</div>
	);
};

export default Ship;
