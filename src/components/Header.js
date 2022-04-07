import React from "react";
import "./Header.css";

export default ({ black }) => {
	return (
		<header className={black ? "black" : ""}>
			<div className='header--logo'>
				<a>
					<img src='https://www.freepnglogos.com/uploads/netflix-logo-0.png' />
				</a>
			</div>
			<div className='header--user'>
				<a>
					<img src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' />
				</a>
			</div>
		</header>
	);
};
