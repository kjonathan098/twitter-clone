import "./ProfilePic.css";
import React from "react";

interface IProps {
	profilePic: string;
	size: number;
	openUserProfile: boolean;
}

const ProfilePic = ({ profilePic, size, openUserProfile }: IProps) => {
	const styles = { width: `${size}px`, height: `${size}px` };
	return (
		<img
			id="profilePic"
			src={profilePic}
			style={styles}
			// onClick={() => {
			// 	openUserProfile();
			// }}
		/>
	);
};

export default ProfilePic;
