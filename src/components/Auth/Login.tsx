import { SetStateAction, Dispatch, useState } from "react";
import useForm from "../../customHooks/useForm";
interface IProps {
	setRegister: Dispatch<SetStateAction<boolean>>;
}
const Login = ({ setRegister }: IProps) => {
	const [userName, setUserName] = useState<string | null>();
	const [password, setPassword] = useState<string | null>();

	return (
		<>
			<div>Welcome Back</div>
			<div>Login to your account</div>
			<div className="login_inputs_container">
				<input
					type="text"
					placeholder="Enter Email"
					name="email"
					onChange={(e) => {
						setUserName(e.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="Enter Password"
					name="password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
			</div>

			{/* <button className="login_btn authBtn" onClick={handleLogin}>
				Login
			</button> */}
			{/* <button
				className="login_google_btn authBtn"
				onClick={() => {
					APIHandler.googleAuth();
				}}
			>
				Or Sign-in with Google
			</button> */}
			<button className="login_demo_btn authBtn">Click here to use our Demo account</button>
			<div>
				Dont have an account?{" "}
				<span
					onClick={() => {
						setRegister(true);
					}}
				>
					Join for free
				</span>
			</div>
		</>
	);
};

export default Login;
