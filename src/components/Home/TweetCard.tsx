import React, { useEffect, useMemo, useState } from "react";
import { ITweet, IUserDetails } from "../../global/interfaces";
import "./TweetCard.css";
import { APIHandler } from "../../fireBaseConfig";
import ProfilePic from "../Utils/ProfilePic";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { BiBarChart } from "react-icons/bi";
import { RxShare2 } from "react-icons/rx";

interface Iprops {
	tweet: ITweet;
	loading: boolean;
	currentUser: IUserDetails;
}
const TweetCard = ({ tweet, loading, currentUser }: Iprops) => {
	const [tweetUserInfo, setTweetUserInfo] = useState<IUserDetails | null>();
	const [likedByUser, setLikedByUser] = useState<boolean>(false);
	const [tweetLikes, setTweetLikes] = useState<string[]>([]);

	useEffect(() => {
		const getTweetUserName = async () => {
			const tweetAuthorInfo = await APIHandler.getUserByUID(tweet.uid);
			setTweetUserInfo(tweetAuthorInfo);
		};
		getTweetUserName();
		if (!tweet.likes) return;
		setTweetLikes([...tweet.likes]);

		const likedByUser = tweet.likes.find((userId) => userId === currentUser.uid);
		if (likedByUser) return setLikedByUser(true);
		return;
	}, [currentUser]);

	async function handleLike(): Promise<void> {
		console.log({ tweetLikes }, "tweetLikes");

		// check if tweet is already like then unlike it
		if (likedByUser) {
			await APIHandler.unLikeTweet(tweet.docId, currentUser.uid);
			setLikedByUser(false);
			const newlikes = tweetLikes.filter((uid) => {
				return uid !== currentUser.uid;
			});
			setTweetLikes([...newlikes]);
			return;
		}

		setLikedByUser(true);
		const newLikes = [...tweetLikes, currentUser.uid];
		setTweetLikes(newLikes);
		APIHandler.likeTweet(tweet.docId, currentUser.uid);
	}

	function openUserProfile() {
		console.log("open user pforile");
	}

	if (loading) return <>Loading...</>;
	return (
		<React.Fragment key={tweet.tweet}>
			{tweetUserInfo && (
				<div className="tweet_card_container">
					<div className="tweet_card_top">
						<ProfilePic profilePic={tweetUserInfo.profilePic} size={70} openUserProfile={false} />
						<div className="tweet_right">
							<div className="tweet_right_info">
								<div className="user_name" onClick={openUserProfile}>
									{tweetUserInfo.name}
								</div>
								<div className="tweet_date">{tweet.dateCreated}</div>
							</div>
							<div className="tweet_right_content">{tweet.tweet}</div>
							{tweet.media && (
								<div className="tweet_img_container">
									<img src={tweet.media} alt="" />
								</div>
							)}
						</div>
					</div>

					<div className="tweet_card_bottom">
						<div className="action comment">
							<FaRegComment /> <div>456</div>
						</div>
						<div className="action reTweet">
							<FaRetweet /> <div>125</div>
						</div>
						<div className={`action like filled ${likedByUser && "liked"}`} onClick={handleLike}>
							<AiOutlineHeart /> <div>{tweetLikes.length ? tweetLikes.length : "0"}</div>
						</div>
						<div className="action">
							<BiBarChart /> <div>456</div>
						</div>
						<div className="action">
							<RxShare2 /> <div>456</div>
						</div>
					</div>
				</div>
			)}
		</React.Fragment>
	);
};

export default TweetCard;
