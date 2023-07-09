import { authContext } from "../../context/AuthContext";
import { APIHandler } from "../../fireBaseConfig";
import { IUserDetails } from "../../global/interfaces";
import "./Register.css";
import { SetStateAction, Dispatch, useState, useContext } from "react";

interface IProps {
	setRegister: Dispatch<SetStateAction<boolean>>;
}
const Register = ({ setRegister }: IProps) => {
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");

	async function handleRegsitration() {
		if (!userName || !email || !password || !rePassword) return alert("please fill form");
		if (password !== rePassword) return alert("passwords mismatch");
		const res = await APIHandler.registerWEmail(email, password);
		if (!res) return;

		const userObj: IUserDetails = {
			uid: res.user.uid,
			joinedDate: res.user.metadata.creationTime,
			name: userName,
			email: email,
			profilePic: res.user.photoURL,
			wallpaperPic: null,
		};

		await APIHandler.addNewUserToDb(userObj);
	}

	return (
		<>
			<div>Good to have you here</div>
			<div>Create your account</div>
			<div className="register_inputs_container">
				<input
					type="text"
					placeholder="Enter Name"
					name="email"
					onChange={(e) => {
						setUserName(e.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="Enter Email"
					name="email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<input
					type="password"
					placeholder="Enter Password"
					name="email"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<input
					type="password"
					placeholder="Re-Password"
					name="email"
					onChange={(e) => {
						setRePassword(e.target.value);
					}}
				/>
			</div>
			<button className="register_btn authBtn" onClick={handleRegsitration}>
				Register
			</button>
			<button
				className="login_google_btn authBtn"
				onClick={() => {
					APIHandler.googleAuth();
				}}
			>
				Register with Google
			</button>
			<button
				className="login_demo_btn authBtn"
				onClick={() => {
					APIHandler.loginWDemo();
				}}
			>
				Click here to use our Demo account
			</button>
			<div>
				Already have an account?{" "}
				<span
					onClick={() => {
						setRegister(false);
					}}
				>
					Login here
				</span>
			</div>
		</>
	);
};

export default Register;
