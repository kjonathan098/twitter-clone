import React, { createContext, useContext, useEffect, useState } from "react";
import { APIHandler, auth } from "../fireBaseConfig";
import { ITweet, IUserDetails } from "../global/interfaces";
import { authContext } from "./AuthContext";

interface ProfileContextValie {
	test: string;
	userProfileInfo: IUserDetails | null;
	fetchNewUser: (user: IUserDetails | null) => void;
	userTweets: ITweet[];
	loading: boolean;
}

export const profileContext = createContext<ProfileContextValie>({} as ProfileContextValie);

interface IProps {
	children: React.ReactNode;
}

const ProfileProvider: React.FC<IProps> = ({ children }) => {
	const [userTweets, setUserTweets] = useState<ITweet[]>([]);
	const [userProfileInfo, setuserProfileInfo] = useState<IUserDetails | null>(null);
	const [loading, setLoading] = useState(false);
	const { currentUser } = useContext(authContext);

	useEffect(() => {
		if (!userProfileInfo) return;
		setLoading(true);

		const getTweets = async (userProfileInfo: IUserDetails) => {
			const tweets = await fetchTweets(userProfileInfo.uid);
			setUserTweets(tweets);
			setLoading(false);
		};
		getTweets(userProfileInfo);
	}, [userProfileInfo]);

	const fetchTweets = async (id: string) => {
		const userTweets = await APIHandler.getUserTweet(id);
		return userTweets;
	};

	const fetchNewUser = (userObj: IUserDetails | null) => {
		setuserProfileInfo(userObj);
	};
	const test = "test";
	return <profileContext.Provider value={{ test, userProfileInfo, fetchNewUser, userTweets, loading }}>{children}</profileContext.Provider>;
};

export default ProfileProvider;
