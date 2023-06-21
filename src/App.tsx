import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { auth } from "./fireBaseConfig";

import Home from "./components/Home/Home";
import AuthProvider, { authContext } from "./context/AuthContext";
import Profile from "./components/Profile/Profile";
import ProfileProvider from "./context/ProfileContext";
import Auth from "./components/Auth/Auth";
import NavBar from "./components/NavBar/NavBar";
import SideMenu from "./components/SideMenu/SideMenu";
import Trending from "./components/Trending/Trending";

function App() {
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setLoading(true);
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
			setLoading(false);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	if (loading) return <>loading...</>;
	if (!isLoggedIn) return <Auth />;
	return (
		<AuthProvider>
			<ProfileProvider>
				<BrowserRouter>
					<div id="master_container">
						<div className="main_master">
							<NavBar />
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/profile" element={<Profile />} />
								<Route path="/trending" element={<Trending />} />
							</Routes>
							<SideMenu />
						</div>
					</div>
				</BrowserRouter>
			</ProfileProvider>
		</AuthProvider>
	);
}

export default App;
