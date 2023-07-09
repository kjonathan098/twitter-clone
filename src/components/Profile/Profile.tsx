import { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { MdCalendarMonth } from "react-icons/md";
import { authContext } from "../../context/AuthContext";
import TweetCard from "../Home/TweetCard";
import defaultWallpaper from "../../media/default_wallpaper.jpg";
import EditProfile from "./EditProfile";
import { profileContext } from "../../context/ProfileContext";
import { ITweet } from "../../global/interfaces";
import defaultPic from "../../media/fake_logo.png";
import MobileNavBar from "../NavBar/MobileNavBar";

const Profile = () => {
	const [screenView, setScreenView] = useState(1);
	const [editProfile, setEditProfile] = useState(false);
	const [likedTweets, setLikeTweets] = useState<ITweet[]>([]);
	const [fecthingTweets, setFecthingTweets] = useState(false);
	const { currentUser, currentUserLikes } = useContext(authContext);
	const { userProfileInfo, fetchNewUser, userTweets, loading, getUserLikes } = useContext(profileContext);

	useEffect(() => {
		if (!userProfileInfo) return fetchNewUser(currentUser);
	}, [userProfileInfo, currentUser]);

	const fetchUserLikes = async () => {
		setFecthingTweets(true);
		const userLikes: ITweet[] | undefined = await getUserLikes();
		if (!userLikes) return setFecthingTweets(false);
		setLikeTweets(userLikes);
		setFecthingTweets(false);
		return;
	};

	if (loading || !currentUser || !userProfileInfo) return <>Loading</>;
	return (
		<div id="profile_master">
			<span className={editProfile ? "prompt_blur_section" : undefined}>
				<div className="main_profile_container">
					<div>
						<section id="profile_header">
							<div>
								<div className="profile_user_name">{userProfileInfo.name}</div>
								<div className="user_tweets_length">{`${userTweets?.length} tweets`}</div>
							</div>
							<MobileNavBar />
						</section>

						<section id="profile_pics">
							<div className="wallPaper_Container">
								<img src={userProfileInfo.wallpaperPic || defaultWallpaper} alt="" />
							</div>
							<div className={`edit_container ${currentUser.uid !== userProfileInfo.uid ? "add_margin" : ""}`}>
								<img src={userProfileInfo.profilePic || defaultPic} alt="" className="profile_pic_container" />
								{currentUser.uid === userProfileInfo.uid && (
									<button
										onClick={() => {
											setEditProfile(true);
										}}
									>
										Edit profile
									</button>
								)}
							</div>
						</section>
						<section id="profile_name">
							<div>{userProfileInfo.name}</div>
							<div>{`@${userProfileInfo.name}`}</div>
							<div>
								<MdCalendarMonth />
								<div>{userProfileInfo.joinedDate}</div>
							</div>
							<div>
								<div>1 following</div>
								<div>0 followers</div>
							</div>
						</section>

						<section id="profile_filters">
							<div
								className={screenView === 1 ? "active" : undefined}
								onClick={() => {
									setScreenView(1);
								}}
							>
								Tweets
							</div>
							<div
								className={screenView === 2 ? "active" : undefined}
								onClick={() => {
									setScreenView(2);
									fetchUserLikes();
								}}
							>
								Likes
							</div>
							<div
								className={screenView === 3 ? "active" : undefined}
								onClick={() => {
									setScreenView(3);
								}}
							>
								Following
							</div>
						</section>

						<section id="profile_suggestions">
							{screenView === 1 && (
								<>
									{userTweets.length ? (
										userTweets?.map((tweet) => {
											return <TweetCard tweet={tweet} loading={false} currentUser={currentUser} key={tweet.docId} />;
										})
									) : (
										<>No tweets</>
									)}
								</>
							)}

							{screenView === 2 && (
								<>
									{fecthingTweets ? (
										<>loading</>
									) : (
										<>
											{currentUserLikes.length ? (
												<>
													{currentUserLikes.map((tweet: ITweet) => {
														return <TweetCard tweet={tweet} loading={false} currentUser={currentUser} />;
													})}
												</>
											) : (
												<>no liked tweets</>
											)}
										</>
									)}
								</>
							)}
						</section>
					</div>
				</div>
			</span>
			<EditProfile editProfile={editProfile} setEditProfile={setEditProfile} />
		</div>
	);
};

export default Profile;
