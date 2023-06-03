import "./Register.css";
import { SetStateAction, Dispatch } from "react";

interface IProps {
	setRegister: Dispatch<SetStateAction<boolean>>;
}
const Register = ({ setRegister }: IProps) => {
	return <div>Register</div>;
};

export default Register;
