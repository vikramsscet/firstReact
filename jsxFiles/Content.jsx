import React from 'react';

class Content extends React.Component {
	constructor(){
		super();
		this.state = {
			res : 0
		}
		this.handleClick = (counter)=>{
			let stateObj = this.state;
			stateObj.res = stateObj.res+counter;
			this.setState(stateObj);
		};
		this.handleClick = this.handleClick.bind(this);
	}
	render(){
		return (
			<div>
				<Button handleClick={this.handleClick} plusBy={1} />
				<Button handleClick={this.handleClick} plusBy={5} />
				<Button handleClick={this.handleClick} plusBy={10} />
				<Result res={this.state.res} />
			</div>	
		);
	};
}

class Button extends React.Component{
	render(){
		return(
				<button onClick={()=>this.props.handleClick(this.props.plusBy)}>+{this.props.plusBy}</button>
		);
	}
}
class Result extends React.Component{
	render(){
		return(
			<div>
				<p>{this.props.res}</p>
			</div>
		);
	}
}

export default Content;