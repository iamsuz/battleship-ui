import React from "react";
import "./App.css";
import AttackBoard from "./components/ui/AttackBoard";
import Board from "./components/ui/Board";

const App: React.FC = () => {
	return (
		<div className="App container">
			<h1 className="game-title">Battleship Game</h1>
			<div className="game-layout">
				<div className="board-wrapper offset-1">
					<Board boardSize={10} isAttackBoard={false} />
				</div>
				<div className="board-wrapper offset-1">
					<AttackBoard boardSize={10} />
				</div>
			</div>
		</div>
	);
};

export default App;
