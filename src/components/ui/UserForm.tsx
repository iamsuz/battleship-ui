import React, { useState } from "react";

interface FormValues {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
}

const UserForm: React.FC = () => {
	const [formData, setFormData] = useState<FormValues>({
		firstName: "",
		lastName: "",
		username: "",
		email: "",
	});

	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const validateForm = (): boolean => {
		const validationErrors: { [key: string]: string } = {};
		if (!formData.username) validationErrors.username = "Username is required.";
		if (!formData.email) validationErrors.email = "Email is required.";
		if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
			validationErrors.email = "Please enter a valid email address.";
		}
		setErrors(validationErrors);
		return Object.keys(validationErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			// Handle the form submission here (e.g., send data to the server)
			console.log("Form submitted:", formData);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="firstName">First Name:</label>
				<input
					type="text"
					id="firstName"
					name="firstName"
					value={formData.firstName}
					onChange={handleChange}
				/>
			</div>

			<div>
				<label htmlFor="lastName">Last Name:</label>
				<input
					type="text"
					id="lastName"
					name="lastName"
					value={formData.lastName}
					onChange={handleChange}
				/>
			</div>

			<div>
				<label htmlFor="username">Username:</label>
				<input
					type="text"
					id="username"
					name="username"
					value={formData.username}
					onChange={handleChange}
				/>
				{errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
			</div>

			<div>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
				/>
				{errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
			</div>

			<button type="submit">Submit</button>
		</form>
	);
};

export default UserForm;
