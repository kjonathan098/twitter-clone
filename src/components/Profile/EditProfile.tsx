import React, { useContext, useRef, useState } from "react";
import { authContext } from "../../context/AuthContext";
import { MdAddAPhoto } from "react-icons/md";
import defaultWallpaper from "../../media/default_wallpaper.jpg";
import "./EditProfile.css";
import { APIHandler } from "../../fireBaseConfig";
import { IEditProfile } from "../../global/interfaces";
interface IProps {
	editProfile: boolean;
	setEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditProfile = ({ editProfile, setEditProfile }: IProps) => {
	const { currentUser, setCurrentUser } = useContext(authContext);
	const [editName, setEditName] = useState<string>(currentUser!.name!);
	const [wallPaperFile, setWallPaperFile] = useState<File | null>();
	const [wallPaperPreview, setwallPaperPreview] = useState<string>("");
	const [profilePicFile, setprofilePicFile] = useState<File | null>();
	const [profilePicPreview, setprofilePicPreview] = useState<string>("");

	const wallPaperFileRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
	const profilePicFileRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

	function handeWallpaperChange(e: React.ChangeEvent<HTMLInputElement>) {
		setWallPaperFile(e.target.files![0]);
		const imageFileList = Array.from(e.target.files || []);
		const [imageFile] = imageFileList;
		const localURL = URL.createObjectURL(imageFile);
		setwallPaperPreview(localURL);
	}
	function handleProfilePicChange(e: React.ChangeEvent<HTMLInputElement>) {
		setprofilePicFile(e.target.files![0]);
		const imageFileList = Array.from(e.target.files || []);
		const [imageFile] = imageFileList;
		const localURL = URL.createObjectURL(imageFile);
		setprofilePicPreview(localURL);
	}
	async function handleEditUpdate() {
		if (!currentUser) return;
		if (editName === currentUser.name && !wallPaperFile && !profilePicFile) return alert("no changes detected");

		const newUserObject: IEditProfile = {
			name: currentUser.name!,
			profilePic: currentUser.profilePic,
			wallpaperPic: currentUser.wallpaperPic!,
		};
		// If profile pic was changed
		if (profilePicFile) {
			const res = await APIHandler.uploadProfilePic(currentUser.uid, profilePicFile);
			setCurrentUser({ ...currentUser, profilePic: res });
			newUserObject.profilePic = res;
		}

		if (wallPaperFile) {
			const res = await APIHandler.uploadWallpaperPic(currentUser.uid, wallPaperFile);
			setCurrentUser({ ...currentUser, wallpaperPic: res });
			newUserObject.wallpaperPic = res;
		}

		if (editName !== currentUser.name) {
			console.log("changing user name");

			newUserObject.name = editName;
			setCurrentUser({
				...currentUser,
				name: newUserObject.name,
			});
		}
		// update user object
		await APIHandler.updateUser(currentUser.userDocumentId!, newUserObject);
	}

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
