export interface ITweet {
	comments: string[];
	dateCreated: string;
	likes: string[];
	media: string | null;
	tweet: string;
	uid: string;
	docId?: string;
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
export interface IEditProfile {
	name: string | null;
	profilePic: string | null;
	wallpaperPic: string | null;
}
