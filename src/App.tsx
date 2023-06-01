import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Feed from "./components/Feed/Feed";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	return (
		<BrowserRouter>
			<div id="master_container">
				<div className="main_master">
					<Routes>
						<Route path="/" element={<Feed isLoggedIn={isLoggedIn} />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
