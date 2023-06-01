import { initializeApp } from "firebase/app";
// import { signInWithPopup, GoogleAuthProvider, getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, getDocs, orderBy } from "@firebase/firestore";
// import { getStorage } from "firebase/storage";
import { ITweet } from "./global/interfaces";

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

// get DB
const db = getFirestore(app);
// const storage = getStorage();

// DB's collection
// const usersCollection = collection(db, "users");
const tweetsCollection = collection(db, "tweets");

interface IAPIHandler {
	getAllTweets: () => Promise<ITweet[]>;
}

export const APIHandler: IAPIHandler = {
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
};