import React, { createContext, useEffect, useState } from "react";
import { APIHandler, auth } from "../fireBaseConfig";
import { ITweet, IUserDetails } from "../global/interfaces";

interface AuthContextValue {
	test: string;
	loading: boolean;
	isLoggedIn: boolean;
	currentUser: IUserDetails | null;
	currentUserLikes: ITweet[];
	setCurrentUser: React.Dispatch<React.SetStateAction<IUserDetails | null>>;
}
export const authContext = createContext<AuthContextValue>({} as AuthContextValue);

interface IProps {
	children: React.ReactNode;
}

const AuthProvider: React.FC<IProps> = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState<IUserDetails | null>(null);
	const [currentUserLikes, setcurrentUserLikes] = useState<ITweet[]>([]);
	const test = "test";

	// manage current user signedIn

	async function fetchUserTweetLikes(uid: string): Promise<void> {
		const userLikes: ITweet[] | undefined = await APIHandler.getUserLikes(uid);
		if (!userLikes) return;
		setcurrentUserLikes(userLikes);
		setLoading(false);
	}

	return <authContext.Provider value={{ test, loading, isLoggedIn, currentUser, currentUserLikes, setCurrentUser }}>{children}</authContext.Provider>;
};

export default AuthProvider;
