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
	name: string | null;
	email: string | null;
	profilePic: string | null;
	wallpaperPic: string | null;
	uid: string | null;
}
