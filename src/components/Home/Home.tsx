import { useContext, useEffect, useState } from "react";
import "./Home.css";

import CreateTweet from "./CreateTweet";
import { APIHandler } from "../../fireBaseConfig";
import { ITweet } from "../../global/interfaces";
import { authContext } from "../../context/AuthContext";
import TweetCard from "./TweetCard";
import MobileNavBar from "../NavBar/MobileNavBar";

const Home = () => {
	const [tweets, setTweets] = useState<ITweet[]>([]);
	const [loading, setLoading] = useState(false);

	const { currentUser } = useContext(authContext);

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
