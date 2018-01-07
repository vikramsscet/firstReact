import React, {Component} from 'react';
import {Generic} from '../jsApi/Generic';
import CardList from './CardList';

class Home extends Component{
	constructor(props){
		super(props);
		this.state = {
			res : 0,
			title : "Welcome to Some Website...",
			pData : "Below is some users...",
			userData : []
		};
		
		this.handleClick = (counter)=>{
			let stateObj = this.state;
			stateObj.res = stateObj.res+counter;
			this.setState(stateObj);
		};
		this.handleClick = this.handleClick.bind(this);
	}
	
	componentDidMount() {
		
		Generic.consoleMsg();
		var x = Generic.getAsyncData("https://api.github.com/users");
		x.then((result)=>{
				let stateObj = this.state;
				stateObj.userData = result;
				this.setState(stateObj);
		}).catch((err)=>{
			console.log(err);
		});
	}
	render(){
		
		return (
			<div>
				<h2>{this.state.title}</h2>
				<p>{this.state.pData}</p>
				<CardList cards={this.state.userData} />
				<Button handleClick={this.handleClick} plusBy={1} />
				<Button handleClick={this.handleClick} plusBy={5} />
				<Button handleClick={this.handleClick} plusBy={10} />
				<Result res={this.state.res} />
				
			</div>
		);
	}
}; 

class Button extends Component{
	render(){
		return(
				<button onClick={()=>this.props.handleClick(this.props.plusBy)}>+{this.props.plusBy}</button>
		);
	}
}
class Result extends Component{
	render(){
		return(
			<div>
				<p>{this.props.res}</p>
			</div>
		);
	}
}

export default Home;