import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";

// Define types for our authentication context
interface AuthContextType {
	isAuthenticated: boolean;
	authenticate: (username: string, email: string) => void;
	logout: () => void;
	user: { username: string; email: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<{ username: string; email: string } | null>(
		null
	);

	// Check for user in localStorage on app load
	useEffect(() => {
		const storedUsername = localStorage.getItem("username");
		const storedEmail = localStorage.getItem("email");

		if (storedUsername && storedEmail) {
			setIsAuthenticated(true);
			setUser({ username: storedUsername, email: storedEmail });
		}
	}, []); // Empty dependency array means this runs once after the initial render

	const authenticate = (username: string, email: string) => {
		// Simple example: if username and email are filled, authenticate the user

		setIsAuthenticated(true);
		setUser({ username, email });
		// Store in localStorage
		localStorage.setItem("username", username);
		localStorage.setItem("email", email);
	};

	const logout = () => {
		setIsAuthenticated(false);
		setUser(null);
		// Remove from localStorage
		localStorage.removeItem("username");
		localStorage.removeItem("email");
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, authenticate, logout, user }}
		>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
