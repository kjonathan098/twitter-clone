import { useState } from "react";
import "./CreateTweet.css";

const CreateTweet = () => {
	const [tweet, setTweet] = useState<string>("");

	function handleTweetInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setTweet(e.target.value);
	}

	return (
		<div className="create_tweet-main">
			<div>Profile Pic</div>
			<div className="tweet_form-container">
				<form
					onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
						e.preventDefault();
					}}
				>
					<textarea name="" id="tweet_form" placeholder="What's Happening?!" onChange={handleTweetInput}></textarea>
					<div className="tweet_form-options-container">
						<div>Media upload options</div>
						<div className="tweet_button">
							<div className="tweet_charachters-main">
								<span>{145 - tweet.length}</span>
							</div>
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
