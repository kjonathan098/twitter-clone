import React, { createContext, useEffect, useState } from "react";
import { APIHandler, auth } from "../fireBaseConfig";

interface AuthContextValue {
	test: string;
}
export const authContext = createContext<AuthContextValue>({} as AuthContextValue);

interface IProps {
	children: React.ReactNode;
}

const AuthProvider: React.FC<IProps> = ({ children }) => {
	const test = "test";

	return <authContext.Provider value={{ test }}>{children}</authContext.Provider>;
};

export default AuthProvider;
