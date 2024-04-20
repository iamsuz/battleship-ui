import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AttackBoard from "./components/ui/AttackBoard";
import Board from "./components/ui/Board";

// Create a new History page (game history)
const History: React.FC = () => {
	return (
		<div className="history-container">
			<h1 className="history-title">Game History</h1>
			<p className="history-description">
				This is where the history of the games will be displayed.
			</p>
			<Link to="/" className="back-link">
				Go back to the game
			</Link>
		</div>
	);
};

const LandingPage: React.FC = () => {
	return (
		<div className="landing-container">
			<h1 className="game-title">Welcome to Battleship</h1>
			<p className="game-description">
				Get ready to play the classic Battleship game!
			</p>
			<div className="navigation-links">
				<Link to="/game" className="nav-link">
					Start Game
				</Link>
				<br />
				<Link to="/dashboard" className="nav-link">
					View Game History
				</Link>
			</div>
		</div>
	);
};

const GamePage: React.FC = () => {
	return (
		<div className="game-container">
			<h1 className="game-title">Battleship Game</h1>
			<div className="game-layout">
				<div className="board-wrapper offset-1">
					<Board boardSize={10} isAttackBoard={false} />
				</div>
				<div className="board-wrapper offset-1">
					<AttackBoard boardSize={10} />
				</div>
			</div>
			<div className="navigation-links">
				<Link to="/" className="nav-link">
					Back to Home
				</Link>
				<br />
				<Link to="/dashboard" className="nav-link">
					View Game History
				</Link>
			</div>
		</div>
	);
};

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} /> {/* Landing Page */}
				<Route path="/game" element={<GamePage />} /> {/* Game Page */}
				<Route path="/dashboard" element={<History />} /> {/* Game History */}
			</Routes>
		</Router>
	);
};

export default App;
