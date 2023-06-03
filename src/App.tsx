import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home/Home";
function App() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	return (
		<BrowserRouter>
			<div id="master_container">
				<div className="main_master">
					<Routes>
						<Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
