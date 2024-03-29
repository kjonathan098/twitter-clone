import { useContext, useState, useRef } from "react";
import "./CreateTweet.css";
import { authContext } from "../../context/AuthContext";
import ProfilePic from "../Utils/ProfilePic";
import { AiOutlinePicture, AiFillCloseCircle } from "react-icons/ai";
import useNewTweet from "../../customHooks/useNewTweet";
import { APIHandler } from "../../fireBaseConfig";
import { ITweet } from "../../global/interfaces";
import profileDefault from "../../media/fake_logo.png";

const CreateTweet = () => {
	const [tweet, setTweet] = useState<string>("");
	const [uploadMedia, setUploadMedia] = useState<File | null>(null);
	const [mediaPreview, setMediaPreview] = useState<string | null>(null);

	const [createNewTweet] = useNewTweet();

	const { currentUser } = useContext(authContext);
	const tweetMediaRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

	function handleTweetInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setTweet(e.target.value);
	}

	async function uploadNewTweet(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const newTweet: ITweet = await createNewTweet(tweet, currentUser, uploadMedia);
		await APIHandler.createNewTweet(newTweet);
		setTweet("");
		setUploadMedia(null);
		setMediaPreview(null);
	}

	function handleTweetCounter() {
		const className = tweet.length > 145 ? "tweet_charachters-main disable" : "tweet_charachters-main ";
		return (
			<div className={className}>
				<span>{145 - tweet.length}</span>
			</div>
		);
	}

	const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setUploadMedia(e.target.files![0]);
		const [imageFile]: any = e.target.files;
		const localURL = URL.createObjectURL(imageFile);
		setMediaPreview(localURL);
	};

	return (
		<div className="create_tweet-main">
			<div>{currentUser && <ProfilePic profilePic={currentUser.profilePic || profileDefault} size={80} />}</div>
			<div className="tweet_form-container">
				<form onSubmit={uploadNewTweet}>
					<textarea name="" id="tweet_form" placeholder="What's Happening?!" onChange={handleTweetInput} value={tweet}></textarea>
					{mediaPreview && (
						<div className="img_container">
							<AiFillCloseCircle
								className="delete_media"
								onClick={() => {
									setMediaPreview(null);
								}}
							/>
							<img src={mediaPreview} alt="" />
						</div>
					)}

					<div className="tweet_form-options-container">
						<div>
							<div
								className="upload_media_container"
								onClick={() => {
									tweetMediaRef?.current?.click();
								}}
							>
								<AiOutlinePicture className="upload_media_icon" />
								<input type="file" style={{ display: "none" }} ref={tweetMediaRef} onChange={handleMediaUpload} />
							</div>
						</div>
						<div className="tweet_button">
							{handleTweetCounter()}
							<div>
								<button
									onClick={() => {
										console.log("hello");
									}}
									disabled={tweet.length > 145}
								>
									Tweet
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateTweet;
