import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
	
	constructor(){
		super();
	};
	render(){
		return (
			<div>
				<h2>Welcome to React Router Tutorial</h2>
				<ul>
					<li><Link to={'/'}>Home</Link></li>
					<li><Link to={'/Content'}>Content</Link></li>
					<li><Link to={'/Login'}>Login</Link></li>
					<li><Link to={'/Register'}>Register</Link></li>
					
				</ul>
				<hr />
			</div>
		);
	}
}

export default Header;