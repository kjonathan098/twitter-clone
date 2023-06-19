import { APIHandler } from "../fireBaseConfig";

function useNewTweet() {
	async function createNewTweet(tweet, user, media) {
		const today = new Date();
		const day = today.getDate();
		const month = today.toLocaleString("default", { month: "long" });
		let imageURL = null;
		if (media) {
			// upload media and get url
			console.log(media.name);
			imageURL = await APIHandler.uploadMedia(user, media, "tweetCard");
			console.log(imageURL, "imageurl");
		}
		const newTweet = {
			tweet,
			uid: user.uid,
			likes: [],
			comments: [],
			media: imageURL,
			dateCreated: `${day}, ${month}`,
		};
		return newTweet;
	}

	return [createNewTweet];
}

export default useNewTweet;
