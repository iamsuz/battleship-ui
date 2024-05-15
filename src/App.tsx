import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; // Import AuthProvider
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute
import "./App.css";
import AttackBoard from "./components/ui/AttackBoard";
import Board from "./components/ui/Board";
import UserForm from "./components/ui/UserForm";
import { useNavigate } from "react-router-dom";

// Create a new History page (game history)
/**
 * History for the user regarding previous played games
 * @returns
 */
const History: React.FC = () => {
	const navigate = useNavigate(); // For navigation after authentication

	const handleStartGame = async () => {
		// Start a new game

		//Create a new session
		try {
			const response = await fetch(
				"http://localhost:3030/sessions/create-session",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
				}
			);

			const data = await response.json();
			if (data.success) {
				console.log(response);
				navigate("/game");
			} else {
				navigate("/game");
			}
		} catch (error) {
			console.error("Error starting a new game", error);
		}
		//And show waiting page until the next player joins
		//Or start the game if the player is the second one

		//Navigate to the game page
	};
	return (
		<div className="history-container">
			<h1 className="history-title">Game History</h1>
			<p className="history-description">
				This is where the history of the games will be displayed.
			</p>
			<button className="history-button" onClick={handleStartGame}>
				<Link to="/game"> Start New Game</Link>{" "}
			</button>
			<Link to="/" className="back-link">
				Go back to the game
			</Link>
		</div>
	);
};

/**
 * We will implement this
 */
// const LandingPage: React.FC = () => {
// 	return (
// 		<div className="landing-container">
// 			<h1 className="game-title">Welcome to Battleship</h1>
// 			<p className="game-description">
// 				Get ready to play the classic Battleship game!
// 			</p>
// 			<div>
// 				<UserForm />
// 			</div>
// 			<div className="navigation-links">
// 				<Link to="/game" className="nav-link">
// 					Start Game
// 				</Link>
// 				<br />
// 				<Link to="/dashboard" className="nav-link">
// 					View Game History
// 				</Link>
// 			</div>
// 		</div>
// 	);
// };

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
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/" element={<UserForm />} /> {/* UserForm route */}
					{/* Protected Routes */}
					<Route
						path="/game"
						element={<PrivateRoute element={<GamePage />} path="/game" />}
					/>
					<Route
						path="/dashboard"
						element={<PrivateRoute element={<History />} path="/dashboard" />}
					/>
				</Routes>
			</Router>
		</AuthProvider>
	);
};

export default App;
