import React, { useContext, useEffect, useState } from "react";
import "./Trending.css";
import TweetCard from "../Home/TweetCard";
import { useLocation } from "react-router-dom";
import { APIHandler } from "../../fireBaseConfig";
import { ITweet } from "../../global/interfaces";
import { authContext } from "../../context/AuthContext";
const Trending = () => {
	const location = useLocation();
	const [trendTweets, setTrendTweets] = useState<ITweet[]>([]);
	const [loading, setLoading] = useState(false);
	const { currentUser } = useContext(authContext);

	useEffect(() => {
		setLoading(true);
		getTrendTweets(location.state.trend);
		console.log(location.state.trend);

		// addTrend(location.state.trend);
	}, [location.state.trend]);

	async function getTrendTweets(trendTopic: any) {
		const trendTweets = await APIHandler.getTrendCollection(trendTopic);
		setTrendTweets(trendTweets);
		console.log(trendTweets);
		setLoading(false);

		// console.log(trendTopic, "trendTopic");
	}
	if (loading)
		return (
			<div className="trending_feed_master">
				<div className="feed_top">Trending</div>
				<div>Loading...</div>
			</div>
		);
	return (
		<div className="trending_feed_master">
			<div className="feed_top">Trending</div>
			<div className="feed_body">
				<div className="tweet_feed_main">
					{trendTweets?.map((tweet: ITweet) => {
						return <TweetCard tweet={tweet} loading={false} currentUser={currentUser!} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default Trending;
