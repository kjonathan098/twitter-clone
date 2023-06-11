import React, { createContext, useContext, useEffect, useState } from "react";
import "./Profile.css";
import { MdCalendarMonth } from "react-icons/md";
import { authContext } from "../../context/AuthContext";
import TweetCard from "../Home/TweetCard";
import defaultWallpaper from "../../media/default_wallpaper.jpg";
import EditProfile from "./EditProfile";
import { APIHandler } from "../../fireBaseConfig";
import { profileContext } from "../../context/ProfileContext";
import { ITweet } from "../../global/interfaces";
import NavBar from "../NavBar/NavBar";
import SideMenu from "../SideMenu/SideMenu";

const Profile = () => {
	const [screenView, setScreenView] = useState(1);
	const [editProfile, setEditProfile] = useState(false);
	const [likedTweets, setLikeTweets] = useState();
	const [loadingProfile, setLoadingProfile] = useState(false);
	const { currentUser } = useContext(authContext);
	const { userProfileInfo, fetchNewUser, userTweets, loading } = useContext(profileContext);

	useEffect(() => {
		if (!userProfileInfo) return fetchNewUser(currentUser);
		console.log(userTweets, "userTweets");
	}, [userProfileInfo, currentUser]);

	// const getUserLikes = async () => {
	// 	setLoadingProfile(true);
	// 	const likedTweets = await APIHandler.getUserLikes(userProfileInfo.uid);
	// 	if (!likedTweets) return setLoadingProfile(false);
	// 	setLikeTweets(likedTweets);
	// 	setLoadingProfile(false);
	// 	return;
	// };

	if (loading || !currentUser || !userProfileInfo) return <>Loading</>;
	return (
		<div id="profile_master">
			<span className={editProfile ? "prompt_blur_section" : undefined}>
				<NavBar />
				<div className="main_profile_container">
					<div>
						<section id="profile_header">
							<div className="profile_user_name">{userProfileInfo.name}</div>
							<div className="user_tweets_length">{`${userTweets?.length} tweets`}</div>
						</section>
						<section id="profile_pics">
							<div className="wallPaper_Container">
								<img src={userProfileInfo.wallpaperPic || defaultWallpaper} alt="" />
							</div>
							{currentUser.uid === userProfileInfo.uid && (
								<div className="edit_container">
									<img src={userProfileInfo.profilePic} alt="" className="profile_pic_container" />
									<button
										onClick={() => {
											setEditProfile(true);
										}}
									>
										Edit profile
									</button>
								</div>
							)}
						</section>

						<section id="profile_name">
							<div>{userProfileInfo.name}</div>
							<div>{`@${userProfileInfo.name}`}</div>
							<div>
								<MdCalendarMonth />
								<div>{new Date(Number(userProfileInfo.joinedDate)).toLocaleDateString()}</div>
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
									// getUserLikes();
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
							{screenView === 1 &&
								userTweets?.map((tweet) => {
									return <TweetCard tweet={tweet} loading={false} currentUser={currentUser} />;
								})}
							{/* {screenView === 2 &&
						likedTweets?.map((tweet: ITweet) => {
							return <TweetCard tweet={tweet} loading={false} currentUser={currentUser} />;
						})} */}
						</section>
					</div>
					<SideMenu />
				</div>
				{/* <EditProfile editProfile={editProfile} setEditProfile={setEditProfile} /> */}
			</span>
		</div>
	);
};

export default Profile;
