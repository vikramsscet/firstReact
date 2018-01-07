import React, {Component} from 'react';
import {Generic} from '../jsApi/Generic';
import CardList from './CardList';

class Home extends Component{
	constructor(props){
		super(props);
		this.state = {
			title : "Welcome to Some Website...",
			pData : "React Developers List",
			userData : []
		};
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
			</div>
		);
	}
};

export default Home;