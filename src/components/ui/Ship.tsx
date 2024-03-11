// src/components/Ship.tsx

import React from "react";
import "../styles/Ship.css";

interface ShipProps {
	name: string;
	size: number;
	color: string;
	onDragStart: (
		e: React.DragEvent,
		name: string,
		size: number,
		color: string
	) => void;
	isDraggable: boolean;
}

const Ship: React.FC<ShipProps> = ({
	name,
	size,
	color,
	onDragStart,
	isDraggable,
}) => {
	return (
		<div
			className="ship-item"
			draggable={isDraggable}
			onDragStart={(e) => onDragStart(e, name, size, color)}
			style={{ backgroundColor: color }}
			title={`Drag to place ${name}`}
		>
			{name} ({size} cells)
		</div>
	);
};

export default Ship;
