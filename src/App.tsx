import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home/Home";
import AuthProvider from "./context/AuthContext";
function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<div id="master_container">
					<div className="main_master">
						<Routes>
							<Route path="/" element={<Home />} />
						</Routes>
					</div>
				</div>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
