export interface ITweet {
	comments: string[] | null;
	dateCreated: string;
	likes: string[] | null;
	media: string | null;
	tweet: string;
	uid: string;
	docId?: string | null;
}
