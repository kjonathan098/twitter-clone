import { useState } from "react";

function useForm(initialState = {}) {
	const [state, setState] = useState(initialState);

	const handleChange = (e) => {
		e.persist();
		setState((state) => ({ ...state, [e.target.name]: e.target.value }));
	};
	return [state, handleChange, setState];
}

export default useForm;
