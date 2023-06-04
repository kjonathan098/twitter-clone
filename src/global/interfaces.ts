export interface ITweet {
	comments: string[] | null;
	dateCreated: string;
	likes: string[] | null;
	media: string | null;
	tweet: string;
	uid: string;
	docId?: string | null;
}

export interface IUserDetails {
	readonly uid: string;
	readonly joinedDate?: string;
	readonly userDocumentId?: string;
	name: string | null;
	email: string | null;
	profilePic: string;
	wallpaperPic: string | null;
}
