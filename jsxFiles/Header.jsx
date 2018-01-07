import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {
	
	constructor(){
		super();
		this.state = {
			data : "default value"
		}
		this.updateState = this.updateState.bind(this);
		this.clearState = this.clearState.bind(this);
	};
	updateState(e){
		var obj = this.state;
		obj.data = e.target.value;
		this.setState(obj);
	};
	clearState(e){
		this.setState({data:""});
		console.log(this.refs.exp);
		ReactDOM.findDOMNode(this.refs.exp).focus();
	};
	render(){
		return (
			<div>
				<h2>Header Component</h2>
				<p>{this.props.headerProps}</p>
				Enter Sth : <input type='text' name='exp' id='exp' ref='exp' value={this.state.data} onChange={this.updateState} />
				<button name='clear' id = 'clear' onClick={this.clearState}>ClearText</button>
				<p>{this.state.data}</p>
			</div>
		);
	}
}

export default Header;