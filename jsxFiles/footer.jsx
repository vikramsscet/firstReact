import React from 'react';
import FooterCSS from '../css/mainCSS.js'
class Footer extends React.Component{
	render(){
		return (
			<div style={FooterCSS.footer}>
				<p>Footer</p>
			</div>
		);
	}
}

export default Footer;