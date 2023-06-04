import React, { createContext, useEffect, useState } from "react";
import { APIHandler, auth } from "../fireBaseConfig";
import { IUserDetails } from "../global/interfaces";

interface AuthContextValue {
	test: string;
	loading: boolean;
	isLoggedIn: boolean;
}
export const authContext = createContext<AuthContextValue>({} as AuthContextValue);

interface IProps {
	children: React.ReactNode;
}

const AuthProvider: React.FC<IProps> = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState<IUserDetails | null>(null);
	const test = "test";

	// manage current user signedIn

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
		setLoading(false);
		return;
	}

	//listen to auth changes
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setLoading(true);
			if (user) {
				const userDetails: IUserDetails = { name: user.displayName, email: user.email, profilePic: user.photoURL, wallpaperPic: null, uid: user.uid, joinedDate: user.metadata.creationTime };
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

	return <authContext.Provider value={{ test, loading, isLoggedIn }}>{children}</authContext.Provider>;
};

export default AuthProvider;
