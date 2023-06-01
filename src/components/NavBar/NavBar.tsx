import React from "react";
import "./NavBar.css";
import { AiFillHome } from "react-icons/ai";

const NavBar = () => {
	return (
		<div className="navegation_master">
			<nav>
				<div className="link_container">
					<AiFillHome size={25} />
					<div>Link Name</div>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
