import "./App.css";
import NavBar from "./components/NavBar/NavBar";

function App() {
	return (
		<div id="master_container">
			<div className="navegation_master">
				<NavBar />
			</div>
			<div className="main_master">Main</div>
		</div>
	);
}

export default App;
