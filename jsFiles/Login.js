import React, {Component} from 'react';

class Login extends Component{
	constructor(props){
		super(props);
	};
	render(){
		return (
			<div>
				<h2>Login USER here...</h2>
				<p>{this.props.error}</p>
				UserName : <input type='text' name='uname' ref='uname' />
				Password : <input type='password' name='passwrd' ref='passwrd' />
				<button name='login' onClick={this.props.loginHandler} >Login</button>
			</div>
		);
	}
}

export default Login;