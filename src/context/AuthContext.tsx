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

	async function manageCurrentUser(userDetails: IUserDetails) {
		// check if user exist in DB
		const userExist: IUserDetails | null = await APIHandler.getUserByUID(userDetails.uid);
		if (!userExist) {
			APIHandler.addNewUserToDb(userDetails);
			setCurrentUser(userDetails);
			setLoading(false);
			return;
		}
		setCurrentUser(userExist);
		fetchUserTweetLikes(userExist.uid);
		return;
	}

	//listen to auth changes
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setLoading(true);
			if (user) {
				const profilePic: string = user.photoURL || "J";
				const userDetails: IUserDetails = { name: user.displayName, email: user.email, profilePic: profilePic, wallpaperPic: null, uid: user.uid, joinedDate: user.metadata.creationTime };
				setIsLoggedIn(true);
				manageCurrentUser(userDetails);
			} else {
				setCurrentUser(null);
				setIsLoggedIn(false);
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return <authContext.Provider value={{ test, loading, isLoggedIn, currentUser, currentUserLikes, setCurrentUser }}>{children}</authContext.Provider>;
};

export default AuthProvider;
