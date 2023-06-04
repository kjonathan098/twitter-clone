import React from "react";
import "./SideMenu.css";
import { APIHandler } from "../../fireBaseConfig";

const SideMenu = () => {
	return (
		<div className="side_menu-master ">
			<button
				onClick={() => {
					APIHandler.logout();
				}}
			>
				Logout
			</button>
		</div>
	);
};

export default SideMenu;
