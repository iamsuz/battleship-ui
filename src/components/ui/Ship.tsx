import React from "react";
import "../styles/Ship.css";

type ShipProps = {
	name: string;
	size: number;
	color: string;
	direction: "horizontal" | "vertical";
	onDragStart: (e: React.DragEvent) => void;
	onToggleDirection: () => void;
	isDraggable: boolean;
};

const Ship: React.FC<ShipProps> = ({
	name,
	size,
	color,
	direction,
	onDragStart,
	onToggleDirection,
	isDraggable,
}) => {
	return (
		<div
			className={`ship ${direction}`}
			draggable={isDraggable}
			onDragStart={onDragStart}
			style={{
				cursor: isDraggable ? "grab" : "not-allowed",
			}}
		>
			{/* Render cells based on size */}
			{Array.from({ length: size }).map((_, index) => (
				<div
					key={index}
					className="ship-cell"
					style={{ backgroundColor: color }}
				></div>
			))}
			{/* Toggle Direction Button */}
			<button className="toggle-direction" onClick={onToggleDirection}>
				Toggle
			</button>
		</div>
	);
};

export default Ship;
