import React from "react";
import "../styles/Ship.css";

interface ShipProps {
	name: string;
	size: number;
	onDragStart: (e: React.DragEvent, name: string, size: number) => void;
}

const Ship: React.FC<ShipProps> = ({ name, size, onDragStart }) => {
	return (
		<div
			className="ship-teim"
			draggable
			onDragStart={(e) => onDragStart(e, name, size)}
			title={`Drag to place ${name}`}
		>
			{name} ({size} cell)
		</div>
	);
};

export default Ship;
