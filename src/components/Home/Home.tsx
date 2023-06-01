import React, { useState } from "react";
import "./Home.css";
import NavBar from "../NavBar/NavBar";
import SideMenu from "../SideMenu/SideMenu";
import CreateTweet from "./CreateTweet";

const Home = () => {
	return (
		<div id="home_master">
			<NavBar />
			<div id="feed_master">
				<div className="feed_main">
					<div className="page_title">Home</div>
					<div>
						<CreateTweet />
						<div>Tweet Feed</div>
					</div>
				</div>
				<SideMenu />
			</div>
		</div>
	);
};

export default Home;
