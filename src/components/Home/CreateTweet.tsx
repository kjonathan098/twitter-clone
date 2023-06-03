import { useState } from "react";
import "./CreateTweet.css";

const CreateTweet = () => {
	const [tweet, setTweet] = useState<string>("");

	function handleTweetInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setTweet(e.target.value);
	}

	function uploadNewTweet(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}

	function handleTweetCounter() {
		const className = tweet.length > 145 ? "tweet_charachters-main disable" : "tweet_charachters-main ";
		return (
			<div className={className}>
				<span>{145 - tweet.length}</span>
			</div>
		);
	}

	return (
		<div className="create_tweet-main">
			<div>Profile Pic</div>
			<div className="tweet_form-container">
				<form onSubmit={uploadNewTweet}>
					<textarea name="" id="tweet_form" placeholder="What's Happening?!" onChange={handleTweetInput}></textarea>
					<div className="tweet_form-options-container">
						<div>Media upload options</div>
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
