import React, { useContext, useRef, useState } from "react";
import { authContext } from "../../context/AuthContext";
import { MdAddAPhoto } from "react-icons/md";
import defaultWallpaper from "../../media/default_wallpaper.jpg";
import "./EditProfile.css";
interface IProps {
	editProfile: boolean;
	setEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditProfile = ({ editProfile, setEditProfile }: IProps) => {
	const { currentUser } = useContext(authContext);
	const [editName, setEditName] = useState(currentUser!.name);
	const [wallPaperFile, setWallPaperFile] = useState<File | null>();
	const [wallPaperPreview, setwallPaperPreview] = useState<string>("");
	const [profilePicFile, setprofilePicFile] = useState();
	const [profilePicPreview, setprofilePicPreview] = useState();

	const wallPaperFileRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
	const profilePicFileRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

	function handeWallpaperChange(e: React.ChangeEvent<HTMLInputElement>) {
		setWallPaperFile(e.target.files![0]);
		const imageFileList = Array.from(e.target.files || []);
		const [imageFile] = imageFileList;
		const localURL = URL.createObjectURL(imageFile);
		setwallPaperPreview(localURL);
	}
	function handleProfilePicChange() {}
	function handleEditUpdate() {}

	if (!currentUser) return <>loading..</>;

	return (
		<div id="edit_profile_master" className={editProfile ? "view" : undefined}>
			<section>
				<div
					className="wallPaper_Container edit"
					onClick={() => {
						wallPaperFileRef!.current!.click();
					}}
				>
					<img src={wallPaperPreview || currentUser.wallpaperPic || defaultWallpaper} alt="" />
					<MdAddAPhoto className="edit_photo_icon" />
					<input type="file" ref={wallPaperFileRef} style={{ display: "none" }} onChange={handeWallpaperChange} />
				</div>
				<div
					className="edit_photo_container"
					onClick={() => {
						profilePicFileRef!.current!.click();
					}}
				>
					<img src={profilePicPreview || currentUser.profilePic} alt="" className="edit_profile_pic" />
					<MdAddAPhoto className="edit_photo_icon" />
					<input type="file" ref={profilePicFileRef} style={{ display: "none" }} onChange={handleProfilePicChange} />
				</div>
			</section>
			<section className="edit_name">
				Edit Name
				<input
					type="text"
					placeholder="Name"
					value={editName!}
					onChange={(e) => {
						setEditName(e.target.value);
					}}
				/>
			</section>
			<div className="edit_buttons">
				<button onClick={handleEditUpdate}>Save</button>
				<button
					onClick={() => {
						setEditProfile(false);
					}}
				>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default EditProfile;
