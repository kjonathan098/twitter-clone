import "./ProfilePic.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { profileContext } from "../../context/ProfileContext";

interface IProps {
	profilePic: string;
	size: number;
	openUserProfile?: () => void;
}

const ProfilePic = ({ profilePic, size, openUserProfile }: IProps) => {
	const styles = { width: `${size}px`, height: `${size}px` };

	return (
		<img
			id="profilePic"
			src={profilePic}
			style={styles}
			onClick={() => {
				if (!openUserProfile) return;
				openUserProfile();
			}}
		/>
	);
};

export default ProfilePic;
