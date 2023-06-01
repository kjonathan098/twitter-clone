import React from "react";
import "./Home.css";
import NavBar from "../NavBar/NavBar";
import SideMenu from "../SideMenu/SideMenu";

const Home = () => {
	return (
		<div id="home_master">
			<NavBar />
			<div id="feed_master">
				<div className="feed_main">
					<div className="page_title">Home</div>
					<div>
						<div className="create_tweet-main">
							<div>Profile Pic</div>
							<div className="tweet_form-container">
								<form>
									<textarea name="" id="tweet_form"></textarea>
								</form>
							</div>
						</div>
						<div>Tweet Feed</div>
					</div>
				</div>
				<SideMenu />
			</div>
		</div>
	);
};

export default Home;
