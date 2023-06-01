import React, { useState } from "react";
import "./Home.css";
import NavBar from "../NavBar/NavBar";
import SideMenu from "../SideMenu/SideMenu";

const Home = () => {
	const [tweet, setTweet] = useState<string>("");
	console.log(tweet);

	function handleTweetInput(e: any) {
		setTweet(e.target.value);
	}

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
									<textarea name="" id="tweet_form" placeholder="What's Happening?!" onChange={handleTweetInput}></textarea>
									<div className="tweet_form-options-container">
										<div>Media upload options</div>
										<div className="tweet_button">
											<div className={"tweet_charachters-main"}>
												<span>{145 - tweet.length}</span>
											</div>
											<div>
												<button>Tweet</button>
											</div>
										</div>
									</div>
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
