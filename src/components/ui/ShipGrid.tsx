import React from "react";
import "../styles/ShipGrid.css";

type ShipGridProps = {
	size: number;
	direction: "horizontal" | "vertical";
	onToggleDirection: () => void;
	color: string;
};

const ShipGrid: React.FC<ShipGridProps> = ({
	size,
	direction,
	onToggleDirection,
	color,
}) => {
	const gridItems = new Array(size).fill(null);

	return (
		<div className="ship-grid">
			<div className={`grid ${direction}`}>
				{gridItems.map((_, index) => (
					<div
						key={index}
						className="grid-cell"
						style={{ backgroundColor: color }}
					></div>
				))}
			</div>
			<button className="toggle-direction" onClick={onToggleDirection}>
				Toggle Direction
			</button>
		</div>
	);
};

export default ShipGrid;
