import { useState } from "react";
import "./App.css";
import Board from "./components/ui/Board";

const App: React.FC = () => {
	return (
		<div className="App">
			<h1>Battleship Game</h1>
			<Board boardSize={10} />
		</div>
	);
};

export default App;
