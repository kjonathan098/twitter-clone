import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { displayNavContext } from "../../context/DisplayNavContext";

const MobileNavBar = () => {
	const { displayNav, setDisplayNav } = useContext(displayNavContext);

	return (
		<>
			<div className="menu_button_container">
				{!displayNav && (
					<GiHamburgerMenu
						className="menu_button"
						onClick={() => {
							setDisplayNav(!displayNav);
						}}
					/>
				)}
			</div>
		</>
	);
};

export default MobileNavBar;
