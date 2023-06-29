import { Link } from "react-router-dom";
import "./NavBar.css";
import { AiFillHome, AiOutlineMail, AiOutlineLogout } from "react-icons/ai";
import { BiHash } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";
import { CiViewList, CiCircleMore } from "react-icons/ci";
import logo from "../../media/twitter_logo.png";
import { APIHandler } from "../../fireBaseConfig";

interface IProps {
	displayNav: boolean;
}

const NavBar = ({ displayNav }: IProps) => {
	return (
		<nav className={displayNav ? `display ${displayNav ? "active" : ""}` : ""}>
			<div className="navBar_master">
				<div className="nav_container">
					<div className="nav_container_top">
						<div className="nav_top_logo">
							<img src={logo}></img>
						</div>
						<div className="nav_menu">
							<Link to="/" className="menu_link">
								<div className="link_container">
									<AiFillHome size={25} />
									<div className="link_title">Menu</div>
								</div>
							</Link>
							<Link
								to="/profile"
								className="menu_link"
								// onClick={() => {
								// 	fetchNewUser(userDetails);
								// }}
							>
								<div className="link_container">
									<CgProfile size={25} />
									<div className="link_title">Profile</div>
								</div>
							</Link>
							<div className="link_container">
								<BiHash size={25} />
								<div className="link_title">Explore</div>
							</div>
							<div className="link_container">
								<IoMdNotificationsOutline size={25} />
								<div className="link_title">Notifications</div>
							</div>
							<div className="link_container">
								<AiOutlineMail size={25} />
								<div className="link_title">Messages</div>
							</div>
							<div className="link_container">
								<BsBookmark size={25} />
								<div className="link_title">Bookmarks</div>
							</div>
							<div className="link_container">
								<CiViewList size={25} />
								<div className="link_title">Lists</div>
							</div>
							<div className="link_container">
								<CiCircleMore size={25} />
								<div className="link_title">More</div>
							</div>
						</div>
						<div className="tweet_btn">
							<button
								onClick={() => {
									APIHandler.logout();
								}}
							>
								<p>Logout</p>
								<AiOutlineLogout size={15} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
