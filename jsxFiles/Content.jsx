import React from 'react';

class Content extends React.Component {
	
	render(){
		let flag = false;
		return (
			<div>
				<h2>Add Employee...</h2>
				<p style={this.props.style}>{this.props.error}</p>
				Enter Name : <input type='text' id='name'/>
				Enter Designation : <input type='text' id='designation' />
				<button type="button" onClick={this.props.addEmpl}>Add Employee!</button>
			</div>
		);
	};
}

export default Content;