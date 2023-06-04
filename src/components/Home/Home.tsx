import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import NavBar from "../NavBar/NavBar";
import SideMenu from "../SideMenu/SideMenu";
import CreateTweet from "./CreateTweet";
import { APIHandler } from "../../fireBaseConfig";
import { ITweet } from "../../global/interfaces";
import Auth from "../Auth/Auth";
import { authContext } from "../../context/AuthContext";

interface IProps {}

const Home = () => {
	const [tweets, setTweets] = useState<ITweet[]>([]);
	const { isLoggedIn } = useContext(authContext);

	async function getTweets(): Promise<void> {
		const tweets: ITweet[] = await APIHandler.getAllTweets();
		setTweets(tweets);
	}
	useEffect(() => {
		getTweets();
	}, []);

	if (!isLoggedIn) return <Auth />;
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
