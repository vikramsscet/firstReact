import React from 'react';
import {Generic} from '../jsApi/Generic';
class Content extends React.Component {
	constructor(){
		super();
		this.state = {
			res : 0,
			gameColor : 'blue',
			neutralColor : 'white',
			boxes:[],
			randomNums:[],
			currentDifficultyLevel:5,
			timerObj:'',
			time:7000,
			difficultyLevels : {
				5 : "Easy",
				7 : "Medium",
				9 : "Difficult"
			},
			gameCounter : 5,
			resultBox:{
				s1:{'display':'none'},
				s2:{'display':'none'},
				s3:{'display':'none'}
			}
		}
		
		this.addBoxes.call(this);
		
		
		this.handleClick = this.handleClick.bind(this);
		
		this.setDiffLevel = this.setDiffLevel.bind(this);
		this.getDiffLevel = this.getDiffLevel.bind(this);
		this.simulateBoxGame = this.simulateBoxGame.bind(this);
		this.stopGame = this.stopGame.bind(this);
	}
	
	showHide(){
		this.setRandomColors(this.state.gameColor);
		let stateObj = this.state;
		stateObj.resultBox.s1 = {};
		stateObj.resultBox.s2 = {display: 'none'};
		this.setState(stateObj);
		
		setTimeout(()=>{
			this.setRandomColors(this.state.neutralColor);
			stateObj.resultBox.s1 = {display: 'none'};
			stateObj.resultBox.s2 = {};
			this.setState(stateObj);
		},2000);
	};

	addBoxes(){
		let stateObj = this.state;
		for(let i=0; i<25; i++){
			stateObj.boxes.push(<GameBox key={i} id={i} />);
		}
		stateObj.randomNums = Generic.getRandomArray(5);
		this.setState(stateObj);
	};
	
	handleClick(counter){
		let stateObj = this.state;
		stateObj.res = stateObj.res+counter;
		this.setState(stateObj);
	};
	
	setRandomColors(color){
		for(let i=0; i<this.state.randomNums.length; i++){
			Generic.changeBackgroundColor(this.state.randomNums[i], color);
		}
	};
	simulateBoxGame(){
		let counter = 0;
		let time = this.state.time;
		
		function privateFun(){
			if(this.state.randomNums.length > 0){
				this.setRandomColors(this.state.neutralColor);
			}
			let stateObj = this.state;
			stateObj.randomNums = [];
			stateObj.randomNums = Generic.getRandomArray(this.state.currentDifficultyLevel);
			stateObj.timerObj = timerObj;
			this.setState(stateObj);
			
			this.showHide.call(this);
			counter++;
			if(this.state.gameCounter === counter){
				clearInterval(timerObj);
				setTimeout(()=>{
					console.log("Ending Game....");
					this.setRandomColors(this.state.neutralColor);
					//showing Result....
					stateObj.resultBox.s2 = {display: 'none'};
					stateObj.resultBox.s3 = {};
					this.setState(stateObj);
				},time);
			}
		}
		privateFun.call(this);
		let timerObj = setInterval(()=>{
			privateFun.call(this);
		},time);
	};
	stopGame(){
		clearInterval(this.state.timerObj);
		this.setRandomColors(this.state.neutralColor);
	};
	
	componentDidMount() {
		
	};
	setDiffLevel(e){
		let stateObj = this.state;
		let newDiffLevel = e.target.value;
		stateObj.currentDifficultyLevel = newDiffLevel;
		this.setState(stateObj);
	};
	getDiffLevel(){
		return this.state.difficultyLevels[this.state.currentDifficultyLevel];
	};
	
	render(){
		return (
			<div>
				<Button handleClick={this.handleClick} plusBy={1} />
				<Button handleClick={this.handleClick} plusBy={5} />
				<Button handleClick={this.handleClick} plusBy={10} />
				<Result res={this.state.res} />
				<div className='gameContainer'>
					<div className="gameXxXContainer">
						{this.state.boxes}
					</div>
					<GameResultContainer resultCSS={this.state.resultBox}stopGame={this.stopGame} startGame={this.simulateBoxGame} diffLevel={this.getDiffLevel} setDiffLevel={this.setDiffLevel} />
				</div>
			</div>	
		);
		
	};
}

class GameBox extends React.Component{
	render(){
		return (
			<div className='gamebox' id={this.props.id} />
		);
	}
}

class GameResultContainer extends React.Component{
	render(){
		return(
			<div className='gameResultContainer'>
				<GameResult resultCSS={this.props.resultCSS} />
				<GameDifficultyLevel startGame={this.props.startGame} stopGame={this.props.stopGame}  diffLevel={this.props.diffLevel} setDiffLevel={this.props.setDiffLevel} />
			</div>
		);
	}
}

class GameDifficultyLevel extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className='gameDifficultyLevel'>
				<button name='easy' value='5' onClick={this.props.setDiffLevel}>Easy</button>
				<button name='medium' value='7' onClick={this.props.setDiffLevel}>Medium</button>
				<button name='difficult' value='9' onClick={this.props.setDiffLevel}>Difficult</button>
				<button name='start' onClick={this.props.startGame}>Start</button>
				<button name='stop' onClick={this.props.stopGame}>Stop</button>
				<span >Diffculty Level : <span id="diffLevel">{this.props.diffLevel()}</span></span>
			</div>
		);
	}
}

class GameResult extends React.Component{
	render(){
		return(
			<div className='gameResult'>
				<span style={this.props.resultCSS.s1}>Wait & memorize boxes...</span>
				<span style={this.props.resultCSS.s2}>Start selecting box...</span>
				<span style={this.props.resultCSS.s3}>Your Result...</span>
			</div>
		);
	}
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