import React, { createContext, useState } from "react";

interface DisplayNavContextValue {
	test: string;
	displayNav: boolean;
	setDisplayNav: React.Dispatch<React.SetStateAction<boolean>>;
}
export const displayNavContext = createContext<DisplayNavContextValue>({} as DisplayNavContextValue);

interface IProps {
	children: React.ReactNode;
}
const DisplayNavProvider: React.FC<IProps> = ({ children }) => {
	const [displayNav, setDisplayNav] = useState(false);
	const test = "test";
	return <displayNavContext.Provider value={{ test, displayNav, setDisplayNav }}>{children}</displayNavContext.Provider>;
};

export default DisplayNavProvider;
