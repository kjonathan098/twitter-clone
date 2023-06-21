import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, query, getDocs, orderBy, where, addDoc, onSnapshot, doc, arrayUnion, updateDoc, arrayRemove, CollectionReference, DocumentData } from "@firebase/firestore";
// import { getStorage } from "firebase/storage";
import { IEditProfile, ITweet, IUserDetails } from "./global/interfaces";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDYkXf-2DATnNEORirDibeTdSmaCJUjRGY",
	authDomain: "microblog-581cc.firebaseapp.com",
	projectId: "microblog-581cc",
	storageBucket: "microblog-581cc.appspot.com",
	messagingSenderId: "867567000225",
	appId: "1:867567000225:web:79a8d4fe6435761bbc6ee0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get auth
export const auth = getAuth(app);

// get DB
const db = getFirestore(app);
const storage = getStorage();

// DB's collection
const usersCollection = collection(db, "users");
const tweetsCollection = collection(db, "tweets");
const trendCollections = {
	hireMe: collection(db, "hireMe"),
	books: collection(db, "books"),
};

interface IAPIHandler {
	getAllTweets: () => Promise<ITweet[]>;
	googleAuth: () => Promise<any>;
	logout: () => Promise<any>;
	getUserByUID: (uid: string) => Promise<null | IUserDetails>;
	addNewUserToDb: (userProfileObj: IUserDetails) => Promise<any>;
	liveTweets: (setTweets: React.Dispatch<React.SetStateAction<ITweet[]>>) => Promise<any>;
	likeTweet: (docId: string, uid: string) => Promise<any>;
	unLikeTweet: (docId: string, uid: string) => Promise<any>;
	getUserTweet: (uid: string) => Promise<ITweet[]>;
	getUserLikes: (uid: string) => Promise<ITweet[] | undefined>;
	createNewTweet: (tweet: ITweet) => Promise<any>;
	uploadMedia: (userId: string, imageFile: File, mediaType: string) => Promise<string>;
	uploadProfilePic: (userId: string, imageFile: File) => Promise<string>;
	uploadWallpaperPic: (userId: string, imageFile: File) => Promise<string>;
	updateUser: (docId: string, updateObj: IEditProfile) => Promise<void>;
	getTrendCollection: (trendTopic: any) => Promise<any>;
}

