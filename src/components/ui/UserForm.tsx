import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext"; // Import the useAuth hook

const UserForm: React.FC = () => {
	const { authenticate, isAuthenticated } = useAuth(); // Get the authenticate function from context
	const navigate = useNavigate(); // For navigation after authentication

	const [formData, setFormData] = useState({
		username: "",
		email: "",
		isGuest: true,
	});

	const [error, setError] = useState<string | null>(null); // State to hold error messages
	const [isLoading, setIsLoading] = useState(false); // To track loading state

	// If the user is authenticated, redirect to
	useEffect(() => {
		if (isAuthenticated) {
			navigate("/game");
		}
	}, [isAuthenticated, navigate]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true); // Set loading to true when form is submitting
		setError(null); // Clear previous errors
		// Authenticate the user
		try {
			const response = await fetch("http://localhost:3030/users/create-user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: formData.username,
					email: formData.email,
					isGuest: formData.isGuest,
				}),
				credentials: "include",
			});

			const data = await response.json();

			if (response.ok && data.success) {
				// Authenticate user in the context
				authenticate(formData.username, data.user.email);

				// Redirect to the game page (or any authenticated route)
				navigate("/dashboard");
			} else {
				setError(data.message || "Failed to authenticate. Please try again.");
			}
		} catch (err) {
			setError(
				`An error occurred while communicating with the server. \n ${err}`
			);
		} finally {
			setIsLoading(false); // Set loading to false after the API call is finished
		}
	};

	return (
		<div className="user-form-container">
			<h2 className="form-title">User Information</h2>
			<form onSubmit={handleSubmit} className="user-form">
				<div className="form-group">
					<label htmlFor="username" className="form-label">
						Username (required)
					</label>
					<input
						type="text"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						required
						className="form-input"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="form-input"
					/>
				</div>

				<div className="form-actions">
					<button type="submit" className="submit-btn">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default UserForm;
