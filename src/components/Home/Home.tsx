import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import NavBar from "../NavBar/NavBar";
import SideMenu from "../SideMenu/SideMenu";
import CreateTweet from "./CreateTweet";
import { APIHandler } from "../../fireBaseConfig";
import { ITweet } from "../../global/interfaces";
import Auth from "../Auth/Auth";
import { authContext } from "../../context/AuthContext";
import TweetCard from "./TweetCard";
import MobileNavBar from "../NavBar/MobileNavBar";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { displayNavContext } from "../../context/DisplayNavContext";
interface IProps {}

const Home = () => {
	const [tweets, setTweets] = useState<ITweet[]>([]);
	const [loading, setLoading] = useState(false);

	const { isLoggedIn, currentUser } = useContext(authContext);

	useEffect(() => {
		setLoading(true);
		APIHandler.liveTweets(setTweets);
		setLoading(false);
	}, []);

	// if (!isLoggedIn || !currentUser) return <Auth />;

	return (
		<div id="home_master">
			<div id="feed_master">
				<div className="feed_main">
					<div className="page_title">
						<div>Home</div>
						<MobileNavBar />
					</div>
					<div>
						<CreateTweet />
						<div>
							{tweets?.map((tweet: ITweet) => {
								return <TweetCard key={tweet.docId} tweet={tweet} loading={loading} currentUser={currentUser!} />;
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