export const APIHandler: IAPIHandler = {
	googleAuth: async (): Promise<any> => {
		const provider = new GoogleAuthProvider();
		const results = await signInWithPopup(auth, provider);
		const userDetails: IUserDetails = { name: results.user.displayName, email: results.user.email, profilePic: results.user.photoURL || "J", wallpaperPic: null, uid: results.user.uid };
		return userDetails;
	},

	logout: async () => {
		await signOut(auth);
	},

	// Get user by ID
	getUserByUID: async (uid: string) => {
		const q = query(usersCollection, where("uid", "==", uid));
		const data = await getDocs(q);
		let user = data.docs[0];

		if (!user) return null;
		const test: IUserDetails = { ...(user.data() as IUserDetails), userDocumentId: user.id };
		return test;
		// return userInfo
	},

	// add new user
	addNewUserToDb: async (userProfileObj: IUserDetails) => {
		await addDoc(usersCollection, userProfileObj);
	},

	updateUser: async (docId: string, updateObj: IEditProfile) => {
		const userDocRef = doc(db, "users", docId);

		// Convert updateObj to the expected format for updateDoc
		const updateFields: { [key: string]: any } = {};
		if (updateObj.name !== null) {
			updateFields["name"] = updateObj.name;
		}
		if (updateObj.profilePic !== null) {
			updateFields["profilePic"] = updateObj.profilePic;
		}
		if (updateObj.wallpaperPic !== null) {
			updateFields["wallpaperPic"] = updateObj.wallpaperPic;
		}

		await updateDoc(userDocRef, updateFields);
	},

	// get all tweets
	getAllTweets: async (): Promise<ITweet[]> => {
		const q = query(tweetsCollection, orderBy("dateCreated", "desc"));
		const tweets = await getDocs(q);
		let tweetsList: ITweet[] = [];
		tweets.forEach((tweet) => {
			let tweetData = tweet.data() as ITweet;
			tweetData.docId = tweet.id;
			tweetsList.push(tweetData);
		});
		return tweetsList;
	},

	// get user Tweets

	getUserTweet: async (uid) => {
		const q = query(tweetsCollection, where("uid", "==", uid));
		const tweets = await getDocs(q);
		const userTweets: ITweet[] = [];
		tweets.forEach((tweet) => {
			const tweetData = tweet.data() as ITweet;
			tweetData.docId = tweet.id;
			userTweets.push(tweetData);
		});

		return userTweets;
	},

	// listen to live tweets udpates
	liveTweets: async (setTweets) => {
		const q = query(tweetsCollection, orderBy("dateCreated", "desc"));
		onSnapshot(q, (doc) => {
			const tweetList: ITweet[] = [];
			doc.forEach((doc) => {
				const addTweet = { ...(doc.data() as ITweet), docId: doc.id };
				tweetList.push(addTweet);
			});
			setTweets(tweetList);
		});
	},
	likeTweet: async (docId, uid) => {
		// find the doc
		const tweetDocRef = doc(tweetsCollection, docId);
		const updateObj = { likes: arrayUnion(uid) };

		const res = await updateDoc(tweetDocRef, updateObj);

		// upd user likes

		//
	},
	unLikeTweet: async (docId, uid) => {
		const tweetDocRef = doc(tweetsCollection, docId);
		const updateObj = { likes: arrayRemove(uid) };
		await updateDoc(tweetDocRef, updateObj);
	},
	getUserLikes: async (uid) => {
		const q = query(tweetsCollection, where("likes", "array-contains", uid));
		const data = await getDocs(q);
		const tweets = data.docs;
		if (!tweets.length) return undefined;

		const likedTweets: ITweet[] = [];
		tweets.forEach((tweet) => {
			const tweetData = tweet.data() as ITweet;
			tweetData.docId = tweet.id;
			likedTweets.push(tweetData);
		});
		return likedTweets;
	},
	createNewTweet: async (tweet) => {
		const res = await addDoc(tweetsCollection, tweet);
		return res;
	},
	uploadMedia: async (userId, imageFile, mediaType) => {
		console.log(imageFile);
		const ImageRef = ref(storage, `${userId}-${mediaType}-${imageFile.name}-image`);
		const uploadedFile = await uploadBytes(ImageRef, imageFile);
		const imageURL = await getDownloadURL(uploadedFile.ref);
		return imageURL;
	},
	uploadProfilePic: async (userId, imageFile) => {
		const profileImageRef = ref(storage, `${userId}-profile-image`);
		const uploadedFile = await uploadBytes(profileImageRef, imageFile);
		const imageURL = await getDownloadURL(uploadedFile.ref);
		return imageURL;
	},
	uploadWallpaperPic: async (userId, imageFile) => {
		const wallpaperImageRef = ref(storage, `${userId}-wallpaper-image`);
		const uploadedFile = await uploadBytes(wallpaperImageRef, imageFile);
		const imageURL = await getDownloadURL(uploadedFile.ref);
		return imageURL;
	},

	getTrendCollection: async (trendTopic) => {
		const searchKey: string = trendTopic;
		const collection: CollectionReference<DocumentData> = trendCollections[searchKey as keyof typeof trendCollections];

		const q = query(collection, orderBy("dateCreated", "desc"));
		const tweets = await getDocs(q);
		console.log(tweets, "tweets");
		const userTweets: ITweet[] = [];
		tweets.forEach((tweet) => {
			const tweetData = tweet.data() as ITweet;
			tweetData.docId = tweet.id;
			userTweets.push(tweetData);
		});

		return userTweets;
	},
};
