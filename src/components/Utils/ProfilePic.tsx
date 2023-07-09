import "./ProfilePic.css";

interface IProps {
	profilePic: string;
	size: number;
	openUserProfile?: () => void;
}

const ProfilePic = ({ profilePic, size, openUserProfile }: IProps) => {
	const styles = { width: `${size}px`, height: `${size}px` };

	return (
		<img
			alt="Profile Pic"
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
