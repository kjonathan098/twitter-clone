import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, query, getDocs, orderBy, where, addDoc, onSnapshot, doc, arrayUnion, updateDoc, arrayRemove } from "@firebase/firestore";
// import { getStorage } from "firebase/storage";
import { ITweet, IUserDetails } from "./global/interfaces";

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
// const storage = getStorage();

// DB's collection
const usersCollection = collection(db, "users");
const tweetsCollection = collection(db, "tweets");

interface IAPIHandler {
	getAllTweets: () => Promise<ITweet[]>;
	googleAuth: () => Promise<any>;
	logout: () => Promise<any>;
	getUserByUID: (uid: string) => Promise<null | IUserDetails>;
	addNewUserToDb: (userProfileObj: IUserDetails) => Promise<any>;
	liveTweets: (setTweets: React.Dispatch<React.SetStateAction<ITweet[]>>) => Promise<any>;
	likeTweet: (docId: string, uid: string) => Promise<any>;
	unLikeTweet: (docId: string, uid: string) => Promise<any>;
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
		console.log(res);

		// upd user likes

		//
	},
	unLikeTweet: async (docId, uid) => {
		const tweetDocRef = doc(tweetsCollection, docId);
		const updateObj = { likes: arrayRemove(uid) };
		await updateDoc(tweetDocRef, updateObj);
	},
};
