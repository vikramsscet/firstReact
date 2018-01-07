import React, {Component} from 'react';

class Register extends Component{
	constructor(props){
		super(props);
	};
	
	render(){
		return (
			<div>
				<h2>Register USER here...</h2>
				<p>{this.props.error}</p>
				<p>{this.props.successMsg}</p>
				UserName : <input type='text' name='uname' ref='uname' />
				Password : <input type='password' name='passwrd' ref='passwrd' />
				Designation : <input type='text' name='desig' ref='desig' />
				<button name='register' onClick={this.props.userHandler} >Register</button>
			</div>
			
		);
	};
	
}

export default Register;