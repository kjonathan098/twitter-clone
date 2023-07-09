import { APIHandler } from "../fireBaseConfig";

function useNewTweet() {
	async function createNewTweet(tweet, user, media) {
		const today = new Date();
		const day = today.getDate();
		const month = today.toLocaleString("default", { month: "long" });
		let imageURL = null;
		if (media) {
			// upload media and get url

			imageURL = await APIHandler.uploadMedia(user, media, "tweetCard");
		}
		const newTweet = {
			tweet,
			uid: user.uid,
			likes: [],
			comments: [],
			media: imageURL,
			exactDate: new Date(),
			dateCreated: `${day}, ${month}`,
		};
		return newTweet;
	}

	return [createNewTweet];
}

export default useNewTweet;
