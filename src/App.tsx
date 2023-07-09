import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { APIHandler, auth } from "./fireBaseConfig";
import Home from "./components/Home/Home";
import { authContext } from "./context/AuthContext";
import Profile from "./components/Profile/Profile";
import ProfileProvider from "./context/ProfileContext";
import Auth from "./components/Auth/Auth";
import NavBar from "./components/NavBar/NavBar";
import SideMenu from "./components/SideMenu/SideMenu";
import Trending from "./components/Trending/Trending";
import DisplayNavProvider from "./context/DisplayNavContext";
import { ITweet, IUserDetails } from "./global/interfaces";

function App() {
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState<IUserDetails | null>(null);
	const [currentUserLikes, setcurrentUserLikes] = useState<ITweet[]>([]);
	const test = "test";

	const fetchUserTweetLikes = async (uid: string) => {
		const tweets: ITweet[] = await APIHandler.getUserLikes(uid);
		setcurrentUserLikes(tweets);
	};
	const fetchCurrentUser = async (user: any) => {
		const userExist: IUserDetails | null = await APIHandler.getUserByUID(user.uid);
		setCurrentUser(userExist);
		fetchUserTweetLikes(user.uid);
		setIsLoggedIn(true);
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setLoading(true);
			if (user) {
				fetchCurrentUser(user);
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
		<authContext.Provider value={{ test, loading, isLoggedIn, currentUser, currentUserLikes, setCurrentUser }}>
			<ProfileProvider>
				<DisplayNavProvider>
					<BrowserRouter>
						<div id="master_container">
							<div id="max_width_container">
								<div className="main_master">
									{/* TODO : MAKE SURE HAMBURGER MENU STAY AT TOP AND SCROLL DOWN */}
									<NavBar />
									<Routes>
										<Route path="/" element={<Home />} />
										<Route path="/profile" element={<Profile />} />
										<Route path="/trending" element={<Trending />} />
									</Routes>
									<SideMenu />
								</div>
							</div>
						</div>
					</BrowserRouter>
				</DisplayNavProvider>
			</ProfileProvider>
		</authContext.Provider>
	);
}

export default App;
