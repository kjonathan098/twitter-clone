import "./SideMenu.css";

import { trendingTopics } from "../Utils/Constants/trendingTopics";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
	const navigate = useNavigate();

	return (
		<div className="side_menu-master ">
			<div className="trending_master">
				<p className="trending_title">Trends for you</p>
				<div className="trending_list_main">
					{trendingTopics.map((trend) => {
						return (
							<div
								className="trending_topic"
								onClick={() => {
									navigate("/trending", { state: { trend: trend.url } });
								}}
								key={trend.name}
							>
								<p className="trending_topic_title">{trend.name}</p>
								<p>{trend.length} tweets</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default SideMenu;
