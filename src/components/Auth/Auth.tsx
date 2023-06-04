import "./Auth.css";
import loginPic from "../../media/login_pic.jpg";
// import { APIHandler } from "../../firebaseConfig";
import Login from "./Login";
// import Register from "./Register";
import { useState } from "react";
import Register from "./Register";

const Auth = () => {
	const [register, setRegister] = useState(false);
	return (
		<div id="login_master">
			<section>
				<img src={loginPic} alt="" />
			</section>

			<section id="auth_master">{register ? <Register setRegister={setRegister} /> : <Login setRegister={setRegister} />}</section>
		</div>
	);
};

export default Auth;
